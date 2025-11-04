import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignUp({ onSwitch, setIsLoggedIn }) {
  const [form, setForm] = useState({ name: "", username: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (!form.name.trim() || !form.username.trim() || !form.password) {
      setMessage("Please fill all fields.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("http://127.0.0.1:5000/signup", {
        name: form.name.trim(),
        username: form.username.trim(),
        password: form.password,
      });

      setMessage(res.data.message || "Signup successful!");
      if (res.status === 201 || res.data.message === "Signup successful!") {
        localStorage.setItem("username", form.username.trim());
        localStorage.setItem("name", form.name.trim());
        setIsLoggedIn(true);
        navigate("/timeutilizer");
      }
    } catch (err) {
      console.error("SignUp error:", err);
      setMessage(err.response?.data?.message || err.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-green-200 to-green-300">
      <div className="bg-white/95 backdrop-blur-md p-8 rounded-3xl shadow-2xl w-80 sm:w-96 transition-transform transform hover:scale-[1.02] duration-300">
        <h2 className="text-3xl font-bold mb-4 text-center text-green-800">Create Account</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-semibold text-green-700 mb-1 block">Full name</label>
            <input
              type="text"
              placeholder="Your name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border border-green-300 rounded-xl px-3 py-2 shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-500 transition"
              required
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-green-700 mb-1 block">Username</label>
            <input
              type="text"
              placeholder="Choose a username"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              className="w-full border border-green-300 rounded-xl px-3 py-2 shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-500 transition"
              required
            />
            <p className="text-xs text-gray-400 mt-1">Pick something memorable — no spaces.</p>
          </div>

          <div>
            <label className="text-sm font-semibold text-green-700 mb-1 block">Password</label>
            <input
              type="password"
              placeholder="Create a password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full border border-green-300 rounded-xl px-3 py-2 shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-500 transition"
              required
            />
            <p className="text-xs text-gray-400 mt-1">Minimum 6 characters recommended.</p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2.5 mt-1 font-semibold rounded-xl text-white shadow-md transition-all duration-300 ${
              loading ? "bg-green-300 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        {message && (
          <p
            className={`text-center text-sm mt-4 font-medium ${
              /success/i.test(message) ? "text-green-700" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        <p className="text-center mt-5 text-sm text-green-800">
          Already have an account?{" "}
          <button
            onClick={onSwitch}
            className="text-green-700 underline font-semibold hover:text-green-900 transition"
          >
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
