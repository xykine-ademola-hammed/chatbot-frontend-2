"use client";

import { useState, useEffect } from "react";
import axios from "axios";

const Conversations = () => {
  const [conversations, setConversations] = useState([]); // Store conversations
  const [loading, setLoading] = useState(false); // Track loading state
  const [error, setError] = useState(null); // Track errors
  const [expandedConversation, setExpandedConversation] = useState(null); // Track which conversation is expanded

  // Fetch conversations from the API
  const fetchConversations = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:8000/api/conversations/",
        {
          headers: {
            Accept: "application/json", // Explicitly request JSON
          },
        }
      );

      setConversations(response.data); // Store conversations in state
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConversations();
  }, []);

  const toggleAccordion = (id) => {
    setExpandedConversation((prev) => (prev === id ? null : id));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Manage Conversations</h1>

      {/* Loading and Error Messages */}
      {loading && <p>Loading conversations...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="space-y-4">
        {conversations.map((conv) => (
          <div key={conv.id} className="p-4 border rounded-md shadow-md">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="font-semibold">Conversation ID: {conv.id}</h2>
                <p>Messages: {conv.messages.length}</p>
              </div>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => toggleAccordion(conv.id)}
              >
                {expandedConversation === conv.id
                  ? "Hide Details"
                  : "View Details"}
              </button>
            </div>

            {/* Accordion for Messages */}
            {expandedConversation === conv.id && (
              <div className="mt-4 space-y-2">
                {conv.messages.length === 0 ? (
                  <p className="text-gray-500">No messages available.</p>
                ) : (
                  conv.messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`p-2 rounded border ${
                        msg.sender === "user" ? "bg-blue-100" : "bg-green-100"
                      }`}
                    >
                      <p>
                        <strong>
                          {msg.sender === "user" ? "User" : "Bot"}:
                        </strong>{" "}
                        {msg.message}
                      </p>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Conversations;
