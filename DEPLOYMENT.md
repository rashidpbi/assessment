# Deployment Guide

This document provides a practical roadmap for deploying the full-stack dashboard to production environments.

## 🔑 Environment Variables

Consistency in environment variables is critical for cross-service communication.

### Backend (Express)
| Variable | Description | Example |
| :--- | :--- | :--- |
| `PORT` | The port the server listens on | `5001` (Render/Railway set this automatically) |
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/db` |
| `NODE_ENV` | Environment mode | `production` |

### Frontend (Next.js / BFF)
| Variable | Description | Example |
| :--- | :--- | :--- |
| `BACKEND_URL` | Public URL of your Express API | `https://api-service.railway.app` |

---

## 🏗️ Deployment Steps

### 1. MongoDB Atlas Setup
1. Create a cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Under **Network Access**, allow access from `0.0.0.0/0` (or specific IPs of your deployment services).
3. Create a database user and copy the connection string.
4. Replace `<password>` in the string with your user's password.

### 2. Backend Deployment (Railway or Render)
We recommend **Railway** or **Render** for the Express backend.

1. **Root Directory**: Set the root directory to `backend`.
2. **Build Command**: `npm install`
3. **Start Command**: `npm start` (ensure `package.json` has a start script targeting `dist/server.js` or `ts-node`)
4. **Environment Variables**: Add `MONGODB_URI` and `NODE_ENV=production`.
5. **CORS**: Ensure `BACKEND_URL` is set to the frontend URL to avoid CORS blocks.

### 3. Frontend Deployment (Vercel)
Vercel is the optimal host for Next.js applications.

1. **Framework Preset**: Next.js
2. **Root Directory**: Set to `dashboard-app`.
3. **Environment Variables**: Add `BACKEND_URL` pointing to your deployed Backend Service.
4. **Build Settings**: Standard Next.js build settings (`npm run build`).

---

## 📡 Production Communication

In production, the architecture operates as follows:
1. **Client-Side**: The browser interacts with Next.js API Routes (BFF) at `/api/*`.
2. **BFF-Side**: The Next.js server makes server-to-server requests to the **Backend Service** using the `BACKEND_URL` environment variable.

---

## ⚠️ Troubleshooting & Pitfalls

### 1. Mixed Content Errors
Ensure your `BACKEND_URL` uses `https://`. Browsers will block requests from an `https://` Vercel site to an `http://` backend.

### 2. CORS Policy Blocks
If you see CORS errors in the browser console, double-check that your Backend's `ALLOWED_ORIGINS` includes your Vercel deployment URL (including the `https://` prefix).

### 3. 504 Gateway Timeouts
Next.js API routes on Vercel have a default timeout (usually 10-15s). If your backend is sleeping (on a free tier) and takes too long to wake up, the BFF request will fail. **Solution**: Use a "Keep-Alive" ping or upgrade to a paid tier for high-availability.

### 4. Database Connectivity
Commonly caused by Atlas IP Whitelisting. Ensure your deployment provider's IP range is allowed in the Atlas dashboard.
