# 🚢 ShipItApp - Voice & Video Shoutouts Platform

A modern web application for sharing and discovering voice and video shoutouts, built with ASP.NET Core and modern web technologies.

## ✨ Features

### 🎯 Core Features
- **Voice & Video Uploads**: Support for audio (MP3, WAV, M4A) and video (MP4, AVI, MOV) files
- **Dark Theme UI**: Modern, responsive dark theme interface
- **Real-time Interactions**: Upvote/downvote system with live updates
- **Tag System**: Organize content with hashtags and watched tags
- **Search Functionality**: Find posts, users, and tags quickly
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile

### 🎨 User Interface
- **Sidebar Navigation**: Easy access to Home, Tags, Users, Profile, Your Posts, and Settings
- **Top Navigation Bar**: Search functionality and "New Post" button
- **Tab System**: Switch between Watching, Popular, New, and Top posts
- **Post Cards**: Clean, modern design with vote buttons and comment counts
- **Upload Area**: Drag & drop file upload with visual feedback

### 🔧 Technical Features
- **ASP.NET Core Backend**: RESTful API with CORS support
- **Static File Serving**: Automatic file serving from wwwroot/uploads
- **File Validation**: Comprehensive file type and size validation
- **Error Handling**: Robust error handling with user-friendly messages
- **Swagger Documentation**: API documentation available at `/swagger`

## 🚀 Quick Start

### Prerequisites
- .NET 8.0 SDK
- Visual Studio 2022 or VS Code
- Modern web browser

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ShipItApp
   ```

2. **Restore dependencies**
   ```bash
   dotnet restore
   ```

3. **Run the application**
   ```bash
   dotnet run
   ```

4. **Open in browser**
   Navigate to `https://localhost:5001` or `http://localhost:5000`

## 📁 Project Structure

```
/ShipItApp/
├── index.html              # Main HTML layout
├── styles.css              # Dark theme CSS styling
├── App.js                  # Frontend JavaScript functionality
├── wwwroot/uploads/        # File storage directory
├── Controllers/
│   └── ShoutoutController.cs  # API endpoints for shoutouts
├── Models/
│   └── Shoutout.cs        # Data model for shoutouts
├── Validation.cs           # Input and file validation utilities
├── Menu.cs                 # Navigation menu component
├── App.cs                  # Application configuration
├── Program.cs              # ASP.NET Core startup
├── ADF_2506_BrownMarcus.csproj  # Project file
└── README.md              # This file
```

## 🔌 API Endpoints

### POST /api/shoutouts
Upload a new voice or video shoutout.

**Request:**
- Content-Type: `multipart/form-data`
- Body: `file` (audio/video file), `userName` (optional)

**Response:**
```json
{
  "message": "Shoutout uploaded successfully",
  "shoutout": {
    "id": 1,
    "userName": "Anonymous",
    "fileName": "20241209123456_guid.mp3",
    "uploadedAt": "2024-12-09T12:34:56Z",
    "fileUrl": "/uploads/20241209123456_guid.mp3"
  }
}
```

### GET /api/shoutouts
Retrieve all shoutouts.

**Response:**
```json
{
  "shoutouts": [
    {
      "id": 1,
      "userName": "Anonymous",
      "fileName": "20241209123456_guid.mp3",
      "uploadedAt": "2024-12-09T12:34:56Z",
      "fileUrl": "/uploads/20241209123456_guid.mp3"
    }
  ]
}
```

### GET /api/shoutouts/{id}
Retrieve a specific shoutout by ID.

**Response:**
```json
{
  "id": 1,
  "userName": "Anonymous",
  "fileName": "20241209123456_guid.mp3",
  "uploadedAt": "2024-12-09T12:34:56Z",
  "fileUrl": "/uploads/20241209123456_guid.mp3"
}
```

## 🎨 UI Components

### Navigation
- **Sidebar**: Fixed left sidebar with navigation items and watched tags
- **Top Bar**: Sticky top bar with search and new post button
- **Tabs**: Horizontal tab navigation for different post views

### Post Cards
- **Title**: Post title with hover effects
- **Tags**: Colorful tag badges
- **Meta**: Username and timestamp
- **Actions**: Upvote/downvote buttons with counts
- **Comments**: Comment count display

### Upload Section
- **Drag & Drop**: Visual feedback for file uploads
- **File Validation**: Real-time file type and size validation
- **Progress Feedback**: Success/error notifications

## 🔒 Security Features

### File Validation
- **Type Checking**: Only audio and video files allowed
- **Size Limits**: Maximum 100MB file size
- **Extension Validation**: Whitelist of allowed file extensions
- **Unique Filenames**: Timestamp + GUID to prevent conflicts

### Input Validation
- **Username**: 3-50 characters, alphanumeric + underscore/hyphen
- **Search Queries**: 1-200 characters
- **Tags**: 1-30 characters, alphanumeric + underscore/hyphen

## 📱 Responsive Design

### Breakpoints
- **Desktop**: 1024px+ (full sidebar)
- **Tablet**: 768px-1024px (compact sidebar)
- **Mobile**: <768px (collapsible sidebar)

### Mobile Features
- **Touch-Friendly**: Large touch targets
- **Swipe Navigation**: Smooth transitions
- **Optimized Layout**: Stacked elements for small screens

## 🛠️ Development

### Adding New Features
1. Create new controller endpoints in `Controllers/`
2. Add validation rules in `Validation.cs`
3. Update frontend JavaScript in `App.js`
4. Style new components in `styles.css`

### File Upload Process
1. User selects file via drag & drop or file picker
2. Frontend validates file type and size
3. File uploaded to `/api/shoutouts` endpoint
4. Backend validates and saves to `wwwroot/uploads/`
5. Success notification shown to user

### Customization
- **Colors**: Modify CSS variables in `styles.css`
- **File Types**: Update allowed extensions in `Validation.cs`
- **File Size**: Change `MaxFileSizeBytes` in `Validation.cs`
- **UI Layout**: Modify HTML structure in `index.html`

## 🐛 Troubleshooting

### Common Issues

**File upload fails:**
- Check file size (max 100MB)
- Verify file type is audio/video
- Ensure `wwwroot/uploads/` directory exists

**CORS errors:**
- Verify CORS is enabled in `Program.cs`
- Check browser console for specific errors

**Static files not loading:**
- Ensure `app.UseStaticFiles()` is called
- Check file paths in `wwwroot/`

### Debug Mode
Run with debug information:
```bash
dotnet run --environment Development
```

Access Swagger documentation at `/swagger` for API testing.

## 📄 License

This project is created for educational purposes as part of the ADF_2506 course.

## 👨‍💻 Author

Marcus Brown - ADF_2506 Course Project

---

**ShipItApp** - Where voices and videos find their audience! 🚢✨
