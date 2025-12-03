# Frequently Asked Questions (FAQ)

## General Questions

### What is Manga Colorizer?

Manga Colorizer is a free, open-source web application that uses Google's Gemini 2.5 Flash AI to automatically colorize black & white manga images. Upload a manga page, and the AI will add vibrant colors while preserving the original artwork.

### Is it really free?

Yes! The application is free and open-source. You just need a free Google Gemini API key to use it. Google provides a generous free tier that allows 1,500 requests per day.

### Do I need to create an account?

No! Manga Colorizer requires no authentication or user accounts. Just upload your manga and start colorizing immediately.

### Is my data stored anywhere?

No. The application is completely stateless - no images or data are saved to any database. Everything happens in your browser and the AI processing happens on Google's servers temporarily.

## Technical Questions

### What image formats are supported?

- JPEG (.jpg, .jpeg)
- PNG (.png)
- WebP (.webp)

Most common image formats work fine.

### What's the maximum image size?

- **Recommended:** Under 5MB for faster processing
- **Maximum:** 10MB (Gemini API limit)

Larger images may take longer to process and could fail.

### How long does colorization take?

Typically 5-15 seconds depending on:
- Image size and complexity
- Server load
- Your internet connection
- API response time

### Can I colorize multiple images at once?

Currently, no. The MVP supports one image at a time. Batch processing is a planned feature for future versions.

### What browsers are supported?

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Opera 76+

Basically any modern browser with ES6+ support.

## API & Setup Questions

### How do I get a Gemini API key?

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Get API Key" or "Create API Key"
4. Copy the key
5. Add it to your `.env` file as `GEMINI_API_KEY=your_key_here`

### Is the Gemini API key really free?

Yes! Google's free tier includes:
- 1,500 requests per day
- 15 requests per minute
- 1,000,000 tokens per minute

This is more than enough for personal use and testing.

### What happens if I exceed the free tier?

The API will return a 429 (rate limit) error. You'll need to wait until the next day or upgrade to a paid plan (if available).

### Why doesn't the API key work in the frontend?

For security! API keys should NEVER be exposed in frontend code. The backend (Express server) keeps your API key secret and acts as a secure proxy to the Gemini API.

### Can I use a different AI model?

Currently, the app is built for Gemini 2.0 Flash Experimental. Supporting other models would require code modifications to the `imageUtils.ts` file and `api-server.js`.

## Usage Questions

### What kind of manga works best?

- Clear, high-contrast black & white manga
- Standard Japanese manga style
- Clean scans or drawings
- Single pages or panels

Complex or low-quality images may not colorize as well.

### Can I colorize Western comics?

Yes! While optimized for manga, it works with any black & white comic art style.

### Can I adjust the colors?

Not in the current MVP. The AI chooses colors automatically. Custom color palettes are a planned feature.

### Can I save my colorization history?

Not currently - there's no database or user accounts. Download your colorized images to save them locally.

### Can I edit the colorized result?

Not in the app itself. Download the image and use external editing software like Photoshop, GIMP, or Krita.

## Troubleshooting

### "API key not configured" error

**Solutions:**
1. Make sure `.env` file exists in the root directory
2. Check the key name is `GEMINI_API_KEY` (NOT `VITE_GEMINI_API_KEY`)
3. Restart the server after creating/editing `.env`
4. Verify no spaces or quotes around the key

### "Failed to colorize manga" error

**Possible causes:**
1. Image too large (>10MB)
2. Invalid image format
3. API rate limit exceeded
4. Network connection issues
5. Invalid API key

**Solutions:**
- Resize/compress the image
- Convert to JPEG or PNG
- Wait a few minutes and try again
- Check browser console for detailed errors

### Colors look weird or unrealistic

**Why:**
- AI makes best guesses based on context
- Low-quality source images
- Unusual art styles
- Complex scenes

**Solutions:**
- Try a higher quality scan
- Use cleaner line art
- Try again (AI results can vary slightly)

