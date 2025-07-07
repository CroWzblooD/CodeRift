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

  // Responsive content wrapper
  const ContentWrapper = ({ children }) => (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white lg:pl-64">
      {children}
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'wardrobe':
        return <ContentWrapper><WardrobeDashboard /></ContentWrapper>;
      case 'generator':
        return <ContentWrapper><OutfitGenerator /></ContentWrapper>;
      case 'dragdrop':
        return <ContentWrapper><DragDropOutfit /></ContentWrapper>;
      case 'settings':
        return <ContentWrapper><Settings /></ContentWrapper>;
      default:
        return <ContentWrapper><WardrobeDashboard /></ContentWrapper>;
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
