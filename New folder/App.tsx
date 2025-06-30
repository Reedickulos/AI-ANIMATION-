
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import OutlineCreator from './pages/OutlineCreator';
import CharacterCreator from './pages/CharacterCreator';
import StoryboardCreator from './pages/StoryboardCreator';
import LocationCreator from './pages/LocationCreator';
import VoiceCreator from './pages/VoiceCreator';
import MarketingCopilot from './pages/MarketingCopilot';
import { NAV_ITEMS } from './constants';
import { NavItemType } from './types';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<NavItemType>(NAV_ITEMS[0].id);

  const renderActiveView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />;
      case 'outline':
        return <OutlineCreator />;
      case 'characters':
        return <CharacterCreator />;
      case 'storyboard':
        return <StoryboardCreator />;
      case 'locations':
        return <LocationCreator />;
      case 'voice':
        return <VoiceCreator />;
      case 'marketing':
        return <MarketingCopilot />;
      default:
        return <Dashboard />;
    }
  };

  const activeItem = NAV_ITEMS.find(item => item.id === activeView);

  return (
    <div className="flex h-screen bg-gray-900 font-sans">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <main className="flex-1 flex flex-col overflow-hidden">
        <Header title={activeItem?.label || 'Dashboard'} />
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {renderActiveView()}
        </div>
      </main>
    </div>
  );
};

export default App;
