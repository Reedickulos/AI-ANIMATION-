
import React, { useState } from 'react';
import { generateMarketingCopy } from '../services/geminiService';
import Spinner from '../components/Spinner';

interface MarketingResult {
  taglines: string[];
  socialMediaPost: string;
  shortSynopsis: string;
}

const MarketingCopilot: React.FC = () => {
  const [title, setTitle] = useState('');
  const [logline, setLogline] = useState('');
  const [result, setResult] = useState<MarketingResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!title || !logline) {
      setError('Please provide both a project title and a logline.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setResult(null);
    try {
      const response = await generateMarketingCopy(title, logline);
      if (response) {
        setResult(response);
      } else {
        setError('Failed to generate marketing copy. The AI returned an invalid format.');
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
        <h3 className="text-xl font-bold text-white mb-4">1. Enter Project Details</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Project Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., The Last Flower"
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Project Logline</label>
            <textarea
              value={logline}
              onChange={(e) => setLogline(e.target.value)}
              placeholder="e.g., A lonely robot in a post-apocalyptic world finds a single living flower and must protect it from harm."
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
          {isLoading ? <Spinner /> : 'Generate Marketing Kit'}
        </button>
      </div>

      {error && <div className="bg-red-900/50 border border-red-700 text-red-200 p-4 rounded-lg">{error}</div>}

      {result && (
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 animate-fade-in-up space-y-6">
          <div>
            <h4 className="text-lg font-bold text-indigo-400 mb-2">Taglines</h4>
            <ul className="list-disc list-inside space-y-1 text-white">
              {result.taglines.map((tagline, index) => <li key={index}>{tagline}</li>)}
            </ul>
          </div>
          <div className="border-t border-gray-700 pt-6">
            <h4 className="text-lg font-bold text-indigo-400 mb-2">Short Synopsis</h4>
            <p className="text-gray-300">{result.shortSynopsis}</p>
          </div>
          <div className="border-t border-gray-700 pt-6">
            <h4 className="text-lg font-bold text-indigo-400 mb-2">Social Media Post</h4>
            <div className="bg-gray-900 p-4 rounded-lg border border-gray-600">
              <p className="text-white whitespace-pre-wrap">{result.socialMediaPost}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketingCopilot;
