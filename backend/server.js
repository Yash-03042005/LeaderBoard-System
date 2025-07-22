// server.js
import dotenv from 'dotenv'
import connectDB from "./config/db.js";
import express from "express";
import cors from "cors";
import userRouter from './route/userRoutes.js';

// Load environment variables
dotenv.config()

// Initialize app
const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/user',userRouter)

// Connect to MongoDB and start the server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to MongoDB", err);
    process.exit(1);
  });
