# ⚡ Quick Start Guide

Get Manga Colorizer running in 2 minutes!

## Prerequisites Check

```bash
# Check Node.js version (need 18+)
node --version

# Check npm
npm --version
```

Don't have Node.js? [Download here](https://nodejs.org/)

## 1. Get API Key (30 seconds)

1. Visit: https://aistudio.google.com/app/apikey
2. Click "Create API Key"
3. Copy the key

## 2. Clone & Install (1 minute)

```bash
# Clone repository
git clone https://github.com/filiksyos/manga-colorizer.git
cd manga-colorizer

# Install dependencies
npm install
```

## 3. Configure (30 seconds)

```bash
# Create .env file
echo "GEMINI_API_KEY=your_api_key_here" > .env

# Replace 'your_api_key_here' with your actual key
```

Or manually create `.env`:
```
GEMINI_API_KEY=AIzaSy...
```

## 4. Build & Run (30 seconds)

```bash
# Build frontend
npm run build:local

# Start server
npm start
```

## 5. Open Browser

Visit: http://localhost:8082

🎉 **Done!** Upload a manga image and watch it colorize!

---

## Development Mode

For development with hot reload:

```bash
# Terminal 1: Backend
node api-server.js

# Terminal 2: Frontend  
npm run dev
```

Then visit: http://localhost:8080

---

## Troubleshooting

### "API key not configured"
```bash
# Check .env exists
ls -la .env

# Check contents (should show GEMINI_API_KEY=...)
cat .env

# Restart server
# Ctrl+C then npm start again
```

### "Port already in use"
```bash
# Kill process on port 8082
lsof -ti:8082 | xargs kill -9

# Or use different port
echo "PORT=3000" >> .env
```

### "Module not found"
```bash
# Delete and reinstall
rm -rf node_modules package-lock.json
npm install
```

---

## Next Steps

- Read the [Full Setup Guide](SETUP.md)
- Check out [Documentation](docs/)
- See [Contributing Guidelines](CONTRIBUTING.md)
- Browse [FAQ](FAQ.md)

---

## One-Line Install (Advanced)

```bash
git clone https://github.com/filiksyos/manga-colorizer.git && cd manga-colorizer && npm install && echo "GEMINI_API_KEY=your_key" > .env && npm run build:local && npm start
```

*(Replace `your_key` with actual API key)*

---

**Happy colorizing!** 🎨✨