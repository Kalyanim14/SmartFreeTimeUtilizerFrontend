import React, { useState } from 'react';
import axios from 'axios';
import './index.css';

// Backend API base URL
const API_BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://flask-smartfreetimeutilizer-1.onrender.com'  // <- Updated backend URL
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
      // Make POST request to the Render backend
      const result = await axios.post(`${API_BASE_URL}/api/process-data`, formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      setResponse(result.data.response);
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred. Please check your backend CORS settings.');
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
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                placeholder="Any additional information..."
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-primary-500 to-purple-600 text-white py-4 px-6 rounded-lg font-semibold hover:from-primary-600 hover:to-purple-700 transition-all duration-200"
            >
              {loading ? 'Generating Response...' : 'Generate AI Response'}
            </button>
          </form>

          {response && (
            <div className="mt-8 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-4">AI Response</h3>
              <div className="bg-white rounded-xl p-6 shadow-sm border whitespace-pre-wrap">
                {response}
              </div>
              <button
                onClick={() => navigator.clipboard.writeText(response)}
                className="mt-4 bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50"
              >
                Copy Response
              </button>
            </div>
          )}
        </div>

        <div className="text-center mt-8 text-gray-600">
          <p>Powered by OpenAI</p>
        </div>
      </div>
    </div>
  );
}

export default App;
