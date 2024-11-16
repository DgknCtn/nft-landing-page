import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MySQL bağlantı havuzu oluştur
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Whitelist tablosunu oluştur
async function initDatabase() {
  try {
    const connection = await pool.getConnection();
    await connection.query(`
      CREATE TABLE IF NOT EXISTS whitelist (
        id INT AUTO_INCREMENT PRIMARY KEY,
        wallet_address VARCHAR(42) NOT NULL UNIQUE,
        email VARCHAR(255),
        discord VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    connection.release();
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Database initialization error:', error);
  }
}

initDatabase();

// Whitelist'e kayıt endpoint'i
app.post('/api/whitelist', async (req, res) => {
  try {
    const { wallet_address, email, discord } = req.body;

    // Wallet address kontrolü
    if (!wallet_address?.match(/^0x[a-fA-F0-9]{40}$/)) {
      return res.status(400).json({ error: 'Invalid wallet address' });
    }

    // Email format kontrolü
    if (email && !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Duplicate kontrol
    const [existing] = await pool.query(
      'SELECT wallet_address FROM whitelist WHERE wallet_address = ?',
      [wallet_address]
    );

    if (existing.length > 0) {
      return res.status(409).json({ error: 'Wallet already whitelisted' });
    }

    // Yeni kayıt ekle
    await pool.query(
      'INSERT INTO whitelist (wallet_address, email, discord) VALUES (?, ?, ?)',
      [wallet_address, email || null, discord || null]
    );

    res.status(201).json({ message: 'Successfully added to whitelist' });
  } catch (error) {
    console.error('Whitelist error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});