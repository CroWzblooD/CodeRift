import React, { useState, useContext } from 'react';
import { WardrobeContext } from '../context/WardrobeContext';

const DragDropOutfit = () => {
  const { clothes, generateOutfit, weather } = useContext(WardrobeContext);
  const [selectedItems, setSelectedItems] = useState([]);
  const [draggedItem, setDraggedItem] = useState(null);
  const [createdOutfit, setCreatedOutfit] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const outfitSlots = [
    { id: 'top', label: 'Top', category: 't-shirt' },
    { id: 'bottom', label: 'Bottom', category: 'jeans' },
    { id: 'shoes', label: 'Shoes', category: 'shoes' },
    { id: 'outerwear', label: 'Outerwear', category: 'jacket' }
  ];

  const handleDragStart = (e, item) => {
    setDraggedItem(item);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, slotId) => {
    e.preventDefault();
    if (draggedItem) {
      setSelectedItems(prev => {
        const newItems = prev.filter(item => item.slotId !== slotId);
        return [...newItems, { ...draggedItem, slotId }];
      });
      setDraggedItem(null);
    }
  };

  const removeFromSlot = (slotId) => {
    setSelectedItems(prev => prev.filter(item => item.slotId !== slotId));
  };

  const createOutfit = () => {
    if (selectedItems.length >= 2) {
      const outfit = selectedItems.map(item => ({ ...item, slotId: undefined }));
      generateOutfit(outfit);
      setCreatedOutfit(outfit);
      setSelectedItems([]);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    } else {
      setShowSuccess(false);
      setCreatedOutfit(null);
      alert('Please select at least 2 items to create an outfit.');
    }
  };

  const getFilteredClothes = (category) => {
    return clothes.filter(item => item.category === category);
  };

  const getColorClass = (color) => {
    const colors = {
      'white': 'bg-white border-gray-300',
      'black': 'bg-black',
      'blue': 'bg-blue-500',
      'red': 'bg-red-500',
      'green': 'bg-green-500',
      'yellow': 'bg-yellow-400',
      'orange': 'bg-orange-500',
      'purple': 'bg-purple-500',
      'pink': 'bg-pink-500',
      'gray': 'bg-gray-500',
      'brown': 'bg-yellow-800'
    };
    return colors[color] || 'bg-gray-300';
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${weather === 'winter' ? 'from-blue-50' : 'from-orange-50'} to-white pl-64`}>
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Drag & Drop Outfit Creator</h1>
          <p className="text-gray-600">Create your perfect outfit by dragging items to the slots</p>
        </div>

        {showSuccess && (
          <div className="mb-6 text-center">
            <div className="inline-block bg-green-100 text-green-800 px-6 py-3 rounded-lg font-semibold shadow animate-bounce">
              🎉 Outfit created successfully!
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Outfit Canvas */}
          <div className={`bg-white rounded-xl shadow-lg p-6 border ${weather === 'winter' ? 'border-blue-100' : 'border-orange-100'}`}>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Outfit</h2>
            <div className="grid grid-cols-2 gap-4 mb-6">
              {outfitSlots.map(slot => {
                const itemInSlot = selectedItems.find(item => item.slotId === slot.id);
                return (
                  <div
                    key={slot.id}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, slot.id)}
                    className={`min-h-32 border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center transition-all duration-200 ${
                      itemInSlot 
                        ? (weather === 'winter' ? 'border-blue-300 bg-blue-50 shadow-md' : 'border-orange-300 bg-orange-50 shadow-md')
                        : (weather === 'winter' ? 'border-gray-300 hover:border-blue-400 hover:bg-blue-25' : 'border-gray-300 hover:border-orange-400 hover:bg-orange-25')
                    }`}
                  >
                    {itemInSlot ? (
                      <div className="text-center">
                        <img
                          src={itemInSlot.imageUrl}
                          alt={itemInSlot.name}
                          className="w-16 h-16 object-cover rounded-lg mx-auto mb-2 shadow"
                        />
                        <p className="text-sm font-medium text-gray-800 truncate">{itemInSlot.name}</p>
                        <button
                          onClick={() => removeFromSlot(slot.id)}
                          className="mt-2 text-red-500 hover:text-red-700 text-xs underline"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <div className="text-center text-gray-400">
                        <div className="text-2xl mb-2">+</div>
                        <p className="text-sm font-semibold">{slot.label}</p>
                        <p className="text-xs">Drop {slot.category} here</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <button
              onClick={createOutfit}
              disabled={selectedItems.length < 2}
              className={`w-full ${weather === 'winter' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-orange-500 hover:bg-orange-600'} disabled:bg-gray-400 text-white py-3 rounded-lg font-semibold transition-colors shadow-lg`}
            >
              Create Outfit ({selectedItems.length} items)
            </button>
          </div>

          {/* Wardrobe Items */}
          <div className="space-y-6">
            {outfitSlots.map(slot => (
              <div key={slot.id} className={`bg-white rounded-xl shadow-lg p-6 border ${weather === 'winter' ? 'border-blue-100' : 'border-orange-100'}`}>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">{slot.label} Items</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {getFilteredClothes(slot.category).map(item => (
                    <div
                      key={item.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, item)}
                      className={`cursor-grab active:cursor-grabbing bg-gray-50 rounded-lg p-3 ${weather === 'winter' ? 'hover:bg-blue-50 border border-gray-200 hover:border-blue-300' : 'hover:bg-orange-50 border border-gray-200 hover:border-orange-300'} shadow`}
                    >
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-20 object-cover rounded-lg mb-2"
                      />
                      <p className="text-xs font-medium text-gray-800 truncate mb-1">{item.name}</p>
                      <div className="flex items-center justify-between">
                        <div className={`w-3 h-3 rounded-full ${getColorClass(item.color)}`}></div>
                        <span className="text-xs text-gray-500 capitalize">{item.type}</span>
                      </div>
                    </div>
                  ))}
                </div>
                {getFilteredClothes(slot.category).length === 0 && (
                  <p className="text-center text-gray-400 text-sm py-4">
                    No {slot.category} items in your wardrobe
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Outfit Preview */}
        {createdOutfit && (
          <div className={`mt-10 bg-white rounded-xl shadow-lg p-8 border ${weather === 'winter' ? 'border-blue-200' : 'border-orange-200'} text-center animate-fade-in`}>
            <h2 className={`text-2xl font-bold ${weather === 'winter' ? 'text-blue-600' : 'text-orange-600'} mb-4`}>Your Created Outfit</h2>
            <div className="flex flex-wrap justify-center gap-6">
              {createdOutfit.map((item, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg mb-2 shadow"
                  />
                  <div className="font-medium text-gray-800 text-sm truncate">{item.name}</div>
                  <div className="text-xs text-gray-500 capitalize">{item.category}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="mt-8 bg-blue-50 rounded-xl p-6 border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-800 mb-3">How to Use</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-blue-700">
            <div className="flex items-start">
              <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">1</div>
              <p>Drag items from the wardrobe sections to the outfit slots</p>
            </div>
            <div className="flex items-start">
              <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">2</div>
              <p>Arrange your items in the desired slots (top, bottom, shoes, outerwear)</p>
            </div>
            <div className="flex items-start">
              <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">3</div>
              <p>Click "Create Outfit" when you're satisfied with your combination</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DragDropOutfit;