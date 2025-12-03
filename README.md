# 🎨 Manga Colorizer - Transform Your Manga

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![Powered by Gemini](https://img.shields.io/badge/Powered%20by-Gemini%202.5%20Flash-blue)](https://ai.google.dev/)

A modern AI-powered manga colorization application powered by **Gemini 2.5 Flash Image** technology that lets you upload black & white manga pages and get them beautifully colorized. Upload your favorite manga panels and watch them come to life in full color using advanced AI image processing!


## 🔗 Quick Links

- [🚀 Getting Started](#-getting-started) - Setup instructions
- [✨ Features](#-features) - What this app can do
- [📝 Documentation](#-documentation) - Guides and API docs
- [🤝 Contributing](#-contributing) - How to contribute
- [❓ FAQ](#-faq) - Common questions
- [🐛 Issues](https://github.com/filiksyos/manga-colorizer/issues) - Report bugs

## 🖼️ Screenshot

![Manga Colorizer Application](screenshots/manga-colorizer.png)

*The Manga Colorizer interface showing upload and colorized preview areas*

## ✨ Features

- **📸 Upload Manga Pages**: Upload black & white manga images or panels
- **🎨 AI Colorization**: Advanced Gemini 2.5 Flash Image technology for realistic colorization
- **🖼️ Instant Preview**: See your colorized manga in real-time
- **💾 Download Results**: Save your colorized manga pages
- **📱 Responsive Design**: Works perfectly on desktop and mobile devices
- **🌙 Modern UI**: Clean, intuitive interface built with shadcn/ui components
- **🚀 Fast Processing**: Quick colorization powered by Google's latest AI
- **🎯 No Auth Required**: Start colorizing immediately, no sign-up needed
- **💿 No Database**: Simple, stateless application

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Google Gemini API key (free at https://aistudio.google.com/app/apikey)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/filiksyos/manga-colorizer.git
   cd manga-colorizer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```bash
   GEMINI_API_KEY=your_api_key_here
   ```
   
   🔐 **Security Note**: 
   - API key is kept server-side only (no VITE_ prefix)
   - Never exposed to frontend/browser
   - Get your free API key from: https://aistudio.google.com/app/apikey

4. **Build and start the application**
   ```bash
   # Build the frontend
   npm run build:local
   
   # Start the full-stack server (frontend + backend)
   npm start
   ```

5. **Open your browser**
   Navigate to `http://localhost:8082` to start colorizing manga!

## 🛠️ Built With

- **Frontend Framework**: React 18 with TypeScript
- **Backend**: Express.js with secure API proxy
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **AI Integration**: Google Gemini 2.5 Flash Image API

## 📁 Project Structure

```
manga-colorizer/
├── src/                    # Frontend React application
│   ├── components/         # Reusable UI components
│   │   ├── ui/             # shadcn/ui components
│   │   ├── MangaUploader.tsx
│   │   ├── ColorizerHeader.tsx
│   │   └── PreviewArea.tsx
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions
│   ├── pages/              # Page components
│   └── utils/              # Helper functions
├── api-server.js           # Express backend with secure API proxy
├── dist/                   # Built frontend assets
├── public/                 # Static files
└── ...config files
```

## 🔐 Security Architecture

**Secure API Proxy Pattern**:
- ✅ API keys stored server-side only
- ✅ Frontend calls `/api/colorize` (no direct Google API access)
- ✅ Backend proxies requests with API key injection
- ✅ Zero API key exposure in browser/network requests
- ✅ Single-instance deployment (frontend + backend combined)

## 🎯 Usage

1. **Upload Manga**: Click the upload area or drag & drop a black & white manga image
2. **Wait for AI**: The Gemini 2.5 Flash Image model processes your manga
3. **Preview Result**: See your colorized manga in the preview area

## 📝 Documentation

Comprehensive guides and documentation:

- **[Setup Guide](SETUP.md)** - Detailed setup instructions for beginners
- **[API Documentation](docs/API.md)** - Backend API and integration details
- **[Architecture](docs/ARCHITECTURE.md)** - Technical architecture and design
- **[FAQ](FAQ.md)** - Frequently asked questions
- **[Changelog](CHANGELOG.md)** - Version history and updates

## ❓ FAQ

Common questions:

**Q: Is it really free?**  
A: Yes! Both the app and the Gemini API have free tiers.

**Q: Do I need to create an account?**  
A: No! Start colorizing immediately without any sign-up.

**Q: Are my images stored anywhere?**  
A: No. The app is stateless and doesn't save any data.

**Q: What image formats are supported?**  
A: JPG, PNG, and WebP files under 10MB.

**Q: How long does colorization take?**  
A: Usually 5-15 seconds depending on image size and complexity.

See the full [FAQ](FAQ.md) for more questions and answers.

4. **Download**: Save your colorized manga to your device
5. **Upload More**: Colorize as many manga pages as you want!

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style and conventions
- Write clear, descriptive commit messages
- Test colorization with various manga styles
- Update documentation as needed

## 📝 Scripts

- `npm run dev` - Start frontend development server (development only)
- `npm run build:local` - Build frontend for production
- `npm start` - Start full-stack server (frontend + backend)
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

**Production Deployment**:
- Backend server serves the application
- Frontend is served as static files from `/dist`
- API endpoint `/api/colorize` handles secure image colorization

## 💡 Tips for Best Results

- Upload clear, high-quality black & white manga images
- Works best with standard manga/comic art styles
- Try different panels and characters
- The AI learns from context in the image for better colorization

## 🐛 Issues & Support

⭐ **Star the repo to show support (it really helps).**  
🐛 **Open an issue for bugs, ideas, or discussions.**

If you encounter any issues or have questions:

1. Check existing [Issues](https://github.com/filiksyos/manga-colorizer/issues)
2. Create a new issue with detailed information
3. Include the manga style/type for colorization issues

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🎉 Acknowledgments

- Thanks to Google for the amazing Gemini 2.5 Flash Image API
- Thanks to the shadcn/ui team for the beautiful component library
- Built with modern React and TypeScript best practices
- Based on the nano-banana-wardrobe architecture by aksharth

---

**Start colorizing your manga today!** 🎨📚✨