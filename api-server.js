import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 8082;

// Enable CORS for frontend
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// API endpoint for manga colorization
app.post('/api/colorize', async (req, res) => {
  const apiKey = process.env.GEMINI_API_KEY; // Note: NOT VITE_ prefix
  
  console.log('Colorization request received:', new Date().toISOString());
  console.log('API Key available:', !!apiKey);
  
  if (!apiKey) {
    console.error('API key not configured');
    return res.status(500).json({ error: 'API key not configured' });
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req.body),
      }
    );

    const data = await response.json();
    
    if (!response.ok) {
      console.error('API Error Response:', data);
      return res.status(response.status).json(data);
    }
    
    res.json(data);
  } catch (error) {
    console.error('API Error:', error.message);
    console.error('Full error:', error);
    res.status(500).json({ error: 'Failed to colorize manga: ' + error.message });
  }
});

// Handle React Router (SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`🎨 Manga Colorizer server running on port ${port}`);
  console.log(`📱 Open http://localhost:${port} to start colorizing!`);
});