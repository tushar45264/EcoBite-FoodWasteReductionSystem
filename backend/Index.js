import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import donationRoutes from './routes/donationRoutes.js';
import matchRoutes from './routes/matchRoutes.js';
import locationRoutes from './routes/locationRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import { app, server, io } from './socket/server.js';

dotenv.config();

const Port = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("Connected to MongoDB");
})
.catch((err) => {
  console.error("Failed to connect to MongoDB:", err);
});

app.use('/api', authRoutes);
app.use('/api', donationRoutes);
app.use('/api', matchRoutes);
app.use('/api', locationRoutes);
app.use('/api', chatRoutes);

server.listen(Port, () => {
  console.log(`Server is running on port ${Port}`);
});
