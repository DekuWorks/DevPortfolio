# 🍽️ Picky Eater App

A modern web application designed to help picky eaters discover new foods, plan meals, and track their nutrition goals with customizable macro targets.

## ✨ Features

- **Responsive Design** - Works seamlessly across all devices
- **User Authentication** - Secure registration and login system
- **Recipe Discovery** - Browse and filter recipes by dietary preferences
- **Meal Planning** - Create and manage weekly meal plans
- **Nutrition Tracking** - Monitor calories, macros, and micronutrients
- **Customizable Targets** - Set personal nutrition goals
- **Dark Mode** - Toggle between light and dark themes
- **Accessibility** - Full keyboard navigation and screen reader support

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd picky-eater-app
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 📁 Project Structure

```
picky-eater-app/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   ├── pages/             # Page components
│   ├── contexts/          # React Context providers
│   ├── utils/             # Utility functions
│   ├── styles/            # Global styles and Tailwind config
│   ├── App.jsx            # Main app component
│   └── main.jsx           # App entry point
├── docs/                  # Documentation
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run format` - Format code with Prettier

## 🎨 Tech Stack

- **Frontend Framework** - React 18 with JavaScript
- **Build Tool** - Vite
- **Styling** - TailwindCSS
- **Routing** - React Router DOM
- **Icons** - Lucide React
- **Code Quality** - ESLint + Prettier

## 📋 Development Tasks

### ✅ Completed
- [x] Project setup with Vite + React + TailwindCSS
- [x] Configure Prettier + ESLint
- [x] Set up .gitignore and README.md
- [x] Create responsive landing page
- [x] Set up routing with react-router-dom
- [x] Build registration & login pages
- [x] Create dashboard layout with sidebar/nav
- [x] Design recipe cards & meal plan templates
- [x] Build customizable macro targets & tracking UI
- [x] Add filtering (by carb, protein, calories, etc.)
- [x] Add dark mode toggle
- [x] Accessibility review (keyboard nav, contrast)
- [x] Testing across different screen sizes
- [x] Convert from TypeScript to JavaScript for easier development

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Icons provided by [Lucide](https://lucide.dev/)
- Styling with [TailwindCSS](https://tailwindcss.com/)
- Build tool powered by [Vite](https://vitejs.dev/)

