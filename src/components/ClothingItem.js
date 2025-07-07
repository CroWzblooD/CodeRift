import React, { useState, useContext } from 'react';
import { WardrobeContext } from '../context/WardrobeContext';

const ClothingItem = ({ item }) => {
  const { removeClothingItem } = useContext(WardrobeContext);
  const [showDetails, setShowDetails] = useState(false);

  const getCategoryIcon = (category) => {
    const icons = {
      't-shirt': 'T',
      'jeans': 'J',
      'shoes': 'S',
      'dress': 'D',
      'jacket': 'J',
      'accessories': 'A'
    };
    return icons[category] || 'I';
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
      'gray': 'bg-gray-500'
    };
    return colors[color] || 'bg-gray-300';
  };

  return (
    <div className="group relative">
      <div 
        className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer overflow-hidden border border-gray-100"
        onMouseEnter={() => setShowDetails(true)}
        onMouseLeave={() => setShowDetails(false)}
      >
        {/* Image */}
        <div className="relative aspect-square overflow-hidden">
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/400x400/f3f4f6/9ca3af?text=No+Image';
            }}
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Category Badge */}
          <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-medium text-gray-700 flex items-center gap-1">
            <span className="w-4 h-4 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
              {getCategoryIcon(item.category)}
            </span>
            <span className="capitalize">{item.category}</span>
          </div>

          {/* Color Indicator */}
          <div className="absolute top-2 right-2">
            <div className={`w-4 h-4 rounded-full border-2 border-white shadow-md ${getColorClass(item.color)}`} />
          </div>

          {/* Remove Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (window.confirm('Are you sure you want to remove this item?')) {
                removeClothingItem(item.id);
              }
            }}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-semibold text-gray-800 mb-1 truncate">{item.name}</h3>
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span className="capitalize">{item.type}</span>
            <span className="capitalize">{item.color}</span>
          </div>
        </div>

        {/* Hover Details */}
        {showDetails && (
          <div className="absolute inset-0 bg-white/95 backdrop-blur-sm rounded-xl p-4 flex flex-col justify-center items-center text-center z-10">
            <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-2">
              {getCategoryIcon(item.category)}
            </div>
            <h3 className="font-bold text-gray-800 mb-2">{item.name}</h3>
            <div className="space-y-1 text-sm text-gray-600">
              <div className="flex items-center justify-center gap-2">
                <span>Category:</span>
                <span className="capitalize font-medium">{item.category}</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <span>Color:</span>
                <div className={`w-3 h-3 rounded-full ${getColorClass(item.color)}`} />
                <span className="capitalize font-medium">{item.color}</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <span>Type:</span>
                <span className="capitalize font-medium">{item.type}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClothingItem;