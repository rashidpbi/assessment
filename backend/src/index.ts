import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './db';
import labelRoutes from './routes/labelRoutes';
import salesRoutes from './routes/salesRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/labels', labelRoutes);
app.use('/api/sales', salesRoutes);

// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Backend service running on port ${PORT}`);
  });
};

startServer();
