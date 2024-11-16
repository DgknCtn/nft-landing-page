import mysql from 'mysql2/promise';

// MySQL bağlantı konfigürasyonu
const dbConfig = {
  host: 'localhost',
  user: 'joinv_vanth',
  password: 'vanth0697',
  database: 'vanth'
};

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  let connection;
  try {
    const { email, wallet, discord, twitter } = req.body;

    // Validation
    if (!email || !wallet || !discord || !twitter) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Create connection
    connection = await mysql.createConnection(dbConfig);

    // Check if email or wallet exists
    const [existingRows] = await connection.execute(
      'SELECT * FROM whitelist WHERE email = ? OR wallet = ?',
      [email, wallet]
    );

    if (existingRows.length > 0) {
      return res.status(400).json({ error: 'Email or wallet already registered' });
    }

    // Insert new record
    const [result] = await connection.execute(
      'INSERT INTO whitelist (email, wallet, discord, twitter, status, created_at) VALUES (?, ?, ?, ?, ?, NOW())',
      [email, wallet, discord, twitter, 'pending']
    );

    return res.status(200).json({
      success: true,
      message: 'Successfully registered for whitelist'
    });

  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}