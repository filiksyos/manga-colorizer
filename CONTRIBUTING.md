# Contributing to Manga Colorizer

Thank you for your interest in contributing! 🎉

We welcome contributions of all kinds: bug fixes, new features, documentation improvements, and more.

## 🐛 Reporting Bugs

Before creating a bug report:
1. Check the [existing issues](https://github.com/filiksyos/manga-colorizer/issues)
2. Update to the latest version
3. Try to reproduce with a minimal test case

### Bug Report Template

```markdown
**Describe the bug**
A clear description of what the bug is.

**To Reproduce**
1. Go to '...'
2. Click on '...'
3. Upload image '...'
4. See error

**Expected behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment:**
- OS: [e.g. macOS, Windows, Linux]
- Browser: [e.g. Chrome 120, Safari 17]
- Node version: [e.g. 18.17.0]
- App version/commit: [e.g. v1.0.0 or commit hash]

**Additional context**
Any other relevant information.
```

## ✨ Suggesting Features

We love new ideas! Before suggesting:
1. Check if it's already been suggested
2. Consider if it fits the project's scope
3. Think about implementation complexity

### Feature Request Template

```markdown
**Feature Description**
Clear description of the feature.

**Use Case**
Why is this feature useful? Who would use it?

**Proposed Solution**
How might this work?

**Alternatives**
Other approaches you've considered.

**Additional context**
Mockups, examples, or references.
```

## 🛠️ Development Setup

1. **Fork the repository**
   ```bash
   # Click "Fork" on GitHub, then:
   git clone https://github.com/YOUR_USERNAME/manga-colorizer.git
   cd manga-colorizer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment**
   ```bash
   cp .env.example .env
   # Add your GEMINI_API_KEY to .env
   ```

4. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

5. **Run in development mode**
   ```bash
   # Terminal 1: Backend
   node api-server.js
   
   # Terminal 2: Frontend
   npm run dev
   ```

## 📝 Code Style

- **TypeScript**: Use TypeScript for type safety
- **React**: Functional components with hooks
- **Formatting**: Follow existing code style
- **Naming**: 
  - Components: PascalCase (e.g., `MangaUploader`)
  - Functions: camelCase (e.g., `colorizeImage`)
  - Files: Match component names (e.g., `MangaUploader.tsx`)

### ESLint

Run the linter before committing:
```bash
npm run lint
```

## ✅ Pull Request Process

1. **Update your fork**
   ```bash
   git remote add upstream https://github.com/filiksyos/manga-colorizer.git
   git fetch upstream
   git merge upstream/main
   ```

2. **Make your changes**
   - Write clear, concise commit messages
   - Test your changes thoroughly
   - Update documentation if needed

3. **Test everything**
   ```bash
   # Build production version
   npm run build:local
   
   # Test the built app
   npm start
   ```

4. **Commit with clear messages**
   ```bash
   git add .
   git commit -m "feat: add batch processing for multiple manga pages"
   # or
   git commit -m "fix: resolve image upload on Safari"
   ```

   Commit message prefixes:
   - `feat:` New feature
   - `fix:` Bug fix
   - `docs:` Documentation changes
   - `style:` Code style/formatting
   - `refactor:` Code refactoring
   - `test:` Adding tests
   - `chore:` Maintenance tasks

5. **Push and create PR**
   ```bash
   git push origin feature/your-feature-name
   ```
   Then open a Pull Request on GitHub.

### PR Guidelines

- **Title**: Clear and descriptive
- **Description**: Explain what and why
- **Link issues**: Use "Fixes #123" or "Closes #123"
- **Screenshots**: Include for UI changes
- **Testing**: Describe how you tested

## 🎯 Good First Issues

Looking for a place to start? Check issues labeled:
- `good first issue`
- `help wanted`
- `documentation`

## 📚 Documentation

Documentation improvements are always welcome:
- Fix typos
- Clarify confusing sections
- Add examples
- Translate to other languages
- Improve setup guides

## 🤝 Code of Conduct

### Our Standards

- Be respectful and inclusive
- Welcome newcomers
- Accept constructive criticism gracefully
- Focus on what's best for the community
- Show empathy towards others

### Unacceptable Behavior

- Harassment or discrimination
- Trolling or insulting comments
- Personal or political attacks
- Publishing others' private information
- Other unprofessional conduct

## 💬 Questions?

Not sure about something?
- Open a [Discussion](https://github.com/filiksyos/manga-colorizer/discussions)
- Ask in an issue
- Check existing documentation

## 🎉 Recognition

Contributors will be:
- Listed in release notes
- Added to the Contributors section
- Credited in the README (for significant contributions)

---

Thank you for contributing to Manga Colorizer! 🎨✨