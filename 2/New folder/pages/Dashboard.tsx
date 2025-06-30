import React from 'react';
import { NAV_ITEMS } from '../constants';

const Dashboard: React.FC = () => {
    const features = NAV_ITEMS.filter(item => item.id !== 'dashboard');
  return (
    <div className="animate-fade-in-up">
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8 text-center mb-8">
        <h1 className="text-4xl font-extrabold text-white mb-2">Welcome to Your AI Animation Studio</h1>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
          This is your central hub for creating stunning animations. Use the modules on the left to bring your vision to life, from the initial spark of an idea to the final marketing push.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <div key={feature.id} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 flex flex-col items-center text-center transform hover:-translate-y-1 transition-transform duration-300" style={{ animationDelay: `${index * 100}ms` }}>
            <div className="text-indigo-400 mb-4">{React.cloneElement(feature.icon, { className: "h-10 w-10" })}</div>
            <h3 className="text-xl font-bold text-white mb-2">{feature.label}</h3>
            <p className="text-gray-400 text-sm">
              {
                {
                  'outline': 'Generate a complete story structure from a simple idea.',
                  'characters': 'Design unique characters with detailed descriptions and visual concepts.',
                  'storyboard': 'Visualize your scenes with AI-generated storyboard panels.',
                  'locations': 'Create breathtaking worlds and environments for your story.',
                  'voice': 'Develop character voices and generate sample dialogue scripts.',
                  'marketing': 'Craft compelling taglines and marketing copy to promote your creation.',
                }[feature.id]
              }
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;