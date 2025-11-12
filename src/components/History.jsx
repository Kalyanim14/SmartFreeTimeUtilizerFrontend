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
  const [expanded, setExpanded] = useState({});
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

      const res = await axios.get(`${API_BASE_URL}/history/${encodeURIComponent(username)}`);
      setHistory(res.data.history || []);
    } catch (err) {
      console.error("History fetch error:", err);
      if (err.response && err.response.status === 404) {
        setHistory([]);
      } else {
        setError("Unable to load history. Try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const filtered = useMemo(() => {
    if (!query.trim()) return history;
    const q = query.toLowerCase();
    return history.filter(
      (it) =>
        (it.prompt_summary || "").toLowerCase().includes(q) ||
        (it.response_summary || "").toLowerCase().includes(q)
    );
  }, [history, query]);

  const toggleExpand = (idx) => {
    setExpanded((s) => ({ ...s, [idx]: !s[idx] }));
  };

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
            title="Back"
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
            placeholder="Search prompts or summaries..."
            className="flex-1 md:flex-none w-full md:w-72 px-3 py-2 rounded-xl border border-green-200 focus:outline-none focus:ring-2 focus:ring-green-300"
          />
          <button
            onClick={fetchHistory}
            className="bg-white px-3 py-2 rounded-xl shadow hover:shadow-md transition"
            title="Refresh"
          >
            ⟳ Refresh
          </button>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="flex flex-col items-center">
            <svg className="animate-spin h-10 w-10 mb-4" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" className="opacity-25" />
              <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="opacity-75" />
            </svg>
            <p className="text-sm text-green-700">Loading your history...</p>
          </div>
        </div>
      ) : error ? (
        <div className="bg-white p-6 rounded-xl shadow-md border border-red-100">
          <p className="text-red-600">{error}</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24">
          <div className="bg-white p-8 rounded-2xl shadow-md text-center max-w-md">
            <svg width="88" height="88" viewBox="0 0 24 24" className="mx-auto mb-4 opacity-90">
              <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12c0 2.21.72 4.25 1.95 5.92L2 22l4.08-1.64C7.75 21.28 9.79 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zM8 11h8v2H8z" />
            </svg>
            <h3 className="text-lg font-semibold mb-2">No history yet</h3>
            <p className="text-sm text-gray-600">Try generating a plan in the TimeUtilizer — your recent sessions will appear here.</p>
            <div className="mt-4">
              <Link to="/timeutilizer" className="inline-block bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700">
                Go to TimeUtilizer
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((item, idx) => (
            <article
              key={idx}
              className="bg-white p-4 rounded-2xl shadow-md border border-green-100 flex flex-col h-full"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h4 className="text-sm text-green-700 font-semibold">{item.prompt_summary}</h4>
                  <p className="text-xs text-gray-400 mt-1">{readableDate(item.timestamp)}</p>
                </div>
                <div className="text-right">
                  <button
                    onClick={() => navigator.clipboard?.writeText(`${item.prompt_summary}\n\n${item.response_summary}`)}
                    title="Copy"
                    className="text-sm text-green-600 hover:text-green-800"
                  >
                    Copy
                  </button>
                </div>
              </div>

              <div className="mt-3 flex-1">
                <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                  {expanded[idx] ? item.response_summary : item.response_summary?.slice(0, 140) + (item.response_summary?.length > 140 ? "..." : "")}
                </p>
              </div>

            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;
