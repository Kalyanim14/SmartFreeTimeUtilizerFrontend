import React, { useState } from 'react';
import axios from 'axios';
import './index.css';

// Backend API base URL
const API_BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://flask-smartfreetimeutilizer-j9rh.onrender.com'
    : 'http://localhost:5000';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    topic: '',
    purpose: '',
    context: ''
  });
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResponse('');

    try {
      const result = await axios.post(`${API_BASE_URL}/api/process-data`, formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      setResponse(result.data.response);
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(response);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Enhanced Header */}
        <div className="bg-gradient-to-r from-slate-800/90 to-purple-900/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 mb-8 text-center text-white border border-white/10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"></div>
          <div className="relative z-10">
            <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              Smart Free Time Utilizer
            </h1>
            <p className="text-xl opacity-90 text-blue-100">Transform your free time into productive learning moments</p>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20">
          {/* Enhanced Input Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Name Field */}
              <div className="group">
                <label htmlFor="name" className="block text-sm font-semibold text-blue-100 mb-3 transition-all duration-300 group-focus-within:text-blue-300">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-6 py-4 bg-white/5 border border-white/20 rounded-2xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm hover:bg-white/10"
                  placeholder="Enter your full name"
                />
              </div>

              {/* Age Field */}
              <div className="group">
                <label htmlFor="age" className="block text-sm font-semibold text-blue-100 mb-3 transition-all duration-300 group-focus-within:text-blue-300">
                  Age *
                </label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  required
                  min="1"
                  max="120"
                  className="w-full px-6 py-4 bg-white/5 border border-white/20 rounded-2xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm hover:bg-white/10"
                  placeholder="Enter your age"
                />
              </div>
            </div>

            {/* Topic Field */}
            <div className="group">
              <label htmlFor="topic" className="block text-sm font-semibold text-blue-100 mb-3 transition-all duration-300 group-focus-within:text-blue-300">
                Topic of Interest *
              </label>
              <select
                id="topic"
                name="topic"
                value={formData.topic}
                onChange={handleInputChange}
                required
                className="w-full px-6 py-4 bg-white/5 border border-white/20 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm hover:bg-white/10 appearance-none cursor-pointer"
              >
                <option value="" className="bg-slate-800">Select a topic</option>
                <option value="technology" className="bg-slate-800">Technology</option>
                <option value="science" className="bg-slate-800">Science</option>
                <option value="history" className="bg-slate-800">History</option>
                <option value="arts" className="bg-slate-800">Arts & Culture</option>
                <option value="sports" className="bg-slate-800">Sports</option>
                <option value="health" className="bg-slate-800">Health & Wellness</option>
                <option value="business" className="bg-slate-800">Business</option>
                <option value="education" className="bg-slate-800">Education</option>
                <option value="travel" className="bg-slate-800">Travel</option>
                <option value="food" className="bg-slate-800">Food & Cooking</option>
              </select>
            </div>

            {/* Purpose Field */}
            <div className="group">
              <label htmlFor="purpose" className="block text-sm font-semibold text-blue-100 mb-3 transition-all duration-300 group-focus-within:text-blue-300">
                Purpose *
              </label>
              <select
                id="purpose"
                name="purpose"
                value={formData.purpose}
                onChange={handleInputChange}
                required
                className="w-full px-6 py-4 bg-white/5 border border-white/20 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm hover:bg-white/10 appearance-none cursor-pointer"
              >
                <option value="" className="bg-slate-800">Select purpose</option>
                <option value="learning" className="bg-slate-800">Learning & Education</option>
                <option value="entertainment" className="bg-slate-800">Entertainment</option>
                <option value="research" className="bg-slate-800">Research</option>
                <option value="creative" className="bg-slate-800">Creative Inspiration</option>
                <option value="problem-solving" className="bg-slate-800">Problem Solving</option>
                <option value="career" className="bg-slate-800">Career Guidance</option>
                <option value="personal" className="bg-slate-800">Personal Development</option>
              </select>
            </div>

            {/* Context Field */}
            <div className="group">
              <label htmlFor="context" className="block text-sm font-semibold text-blue-100 mb-3 transition-all duration-300 group-focus-within:text-blue-300">
                Additional Context
              </label>
              <textarea
                id="context"
                name="context"
                value={formData.context}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-6 py-4 bg-white/5 border border-white/20 rounded-2xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm hover:bg-white/10 resize-vertical"
                placeholder="Any additional information, specific questions, or context that would help generate a better response..."
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/20 backdrop-blur-sm border border-red-400/30 text-red-200 px-6 py-4 rounded-2xl animate-pulse">
                <div className="flex items-center">
                  <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span className="font-medium">{error}</span>
                </div>
              </div>
            )}

            {/* Enhanced Submit Button */}
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-5 px-8 rounded-2xl font-bold text-lg hover:from-blue-600 hover:to-purple-700 focus:ring-4 focus:ring-blue-400/50 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:transform-none disabled:cursor-not-allowed shadow-2xl relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              {loading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Crafting Your Response...
                </div>
              ) : (
                <span className="relative">Generate Smart Response</span>
              )}
            </button>
          </form>

          {/* Enhanced Response Section */}
          {response && (
            <div className="mt-12 bg-gradient-to-br from-blue-500/10 to-purple-600/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 animate-fade-in">
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center mr-4 shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Your Personalized Response</h3>
                  <p className="text-blue-200 text-sm">Tailored specifically for you</p>
                </div>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 shadow-2xl">
                <div className="whitespace-pre-wrap text-gray-100 leading-relaxed text-lg">
                  {response}
                </div>
              </div>
              
              {/* Enhanced Copy to Clipboard Button */}
              <div className="mt-8 flex justify-end">
                <button
                  onClick={copyToClipboard}
                  className={`flex items-center space-x-3 py-3 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                    copied 
                      ? 'bg-green-500/20 border border-green-400/30 text-green-300' 
                      : 'bg-white/10 border border-white/20 text-white hover:bg-white/20'
                  }`}
                >
                  {copied ? (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                      </svg>
                      <span>Copy Response</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Enhanced Footer */}
        <div className="text-center mt-12 text-blue-200/70 backdrop-blur-sm bg-white/5 rounded-2xl p-6 border border-white/10">
          <p className="text-lg font-semibold">Crafted with care by Kalyani Mantramurthi and Lalitha Shivapriya</p>
          <p className="text-sm mt-2 text-blue-200/50">Transforming idle moments into opportunities for growth</p>
        </div>
      </div>
    </div>
  );
}

export default App;
