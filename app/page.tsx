"use client";
import { useState, ChangeEvent } from 'react';
import axios, { AxiosError } from 'axios';
import HUGGING_FACE_MODELS  from './models'

export default function Home() {
  const [text, setText] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [availableModels, setAvailableModels] = useState(HUGGING_FACE_MODELS);
  const [selectedModel, setSelectedModel] = useState(availableModels[0].url);
  const [userDefinedModel, setUserDefinedModel] = useState('');


  const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
      const newText = event.target.value;
      if (newText.length <= 200) { // Ensuring the length does not exceed 200 characters
        setText(newText);
      }
  };


  const handleDetect = async () => {
      if (!text.trim()) {
          setResult('Please enter some text to detect.');
          return;
      }
      setLoading(true);
      try {
        const modelPath = userDefinedModel || selectedModel;
        const response = await axios.post('/api/detect', { text, model: modelPath });
          setResult(response.data);
      } catch (error) {
          console.error('Error from API:', error);
          if (error instanceof AxiosError && error.response) {
              setResult(`Error: ${error.response.data.message || error.message}`);
          } else {
              setResult('An unknown error occurred');
          }
      }
      setLoading(false);
  };

  return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 text-gray-900 ">
          <div className="w-full max-w-2xl p-6 bg-white shadow-md rounded-lg">
              <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">AI Text Detection</h1>
              <div className="relative inline-block text-left mt-4 mb-1">
                  <select
                      value={selectedModel}
                      onChange={(e) => setSelectedModel(e.target.value)}
                      className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                      {availableModels.map((model) => (
                          <option key={model.url} value={model.url}>
                              {model.name}
                          </option>
                      ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg
                          className="h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                      >
                          <path
                              fillRule="evenodd"
                              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                              clipRule="evenodd"
                          />
                      </svg>
                  </div>
              </div>
              <div className="mt-2 relative">
              <input
                type="text"
                value={userDefinedModel}
                onChange={(e) => setUserDefinedModel(e.target.value)}
                placeholder="Enter custom model path ex: username/model-name"
                className="mt-1 mb-4 px-4 py-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 transition ease-in-out"
              />
              </div>
              <textarea
                  className="w-full p-3 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition ease-in-out"
                  value={text}
                  onChange={handleTextChange}
                  rows={6}
                  placeholder="Enter text to detect..."
                  maxLength={200}
              ></textarea>
              <p className="text-right text-xs text-gray-500">{text.length}/200</p>
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
                  <pre className="bg-gray-100 p-3 rounded-md overflow-auto text-gray-900">
                      {JSON.stringify(result, null, 2)}
                  </pre>
              </div>
          </div>
      </div>
  );
}
