# Deployment & Setup Guide

## Local Setup

### 1. Backend Service
```bash
cd backend
npm install
npm run seed  # Initialize MongoDB with labels and sales data
npm run dev   # Starts on port 5001
```

### 2. Frontend (BFF)
```bash
cd dashboard-app
npm install
npm run dev   # Starts on port 3000
```

## Environment Variables

### Backend (`backend/.env`)
- `PORT`: 5001
- `MONGODB_URI`: Your MongoDB connection string
- `NODE_ENV`: development/production

### Frontend (`dashboard-app/.env.local`)
- `BACKEND_URL`: http://localhost:5001 (URL of your Express backend)

## Deployment (Production)

### Backend (Railway/Render)
- Deploy the `backend` folder.
- Set `NODE_ENV=production`.
- Connect your MongoDB Atlas database.

### Frontend (Vercel)
- Deploy the `dashboard-app` folder.
- Set `BACKEND_URL` to your deployed backend URL.
- Ensure the BFF routes point to the correct internal/external backend address.

## Production Considerations
- **Security**: Add CORS restricted origins to the Express backend.
- **Caching**: Implement Redis for label caching if scaling to millions of hits.
- **Validation**: Add Zod schemas to BFF routes for input validation.
- **Logging**: Integrate Winston/Pino in the backend and Sentry in the frontend.
