import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignIn({ onSwitch, setIsLoggedIn }) {
  const [form, setForm] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://127.0.0.1:5000/signin", {
        username: form.username,
        password: form.password,
      });

      setMessage(res.data.message || "");

      if (res.status === 200 || res.data.message === "Login successful!") {
        localStorage.setItem("username", form.username);
        if (res.data.name) localStorage.setItem("name", res.data.name);
        setIsLoggedIn(true);
        navigate("/timeutilizer");
      }
    } catch (err) {
      console.error("SignIn error:", err);
      setMessage(err.response?.data?.message || err.message || "Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-green-200 to-green-300">
      <div className="bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-2xl w-80 sm:w-96 transition-transform transform hover:scale-[1.02] duration-300">
        <h2 className="text-3xl font-bold mb-6 text-center text-green-800">
          Welcome Back 👋
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-green-700 mb-1">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              className="border border-green-300 rounded-xl px-3 py-2 shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-500 transition"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-semibold text-green-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="border border-green-300 rounded-xl px-3 py-2 shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-500 transition"
            />
          </div>

          <button
            type="submit"
            className="bg-green-600 text-white py-2.5 mt-2 rounded-xl shadow-md font-semibold tracking-wide hover:bg-green-700 hover:shadow-lg transition-all duration-300"
          >
            Sign In
          </button>
        </form>

        {message && (
          <p
            className={`text-center text-sm mt-4 font-medium ${
              message.includes("success") ? "text-green-700" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        <p className="text-center mt-5 text-sm text-green-800">
          Don’t have an account?{" "}
          <button
            onClick={onSwitch}
            className="text-green-700 underline font-semibold hover:text-green-900 transition"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
}

export default SignIn;