### App is slow or not responding

**Possible causes:**
1. Large image file
2. Slow internet connection
3. Server overload
4. Browser issues

**Solutions:**
- Compress the image first
- Check your internet speed
- Refresh the page and try again
- Try a different browser

### Cannot download the result

**Solutions:**
1. Check browser download permissions
2. Try right-click > "Save image as..."
3. Check available disk space
4. Disable browser extensions temporarily

## Deployment Questions

### Can I deploy this myself?

Absolutely! It's open-source. See [SETUP.md](SETUP.md) for local setup and [README.md](README.md) for deployment options.

### How do I deploy to Heroku?

```bash
heroku create my-manga-colorizer
heroku config:set GEMINI_API_KEY=your_key_here
git push heroku main
```

See the README for more details.

### Does it work on Vercel/Netlify?

Yes, but you may need to adapt the backend API to serverless functions. Configuration files are included (`vercel.json`, `netlify.toml`).

### What about Docker?

Docker support is not included in the MVP but can easily be added. Create a `Dockerfile`:

```dockerfile
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build:local
EXPOSE 8082
CMD ["npm", "start"]
```

## Contributing Questions

### Can I contribute to this project?

Yes please! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### I found a bug, what should I do?

Open an issue on GitHub with:
- Clear description
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Your environment (OS, browser, Node version)

### I have a feature idea!

Awesome! Open a feature request issue with:
- Description of the feature
- Use case/problem it solves
- How you envision it working
- Any mockups or examples

### How can I add a new feature?

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

See [CONTRIBUTING.md](CONTRIBUTING.md) for details.

## Legal & Privacy

### Who owns the colorized images?

You do! The app doesn't claim any rights to your images. However, note that:
- Original manga is copyrighted by its creators
- Using copyrighted material may require permission
- This is for personal/educational use

### Is it legal to colorize copyrighted manga?

**Disclaimer:** This is not legal advice. Generally:
- **Personal use:** Usually okay
- **Sharing online:** May violate copyright
- **Commercial use:** Likely requires permission

Respect the original creators and copyright laws in your jurisdiction.

### What data does the app collect?

None! The app:
- Doesn't use cookies
- Doesn't track users
- Doesn't store images
- Doesn't require accounts
- Doesn't collect analytics (by default)

Your images are only sent to Google's Gemini API for processing and are not stored.

### What about Google's data policies?

When you use the Gemini API, Google's terms apply:
- Images sent to API may be temporarily stored for processing
- Google may use data to improve their models
- Read Google's privacy policy and terms of service

## Performance

### Why is it slow sometimes?

- Large images take longer to process
- API rate limits may throttle requests
- Network latency affects speed
- AI processing is computationally intensive

### Can I make it faster?

**Tips:**
1. Use smaller images (compress first)
2. Use faster internet connection
3. Deploy closer to Google's servers
4. Implement caching for repeated images

### How much does it cost to run?

**Free tier:**
- Frontend: Can be hosted free (Vercel, Netlify)
- Backend: Free tier on Heroku, Railway, Render
- API: Google Gemini free tier (1,500/day)

**Total: $0** for personal use!

## Future Features

### What features are planned?

- Batch processing multiple images
- Custom color palettes
- Style transfer options
- Image history/gallery
- User accounts (optional)
- Mobile app
- Advanced editing tools
- More AI models

See GitHub issues for full roadmap.

### When will feature X be added?

This is an open-source project maintained by volunteers. Features are added when:
- Contributors have time
- Community requests them
- Someone submits a PR

Want it sooner? Consider contributing!

## Still Have Questions?

- Check the [README](README.md)
- Read the [Setup Guide](SETUP.md)
- Browse [Documentation](docs/)
- Open a [GitHub Discussion](https://github.com/filiksyos/manga-colorizer/discussions)
- Create an [Issue](https://github.com/filiksyos/manga-colorizer/issues)

---

**Happy colorizing!** 🎨✨