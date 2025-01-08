import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";
import { useSelector } from "react-redux";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

const Chat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const matchId = JSON.parse(localStorage.getItem("match"))?.data._id;
  const user = useSelector((state) => state.user).user;
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      socket.emit("join_room", { room: matchId, username: user.name });

      const receiveMessageHandler = (data) => {
        setMessages((prevMessages) => [...prevMessages, data]);
      };

      socket.on("receive_message", receiveMessageHandler);

      fetchMessages();

      messageEndRef.current?.scrollIntoView({ behavior: "smooth" });

      return () => {
        socket.off("receive_message", receiveMessageHandler);
      };
    }
  }, [isOpen, matchId, user.name]);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/chat/${matchId}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      const data = response.data;
      if (Array.isArray(data)) {
        setMessages(data);

        messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
      } else {
        setMessages([]);
      }
    } catch (error) {
      console.error("Failed to fetch messages:", error);
      setMessages([]);
    }
  };

  const handleSend = async () => {
    if (message.trim()) {
      const messageData = {
        room: matchId,
        sender: user.name,
        message,
        time: new Date().toLocaleTimeString(),
      };
      try {
        await axios.post(
          `http://localhost:5000/api/chat/${matchId}`,
          {
            sender: user.name,
            message,
          },
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          },
        );

        socket.emit("send_message", messageData);
        setMessages((prevMessages) => [...prevMessages, messageData]);
        setMessage("");

        messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
      } catch (error) {
        console.error("Failed to send message:", error);
      }
    }
  };

  return (
    <div className="p-4">
      <button
        onClick={() => setIsOpen(true)}
        className="flex font-bold bg-green-400 text-white items-center gap-2 px-4 py-2 border border-gray-300 rounded-md"
      >
        <span>Chat</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-green-50 text-green-900 sm:max-w-[600px] w-full rounded-lg">
            <div className="p-4 border-b flex flex-row justify-between border-green-200">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 bg-gray-300 rounded-full flex items-center justify-center">
                  <img
                    src="https://static.vecteezy.com/system/resources/thumbnails/005/129/844/small_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg"
                    alt="User"
                    className="h-full w-full rounded-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-medium">{user.name}</div>
                  <div className="text-sm text-green-500">Online</div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)}>
                <IoClose size={24} />
              </button>
            </div>

            <div
              className="flex-1 overflow-y-auto p-4 space-y-4"
              style={{ maxHeight: "60vh" }}
            >
              {Array.isArray(messages) &&
                messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex items-start gap-4 ${msg.sender === user.name ? "justify-end" : ""}`}
                  >
                    {msg.sender !== user.name && (
                      <div className="h-8 w-8 bg-gray-300 rounded-full flex items-center justify-center">
                        <img
                          src="https://static.vecteezy.com/system/resources/thumbnails/005/129/844/small_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg"
                          alt="User"
                          className="h-full w-full rounded-full object-cover"
                        />
                      </div>
                    )}
                    <div
                      className={`rounded-lg p-3 text-sm ${msg.sender === user.name ? "bg-green-500 text-white" : "bg-green-100 text-green-900"}`}
                    >
                      <p>{msg.message}</p>
                      <div
                        className={`mt-2 text-xs ${msg.sender === user.name ? "text-green-200" : "text-green-500"}`}
                      >
                        {msg.time}
                      </div>
                    </div>
                    {msg.sender === user.name && (
                      <div className="h-8 w-8 bg-gray-300 rounded-full flex items-center justify-center">
                        <img
                          src="https://static.vecteezy.com/system/resources/thumbnails/005/129/844/small_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg"
                          alt="User"
                          className="h-full w-full rounded-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                ))}
              <div ref={messageEndRef} />
            </div>

            <div className="p-4 border-t border-green-200">
              <div className="flex w-full items-center gap-2">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 focus:outline-none p-2 border border-gray-300 rounded-md"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  autoFocus
                />
                <button
                  onClick={handleSend}
                  className="bg-green-500 text-white hover:bg-green-600 px-4 py-2 rounded-md"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
