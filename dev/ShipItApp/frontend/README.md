# 🎨 ShipItApp Frontend

The frontend for ShipItApp is built with vanilla JavaScript, HTML5, and CSS3, featuring a modern dark theme and responsive design.

## 📁 File Structure

```
frontend/
├── index.html      # Main HTML layout with sidebar and content areas
├── styles.css      # Dark theme CSS with responsive design
├── App.js          # JavaScript functionality for interactions
└── README.md       # This file
```

## 🎯 Features

### 🎨 User Interface
- **Dark Theme**: Modern dark color scheme with accent colors
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Sidebar Navigation**: Fixed left sidebar with navigation items
- **Top Bar**: Search functionality and new post button
- **Tab System**: Switch between different post views
- **Post Cards**: Clean design with vote buttons and metadata

### 🔧 Interactive Features
- **Drag & Drop Upload**: Visual feedback for file uploads
- **File Validation**: Real-time validation of file types and sizes
- **Vote System**: Upvote/downvote buttons with live updates
- **Search**: Real-time search through posts, tags, and users
- **Tag System**: Colorful tag badges with hover effects

## 🎨 Design System

### Color Palette
- **Primary**: Dark backgrounds (#1a1a1a, #2d2d2d)
- **Accent**: Blue highlights (#007bff, #0056b3)
- **Text**: Light text (#ffffff, #e0e0e0)
- **Borders**: Subtle borders (#404040)

### Typography
- **Font Family**: System fonts with fallbacks
- **Headings**: Bold weights for hierarchy
- **Body Text**: Regular weight for readability

### Components

#### Sidebar
- Fixed left sidebar with navigation
- Watched tags section
- Collapsible on mobile

#### Post Cards
- Clean card design with shadows
- Vote buttons with counts
- Tag badges with colors
- Username and timestamp

#### Upload Area
- Drag & drop zone with visual feedback
- File type validation
- Progress indicators
- Success/error notifications

## 📱 Responsive Breakpoints

### Desktop (1024px+)
- Full sidebar visible
- Multi-column layouts
- Hover effects enabled

### Tablet (768px-1024px)
- Compact sidebar
- Adjusted spacing
- Touch-friendly buttons

### Mobile (<768px)
- Collapsible sidebar
- Stacked layouts
- Large touch targets

## 🔧 JavaScript Features

### File Upload
```javascript
// Drag & drop functionality
uploadArea.addEventListener('dragover', handleDragOver);
uploadArea.addEventListener('drop', handleFileDrop);

// File validation
function validateFile(file) {
    // Check file type and size
}
```

### Vote System
```javascript
// Upvote/downvote functionality
voteButtons.forEach(button => {
    button.addEventListener('click', handleVote);
});
```

### Search
```javascript
// Real-time search
searchInput.addEventListener('input', handleSearch);
```

## 🎨 CSS Features

### Dark Theme Variables
```css
:root {
    --bg-primary: #1a1a1a;
    --bg-secondary: #2d2d2d;
    --text-primary: #ffffff;
    --accent-blue: #007bff;
}
```

### Responsive Grid
```css
.posts-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1rem;
}
```

### Animations
```css
.post-card {
    transition: transform 0.2s ease;
}

.post-card:hover {
    transform: translateY(-2px);
}
```

## 🚀 Getting Started

1. **Open the frontend**
   ```bash
   cd frontend
   ```

2. **Serve the files**
   Use any static file server or open `index.html` directly in a browser

3. **Connect to backend**
   Ensure the ASP.NET Core backend is running on the configured port

## 🔧 Customization

### Colors
Modify CSS variables in `styles.css`:
```css
:root {
    --accent-blue: #your-color;
    --bg-primary: #your-bg-color;
}
```

### Layout
Adjust grid and flexbox properties in `styles.css` for different layouts.

### Components
Add new components by following the existing patterns in `index.html` and `styles.css`.

## 📄 License

This frontend is part of the ShipItApp project created for educational purposes.

---

**ShipItApp Frontend** - Modern, responsive, and user-friendly! 🎨✨ 