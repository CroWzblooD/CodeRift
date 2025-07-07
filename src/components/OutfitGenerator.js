import React, { useState, useContext } from 'react';
import { WardrobeContext } from '../context/WardrobeContext';

const OutfitGenerator = () => {
  const { clothes, outfits, weather, generateOutfit, likeOutfit, dislikeOutfit, setWeather, likedOutfits } = useContext(WardrobeContext);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentOutfit, setCurrentOutfit] = useState(null);

  // Advanced color matching rules with style combinations
  const colorMatches = {
    'white': ['black', 'blue', 'red', 'green', 'yellow', 'orange', 'purple', 'pink', 'gray', 'brown'],
    'black': ['white', 'red', 'blue', 'green', 'yellow', 'orange', 'purple', 'pink', 'gray', 'brown'],
    'blue': ['white', 'black', 'gray', 'orange', 'yellow', 'red', 'brown'],
    'red': ['white', 'black', 'blue', 'gray', 'yellow', 'orange'],
    'green': ['white', 'black', 'brown', 'gray', 'yellow', 'orange'],
    'yellow': ['white', 'black', 'blue', 'gray', 'green', 'orange', 'purple'],
    'orange': ['white', 'black', 'blue', 'gray', 'yellow', 'green', 'brown'],
    'purple': ['white', 'black', 'gray', 'yellow', 'pink'],
    'pink': ['white', 'black', 'gray', 'purple', 'red'],
    'gray': ['white', 'black', 'blue', 'red', 'green', 'yellow', 'orange', 'purple', 'pink', 'brown'],
    'brown': ['white', 'black', 'green', 'orange', 'gray', 'blue']
  };

  // Style-based outfit templates
  const outfitTemplates = {
    'casual': ['t-shirt', 'jeans', 'shoes'],
    'formal': ['t-shirt', 'jeans', 'shoes', 'jacket'],
    'party': ['dress', 'shoes'],
    'sport': ['t-shirt', 'jeans', 'shoes']
  };

  // Weather-based recommendations
  const weatherRecommendations = {
    'summer': {
      categories: ['t-shirt', 'dress', 'shoes'],
      avoid: ['jacket']
    },
    'winter': {
      categories: ['jacket', 't-shirt', 'jeans', 'shoes'],
      prefer: ['jacket']
    }
  };

  const generateSmartOutfit = (style = null) => {
    setIsGenerating(true);
    
    setTimeout(() => {
      // Determine style preference
      const targetStyle = style || ['casual', 'formal', 'party', 'sport'][Math.floor(Math.random() * 4)];
      const template = outfitTemplates[targetStyle] || outfitTemplates['casual'];
      const weatherRules = weatherRecommendations[weather];
      let availableClothes = clothes.filter(item => {
        if (weather === 'winter' && weatherRules.prefer.includes(item.category)) {
          return true;
        }
        if (weather === 'summer' && weatherRules.avoid.includes(item.category)) {
          return false;
        }
        return true;
      });

      if (availableClothes.length < 2) {
        availableClothes = clothes;
      }

      // Get one item from each main category
      const tshirts = availableClothes.filter(item => item.category === 't-shirt');
      const jeans = availableClothes.filter(item => item.category === 'jeans');
      const shoes = availableClothes.filter(item => item.category === 'shoes');
      const jackets = availableClothes.filter(item => item.category === 'jacket');
      const dresses = availableClothes.filter(item => item.category === 'dress');

      let outfitItems = [];

      // Enhanced smart color matching and season-based logic
      if (weather === 'winter') {
        // Winter logic: prefer jackets, warm colors, layered looks
        if (jackets.length > 0) {
          const jacket = jackets[Math.floor(Math.random() * jackets.length)];
          outfitItems.push(jacket);
          
          // Find matching t-shirts with winter-appropriate colors
          const winterColors = ['black', 'gray', 'blue', 'brown', 'white'];
          const matchingTshirts = tshirts.filter(item => 
            (colorMatches[jacket.color]?.includes(item.color) || 
             colorMatches[item.color]?.includes(jacket.color)) &&
            winterColors.includes(item.color)
          );
          
          if (matchingTshirts.length > 0) {
            outfitItems.push(matchingTshirts[Math.floor(Math.random() * matchingTshirts.length)]);
          } else if (tshirts.length > 0) {
            outfitItems.push(tshirts[Math.floor(Math.random() * tshirts.length)]);
          }
        } else if (tshirts.length > 0) {
          // Fallback to t-shirt + jeans for winter
          const winterTshirts = tshirts.filter(item => 
            ['black', 'gray', 'blue', 'brown', 'white'].includes(item.color)
          );
          const selectedTshirt = winterTshirts.length > 0 
            ? winterTshirts[Math.floor(Math.random() * winterTshirts.length)]
            : tshirts[Math.floor(Math.random() * tshirts.length)];
          outfitItems.push(selectedTshirt);
        }
      } else {
        // Summer logic: prefer light colors, dresses, breathable fabrics
        if (dresses.length > 0) {
          const summerDresses = dresses.filter(item => 
            ['white', 'yellow', 'orange', 'pink', 'green', 'blue'].includes(item.color)
          );
          const selectedDress = summerDresses.length > 0 
            ? summerDresses[Math.floor(Math.random() * summerDresses.length)]
            : dresses[Math.floor(Math.random() * dresses.length)];
          outfitItems.push(selectedDress);
        } else if (tshirts.length > 0) {
          // Summer t-shirt + jeans combination
          const summerTshirts = tshirts.filter(item => 
            ['white', 'yellow', 'orange', 'pink', 'green', 'blue'].includes(item.color)
          );
          const selectedTshirt = summerTshirts.length > 0 
            ? summerTshirts[Math.floor(Math.random() * summerTshirts.length)]
            : tshirts[Math.floor(Math.random() * tshirts.length)];
          outfitItems.push(selectedTshirt);
          
          // Find matching jeans with summer-appropriate colors
          const matchingJeans = jeans.filter(item => 
            (colorMatches[selectedTshirt.color]?.includes(item.color) || 
             colorMatches[item.color]?.includes(selectedTshirt.color)) &&
            ['blue', 'white', 'gray'].includes(item.color)
          );
          
          if (matchingJeans.length > 0) {
            outfitItems.push(matchingJeans[Math.floor(Math.random() * matchingJeans.length)]);
          } else if (jeans.length > 0) {
            outfitItems.push(jeans[Math.floor(Math.random() * jeans.length)]);
          }
        }
      }

      // Add shoes
      if (shoes.length > 0) {
        outfitItems.push(shoes[Math.floor(Math.random() * shoes.length)]);
      }

      // If we don't have enough items, add random items
      while (outfitItems.length < 2 && availableClothes.length > outfitItems.length) {
        const remainingItems = availableClothes.filter(item => 
          !outfitItems.some(outfitItem => outfitItem.id === item.id)
        );
        if (remainingItems.length > 0) {
          outfitItems.push(remainingItems[Math.floor(Math.random() * remainingItems.length)]);
        } else {
          break;
        }
      }

      if (outfitItems.length > 0) {
        const newOutfit = {
          id: Date.now(),
          items: outfitItems,
          createdAt: new Date().toISOString()
        };
        
        setCurrentOutfit(newOutfit);
        generateOutfit(outfitItems);
      }
      
      setIsGenerating(false);
    }, 2000);
  };

  const handleLike = (outfitId) => {
    likeOutfit(outfitId);
    setCurrentOutfit(null);
  };

  const handleDislike = (outfitId) => {
    dislikeOutfit(outfitId);
    setCurrentOutfit(null);
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${weather === 'winter' ? 'from-blue-50' : 'from-orange-50'} to-white pl-64`}>
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className={`text-4xl font-bold ${weather === 'winter' ? 'text-blue-600' : 'text-orange-600'} mb-2`}>Outfit Generator</h1>
          <p className="text-gray-600">AI-powered style recommendations for every occasion</p>
        </div>

        {/* Weather Toggle */}
        <div className="flex justify-center mb-8">
          <div className={`bg-white rounded-full p-1 shadow-lg border ${weather === 'winter' ? 'border-blue-100' : 'border-orange-100'}`}>
            <div className="flex">
              <button
                onClick={() => setWeather('summer')}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                  weather === 'summer'
                    ? 'bg-orange-500 text-white shadow-md'
                    : 'text-gray-600 hover:text-orange-600'
                }`}
              >
                ☀️ Summer
              </button>
              <button
                onClick={() => setWeather('winter')}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                  weather === 'winter'
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                ❄️ Winter
              </button>
            </div>
          </div>
        </div>

        {/* Generate Options */}
        <div className="text-center mb-8">
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <button
              onClick={generateSmartOutfit}
              disabled={isGenerating || clothes.length < 2}
              className={`${weather === 'winter' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-orange-500 hover:bg-orange-600'} disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none`}
            >
              {isGenerating ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Generating...
                </div>
              ) : (
                '🎨 Smart Outfit'
              )}
            </button>
            
            <button
              onClick={() => generateSmartOutfit('casual')}
              disabled={isGenerating || clothes.length < 2}
              className={`${weather === 'winter' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-orange-500 hover:bg-orange-600'} disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none`}
            >
              👕 Casual Style
            </button>
            
            <button
              onClick={() => generateSmartOutfit('formal')}
              disabled={isGenerating || clothes.length < 2}
              className={`${weather === 'winter' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-orange-500 hover:bg-orange-600'} disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none`}
            >
              🎩 Formal Style
            </button>
            
            <button
              onClick={() => generateSmartOutfit('party')}
              disabled={isGenerating || clothes.length < 2}
              className={`${weather === 'winter' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-orange-500 hover:bg-orange-600'} disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none`}
            >
              🎉 Party Style
            </button>
          </div>
          
          {clothes.length < 2 && (
            <p className="text-gray-500">Add at least 2 items to your wardrobe to generate outfits</p>
          )}
        </div>

        {/* Current Outfit */}
        {currentOutfit && (
          <div className="max-w-2xl mx-auto mb-8">
            <div className={`bg-white rounded-2xl shadow-xl p-6 border ${weather === 'winter' ? 'border-blue-100' : 'border-orange-100'}`}>
              <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Your Generated Outfit</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {currentOutfit.items.map(item => (
                  <div key={item.id} className="bg-gray-50 rounded-lg p-4 text-center">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg mx-auto mb-2"
                    />
                    <h4 className="font-medium text-gray-800 text-sm">{item.name}</h4>
                    <p className="text-xs text-gray-600 capitalize">{item.category}</p>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => handleDislike(currentOutfit.id)}
                  className={`${weather === 'winter' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-orange-500 hover:bg-orange-600'} text-white rounded-lg font-medium transition-colors`}
                >
                  👎 Dislike
                </button>
                <button
                  onClick={() => handleLike(currentOutfit.id)}
                  className={`${weather === 'winter' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-orange-500 hover:bg-orange-600'} text-white rounded-lg font-medium transition-colors`}
                >
                  👍 Like
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Recent Outfits */}
        {outfits.length > 0 && (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Recent Outfits</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {outfits.slice(0, 6).map(outfit => (
                <div key={outfit.id} className={`bg-white rounded-xl shadow-md p-4 border ${weather === 'winter' ? 'border-blue-100' : 'border-orange-100'}`}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-500">
                      {new Date(outfit.createdAt).toLocaleDateString()}
                    </span>
                    {likedOutfits.includes(outfit.id) && (
                      <span className="text-green-500">👍 Liked</span>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {outfit.items.map(item => (
                      <div key={item.id} className="text-center">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg mx-auto mb-1"
                        />
                        <p className="text-xs text-gray-600 truncate">{item.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {outfits.length === 0 && !currentOutfit && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎨</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No outfits generated yet</h3>
            <p className="text-gray-500">Click the generate button to create your first outfit!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OutfitGenerator;