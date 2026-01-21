# Sales & Revenue Analytics Dashboard

A professional, full-stack analytics dashboard featuring a unique **Shared Editable Labels System**. This project demonstrates scalable architecture, real-time responsive UI, and a sophisticated approach to shared data management.

## 🚀 Purpose & Problem Statement

Modern dashboards often struggle with static UI labels that require code changes for simple text updates. This project solves that by implementing an **Editable Shared Labels System**.

### The Problem
- Localizing or customizing UI text across multiple pages usually requires developer intervention.
- Renaming a shared label (e.g., "Region" to "Market") can have unintended ripple effects across different components if not tracked correctly.

### The Solution
A centralized label management system where:
- Users can edit any tracked UI label in real-time.
- The system automatically detects when a label is shared across multiple views.
- Updates are persisted globally, ensuring UI consistency across the entire application.

---

## 🏗️ Architecture

The application follows a clean, decoupled architecture optimized for performance and scalability:

- **Frontend (Next.js 15)**: A responsive React application using the App Router.
- **BFF (Backend-for-Frontend)**: Next.js API Routes act as a mid-layer for secure data orchestration and label state management.
- **Backend (Node.js/Express)**: A dedicated microservice for heavy aggregation, analytics processing, and MongoDB interaction.
- **Database (MongoDB)**: Persists sales data and the dynamic label registry.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [Next.js 15](https://nextjs.org/) (TypeScript)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + [Shadcn UI](https://ui.shadcn.com/)
- **Charts**: [Apache ECharts](https://echarts.apache.org/) (via `echarts-for-react`)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand) (with persistence middleware)
- **Icons**: Lucide React

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (via Mongoose)
- **Validation**: Schema-based validation for analytics data

---

## 🏷️ Editable Labels System

This system allows UI elements (titles, table headers, labels) to be edited directly in the interface.

- **Detection**: When an item is marked as "shared," the system alerts the user that editing it will update all occurrences of that label across the app.
- **Persistence**: Label changes are synced immediately to the backend and cached via Zustand on the client for zero-latency UI updates in subsequent sessions.
- **Resilience**: Integrated error handling ensures the UI stays functional even if the labels API is temporarily unavailable.

---

## 💻 Local Setup

### Prerequisites
- Node.js (v18+)
- MongoDB (Local or Atlas URI)

### 1. Clone & Install
```bash
git clone <repo-url>
cd assessment
npm install # if using a root workspace, otherwise install in subfolders
```

### 2. Environment Variables
Create `.env` files in both the `backend` and `dashboard-app` directories as per their specific requirements (refer to `DEPLOYMENT.md` for specific keys).

### 3. Start Development
```bash
# Start Backend (Express)
cd backend
npm run dev

# Start Frontend (Next.js)
cd ../dashboard-app
npm run dev
```

---

## 🛳️ Deployment

For detailed production deployment instructions, environment variable configurations, and security best practices, please refer to the dedicated documentation:

👉 **[DEPLOYMENT.md](file:///home/rashid/work/Projects/assessment/DEPLOYMENT.md)**

---

## 📄 License
Assessment Project - All rights reserved.
