import React from 'react';

const Navigation = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'wardrobe', label: 'My Wardrobe', icon: '👕' },
    { id: 'generator', label: 'Outfit Generator', icon: '🎨' }
  ];

  return (
    <nav className="bg-white shadow-lg border-b border-orange-100 sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-2xl mr-2">👔</div>
            <h1 className="text-xl font-bold text-orange-600">Code-Rite</h1>
          </div>

          {/* Navigation Tabs */}
          <div className="flex space-x-1">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-orange-500 text-white shadow-md'
                    : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50'
                }`}
              >
                <span className="text-lg">{tab.icon}</span>
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Weather Indicator */}
          <div className="hidden md:flex items-center gap-2 text-sm text-gray-600">
            <span>🌤️</span>
            <span className="font-medium">Perfect for styling!</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 