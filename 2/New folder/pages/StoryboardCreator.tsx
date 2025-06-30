
import React, { useState } from 'react';
import { generateImage, generateStoryboardPanelInfo } from '../services/geminiService';
import { StoryboardPanel } from '../types';
import Spinner from '../components/Spinner';

const StoryboardCreator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [panels, setPanels] = useState<StoryboardPanel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt) {
      setError('Please enter a scene description.');
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      // Generate image and info in parallel
      const imagePromise = generateImage(`Dynamic animation storyboard panel for the scene: "${prompt}". dramatic lighting, clear action, ${panels.length % 2 === 0 ? 'anime' : 'western comic book'} style.`);
      const infoPromise = generateStoryboardPanelInfo(prompt);

      const [imageUrl, shotInfo] = await Promise.all([imagePromise, infoPromise]);

      if (imageUrl && shotInfo) {
        const newPanel: StoryboardPanel = {
          scene: panels.length + 1,
          description: prompt,
          shotType: shotInfo.shotType,
          imageUrl: imageUrl,
        };
        setPanels(prev => [newPanel, ...prev]);
        setPrompt('');
      } else {
        setError('Failed to generate complete storyboard panel. The AI may be experiencing issues.');
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
        <h3 className="text-xl font-bold text-white mb-4">1. Describe The Scene for the Next Panel</h3>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., The hero leaps across a chasm as a bridge collapses behind them."
          className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
          rows={3}
        />
        <button
          onClick={handleGenerate}
          disabled={isLoading}
          className="mt-4 px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center"
        >
          {isLoading ? <Spinner /> : 'Generate Panel'}
        </button>
      </div>

      {error && <div className="bg-red-900/50 border border-red-700 text-red-200 p-4 rounded-lg">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {panels.map((panel) => (
          <div key={panel.scene} className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 animate-fade-in-up">
            <div className="w-full aspect-video bg-gray-700 flex items-center justify-center">
              <img src={panel.imageUrl} alt={`Scene ${panel.scene}`} className="w-full h-full object-cover" />
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start">
                <h4 className="text-lg font-bold text-white">Scene {panel.scene}</h4>
                <span className="bg-indigo-500 text-white text-xs font-bold px-2 py-1 rounded-full">{panel.shotType}</span>
              </div>
              <p className="text-gray-400 text-sm mt-1">{panel.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoryboardCreator;
