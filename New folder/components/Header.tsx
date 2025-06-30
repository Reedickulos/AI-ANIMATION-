
import React from 'react';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="bg-gray-900/50 backdrop-blur-sm border-b border-gray-700 p-4 shrink-0">
      <h2 className="text-2xl font-bold text-white">{title}</h2>
    </header>
  );
};

export default Header;
