"use client";

import Head from "next/head";
import { useState } from "react";
import Chat from "./components/Chart";
import CircularButtonGroup from "./components/circular-button";

export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen((prev) => !prev);
  };

  const buttons = [
    { label: "Chatbot", onClick: toggleChat },
    { label: "FAQs", onClick: () => alert("Button 2 clicked!") },
    { label: "History", onClick: () => alert("Button 3 clicked!") },
  ];

  return (
    <div className="relative min-h-screen bg-gray-50">
      <Head>
        <title>Real-Time Chatbot</title>
        <meta name="description" content="Chat with our real-time bot" />
      </Head>
      <main className="flex items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold text-gray-800">
          Welcome to Our Chatbot
        </h1>
      </main>

      <div className="fixed bottom-8 right-8 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none">
        <CircularButtonGroup buttons={buttons} />
      </div>

      {/* Floating Button */}
      <button
        onClick={toggleChat}
        className="fixed bottom-8 right-8 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none"
      >
        {isChatOpen ? "Close Chat" : "Click to open chat"}
      </button>

      {/* Chatbox */}
      {isChatOpen && (
        <div className="fixed bottom-20 right-8 w-80 bg-white border shadow-lg rounded-lg">
          <Chat />
        </div>
      )}
    </div>
  );
}
