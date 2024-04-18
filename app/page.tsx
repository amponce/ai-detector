"use client";
import { useState, ChangeEvent } from 'react';
import axios, { AxiosError } from 'axios';

export default function Home() {
  const [text, setText] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const handleDetect = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/api/detect', { text });
      setResult(response.data);
    } catch (error) {
      console.error('Error from API:', error);
      if (error instanceof AxiosError) {
        setResult(error.message);
      } else {
        setResult('An unknown error occurred');
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">AI Text Detection</h1>
        <textarea
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition ease-in-out"
          value={text}
          onChange={handleTextChange}
          rows={6}
          placeholder="Enter text to detect..."
        ></textarea>
        <button
          className="mt-4 px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300"
          onClick={handleDetect}
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Detect'}
        </button>
        <div className="mt-2">
          <p className="text-sm text-gray-500">
            For best results, enter at least 100-200 characters or more.
          </p>
        </div>
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