"use client"
import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleDetect = async () => {
    try {
      const response = await axios.post('/api/detect', { text });
      setResult(response.data);
    } catch (error) {
      console.error('Error from API:', error);
      setResult(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">AI Text Detection</h1>
        <textarea
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition ease-in-out"
          value={text}
          onChange={handleTextChange}
          rows="6"
          placeholder="Enter text to detect..."
        ></textarea>
        <button
          className="mt-4 px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300"
          onClick={handleDetect}
        >
          Detect
        </button>
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-900">Results:</h2>
          <pre className="bg-gray-100 p-3 rounded-md overflow-auto">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}
