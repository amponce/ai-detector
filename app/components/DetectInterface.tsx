// DetectionInterface.js
import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';
import { Model } from '../types/Model';

interface DetectionInterfaceProps {
  model: Model;  // Ensure model details are passed correctly
  userDefinedModel: string;  // The path for a custom model entered by the user
}

const DetectionInterface: React.FC<DetectionInterfaceProps> = ({ model, userDefinedModel }) => {
  const [text, setText] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const handleDetect = async () => {
    if (!text.trim()) {
      setResult('Please enter some text to detect.');
      return;
    }
    setLoading(true);
    try {
      const modelPath = userDefinedModel || model.url;
      const response = await axios.post('/api/detect', { text, model: modelPath });
      setResult(response.data);
    } catch (error) {
      console.error('Error from API:', error);
      setResult('An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
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
      <div className="mt-6">
        <h2 className="text-xl font-semibold text-gray-900">Results:</h2>
        <pre className="bg-gray-100 p-3 rounded-md overflow-auto text-gray-900">
          {JSON.stringify(result, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default DetectionInterface;
