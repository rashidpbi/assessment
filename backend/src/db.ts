import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectDB = async () => {
  const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/sales-dashboard';
  
  // Mask URI for safe logging (shows host, hides credentials)
  const maskedUri = MONGODB_URI.includes('@') 
    ? `mongodb+srv://****@${MONGODB_URI.split('@')[1]}` 
    : MONGODB_URI;
    
  console.log(`Database connection attempt to: ${maskedUri}`);

  try {
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  }
};
