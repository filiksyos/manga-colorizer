# 🚀 Quick Setup Guide

Get your Manga Colorizer up and running in 5 minutes!

## 📝 Prerequisites

Before you begin, make sure you have:

- **Node.js 18+** installed ([Download here](https://nodejs.org/))
- **npm** or **yarn** package manager
- A **Google Gemini API key** (free!)

## 🔑 Step 1: Get Your Gemini API Key

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click **"Get API Key"** or **"Create API Key"**
4. Copy your API key (keep it secret!)

💡 **The API key is FREE** and gives you generous quota for testing!

## 💾 Step 2: Clone and Install

```bash
# Clone the repository
git clone https://github.com/filiksyos/manga-colorizer.git
cd manga-colorizer

# Install dependencies
npm install
```

## ⚙️ Step 3: Configure Environment

Create a `.env` file in the root directory:

```bash
# Copy the example file
cp .env.example .env
```

Then edit `.env` and add your API key:

```bash
GEMINI_API_KEY=your_actual_api_key_here
```

⚠️ **Important**: 
- Use `GEMINI_API_KEY` (NOT `VITE_GEMINI_API_KEY`)
- This keeps your API key secure on the server-side only
- Never commit `.env` to version control (it's already in `.gitignore`)

## 🏗️ Step 4: Build and Run

```bash
# Build the frontend
npm run build:local

# Start the server
npm start
```

The app will be running at **http://localhost:8082** 🎉

## 🛠️ Development Mode (Optional)

For development with hot reload:

```bash
# Terminal 1: Start the backend API server
node api-server.js

# Terminal 2: Start the frontend dev server
npm run dev
```

## 📝 Quick Test

1. Open http://localhost:8082 in your browser
2. Upload a black & white manga image
3. Wait for the AI to colorize it (usually 5-15 seconds)
4. Download your colorized manga!

## ❓ Troubleshooting

### "API key not configured" error
- Make sure `.env` file exists in the root directory
- Check that you're using `GEMINI_API_KEY` (not `VITE_GEMINI_API_KEY`)
- Restart the server after creating/modifying `.env`

### "Failed to colorize" error
- Check that your API key is valid
- Make sure the image is not too large (< 5MB recommended)
- Check your internet connection
- Check the browser console for detailed error messages

### Port already in use
- The default port is 8082
- Change it by setting `PORT=8083` in your `.env` file
- Or kill the process using port 8082

### Build errors
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Make sure you have Node.js 18 or higher

## 📦 Deployment

### Deploy to Heroku

```bash
# Install Heroku CLI and login
heroku login

# Create a new Heroku app
heroku create my-manga-colorizer

# Set your API key as an environment variable
heroku config:set GEMINI_API_KEY=your_api_key_here

# Deploy
git push heroku main
```

### Deploy to Vercel/Netlify

For Vercel or Netlify, you'll need to:
1. Set up the environment variable `GEMINI_API_KEY`
2. Configure the build command: `npm run build:local`
3. Set the API serverless functions appropriately

## 🔒 Security Best Practices

✅ **DO**:
- Keep API keys in `.env` file (server-side)
- Use environment variables for production
- Never commit `.env` to git
- Use HTTPS in production

❌ **DON'T**:
- Put API keys in frontend code
- Use `VITE_` prefix for API keys (exposes to frontend)
- Commit sensitive credentials
- Share your API key publicly

## 👨‍💻 Need Help?

If you're still stuck:

1. Check [Issues](https://github.com/filiksyos/manga-colorizer/issues) for similar problems
2. Create a new issue with:
   - Your Node.js version (`node --version`)
   - Error messages from console
   - Steps to reproduce

---

Happy colorizing! 🎨✨