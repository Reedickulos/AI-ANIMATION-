
import React, { useState } from 'react';
import { generateImage } from '../services/geminiService';
import { Character } from '../types';
import Spinner from '../components/Spinner';

const CharacterCreator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt) {
      setError('Please enter a character description.');
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const fullPrompt = `Photorealistic, full body portrait of: ${prompt}. cinematic lighting, high detail, concept art style.`;
      const imageUrl = await generateImage(fullPrompt);
      if (imageUrl) {
        const newCharacter: Character = {
          name: `Character #${characters.length + 1}`,
          description: prompt,
          imageUrl: imageUrl
        };
        setCharacters(prev => [newCharacter, ...prev]);
        setPrompt('');
      } else {
        setError('Failed to generate character image. The AI may be experiencing issues.');
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
        <h3 className="text-xl font-bold text-white mb-4">1. Describe Your Character</h3>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., A grizzled old space pirate with a cybernetic eye and a talking parrot on his shoulder, wearing worn-out leather."
          className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
          rows={3}
        />
        <button
          onClick={handleGenerate}
          disabled={isLoading}
          className="mt-4 px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center"
        >
          {isLoading ? <Spinner /> : 'Generate Character'}
        </button>
      </div>

      {error && <div className="bg-red-900/50 border border-red-700 text-red-200 p-4 rounded-lg">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {characters.map((character, index) => (
          <div key={index} className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 animate-fade-in-up">
            <div className="w-full h-64 bg-gray-700 flex items-center justify-center">
              <img src={character.imageUrl} alt={character.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-4">
              <h4 className="text-lg font-bold text-white">{character.name}</h4>
              <p className="text-gray-400 text-sm">{character.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CharacterCreator;
