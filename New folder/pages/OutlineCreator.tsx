
import React, { useState } from 'react';
import { generateOutline } from '../services/geminiService';
import { Outline } from '../types';
import Spinner from '../components/Spinner';

const OutlineCreator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [outline, setOutline] = useState<Outline | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt) {
      setError('Please enter a story idea.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setOutline(null);
    try {
      const result = await generateOutline(prompt);
      if (result) {
        setOutline(result);
      } else {
        setError('Failed to generate outline. The AI returned an invalid format.');
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
        <h3 className="text-xl font-bold text-white mb-4">1. Enter Your Story Idea</h3>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., A lonely robot in a post-apocalyptic world finds a single living flower and must protect it."
          className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
          rows={4}
        />
        <button
          onClick={handleGenerate}
          disabled={isLoading}
          className="mt-4 px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center"
        >
          {isLoading ? <Spinner /> : 'Generate Outline'}
        </button>
      </div>

      {error && <div className="bg-red-900/50 border border-red-700 text-red-200 p-4 rounded-lg">{error}</div>}

      {outline && (
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 animate-fade-in-up">
          <h2 className="text-3xl font-extrabold text-white text-center mb-2">{outline.title}</h2>
          <p className="text-center text-gray-300 italic mb-8">{outline.logline}</p>

          <div className="space-y-6">
            {outline.acts.map((act) => (
              <div key={act.act} className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                <h3 className="text-xl font-bold text-indigo-400 mb-2">Act {act.act}: {act.title}</h3>
                <p className="text-gray-400 mb-4">{act.summary}</p>
                <div className="space-y-3 pl-4 border-l-2 border-gray-600">
                  {act.scenes.map((scene) => (
                    <div key={scene.scene}>
                      <h4 className="font-semibold text-white">Scene {scene.scene}</h4>
                      <p className="text-gray-400">{scene.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default OutlineCreator;
