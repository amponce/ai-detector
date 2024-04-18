// Home.js
"use client"
import React, { useState, ChangeEvent } from 'react';
import HUGGING_FACE_MODELS from './models';
import DetectionInterface from './components/DetectInterface';
import ChatInterface from './components/ChatInterface';
import InstructionInterface from './components/InstructInterface';

export default function Home() {
    const [selectedModel, setSelectedModel] = useState(HUGGING_FACE_MODELS[0]);
    const [userDefinedModel, setUserDefinedModel] = useState('');

    const handleModelChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const model = HUGGING_FACE_MODELS.find(m => m.url === event.target.value);
        if (model) {
            setSelectedModel(model);
        }
    };

    const renderInterface = () => {
        switch (selectedModel.type) {
            case 'chat':
                return <ChatInterface model={selectedModel} />;
            case 'detect':
                return <DetectionInterface model={selectedModel} userDefinedModel={userDefinedModel} />;
            case 'instruct':
                return <InstructionInterface model={selectedModel} />;
            default:
                return <div>Select a model to begin.</div>;
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 text-gray-900">
            <div className="w-full max-w-2xl p-6 bg-white shadow-md rounded-lg">
                <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">Select a Detection Model</h1>
                <select
                    value={selectedModel.url}
                    onChange={handleModelChange}
                    className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                    {HUGGING_FACE_MODELS.map((model) => (
                        <option key={model.url} value={model.url}>{model.name}</option>
                    ))}
                </select>
                <input
                  type="text"
                  value={userDefinedModel}
                  onChange={(e) => setUserDefinedModel(e.target.value)}
                  placeholder="(Optional) Enter custom model path ex: username/model-name"
                  className="mt-4 mb-4 px-4 py-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 transition ease-in-out"
                />
                {renderInterface()}
            </div>
        </div>
    );
}
