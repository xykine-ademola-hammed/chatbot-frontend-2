"use client";

import { useState, useEffect } from "react";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const [conversationId, setConversationId] = useState(null); // Track current conversation ID

  const saveConversation = async () => {
    try {
      if (messages.length === 2 && !conversationId) {
        // Create a new conversation when messages.length === 2
        const response = await fetch(
          "http://localhost:8000/api/conversations/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ messages }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          setConversationId(data.id); // Save the conversation ID
        } else {
          throw new Error("Failed to create a new conversation.");
        }
      } else if (messages.length > 2 && conversationId) {
        // Update the existing conversation when messages.length > 2
        const response = await fetch(
          `http://localhost:8000/api/conversations/${conversationId}/`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ messages }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to update the conversation.");
        }
      }
    } catch (error) {
      console.error("Error saving conversation:", error);
    }
  };

  useEffect(() => {
    const ws = new WebSocket("ws://127.0.0.1:8001/ws/chat/");
    setSocket(ws);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      const newMessage = {
        message: data.message,
        sender: "bot",
      };

      console.log("======newMessage=======", newMessage);

      setMessages((prev) => [
        ...prev,
        { message: newMessage.message.message, sender: "bot" },
      ]);
    };

    return () => ws.close();
  }, []);

  useEffect(() => {
    // Save or update the conversation when messages change
    if (messages.length >= 2) {
      saveConversation();
    }
  }, [messages]); // Ensure messages are updated when saving

  const sendMessage = (userMessage) => {
    if (socket && userMessage.trim() !== "") {
      const userMessageObj = { message: userMessage, sender: "user" };

      // Send user message through WebSocket
      socket.send(JSON.stringify({ message: userMessage }));

      // Update the messages in state
      setMessages((prev) => [...prev, userMessageObj]);

      // Clear the input field
      setMessage("");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 border rounded-lg shadow-lg bg-white">
      <div className="h-64 overflow-y-auto mb-4 border p-2 rounded-lg bg-gray-100">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 mb-2 ${
              msg.sender === "user" ? "text-right" : "text-left"
            }`}
          >
            <strong>{msg.sender === "user" ? "You" : "Bot"}:</strong>{" "}
            {msg.message.message}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 p-2 border rounded-lg"
        />
        <button
          onClick={() => sendMessage(message)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
