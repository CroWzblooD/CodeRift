import React, { useState, useContext } from 'react';
import { WardrobeContext } from '../context/WardrobeContext';
import AddItemForm from './AddItemForm';
import ClothingItem from './ClothingItem';

const WardrobeDashboard = () => {
  const { clothes, addClothingItem, weather } = useContext(WardrobeContext);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedColor, setSelectedColor] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  const categories = ['all', 't-shirt', 'jeans', 'shoes', 'dress', 'jacket', 'accessories'];

  const colors = ['all', 'white', 'black', 'blue', 'red', 'green', 'yellow', 'orange', 'purple', 'pink', 'gray', 'brown'];
  const types = ['all', 'casual', 'formal', 'sport', 'party'];

  const filteredClothes = clothes.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesColor = selectedColor === 'all' || item.color === selectedColor;
    const matchesType = selectedType === 'all' || item.type === selectedType;
    const matchesSearch = searchTerm === '' || 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.color.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesColor && matchesType && matchesSearch;
  });

  return (
    <div className={`min-h-screen bg-gradient-to-br ${weather === 'winter' ? 'from-blue-50' : 'from-orange-50'} to-white pl-64`}>
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className={`text-4xl font-bold ${weather === 'winter' ? 'text-blue-600' : 'text-orange-600'} mb-2`}>My Wardrobe</h1>
          <p className="text-gray-600">Organize your style, discover your look</p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search items by name, category, or color..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-${weather === 'winter' ? 'blue' : 'orange'}-500 focus:border-transparent`}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                      selectedCategory === category
                        ? (weather === 'winter' ? 'bg-blue-500 text-white shadow-md' : 'bg-orange-500 text-white shadow-md')
                        : (weather === 'winter' ? 'bg-white text-gray-600 hover:bg-blue-100 border border-gray-200' : 'bg-white text-gray-600 hover:bg-orange-100 border border-gray-200')
                    }`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
              <div className="flex flex-wrap gap-2">
                {colors.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                      selectedColor === color
                        ? (weather === 'winter' ? 'bg-blue-500 text-white shadow-md' : 'bg-orange-500 text-white shadow-md')
                        : (weather === 'winter' ? 'bg-white text-gray-600 hover:bg-blue-100 border border-gray-200' : 'bg-white text-gray-600 hover:bg-orange-100 border border-gray-200')
                    }`}
                  >
                    {color.charAt(0).toUpperCase() + color.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
              <div className="flex flex-wrap gap-2">
                {types.map(type => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                      selectedType === type
                        ? (weather === 'winter' ? 'bg-blue-500 text-white shadow-md' : 'bg-orange-500 text-white shadow-md')
                        : (weather === 'winter' ? 'bg-white text-gray-600 hover:bg-blue-100 border border-gray-200' : 'bg-white text-gray-600 hover:bg-orange-100 border border-gray-200')
                    }`}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Add Item Button */}
          <button
            onClick={() => setShowAddForm(true)}
            className={`${weather === 'winter' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-orange-500 hover:bg-orange-600'} text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105`}
          >
            + Add Item
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className={`bg-white p-4 rounded-lg shadow-md border ${weather === 'winter' ? 'border-blue-100' : 'border-orange-100'}`}>
            <div className={`text-2xl font-bold ${weather === 'winter' ? 'text-blue-600' : 'text-orange-600'}`}>{clothes.length}</div>
            <div className="text-gray-600 text-sm">Total Items</div>
          </div>
          <div className={`bg-white p-4 rounded-lg shadow-md border ${weather === 'winter' ? 'border-blue-100' : 'border-orange-100'}`}>
            <div className={`text-2xl font-bold ${weather === 'winter' ? 'text-blue-600' : 'text-orange-600'}`}>
              {clothes.filter(item => item.category === 't-shirt').length}
            </div>
            <div className="text-gray-600 text-sm">T-Shirts</div>
          </div>
          <div className={`bg-white p-4 rounded-lg shadow-md border ${weather === 'winter' ? 'border-blue-100' : 'border-orange-100'}`}>
            <div className={`text-2xl font-bold ${weather === 'winter' ? 'text-blue-600' : 'text-orange-600'}`}>
              {clothes.filter(item => item.category === 'jeans').length}
            </div>
            <div className="text-gray-600 text-sm">Jeans</div>
          </div>
          <div className={`bg-white p-4 rounded-lg shadow-md border ${weather === 'winter' ? 'border-blue-100' : 'border-orange-100'}`}>
            <div className={`text-2xl font-bold ${weather === 'winter' ? 'text-blue-600' : 'text-orange-600'}`}>
              {clothes.filter(item => item.category === 'shoes').length}
            </div>
            <div className="text-gray-600 text-sm">Shoes</div>
          </div>
        </div>

        {/* Clothing Grid */}
        {filteredClothes.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">👕</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No items found</h3>
            <p className="text-gray-500">Add some clothes to your wardrobe to get started!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredClothes.map(item => (
              <ClothingItem key={item.id} item={item} />
            ))}
          </div>
        )}

        {/* Add Item Modal */}
        {showAddForm && (
          <AddItemForm 
            onClose={() => setShowAddForm(false)}
            onAdd={addClothingItem}
          />
        )}
      </div>
    </div>
  );
};

export default WardrobeDashboard;