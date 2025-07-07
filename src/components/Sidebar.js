import React, { useContext } from 'react';
import { WardrobeContext } from '../context/WardrobeContext';

const Sidebar = ({ activeTab, onTabChange }) => {
  const { clothes, outfits, weather, setWeather } = useContext(WardrobeContext);

  const tabs = [
    { 
      id: 'wardrobe', 
      label: 'My Wardrobe', 
      icon: '📁',
      description: 'Manage your clothing collection'
    },
    { 
      id: 'generator', 
      label: 'Outfit Generator', 
      icon: '🎨',
      description: 'AI-powered style recommendations'
    },
    { 
      id: 'dragdrop', 
      label: 'Drag & Drop', 
      icon: '🎯',
      description: 'Create outfits manually'
    },

    { 
      id: 'settings', 
      label: 'Settings', 
      icon: '⚙️',
      description: 'App preferences'
    }
  ];

  const getCategoryCount = (category) => {
    return clothes.filter(item => item.category === category).length;
  };

  return (
    <div className={`w-64 bg-white shadow-xl h-screen fixed left-0 top-0 z-50 border-r ${weather === 'winter' ? 'border-blue-100' : 'border-orange-100'}`}>
      {/* Header */}
      <div className={`p-6 border-b ${weather === 'winter' ? 'border-blue-100' : 'border-orange-100'}`}>
        <div className="flex items-center mb-4">
          <div className={`w-10 h-10 bg-gradient-to-br ${weather === 'winter' ? 'from-blue-400 to-blue-600' : 'from-orange-400 to-orange-600'} rounded-lg flex items-center justify-center text-white font-bold text-lg mr-3`}>
            CR
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">Code-Rite</h1>
            <p className="text-xs text-gray-500">Wardrobe Manager</p>
          </div>
        </div>
        
        {/* Weather Toggle */}
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-xs font-medium text-gray-600 mb-2">Weather Mode</p>
          <div className="flex bg-white rounded-md p-1">
            <button
              onClick={() => setWeather('summer')}
              className={`flex-1 py-1 px-2 rounded text-xs font-medium transition-all ${
                weather === 'summer'
                  ? 'bg-orange-500 text-white'
                  : 'text-gray-600 hover:text-orange-600'
              }`}
            >
              ☀️ Summer
            </button>
            <button
              onClick={() => setWeather('winter')}
              className={`flex-1 py-1 px-2 rounded text-xs font-medium transition-all ${
                weather === 'winter'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              ❄️ Winter
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="p-4">
        <nav className="space-y-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`w-full text-left p-3 rounded-lg transition-all duration-200 group ${
                activeTab === tab.id
                  ? (weather === 'winter' ? 'bg-blue-500 text-white shadow-md' : 'bg-orange-500 text-white shadow-md')
                  : (weather === 'winter' ? 'text-gray-600 hover:bg-blue-50 hover:text-blue-600' : 'text-gray-600 hover:bg-orange-50 hover:text-orange-600')
              }`}
            >
              <div className="flex items-center">
                <span className="text-lg mr-3">{tab.icon}</span>
                <div className="flex-1">
                  <div className="font-medium">{tab.label}</div>
                  <div className={`text-xs ${
                    activeTab === tab.id ? (weather === 'winter' ? 'text-blue-100' : 'text-orange-100') : 'text-gray-400'
                  }`}>
                    {tab.description}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </nav>
      </div>

      {/* Quick Stats */}
      <div className={`p-4 border-t ${weather === 'winter' ? 'border-blue-100' : 'border-orange-100'}`}>
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Quick Stats</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Total Items:</span>
            <span className={`font-semibold ${weather === 'winter' ? 'text-blue-600' : 'text-orange-600'}`}>{clothes.length}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Outfits Created:</span>
            <span className={`font-semibold ${weather === 'winter' ? 'text-blue-600' : 'text-orange-600'}`}>{outfits.length}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">T-Shirts:</span>
            <span className="font-semibold text-gray-800">{getCategoryCount('t-shirt')}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Jeans:</span>
            <span className="font-semibold text-gray-800">{getCategoryCount('jeans')}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Shoes:</span>
            <span className="font-semibold text-gray-800">{getCategoryCount('shoes')}</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className={`absolute bottom-0 left-0 right-0 p-4 border-t ${weather === 'winter' ? 'border-blue-100' : 'border-orange-100'} bg-gray-50`}>
        <div className="text-center">
          <p className="text-xs text-gray-500 mb-1">Made with ❤️</p>
          <p className="text-xs text-gray-400">Code-Rite Team</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;