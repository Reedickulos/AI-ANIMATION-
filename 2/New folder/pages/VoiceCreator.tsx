
import React, { useState } from 'react';
import { generateVoiceScriptAndDescription } from '../services/geminiService';
import Spinner from '../components/Spinner';

interface VoiceResult {
  voiceDescription: string;
  sampleLines: string[];
}

const VoiceCreator: React.FC = () => {
  const [charDesc, setCharDesc] = useState('');
  const [sceneContext, setSceneContext] = useState('');
  const [result, setResult] = useState<VoiceResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!charDesc || !sceneContext) {
      setError('Please fill out both character and scene descriptions.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setResult(null);
    try {
      const response = await generateVoiceScriptAndDescription(charDesc, sceneContext);
      if (response) {
        setResult(response);
      } else {
        setError('Failed to generate voice details. The AI returned an invalid format.');
      }
    } catch (e) {
      setError('An error occurred while communicating with the AI. Please try again.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-4">1. Define Character and Scene</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Character Description</label>
            <textarea
              value={charDesc}
              onChange={(e) => setCharDesc(e.target.value)}
              placeholder="e.g., A cheerful, optimistic young inventor who is always excited."
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500"
              rows={2}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Scene Context</label>
            <textarea
              value={sceneContext}
              onChange={(e) => setSceneContext(e.target.value)}
              placeholder="e.g., They just discovered their greatest invention has a critical flaw right before the big competition."
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500"
              rows={2}
            />
          </div>
        </div>
        <button
          onClick={handleGenerate}
          disabled={isLoading}
          className="mt-4 px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center"
        >
          {isLoading ? <Spinner /> : 'Generate Voice Profile'}
        </button>
      </div>

      {error && <div className="bg-red-900/50 border border-red-700 text-red-200 p-4 rounded-lg">{error}</div>}

      {result && (
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 animate-fade-in-up">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-bold text-indigo-400 mb-2">Vocal Profile</h4>
              <p className="text-gray-300">{result.voiceDescription}</p>
            </div>
            <div>
              <h4 className="text-lg font-bold text-indigo-400 mb-2">Sample Script</h4>
              <ul className="space-y-2">
                {result.sampleLines.map((line, index) => (
                  <li key={index} className="bg-gray-700 p-3 rounded-md">
                    <p className="text-white italic">"{line}"</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VoiceCreator;
