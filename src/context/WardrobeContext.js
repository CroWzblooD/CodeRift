import React, { createContext, useContext, useReducer } from 'react';

const WardrobeContext = createContext();

// Load data from localStorage or use default
const loadFromStorage = (key, defaultValue) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return defaultValue;
  }
};

// Save data to localStorage
const saveToStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

// Initial state with sample data
const initialState = {
  clothes: loadFromStorage('wardrobe_clothes', [
    {
      id: 1,
      name: "Classic White T-Shirt",
      category: "t-shirt",
      color: "white",
      imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
      type: "casual"
    },
    {
      id: 2,
      name: "Blue Denim Jeans",
      category: "jeans",
      color: "blue",
      imageUrl: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop",
      type: "casual"
    },
    {
      id: 3,
      name: "White Sneakers",
      category: "shoes",
      color: "white",
      imageUrl: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop",
      type: "casual"
    },
    {
      id: 4,
      name: "Black Leather Jacket",
      category: "jacket",
      color: "black",
      imageUrl: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop",
      type: "formal"
    },
    {
      id: 5,
      name: "Red Summer Dress",
      category: "dress",
      color: "red",
      imageUrl: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=400&fit=crop",
      type: "casual"
    },
    {
      id: 6,
      name: "Orange Polo Shirt",
      category: "t-shirt",
      color: "orange",
      imageUrl: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=400&h=400&fit=crop",
      type: "casual"
    },
    {
      id: 7,
      name: "Black Formal Shirt",
      category: "t-shirt",
      color: "black",
      imageUrl: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400&h=400&fit=crop",
      type: "formal"
    },
    {
      id: 8,
      name: "Gray Hoodie",
      category: "jacket",
      color: "gray",
      imageUrl: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop",
      type: "casual"
    },
    {
      id: 9,
      name: "Brown Leather Boots",
      category: "shoes",
      color: "brown",
      imageUrl: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=400&h=400&fit=crop",
      type: "formal"
    },
    {
      id: 10,
      name: "Green Summer Dress",
      category: "dress",
      color: "green",
      imageUrl: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400&h=400&fit=crop",
      type: "casual"
    },
    {
      id: 11,
      name: "Purple Evening Dress",
      category: "dress",
      color: "purple",
      imageUrl: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=400&fit=crop",
      type: "party"
    },
    {
      id: 12,
      name: "Yellow Sport Shirt",
      category: "t-shirt",
      color: "yellow",
      imageUrl: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400&h=400&fit=crop",
      type: "sport"
    },
    {
      id: 13,
      name: "Pink Blouse",
      category: "t-shirt",
      color: "pink",
      imageUrl: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=400&h=400&fit=crop",
      type: "casual"
    },
    {
      id: 14,
      name: "Black Skinny Jeans",
      category: "jeans",
      color: "black",
      imageUrl: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=400&fit=crop",
      type: "casual"
    },
    {
      id: 15,
      name: "Red High Heels",
      category: "shoes",
      color: "red",
      imageUrl: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=400&fit=crop",
      type: "party"
    }
  ]),
  outfits: loadFromStorage('wardrobe_outfits', []),
  weather: loadFromStorage('wardrobe_weather', "summer"),
  likedOutfits: loadFromStorage('wardrobe_likedOutfits', [])
};

// Action types
const ACTIONS = {
  ADD_CLOTHING: 'ADD_CLOTHING',
  REMOVE_CLOTHING: 'REMOVE_CLOTHING',
  GENERATE_OUTFIT: 'GENERATE_OUTFIT',
  LIKE_OUTFIT: 'LIKE_OUTFIT',
  DISLIKE_OUTFIT: 'DISLIKE_OUTFIT',
  SET_WEATHER: 'SET_WEATHER'
};

// Reducer function
const wardrobeReducer = (state, action) => {
  let newState;
  
  switch (action.type) {
    case ACTIONS.ADD_CLOTHING:
      newState = {
        ...state,
        clothes: [...state.clothes, { ...action.payload, id: Date.now() }]
      };
      saveToStorage('wardrobe_clothes', newState.clothes);
      return newState;
    
    case ACTIONS.REMOVE_CLOTHING:
      newState = {
        ...state,
        clothes: state.clothes.filter(item => item.id !== action.payload)
      };
      saveToStorage('wardrobe_clothes', newState.clothes);
      return newState;
    
    case ACTIONS.GENERATE_OUTFIT:
      const newOutfit = {
        id: Date.now(),
        items: action.payload,
        createdAt: new Date().toISOString()
      };
      newState = {
        ...state,
        outfits: [newOutfit, ...state.outfits]
      };
      saveToStorage('wardrobe_outfits', newState.outfits);
      return newState;
    
    case ACTIONS.LIKE_OUTFIT:
      newState = {
        ...state,
        likedOutfits: [...state.likedOutfits, action.payload]
      };
      saveToStorage('wardrobe_likedOutfits', newState.likedOutfits);
      return newState;
    
    case ACTIONS.DISLIKE_OUTFIT:
      newState = {
        ...state,
        likedOutfits: state.likedOutfits.filter(id => id !== action.payload)
      };
      saveToStorage('wardrobe_likedOutfits', newState.likedOutfits);
      return newState;
    
    case ACTIONS.SET_WEATHER:
      newState = {
        ...state,
        weather: action.payload
      };
      saveToStorage('wardrobe_weather', newState.weather);
      return newState;
    
    default:
      return state;
  }
};

// Provider component
export const WardrobeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(wardrobeReducer, initialState);

  const addClothingItem = (item) => {
    dispatch({ type: ACTIONS.ADD_CLOTHING, payload: item });
  };

  const removeClothingItem = (id) => {
    dispatch({ type: ACTIONS.REMOVE_CLOTHING, payload: id });
  };

  const generateOutfit = (items) => {
    dispatch({ type: ACTIONS.GENERATE_OUTFIT, payload: items });
  };

  const likeOutfit = (outfitId) => {
    dispatch({ type: ACTIONS.LIKE_OUTFIT, payload: outfitId });
  };

  const dislikeOutfit = (outfitId) => {
    dispatch({ type: ACTIONS.DISLIKE_OUTFIT, payload: outfitId });
  };

  const setWeather = (weather) => {
    dispatch({ type: ACTIONS.SET_WEATHER, payload: weather });
  };

  const value = {
    ...state,
    addClothingItem,
    removeClothingItem,
    generateOutfit,
    likeOutfit,
    dislikeOutfit,
    setWeather
  };

  return (
    <WardrobeContext.Provider value={value}>
      {children}
    </WardrobeContext.Provider>
  );
};

// Custom hook to use the context
export const useWardrobe = () => {
  const context = useContext(WardrobeContext);
  if (!context) {
    throw new Error('useWardrobe must be used within a WardrobeProvider');
  }
  return context;
};

export { WardrobeContext };