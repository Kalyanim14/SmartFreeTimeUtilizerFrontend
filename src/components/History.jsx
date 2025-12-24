import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://flask-smartfreetimeutilizer-j9rh.onrender.com"
    : "http://localhost:5000";

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const fetchHistory = async () => {
    setLoading(true);
    setError("");
    try {
      const username = localStorage.getItem("username");
      if (!username) {
        setError("No user found. Please sign in.");
        setHistory([]);
        return;
      }

      const res = await axios.get(
        `${API_BASE_URL}/history/${encodeURIComponent(username)}`
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

  // ========== GROUP BY TIMESTAMP ==========
  const groupedHistory = useMemo(() => {
    const map = {};

    history.forEach((item) => {
      if (!map[item.timestamp]) {
        map[item.timestamp] = [];
      }
      map[item.timestamp].push(item.title);
    });

    return Object.entries(map)
      .map(([timestamp, titles]) => ({
        timestamp: Number(timestamp),
        titles,
      }))
      .sort((a, b) => b.timestamp - a.timestamp);
  }, [history]);

  // ========== SEARCH ==========
  const filtered = useMemo(() => {
    if (!query.trim()) return groupedHistory;
    const q = query.toLowerCase();

    return groupedHistory.filter((group) =>
      group.titles.some((title) => title.toLowerCase().includes(q))
    );
  }, [groupedHistory, query]);

  const readableDate = (ts) => {
    if (!ts) return "";
    try {
      return new Date(ts * 1000).toLocaleString();
    } catch {
      return "";
    }
  };

  return (
    <div className="min-h-screen bg-green-50 text-green-900 p-6 md:p-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/timeutilizer")}
            className="inline-flex items-center gap-2 bg-white px-3 py-2 rounded-xl shadow hover:shadow-md transition"
          >
            ← Back
          </button>
          <h1 className="text-2xl md:text-3xl font-bold">Your History</h1>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search titles..."
            className="flex-1 md:flex-none w-full md:w-72 px-3 py-2 rounded-xl border border-green-200 focus:outline-none focus:ring-2 focus:ring-green-300"
          />
          <button
            onClick={fetchHistory}
            className="bg-white px-3 py-2 rounded-xl shadow hover:shadow-md transition"
          >
            ⟳ Refresh
          </button>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <p className="text-green-700">Loading your history...</p>
        </div>
      ) : error ? (
        <div className="bg-white p-6 rounded-xl shadow-md">
          <p className="text-red-600">{error}</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24">
          <div className="bg-white p-8 rounded-2xl shadow-md text-center max-w-md">
            <h3 className="text-lg font-semibold mb-2">No history yet</h3>
            <p className="text-sm text-gray-600">
              Generate a plan in TimeUtilizer — it will appear here.
            </p>
            <Link
              to="/timeutilizer"
              className="inline-block mt-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700"
            >
              Go to TimeUtilizer
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((group, idx) => (
            <article
              key={idx}
              className="bg-white p-5 rounded-2xl shadow-md border border-green-100"
            >
              <p className="text-xs text-gray-400 mb-3">
                {readableDate(group.timestamp)}
              </p>

              <ul className="space-y-2">
                {group.titles.map((title, i) => (
                  <li
                    key={i}
                    className="text-sm text-green-800 font-medium flex gap-2"
                  >
                    <span className="text-green-500">•</span>
                    <span>{title}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-4 text-right">
                <button
                  onClick={() =>
                    navigator.clipboard?.writeText(group.titles.join("\n"))
                  }
                  className="text-xs text-green-600 hover:text-green-800"
                >
                  Copy all
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;