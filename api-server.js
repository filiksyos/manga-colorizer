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
    return res.status(500).json({ error: 'API key not configured' });
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req.body),
      }
    );

    // Check if response has content before parsing
    const contentType = response.headers.get('content-type');
    const responseText = await response.text();
    
    // Log response details for debugging
    console.log('Response status:', response.status);
    console.log('Response content-type:', contentType);
    console.log('Response length:', responseText.length);
    
    let data;
    if (responseText && contentType && contentType.includes('application/json')) {
      try {
        data = JSON.parse(responseText);
        
        // Log response structure for debugging
        if (data.candidates) {
          console.log('Candidates found:', data.candidates.length);
          if (data.candidates[0]) {
            console.log('First candidate keys:', Object.keys(data.candidates[0]));
            if (data.candidates[0].content) {
              console.log('Content keys:', Object.keys(data.candidates[0].content));
              if (data.candidates[0].content.parts) {
                console.log('Parts count:', data.candidates[0].content.parts.length);
                console.log('Parts structure:', JSON.stringify(data.candidates[0].content.parts.map(p => Object.keys(p)), null, 2));
              }
            }
          }
        } else {
          console.log('Response top-level keys:', Object.keys(data));
          console.log('Response structure sample:', JSON.stringify(data, null, 2).substring(0, 1000));
        }
      } catch (parseError) {
        console.error('Failed to parse JSON response:', parseError);
        console.error('Response text:', responseText.substring(0, 500));
        return res.status(500).json({ 
          error: 'Invalid JSON response from API',
          details: responseText.substring(0, 200)
        });
      }
    } else {
      // Non-JSON response or empty response
      console.error('Unexpected response format:', contentType);
      console.error('Response text:', responseText.substring(0, 500));
      return res.status(500).json({ 
        error: 'Unexpected response format from API',
        details: responseText || 'Empty response'
      });
    }
    
    if (!response.ok) {
      console.error('API Error Response:', data);
      return res.status(response.status).json(data || { error: 'API request failed' });
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