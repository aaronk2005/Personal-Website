# Aaron Kleiman's Portfolio Website

Modern glassmorphism portfolio website built with React, Vite, and TypeScript.

## Development

### Prerequisites
- Node.js (v18+)
- npm

### Setup
1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
   - Copy `.env.example` to `.env.local`
   - Copy `.env.server.example` to `.env.server` and add your API keys

3. Run development servers:
```bash
npm run dev:all
```

This starts:
- Frontend: http://localhost:3005
- Backend API: http://localhost:3001

### Scripts
- `npm run dev` - Start frontend only
- `npm run server` - Start backend only
- `npm run dev:all` - Start both frontend and backend
- `npm run build` - Build for production

## Production Deployment

### Backend (Render/Railway/Fly.io)
1. Deploy the backend server
2. Set environment variables from `.env.server`
3. Note your backend URL

### Frontend (Vercel)
1. Set environment variable: `VITE_API_URL=<your-backend-url>`
2. Deploy

## Features
- Interactive AaronGPT chatbot (powered by OpenAI)
- Contact form with EmailJS integration
- Glassmorphism design
- Fully responsive
- Secure API architecture

## Security
All sensitive credentials (OpenAI API key, EmailJS credentials) are stored server-side only and never exposed to the client.
