
import React from 'react';
import { NavItemType } from '../types';
import { NAV_ITEMS } from '../constants';

interface SidebarProps {
  activeView: NavItemType;
  setActiveView: (view: NavItemType) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView }) => {
  return (
    <nav className="w-64 h-full bg-gray-800/50 backdrop-blur-sm border-r border-gray-700 flex flex-col p-4">
      <div className="flex items-center mb-10">
        <div className="bg-indigo-600 p-2 rounded-lg mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white h-6 w-6">
                <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3"/>
            </svg>
        </div>
        <h1 className="text-xl font-bold text-white">AnimAI Studio</h1>
      </div>
      <ul className="flex flex-col space-y-2">
        {NAV_ITEMS.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => setActiveView(item.id)}
              className={`flex items-center w-full text-left p-3 rounded-lg transition-colors duration-200 ${
                activeView === item.id
                  ? 'bg-indigo-600 text-white shadow-lg'
                  : 'text-gray-400 hover:bg-gray-700 hover:text-white'
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-auto text-center text-gray-500 text-xs">
        <p>Powered by Gemini</p>
        <p>&copy; 2024</p>
      </div>
    </nav>
  );
};

export default Sidebar;
