# API Documentation

## Backend API Endpoints

### POST `/api/colorize`

Colorize a black & white manga image using Gemini 2.5 Flash Image API.

#### Request

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "contents": [{
    "parts": [
      {
        "text": "Colorize this black and white manga image..."
      },
      {
        "inline_data": {
          "mime_type": "image/jpeg",
          "data": "base64_encoded_image_data"
        }
      }
    ]
  }],
  "generationConfig": {
    "temperature": 0.4,
    "topK": 32,
    "topP": 1,
    "maxOutputTokens": 4096
  }
}
```

#### Response

**Success (200 OK):**
```json
{
  "candidates": [{
    "content": {
      "parts": [{
        "inline_data": {
          "mime_type": "image/png",
          "data": "base64_encoded_colorized_image"
        }
      }]
    }
  }]
}
```

**Error (4xx/5xx):**
```json
{
  "error": "Error message description"
}
```

#### Error Codes

- `500` - API key not configured
- `500` - Failed to colorize image
- `400` - Invalid request format
- `401` - Invalid API key
- `429` - Rate limit exceeded

## Frontend API Utils

### `colorizeImage(imageData: string): Promise<string>`

Colorize a manga image.

**Parameters:**
- `imageData` (string): Base64-encoded image data or data URL

**Returns:**
- Promise that resolves to a data URL of the colorized image

**Throws:**
- Error if colorization fails

**Example:**
```typescript
import { colorizeImage } from '@/utils/imageUtils';

try {
  const colorized = await colorizeImage(originalImageData);
  console.log('Colorized image:', colorized);
} catch (error) {
  console.error('Failed to colorize:', error);
}
```

### `imageToBase64(imageUrl: string): Promise<string>`

Convert image URL to base64.

**Parameters:**
- `imageUrl` (string): Image URL or data URL

**Returns:**
- Promise that resolves to base64 string (without data URL prefix)

**Example:**
```typescript
import { imageToBase64 } from '@/utils/imageUtils';

const base64 = await imageToBase64('https://example.com/image.jpg');
```

## Environment Variables

### Server-side (Backend)

#### `GEMINI_API_KEY` (Required)
Google Gemini API key for image generation.

**Example:**
```bash
GEMINI_API_KEY=AIzaSy...
```

**Get your key:**
https://aistudio.google.com/app/apikey

**Security:**
- Never use `VITE_` prefix (would expose to frontend)
- Keep in `.env` file (not committed to git)
- Use environment variables in production

#### `PORT` (Optional)
Server port number.

**Default:** `8082`

**Example:**
```bash
PORT=3000
```

## Rate Limits

### Gemini API Free Tier

- **Requests per minute (RPM):** 15
- **Requests per day (RPD):** 1,500
- **Tokens per minute (TPM):** 1,000,000

### Recommendations

- Implement client-side rate limiting
- Add loading states for better UX
- Handle rate limit errors gracefully
- Consider caching results

## Security

### API Key Protection

✅ **Secure Pattern (Current Implementation):**
```
Frontend -> /api/colorize -> Backend -> Gemini API
                               (with API key)
```

❌ **Insecure Pattern (Avoid):**
```
Frontend -> Gemini API (with exposed API key)
```

### CORS Configuration

The backend allows CORS for development. In production:

```javascript
app.use(cors({
  origin: 'https://your-domain.com',
  credentials: true
}));
```

### Content Security Policy

Consider adding CSP headers in production:

```javascript
app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; img-src 'self' data: blob:;"
  );
  next();
});
```

## Performance Optimization

### Image Size Limits

- **Recommended:** < 5MB
- **Maximum:** 10MB (Gemini API limit)

### Compression

Consider compressing images before sending:

```typescript
const compressImage = async (file: File): Promise<string> => {
  // Implement image compression logic
  // Using canvas or libraries like browser-image-compression
};
```

### Caching

Implement caching for repeated requests:

```typescript
const cache = new Map<string, string>();

const getCachedOrColorize = async (imageData: string) => {
  const hash = await hashImage(imageData);
  if (cache.has(hash)) {
    return cache.get(hash);
  }
  const result = await colorizeImage(imageData);
  cache.set(hash, result);
  return result;
};
```

## Monitoring

### Logging

The backend logs:
- Request timestamps
- API key availability
- Errors with full stack traces

### Metrics to Track

- Request count
- Success/failure rate
- Average processing time
- Error types and frequency
- API quota usage

## Troubleshooting

### Common Issues

**"API key not configured"**
- Check `.env` file exists
- Verify `GEMINI_API_KEY` is set (not `VITE_GEMINI_API_KEY`)
- Restart server after env changes

**"Failed to colorize manga"**
- Check image size (< 10MB)
- Verify image format (JPG, PNG, WebP)
- Check API quota limits
- Inspect browser console for details

**"No image data in response"**
- API may have returned text instead of image
- Check Gemini API response format
- Verify model supports image output

## Future Enhancements

### Planned API Features

- [ ] Batch colorization endpoint
- [ ] Custom color palette selection
- [ ] Style transfer options
- [ ] Image quality settings
- [ ] Progress tracking for long operations
- [ ] WebSocket support for real-time updates

### API Versioning

Future versions may use:
- `/api/v1/colorize`
- `/api/v2/colorize`

Current version is considered v1 (unversioned).