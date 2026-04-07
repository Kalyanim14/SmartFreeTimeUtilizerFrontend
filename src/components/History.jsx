import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const API_BASE_URL =
  import.meta.env.MODE === "production"
    ? "https://flask-smartfreetimeutilizer.onrender.com/"
    : "http://localhost:5000";

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [selectedChat, setSelectedChat] = useState(null);

  const navigate = useNavigate();

  const fetchHistory = async () => {
    setLoading(true);
    setError("");

    try {
      const username = localStorage.getItem("username");

      if (!username) {
        setError("No user found. Please sign in.");
        return;
      }

      const res = await axios.get(
        `${API_BASE_URL}/api/history/${encodeURIComponent(username)}`
      );

      setHistory(res.data.history || []);
    } catch (err) {
      console.error("History fetch error:", err);
      setError("Unable to load history. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  // Extract titles from AI response
  const groupedHistory = useMemo(() => {
    return history.map((item) => {
      const titles = [];

      const matches = item.ai_response?.match(/### Task \d+ – (.*)/g);

      if (matches) {
        matches.forEach((m) => {
          titles.push(m.replace(/### Task \d+ – /, ""));
        });
      }

      return {
        titles,
        ai_response: item.ai_response,
        created_at: item.created_at,
      };
    });
  }, [history]);

  // Search filter
  const filtered = useMemo(() => {
    if (!query.trim()) return groupedHistory;

    const q = query.toLowerCase();

    return groupedHistory.filter((group) =>
      group.titles.some((title) => title.toLowerCase().includes(q))
    );
  }, [groupedHistory, query]);

  const readableDate = (date) => {
    if (!date) return "";
    return new Date(date).toLocaleString();
  };

  return (
    <div className="min-h-screen bg-green-50 text-green-900 p-6 md:p-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/timeutilizer")}
            className="bg-white px-3 py-2 rounded-xl shadow hover:shadow-md transition"
          >
            ← Back
          </button>

          <h1 className="text-3xl font-bold">Your History</h1>
        </div>

        <input
          type="search"
          placeholder="Search titles..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full md:w-72 px-3 py-2 rounded-xl border border-green-200 focus:ring-2 focus:ring-green-300"
        />
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex justify-center py-20">
          <p>Loading history...</p>
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="bg-white p-6 rounded-xl shadow-md text-red-600">
          {error}
        </div>
      )}

      {/* Empty */}
      {!loading && !error && filtered.length === 0 && (
        <div className="text-center py-20">
          <p>No history yet</p>

          <Link
            to="/timeutilizer"
            className="mt-4 inline-block bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            Generate Plan
          </Link>
        </div>
      )}

      {/* History Cards */}
      {!loading && !error && filtered.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((group, idx) => (
            <article
              key={idx}
              onClick={() => setSelectedChat(group)}
              className="bg-white p-5 rounded-2xl shadow-md border border-green-100 cursor-pointer hover:shadow-lg transition"
            >
              <p className="text-xs text-gray-400 mb-3">
                {readableDate(group.created_at)}
              </p>

              <ul className="space-y-2">
                {group.titles.map((title, i) => (
                  <li
                    key={i}
                    className="text-sm text-green-800 font-medium flex gap-2"
                  >
                    <span className="text-green-500">{i + 1}.</span>
                    <span>{title}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-4 text-xs text-green-600">Click to view plan</p>
            </article>
          ))}
        </div>
      )}

      {/* Modal */}
      {selectedChat && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white max-w-2xl w-full rounded-2xl p-6 shadow-xl relative max-h-[80vh] overflow-y-auto">

            <button
              onClick={() => setSelectedChat(null)}
              className="absolute top-3 right-4 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>

            <h2 className="text-lg font-semibold mb-3">
              Learning Plan
            </h2>

            <p className="text-xs text-gray-400 mb-4">
              {readableDate(selectedChat.created_at)}
            </p>

            <div className="text-sm text-green-800 whitespace-pre-line">
              {selectedChat.ai_response}
            </div>

          </div>

        </div>
      )}
    </div>
  );
};

export default History;
