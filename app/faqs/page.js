"use client";

import { useState, useEffect } from "react";
import axios from "axios";

const FAQs = () => {
  const [faqs, setFaqs] = useState([]);
  const [newFAQ, setNewFAQ] = useState({ question: "", answer: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch FAQs from the API
  const fetchFAQs = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/faqs/", {
        headers: {
          Accept: "application/json",
        },
      });
      console.log(response.data);
      setFaqs(response.data);
    } catch (err) {
      console?.error("Failed to fetch FAQs:", err);
    }
  };

  useEffect(() => {
    fetchFAQs();
  }, []);

  const handleAdd = async () => {
    if (!newFAQ.question || !newFAQ.answer) return;
    try {
      const response = await axios.post(
        "http://localhost:8000/api/faqs/",
        newFAQ
      );
      setFaqs((prev) => [...prev, response.data]); // Append the new FAQ
      setNewFAQ({ question: "", answer: "" });
    } catch (err) {
      alert("Failed to add FAQ. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/faqs/${id}/`);
      setFaqs((prev) => prev.filter((faq) => faq.id !== id));
    } catch (err) {
      alert("Failed to delete FAQ. Please try again.");
    }
  };

  return (
    <div className="md:grid grid-cols-2">
      <div>
        <h1 className="text-2xl font-bold mb-4">Manage FAQs</h1>
        {loading && <p>Loading FAQs...</p>}
        {error && <p className="text-red-500">{error}</p>}
        <div className="space-y-4 mx-10">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="p-4 border rounded-md shadow-md flex justify-between items-center"
            >
              <div>
                <h2 className="font-semibold">{faq.question}</h2>
                <p>{faq.answer}</p>
              </div>
              <button
                onClick={() => handleDelete(faq.id)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
        <div className="mt-8 mx-20">
          <h2 className="text-xl font-semibold mb-2">Add New FAQ</h2>
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Question"
              value={newFAQ.question}
              onChange={(e) =>
                setNewFAQ({ ...newFAQ, question: e.target.value })
              }
              className="w-full p-2 border rounded"
            />
            <textarea
              placeholder="Answer"
              value={newFAQ.answer}
              onChange={(e) => setNewFAQ({ ...newFAQ, answer: e.target.value })}
              className="w-full p-2 border rounded"
            />
            <button
              onClick={handleAdd}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add FAQ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQs;
