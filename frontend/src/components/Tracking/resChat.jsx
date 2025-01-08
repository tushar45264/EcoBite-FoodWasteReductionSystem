import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

const socket = io('http://localhost:3001');

const Chat = () => {
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [joinedRoom, setJoinedRoom] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.off('receive_message');
    };
  }, []);

  const joinRoom = async () => {
    if (room && username) {
      socket.emit('join_room', { room, username });
      setJoinedRoom(true);

      try {
        const response = await axios.get(`http://localhost:5000/api/chat/${room}`);
        setMessages(response.data);
      } catch (error) {
        console.error('Failed to fetch messages:', error);
      }
    }
  };

  const sendMessage = () => {
    if (message && room && username) {
      const messageData = {
        room,
        sender: username,
        message,
      };
      socket.emit('send_message', messageData);
      setMessages((prevMessages) => [...prevMessages, messageData]);
      setMessage('');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {!joinedRoom ? (
        <div className="flex flex-col items-center p-5 bg-white shadow-md rounded-lg">
          <input
            type="text"
            placeholder="Username"
            className="mb-2 p-2 border rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            placeholder="Room ID"
            className="mb-2 p-2 border rounded"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          />
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={joinRoom}
          >
            Join Room
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center p-5 bg-white shadow-md rounded-lg">
          <div className="w-full mb-4 p-2 border rounded overflow-y-auto h-64">
            {messages.map((msg, index) => (
              <div key={index} className="mb-2">
                <strong>{msg.sender}: </strong> {msg.message}
              </div>
            ))}
          </div>
          <input
            type="text"
            placeholder="Message"
            className="mb-2 p-2 border rounded w-full"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={sendMessage}
          >
            Send Message
          </button>
        </div>
      )}
    </div>
  );
};

export default Chat;
