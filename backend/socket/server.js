import https from 'https';
import { Server } from 'socket.io';
import express from 'express';
import Chat from '../models/Chat.js';

const app = express();
const server = https.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const users = {};

export const getSocketId = (id) => {
  return users[id];
};

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);
  
  socket.on("join_room", async ({ room, username }) => {
    if (username) {
      users[username] = socket.id;
    }
    socket.join(room);
  
    // Ensure the room exists in the database
    let chat = await Chat.findOne({ room });
    if (!chat) {
      chat = new Chat({ room, messages: [] });
      await chat.save();
    }
  });
  
  socket.on("send_message", async (data) => {
    const { room, sender, message } = data;
  
    // Add the message to the database
    await Chat.updateOne(
      { room },
      { $push: { messages: { sender, message, timestamp: new Date() } } }
    );
  
    io.to(room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    for (let user in users) {
      if (users[user] === socket.id) {
        delete users[user];
        break;
      }
    }
  });
});

export { app, server, io };
