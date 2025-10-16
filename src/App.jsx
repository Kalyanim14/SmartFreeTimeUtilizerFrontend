https://flask-smartfreetimeutilizer-1.onrender.com/ is backend link, import React, { useState } from 'react';
import axios from 'axios';
import './index.css';

// Backend API base URL
const API_BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://flask-smartfreetimeutilizer-1.onrender.com'
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-500 to-purple-600 rounded-2xl shadow-xl p-8 mb-8 text-center text-white">
          <h1 className="text-4xl font-bold mb-4">AI Assistant</h1>
          <p className="text-xl opacity-90">Get personalized responses based on your input</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Main Application */}
          <>
            {/* Input Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Age Field */}
                <div>
                  <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-2">
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your age"
                  />
                </div>
              </div>

              {/* Topic Field */}
              <div>
                <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-2">
                  Topic of Interest *
                </label>
                <select
                  id="topic"
                  name="topic"
                  value={formData.topic}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="">Select a topic</option>
                  <option value="technology">Technology</option>
                  <option value="science">Science</option>
                  <option value="history">History</option>
                  <option value="arts">Arts & Culture</option>
                  <option value="sports">Sports</option>
                  <option value="health">Health & Wellness</option>
                  <option value="business">Business</option>
                  <option value="education">Education</option>
                  <option value="travel">Travel</option>
                  <option value="food">Food & Cooking</option>
                </select>
              </div>

              {/* Purpose Field */}
              <div>
                <label htmlFor="purpose" className="block text-sm font-medium text-gray-700 mb-2">
                  Purpose *
                </label>
                <select
                  id="purpose"
                  name="purpose"
                  value={formData.purpose}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="">Select purpose</option>
                  <option value="learning">Learning & Education</option>
                  <option value="entertainment">Entertainment</option>
                  <option value="research">Research</option>
                  <option value="creative">Creative Inspiration</option>
                  <option value="problem-solving">Problem Solving</option>
                  <option value="career">Career Guidance</option>
                  <option value="personal">Personal Development</option>
                </select>
              </div>

              {/* Context Field */}
              <div>
                <label htmlFor="context" className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Context
                </label>
                <textarea
                  id="context"
                  name="context"
                  value={formData.context}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 resize-vertical"
                  placeholder="Any additional information, specific questions, or context that would help generate a better response..."
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    {error}
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-gradient-to-r from-primary-500 to-purple-600 text-white py-4 px-6 rounded-lg font-semibold hover:from-primary-600 hover:to-purple-700 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-200 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:transform-none disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating Response...
                  </div>
                ) : (
                  'Generate AI Response'
                )}
              </button>
            </form>

            {/* Response Section */}
            {response && (
              <div className="mt-8 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-8">
                <div className="flex items-center mb-6">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">AI Response</h3>
                </div>
                <div className="prose prose-lg max-w-none">
                  <div className="bg-white rounded-xl p-6 shadow-sm border">
                    <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                      {response}
                    </div>
                  </div>
                </div>
                
                {/* Copy to Clipboard Button */}
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(response);
                      // You could add a toast notification here
                    }}
                    className="flex items-center space-x-2 bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                    </svg>
                    <span>Copy Response</span>
                  </button>
                </div>
              </div>
            )}
          </>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-600">
          <p>Powered by OpenAI</p>
        </div>
      </div>
    </div>
  );
}

export default App;
