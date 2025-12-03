# Architecture Documentation

## Overview

Manga Colorizer is a full-stack web application that uses AI to colorize black & white manga images.

## Tech Stack

### Frontend
- **Framework:** React 18
- **Language:** TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui (Radix UI primitives)
- **Icons:** Lucide React
- **Routing:** React Router DOM
- **State Management:** React Hooks + Context (minimal)

### Backend
- **Runtime:** Node.js 18+
- **Framework:** Express.js
- **API Integration:** Google Gemini 2.5 Flash
- **CORS:** cors middleware
- **Environment:** dotenv

### AI/ML
- **Model:** Google Gemini 2.0 Flash Experimental
- **Task:** Image-to-image colorization
- **Input:** Black & white manga images
- **Output:** Colorized manga images

## Project Structure

```
manga-colorizer/
├── .github/                 # GitHub configuration
│   ├── ISSUE_TEMPLATE/     # Issue templates
│   ├── workflows/          # CI/CD workflows (optional)
│   └── FUNDING.yml         # Sponsorship links
├── docs/                    # Documentation
│   ├── API.md              # API documentation
│   └── ARCHITECTURE.md     # This file
├── public/                  # Static assets
│   └── favicon.svg         # App icon
├── screenshots/             # App screenshots
├── src/                     # Frontend source code
│   ├── components/         # React components
│   │   ├── ui/             # shadcn/ui components
│   │   ├── ColorizerHeader.tsx
│   │   ├── MangaUploader.tsx
│   │   └── PreviewArea.tsx
│   ├── hooks/              # Custom React hooks
│   │   ├── use-mobile.tsx
│   │   └── use-toast.ts
│   ├── lib/                # Utility libraries
│   │   └── utils.ts
│   ├── pages/              # Page components
│   │   ├── Index.tsx
│   │   └── NotFound.tsx
│   ├── utils/              # Helper functions
│   │   └── imageUtils.ts   # Image processing
│   ├── App.tsx             # Root component
│   ├── main.tsx            # Entry point
│   └── index.css           # Global styles
├── api-server.js            # Express backend
├── package.json             # Dependencies
├── vite.config.ts           # Vite configuration
├── tailwind.config.ts       # Tailwind configuration
├── tsconfig.json            # TypeScript configuration
└── .env.example             # Environment template
```

## Application Flow

### 1. User Upload
```
User -> MangaUploader Component
  -> File input / Drag & drop
  -> FileReader API
  -> Convert to base64 data URL
```

### 2. Colorization Request
```
Index Page
  -> colorizeImage(imageData)
  -> POST /api/colorize
  -> Express Backend
  -> Gemini API
  -> Response with colorized image
```

### 3. Display Result
```
Colorized Image
  -> Set state in Index component
  -> Render side-by-side comparison
  -> Enable download option
```

## Component Architecture

### Page Components

#### `Index.tsx`
Main application page with:
- State management for images
- Upload handler
- Processing state
- Result display
- Download functionality

#### `NotFound.tsx`
Fallback for unknown routes.

### Feature Components

#### `ColorizerHeader.tsx`
- App branding
- Navigation
- GitHub link

#### `MangaUploader.tsx`
- File upload interface
- Drag & drop support
- File validation
- Base64 conversion

#### `PreviewArea.tsx`
- Image display
- Before/after comparison
- Responsive layout

### UI Components

All from shadcn/ui:
- `Button` - Action buttons
- `Toast` - Notifications
- `Tooltip` - Helpful hints

## Backend Architecture

### Express Server (`api-server.js`)

```javascript
app.use(cors())              // Enable CORS
app.use(express.json())      // Parse JSON bodies
app.use(express.static())    // Serve frontend

POST /api/colorize          // Colorization endpoint
GET *                       // SPA fallback
```

### Security Model

**API Key Protection:**
```
┌────────────────┐
│   Frontend      │  (No API key)
└─────┬──────────┘
     │ /api/colorize
┌─────┴──────────┐
│   Backend       │  (Has API key)
└─────┬──────────┘
     │ Gemini API
┌─────┴──────────┐
│  Google AI     │
└────────────────┘
```

