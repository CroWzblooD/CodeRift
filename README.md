# 👗 CodeRift - Intelligent Wardrobe Web App

<div align="center">

![CodeRift Logo](https://img.shields.io/badge/CodeRift-Wardrobe%20App-blueviolet?style=for-the-badge&logo=react)
![React](https://img.shields.io/badge/React-19.1.0-61dafb?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4+-38bdf8?style=for-the-badge&logo=tailwindcss)
![Context API](https://img.shields.io/badge/Context%20API-State%20Management-10b981?style=for-the-badge&logo=react)

**Your smart, stylish, and responsive digital wardrobe**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=for-the-badge)](http://makeapullrequest.com)

</div>

---

## 📋 Table of Contents

- [🎯 Assignment & Objective](#-assignment--objective)
- [🚀 Key Features](#-key-features)
- [🏗️ Architecture](#️-architecture)
- [🛠️ Tech Stack](#️-tech-stack)
- [📦 Installation & Setup](#-installation--setup)
- [🎮 Usage Guide](#-usage-guide)
- [🔬 Technical Details](#-technical-details)
- [🐛 Troubleshooting](#-troubleshooting)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## 🎯 Assignment & Objective

**Assignment Task: Wardrobe Web App (Frontend Only)**

**Objective:**

Create a responsive web app where users can:

- Add / View their clothes
- Upload images (mock upload)
- Add details: type, color, category (e.g., T-shirt, Jeans)
- Get Outfit Recommendations (mock AI or rule-based logic)
- Filter clothes by category
- Generate and view outfit suggestions
- Like/Dislike outfits (UI only)
- Mobile-friendly, modern UI

**Bonus Features:**
- Smart color-based matching
- Weather toggle (Summer/Winter)
- Drag & drop to create outfit manually

**Tech Stack:**
- React.js
- React Context API (state management)
- Tailwind CSS
- No backend/API — mock data only

---

## 🚀 Key Features

### 👚 **Wardrobe Dashboard**
- Grid layout to display clothes (image + category)
- Add Item form (mock image upload, select type/color/category)
- Filter by category, color, and type
- Search bar for quick lookup

### 🧠 **Outfit Generator**
- "Generate Outfit" button (random or smart logic)
- Display outfit images and details
- Like/Dislike buttons (UI only)
- Weather toggle (Summer/Winter) — changes color palette

### 🖱️ **Drag & Drop Outfit Creator**
- Drag clothing items into outfit slots
- Preview and save created outfits
- Success message on creation

### 🎨 **Modern, Responsive UI**
- Fully responsive (flex/grid)
- Clean, beautiful design with Tailwind CSS
- Smooth animations
- Mobile-friendly layout

### ⚡ **Persistence & State**
- All wardrobe and outfit data saved in browser localStorage
- State managed with React Context API

---

## 🏗️ Architecture

```
┌───────────────┐    ┌────────────────────┐
│   Frontend    │    │   Browser Storage  │
│  (React.js)   │◄──►│   (localStorage)   │
│               │    └────────────────────┘
│ • Components  │
│ • Context API │
│ • TailwindCSS │
└───────────────┘
```

### **Data Flow**

1. **User Input** → Add/view clothes, generate outfits
2. **State Management** → Context API for wardrobe, outfits, weather
3. **Persistence** → Save/load from localStorage
4. **UI Rendering** → Responsive React components styled with Tailwind

---

## 🛠️ Tech Stack

| Technology         | Version   | Purpose                        |
|--------------------|-----------|--------------------------------|
| **React**          | 19.1.0    | UI framework                   |
| **Tailwind CSS**   | 3.4+      | Styling                        |
| **Context API**    | Built-in  | State management               |
| **Jest**           | 29+       | Testing                        |
| **React Testing**  | 16+       | Component testing              |

---

## 📦 Installation & Setup

### **Prerequisites**
- **Node.js 18+**
- **npm**
- **Git**

### **1. Clone the Repository**
```bash
git clone https://github.com/yourusername/coderift-wardrobe.git
cd coderift-wardrobe
```

### **2. Install Dependencies**
```bash
npm install
```

### **3. Start the App**
```bash
npm start
```

### **4. Access the App**
- Open [http://localhost:3000](http://localhost:3000) in your browser

---

## 🎮 Usage Guide

### **Getting Started**
1. **Open the App**: Go to [http://localhost:3000](http://localhost:3000)
2. **Add Clothes**: Use the "+ Add Item" button to add new clothing (mock image upload, select type, color, category)
3. **View Wardrobe**: Browse your wardrobe in a grid layout
4. **Filter/Search**: Use filters and search bar to find items
5. **Generate Outfits**: Go to "Outfit Generator" and click "Generate Outfit" for suggestions
6. **Like/Dislike**: Use the buttons to like/dislike generated outfits (UI only)
7. **Weather Toggle**: Switch between Summer/Winter for different color palettes
8. **Drag & Drop**: Use the "Drag & Drop" tab to manually create outfits

---

## 🔬 Technical Details

### **State Management**
- Uses React Context API for global state (wardrobe, outfits, weather)
- All changes are persisted to localStorage for data retention

### **Outfit Generation Logic**
- Random and rule-based (color/season) outfit suggestions
- Smart matching for bonus (color/season-aware)

### **Weather Toggle**
- UI palette switches between orange (summer) and blue (winter) instantly

### **Drag & Drop**
- Drag items into outfit slots, preview, and save

### **No Backend**
- All data is mock and stored in browser only

---

## 🐛 Troubleshooting

### **Common Issues**
- **Tailwind CSS not working**: Ensure `postcss`, `autoprefixer`, and `tailwindcss` are installed and configured in `postcss.config.js` and `tailwind.config.js`.
- **LocalStorage not saving**: Check browser privacy settings
- **App not starting**: Run `npm install` and ensure Node.js 18+
- **Build errors**: Delete `node_modules` and `package-lock.json`, then reinstall

### **Performance Tips**
- Use production build for best performance: `npm run build`
- Use modern browsers for best compatibility

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

### **1. Fork the Repository**
```bash
git clone https://github.com/yourusername/coderift-wardrobe.git
cd coderift-wardrobe
```

### **2. Create a Feature Branch**
```bash
git checkout -b feature/amazing-feature
```

### **3. Make Changes**
- Follow the existing code style
- Add tests for new features
- Update documentation

### **4. Commit & Push**
```bash
git commit -m "Add amazing feature"
git push origin feature/amazing-feature
```

### **5. Open Pull Request**
Create a pull request with a detailed description of your changes.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Made with ❤️ by the CodeRift Team**

[![GitHub stars](https://img.shields.io/github/stars/yourusername/coderift-wardrobe?style=social)](https://github.com/yourusername/coderift-wardrobe)
[![GitHub forks](https://img.shields.io/github/forks/yourusername/coderift-wardrobe?style=social)](https://github.com/yourusername/coderift-wardrobe)
[![GitHub issues](https://img.shields.io/github/issues/yourusername/coderift-wardrobe)](https://github.com/yourusername/coderift-wardrobe/issues)

</div>
