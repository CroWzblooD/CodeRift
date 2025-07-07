import React, { useState } from 'react';
import { WardrobeProvider } from './context/WardrobeContext';
import Sidebar from './components/Sidebar';
import WardrobeDashboard from './components/WardrobeDashboard';
import OutfitGenerator from './components/OutfitGenerator';
import DragDropOutfit from './components/DragDropOutfit';
import Settings from './components/Settings';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('wardrobe');

  const renderContent = () => {
    switch (activeTab) {
      case 'wardrobe':
        return <WardrobeDashboard />;
      case 'generator':
        return <OutfitGenerator />;
      case 'dragdrop':
        return <DragDropOutfit />;
      case 'settings':
        return <Settings />;
      default:
        return <WardrobeDashboard />;
    }
  };

  return (
    <WardrobeProvider>
      <div className="App">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
        {renderContent()}
      </div>
    </WardrobeProvider>
  );
}

export default App;
