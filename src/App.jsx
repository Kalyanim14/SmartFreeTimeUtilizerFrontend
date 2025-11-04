import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import TimeUtilizer from "./components/TimeUtilizer";
import History from "./components/History";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

<<<<<<< HEAD
const App = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    domain: "",
    interest: "",
    topic: "",
    purpose: "",
    time_available: "",
    context: "",
  });

  const [customInputs, setCustomInputs] = useState({
    domain: "",
    interest: "",
    topic: "",
    purpose: "",
    time_available: "",
  });

  const [response, setResponse] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const dropdownOptions = {
    domain: [
      "Engineering Student",
      "Software Developer",
      "Teacher",
      "Hardware Engineer",
      "Data Analyst",
      "Other",
    ],
    interest: [
      "AI & Machine Learning",
      "Web Development",
      "Cybersecurity",
      "Data Science",
      "UI/UX Design",
      "Other",
    ],
    topic: [
      "Programming",
      "Productivity",
      "Career Guidance",
      "Study Tips",
      "Health & Fitness",
      "Other",
    ],
    purpose: [
      "Learning something new",
      "Improving skills",
      "Relaxing productively",
      "Exploring hobbies",
      "Boosting creativity",
      "Other",
    ],
    time_available: ["15 minutes", "30 minutes", "1 hour", "2+ hours", "Other"],
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleDropdownChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (value !== "Other") {
      setCustomInputs({ ...customInputs, [name]: "" });
    }
  };

  const handleCustomChange = (e) => {
    const { name, value } = e.target;
    setCustomInputs({ ...customInputs, [name]: value });
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse("");
    setError("");

    try {
      const res = await axios.post(`${API_BASE_URL}/api/process-data`, formData);
      setResponse(res.data.response);
    } catch (err) {
      console.error("API Error:", err);
      const errorMsg =
        err.response?.data?.error ||
        err.message ||
        "⚠️ Something went wrong. Please try again.";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen font-poppins bg-green-50">
      {/* Left Section: Input */}
      <div className="flex flex-col justify-center w-full md:w-1/2 bg-white px-10 py-8 border-r border-green-100 shadow-lg">
        <h1 className="text-3xl font-bold text-green-800 mb-2">
          Smart Free Time Utilizer
        </h1>
        <p className="text-green-700 mb-6 text-sm md:text-base">
          Get a personalized learning guide based on your domain, interests, and time.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {["name", "age"].map((key) => (
            <div key={key} className="flex flex-col">
              <label className="text-green-900 font-semibold mb-1">
                {key.toUpperCase()}
              </label>
              <input
                type={key === "age" ? "number" : "text"}
                name={key}
                value={formData[key]}
                onChange={handleChange}
                placeholder={`Enter ${key}`}
                className="border border-green-300 rounded-xl px-3 py-2 shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-500 transition"
                required
              />
            </div>
          ))}

          {/* Dropdowns */}
          {Object.keys(dropdownOptions).map((key) => (
            <div key={key} className="flex flex-col">
              <label className="text-green-900 font-semibold mb-1 capitalize">
                {key.replace("_", " ")}
              </label>
              <select
                name={key}
                value={formData[key]}
                onChange={handleDropdownChange}
                className="border border-green-300 rounded-xl px-3 py-2 shadow-sm bg-white text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-500 transition cursor-pointer"
                required
              >
                <option value="">Select {key.replace("_", " ")}</option>
                {dropdownOptions[key].map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>

              {formData[key] === "Other" && (
                <input
                  type="text"
                  name={key}
                  value={customInputs[key]}
                  onChange={handleCustomChange}
                  placeholder={`Enter custom ${key.replace("_", " ")}`}
                  className="mt-2 border border-green-300 rounded-xl px-3 py-2 shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-500 transition"
                />
              )}
            </div>
          ))}

          {/* Context */}
          <div className="flex flex-col">
            <label className="text-green-900 font-semibold mb-1">Context</label>
            <textarea
              name="context"
              value={formData.context}
              onChange={handleChange}
              placeholder="Add any background info..."
              className="border border-green-300 rounded-xl px-3 py-2 shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-500 transition"
              rows="3"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2.5 mt-3 font-semibold rounded-xl text-white shadow-md transition-all duration-300 ${
              loading
                ? "bg-green-300 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700 shadow-green-200 hover:shadow-lg"
            }`}
          >
            {loading ? "Processing..." : "Generate Response"}
          </button>
        </form>
      </div>

      {/* Right Section: Output */}
      <div
        className="w-full md:w-1/2 relative flex flex-col justify-center p-10 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1000&q=80')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-green-900 bg-opacity-30 backdrop-blur-sm"></div>

        <div className="relative z-10">
          <h2 className="text-2xl font-semibold text-white mb-5 drop-shadow-lg">
            AI Response
          </h2>

          <div className="bg-white bg-opacity-90 rounded-2xl shadow-xl p-6 h-3/4 overflow-y-auto">
            {loading ? (
              <p className="text-green-800 italic animate-pulse">
                ⏳ Generating your personalized response...
              </p>
            ) : error ? (
              <div className="p-4 bg-red-100 border border-red-300 text-red-700 rounded-xl shadow-sm">
                ⚠️ {error}
              </div>
            ) : response ? (
              <p className="text-green-900 leading-relaxed whitespace-pre-line">
                {response}
              </p>
=======
   const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
    window.location.href = "/"; // redirect to sign-in
  };


  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Navigate to="/timeutilizer" />
>>>>>>> 6bf1ee4 (Your message for local changes)
            ) : (
              <SignIn
                onSwitch={() => (window.location.href = "/signup")}
                setIsLoggedIn={setIsLoggedIn}
              />
            )
          }
        />
        <Route
          path="/signup"
          element={
            <SignUp
              onSwitch={() => (window.location.href = "/")}
              setIsLoggedIn={setIsLoggedIn}
            />
          }
        />
        <Route
          path="/timeutilizer"
          element={<TimeUtilizer onLogout={handleLogout} />}
        />
        <Route path="/history" element={<History />} />
        <Route path="*" element={<SignIn />} />
      </Routes>
    </Router>
  );
}

export default App;
