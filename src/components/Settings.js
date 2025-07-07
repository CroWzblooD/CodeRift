import React, { useState, useContext } from 'react';
import { WardrobeContext } from '../context/WardrobeContext';

const Settings = () => {
  const { weather, setWeather } = useContext(WardrobeContext);
  const [settings, setSettings] = useState({
    notifications: true,
    autoGenerate: false,
    darkMode: false,
    language: 'en',
    units: 'metric',
    privacy: 'public'
  });

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${weather === 'winter' ? 'from-blue-50' : 'from-orange-50'} to-white`}>
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Settings</h1>
          <p className="text-gray-600">Customize your wardrobe experience</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* General Settings */}
          <div className="space-y-6">
            <div className={`bg-white rounded-xl shadow-md p-6 border ${weather === 'winter' ? 'border-blue-100' : 'border-orange-100'}`}>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">General Settings</h3>
              
              {/* Weather Preference */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Default Weather Mode
                </label>
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setWeather('summer')}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                      weather === 'summer'
                        ? 'bg-white text-orange-600 shadow-sm'
                        : 'text-gray-600 hover:text-orange-600'
                    }`}
                  >
                    ☀️ Summer
                  </button>
                  <button
                    onClick={() => setWeather('winter')}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                      weather === 'winter'
                        ? 'bg-white text-blue-600 shadow-sm'
                        : 'text-gray-600 hover:text-blue-600'
                    }`}
                  >
                    ❄️ Winter
                  </button>
                </div>
              </div>

              {/* Language */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Language
                </label>
                <select
                  value={settings.language}
                  onChange={(e) => handleSettingChange('language', e.target.value)}
                  className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-${weather === 'winter' ? 'blue' : 'orange'}-500 focus:border-transparent`}
                >
                  <option value="en">English</option>
                  <option value="es">Español</option>
                  <option value="fr">Français</option>
                  <option value="de">Deutsch</option>
                </select>
              </div>

              {/* Units */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Units
                </label>
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => handleSettingChange('units', 'metric')}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                      settings.units === 'metric'
                        ? 'bg-white text-orange-600 shadow-sm'
                        : 'text-gray-600 hover:text-orange-600'
                    }`}
                  >
                    Metric (°C, cm)
                  </button>
                  <button
                    onClick={() => handleSettingChange('units', 'imperial')}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                      settings.units === 'imperial'
                        ? 'bg-white text-orange-600 shadow-sm'
                        : 'text-gray-600 hover:text-orange-600'
                    }`}
                  >
                    Imperial (°F, in)
                  </button>
                </div>
              </div>
            </div>

            {/* Notifications */}
            <div className={`bg-white rounded-xl shadow-md p-6 border ${weather === 'winter' ? 'border-blue-100' : 'border-orange-100'}`}>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Notifications</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-800">Push Notifications</p>
                    <p className="text-sm text-gray-500">Get notified about new features and updates</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.notifications}
                      onChange={(e) => handleSettingChange('notifications', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className={`w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-${weather === 'winter' ? 'blue' : 'orange'}-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-${weather === 'winter' ? 'blue' : 'orange'}-500`}></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-800">Auto-Generate Outfits</p>
                    <p className="text-sm text-gray-500">Automatically suggest outfits daily</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.autoGenerate}
                      onChange={(e) => handleSettingChange('autoGenerate', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className={`w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-${weather === 'winter' ? 'blue' : 'orange'}-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-${weather === 'winter' ? 'blue' : 'orange'}-500`}></div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Appearance & Privacy */}
          <div className="space-y-6">
            <div className={`bg-white rounded-xl shadow-md p-6 border ${weather === 'winter' ? 'border-blue-100' : 'border-orange-100'}`}>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Appearance</h3>
              
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="font-medium text-gray-800">Dark Mode</p>
                  <p className="text-sm text-gray-500">Switch to dark theme</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.darkMode}
                    onChange={(e) => handleSettingChange('darkMode', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className={`w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-${weather === 'winter' ? 'blue' : 'orange'}-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-${weather === 'winter' ? 'blue' : 'orange'}-500`}></div>
                </label>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">Animation Speed</span>
                  <select className="text-sm border border-gray-300 rounded px-2 py-1">
                    <option>Fast</option>
                    <option>Normal</option>
                    <option>Slow</option>
                  </select>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">Grid Size</span>
                  <select className="text-sm border border-gray-300 rounded px-2 py-1">
                    <option>Compact</option>
                    <option>Normal</option>
                    <option>Large</option>
                  </select>
                </div>
              </div>
            </div>

            <div className={`bg-white rounded-xl shadow-md p-6 border ${weather === 'winter' ? 'border-blue-100' : 'border-orange-100'}`}>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Privacy & Data</h3>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Profile Visibility
                </label>
                <select
                  value={settings.privacy}
                  onChange={(e) => handleSettingChange('privacy', e.target.value)}
                  className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-${weather === 'winter' ? 'blue' : 'orange'}-500 focus:border-transparent`}
                >
                  <option value="public">Public</option>
                  <option value="friends">Friends Only</option>
                  <option value="private">Private</option>
                </select>
              </div>

              <div className="space-y-3">
                <button className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <p className="font-medium text-gray-800">Export My Data</p>
                  <p className="text-sm text-gray-500">Download all your wardrobe data</p>
                </button>

                <button className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <p className="font-medium text-gray-800">Delete Account</p>
                  <p className="text-sm text-gray-500">Permanently delete your account</p>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-8 flex justify-end">
          <button className={`${weather === 'winter' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-orange-500 hover:bg-orange-600'} text-white px-6 py-3 rounded-lg font-semibold transition-colors`}>
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;