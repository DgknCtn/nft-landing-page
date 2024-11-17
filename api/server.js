import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../.env') });

const app = express();

// CORS ayarları
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(express.json());

// MySQL bağlantı havuzu
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Veritabanı bağlantı testi
app.get('/api/health', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    connection.release();
    res.json({ status: 'Database connection successful' });
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({ error: 'Database connection failed' });
  }
});

// Whitelist tablosu oluşturma
async function initDatabase() {
  try {
    const connection = await pool.getConnection();
    await connection.query(`
      CREATE TABLE IF NOT EXISTS whitelist (
        id INT AUTO_INCREMENT PRIMARY KEY,
        wallet_address VARCHAR(42) NOT NULL UNIQUE,
        email VARCHAR(255),
        discord VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX wallet_idx (wallet_address)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
    connection.release();
    console.log('✅ Database initialized successfully');
  } catch (error) {
    console.error('❌ Database initialization error:', error);
    process.exit(1);
  }
}

// Whitelist kayıt endpoint'i
app.post('/api/whitelist', async (req, res) => {
  try {
    const { wallet_address, email, discord } = req.body;

    // Validasyonlar
    if (!wallet_address?.match(/^0x[a-fA-F0-9]{40}$/)) {
      return res.status(400).json({ error: 'Invalid wallet address' });
    }

    if (email && !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Duplicate kontrol
    const [existing] = await pool.query(
      'SELECT wallet_address FROM whitelist WHERE wallet_address = ?',
      [wallet_address]
    );

    if (existing.length > 0) {
      return res.status(409).json({ 
        error: 'Wallet already whitelisted',
        message: 'This wallet address is already in the whitelist'
      });
    }

    // Yeni kayıt ekleme
    await pool.query(
      'INSERT INTO whitelist (wallet_address, email, discord) VALUES (?, ?, ?)',
      [wallet_address, email || null, discord || null]
    );

    res.status(201).json({ 
      success: true,
      message: 'Successfully added to whitelist'
    });
  } catch (error) {
    console.error('Whitelist error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: 'An unexpected error occurred. Please try again later.'
    });
  }
});

// Whitelist durumu kontrolü
app.get('/api/whitelist/:address', async (req, res) => {
  try {
    const { address } = req.params;

    if (!address?.match(/^0x[a-fA-F0-9]{40}$/)) {
      return res.status(400).json({ error: 'Invalid wallet address' });
    }

    const [rows] = await pool.query(
      'SELECT wallet_address FROM whitelist WHERE wallet_address = ?',
      [address]
    );

    res.json({ 
      isWhitelisted: rows.length > 0,
      address
    });
  } catch (error) {
    console.error('Whitelist check error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Database initialization ve server başlatma
const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await initDatabase();
    app.listen(PORT, () => {
      console.log(`
🚀 Server running on port ${PORT}
📝 API endpoints:
   - POST /api/whitelist
   - GET /api/whitelist/:address
   - GET /api/health
      `);
    });
  } catch (error) {
    console.error('Server startup error:', error);
    process.exit(1);
  }
}

startServer();