## State Management

### Local Component State

Using React `useState` hook:
- `originalImage` - Uploaded manga image
- `colorizedImage` - AI-generated result
- `isProcessing` - Loading state
- `showResult` - Display mode

### Global State

Minimal - no global state needed for MVP.

Future: Consider adding for:
- User preferences
- Processing history
- Settings

## Data Flow

### Image Processing Pipeline

```
1. Upload
   ↓
2. Validate (type, size)
   ↓
3. Convert to base64
   ↓
4. Send to API
   ↓
5. Gemini processes
   ↓
6. Receive colorized image
   ↓
7. Display result
   ↓
8. Enable download
```

## API Integration

### Gemini API Request

```typescript
POST https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent

{
  contents: [{
    parts: [
      { text: "Colorize this manga..." },
      { inline_data: { mime_type, data } }
    ]
  }]
}
```

### Response Handling

```typescript
if (response.ok) {
  const data = await response.json();
  const imagePart = data.candidates[0].content.parts
    .find(p => p.inline_data);
  return imagePart.inline_data.data;
}
```

## Build & Deployment

### Development
```bash
npm run dev          # Frontend only (Vite)
node api-server.js   # Backend only
```

### Production
```bash
npm run build:local  # Build frontend -> dist/
npm start            # Serve frontend + backend
```

### Deployment Targets

- **Heroku:** Native support with Procfile
- **Vercel:** Use vercel.json config
- **Netlify:** Use netlify.toml config
- **Railway:** Docker or Node.js buildpack
- **Render:** Native Node.js support

## Performance Considerations

### Frontend
- Code splitting (Vite automatic)
- Lazy loading components
- Image optimization
- Debounced uploads

### Backend
- Request/response streaming
- Compression middleware
- Caching headers
- Rate limiting

### API
- Optimize image size before sending
- Use appropriate quality settings
- Handle timeouts gracefully
- Implement retry logic

## Scalability

### Current Limitations
- Single API key (shared rate limit)
- No request queuing
- No result caching
- No user sessions

### Future Improvements
- Multiple API keys (load balancing)
- Redis for caching results
- Job queue for processing
- User accounts & history
- CDN for static assets

## Security Considerations

### Current Implementation
- ✅ API key on server-side only
- ✅ CORS enabled
- ✅ Environment variables
- ✅ No sensitive data in frontend

### Production Recommendations
- Add rate limiting
- Implement CSRF protection
- Add input validation
- Use HTTPS only
- Set security headers
- Monitor for abuse

## Testing Strategy

### Manual Testing
- Upload various manga images
- Test different file sizes
- Try different browsers
- Test mobile responsiveness

### Automated Testing (Future)
- Unit tests (Jest + React Testing Library)
- Integration tests (Playwright)
- E2E tests (Cypress)
- API tests (Supertest)

## Monitoring & Logging

### Current Logging
- Request timestamps
- API errors
- Server startup

### Future Monitoring
- Application Performance Monitoring (APM)
- Error tracking (Sentry)
- Analytics (Google Analytics)
- API usage metrics

## Dependencies

### Critical Dependencies
- `react` - UI framework
- `express` - Backend server
- `vite` - Build tool
- `tailwindcss` - Styling

### UI Libraries
- `@radix-ui/*` - Headless UI primitives
- `lucide-react` - Icons

### Development
- `typescript` - Type safety
- `eslint` - Code linting
- `@vitejs/plugin-react-swc` - Fast builds

## Future Architecture

### Potential Enhancements

1. **Microservices**
   - Separate colorization service
   - Image processing service
   - User management service

2. **Database Integration**
   - Save colorization history
   - User preferences
   - Image gallery

3. **Advanced Features**
   - Batch processing
   - Custom color palettes
   - Style transfer
   - Image editing tools

4. **Infrastructure**
   - Docker containers
   - Kubernetes orchestration
   - Load balancing
   - Auto-scaling

## Contributing

See [CONTRIBUTING.md](../CONTRIBUTING.md) for architecture modification guidelines.