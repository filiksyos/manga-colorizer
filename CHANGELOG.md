# Changelog

All notable changes to Manga Colorizer will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Planned
- Batch processing for multiple images
- Custom color palette selection
- Image processing history
- Download in different formats
- Advanced AI settings
- Mobile app version

## [1.0.0] - 2025-01-03

### Added
- ✨ Initial release of Manga Colorizer
- 🎨 AI-powered manga colorization using Gemini 2.5 Flash Image
- 📸 Drag & drop image upload
- 🖼️ Side-by-side before/after comparison
- 📥 Download colorized images
- 📱 Responsive design (mobile, tablet, desktop)
- 🔒 Secure API key handling (server-side only)
- 🏗️ Express.js backend with API proxy
- ⚡ Vite-powered frontend build
- 🎨 Modern UI with Tailwind CSS and shadcn/ui
- 📝 Comprehensive documentation
  - README with setup instructions
  - SETUP guide for beginners
  - CONTRIBUTING guidelines
  - API documentation
  - Architecture documentation
  - FAQ
- 🐛 GitHub issue templates
- 🔧 PR template
- 🚀 Deployment configs (Heroku, Vercel, Netlify)
- 📝 MIT License

### Features
- **No Authentication Required** - Start colorizing immediately
- **No Database** - Completely stateless application
- **Free to Use** - Powered by free Gemini API tier
- **Open Source** - MIT licensed, contributions welcome
- **Privacy Focused** - No data collection or storage
- **Modern Stack** - React 18, TypeScript, Tailwind CSS
- **Production Ready** - Deployable to major platforms

### Technical Details
- React 18.3.1
- TypeScript 5.8.3
- Vite 5.4.19
- Express 4.21.2
- Tailwind CSS 3.4.17
- Node.js 18+
- Gemini 2.0 Flash Experimental API

### Security
- Server-side API key storage
- CORS enabled
- Environment variable configuration
- No sensitive data in frontend bundle

### Documentation
- Complete README with features and setup
- Quick setup guide (SETUP.md)
- API documentation (docs/API.md)
- Architecture overview (docs/ARCHITECTURE.md)
- Contributing guidelines (CONTRIBUTING.md)
- Frequently asked questions (FAQ.md)
- Issue and PR templates

---

## Version History

### How to Read This Changelog

- **Added** - New features
- **Changed** - Changes to existing functionality
- **Deprecated** - Soon-to-be removed features
- **Removed** - Removed features
- **Fixed** - Bug fixes
- **Security** - Security improvements

### Versioning

We use Semantic Versioning (SemVer):
- **MAJOR** version: Incompatible API changes
- **MINOR** version: New functionality (backwards compatible)
- **PATCH** version: Bug fixes (backwards compatible)

### Links

- [GitHub Repository](https://github.com/filiksyos/manga-colorizer)
- [Issues](https://github.com/filiksyos/manga-colorizer/issues)
- [Pull Requests](https://github.com/filiksyos/manga-colorizer/pulls)
- [Releases](https://github.com/filiksyos/manga-colorizer/releases)