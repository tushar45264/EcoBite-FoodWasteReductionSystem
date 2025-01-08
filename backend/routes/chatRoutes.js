import express from 'express';
import Chat from '../models/Chat.js';
import authMiddleware from '../middleware/authMiddleware.js';
import { getSocketId, io } from '../socket/server.js';

const router = express.Router();

router.get('/chat/:room', authMiddleware, async (req, res) => {
  const { room } = req.params;
  try {
    const chat = await Chat.findOne({ room });
    if (!chat) {
      return res.status(404).json({ message: 'Room not found' });
    }
    res.json(chat.messages);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/chat/:room', authMiddleware, async (req, res) => {
  const { room } = req.params;
  const { sender, message } = req.body;
  try {
    let chat = await Chat.findOne({ room });
    if (!chat) {
      chat = new Chat({ room, messages: [] });
    }
    chat.messages.push({ sender, message, timestamp: new Date() });
    await chat.save();
    
    const receiverSocketId = getSocketId(sender);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit('receive_message', { sender, message });
    }

    res.json({ message: 'Message sent' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
