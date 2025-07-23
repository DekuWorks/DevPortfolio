# 🍽️ PickyEaterApp - Healthy Eating for Picky Eaters

A comprehensive web application designed to help picky eaters and people with dietary restrictions maintain healthy eating habits through personalized meal planning and recipe discovery.

## ✨ Features

### 🎯 Core Features
- **Healthy Meal Planning**: Curated meal suggestions based on dietary preferences and medical conditions
- **Medical Condition Support**: Specialized diets for diabetes, heart disease, IBS, celiac disease, and other conditions
- **Allergy & Intolerance Management**: Comprehensive allergy and food intolerance tracking
- **Nutrition-Focused Recipes**: Health-conscious recipes with detailed nutritional information
- **Shopping List Generation**: Automatic shopping lists based on meal plans
- **Recipe Ratings & Reviews**: Community-driven recipe feedback system

### 🎨 User Interface
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Intuitive Navigation**: Easy-to-use interface for all user types
- **Visual Recipe Cards**: Beautiful recipe presentation with images
- **Interactive Meal Planner**: Drag-and-drop meal planning interface
- **Progress Tracking**: Visual progress indicators for dietary goals

### 🔧 Technical Features
- **ASP.NET Core Backend**: RESTful API with JWT authentication
- **Entity Framework Core**: Database management with SQL Server
- **React Frontend**: Modern, responsive user interface
- **Image Upload**: Recipe image management
- **Nutritional Database**: Comprehensive nutritional information for all recipes

## 🚀 Quick Start

### Prerequisites
- .NET 8.0 SDK
- SQL Server or LocalDB
- Node.js 18+ (for frontend)
- Modern web browser

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/DekuWorks/PickyEaterApp.git
   cd PickyEaterApp
   ```

2. **Set up environment variables**
   ```bash
   cp env.example .env
   # Edit .env with your configuration
   ```

3. **Navigate to backend**
   ```bash
   cd backend
   ```

4. **Restore dependencies**
   ```bash
   dotnet restore
   ```

5. **Run database migrations**
   ```bash
   dotnet ef database update
   ```

6. **Run the backend**
   ```bash
   dotnet run
   ```

7. **Set up frontend**
   ```bash
   cd ../frontend
   npm install
   npm start
   ```

8. **Access the application**
   - Backend API: `https://localhost:5001`
   - Frontend: `http://localhost:3000`

## 📚 API Documentation

For detailed API documentation, see [docs/api.md](docs/api.md).

## 🔒 Security & Compliance

### User Data Handling
- User passwords are hashed using bcrypt
- Personal dietary preferences and medical conditions are encrypted and stored securely
- Allergy and intolerance information is protected and only accessible to authorized users
- Recipe ratings and reviews are anonymized for privacy
- All user data is handled in compliance with privacy regulations and HIPAA guidelines

### Third-Party Services
- **ASP.NET Core**: Web framework for backend API
- **Entity Framework Core**: Database management
- **JWT**: Token-based authentication
- **React**: Frontend framework
- **Food API**: External food database integration (optional)

### Copyright & License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### Usage Disclaimers
- This application is for educational and demonstration purposes
- Users should consult healthcare professionals for dietary advice
- Recipe suggestions are not medical recommendations
- Users are responsible for verifying ingredient safety for their allergies and medical conditions
- The app supports healthy eating but does not replace professional medical or nutritional advice

## 📁 Project Structure

```
/PickyEaterApp/
├── backend/
│   ├── Controllers/
│   │   ├── AuthController.cs        # Authentication endpoints
│   │   ├── PreferencesController.cs # Food preferences management
│   │   ├── MealsController.cs       # Meal planning endpoints
│   │   ├── RecipesController.cs     # Recipe management
│   │   └── ShoppingListController.cs # Shopping list generation
│   ├── Models/
│   │   ├── User.cs                  # User model
│   │   ├── Recipe.cs                # Recipe model
│   │   ├── MealPlan.cs              # Meal plan model
│   │   ├── Preference.cs            # User preferences model
│   │   └── ShoppingList.cs          # Shopping list model
│   ├── Services/
│   │   ├── AuthService.cs           # Authentication logic
│   │   ├── MealPlanningService.cs   # Meal planning algorithm
│   │   └── RecipeService.cs         # Recipe management
│   ├── Data/
│   │   └── PickyEaterDbContext.cs   # Database context
│   └── Program.cs                   # Application startup
├── frontend/
│   ├── src/
│   │   ├── components/              # React components
│   │   ├── pages/                   # Page components
│   │   ├── services/                # API services
│   │   └── utils/                   # Utility functions
│   ├── public/                      # Static assets
│   └── package.json                 # Frontend dependencies
├── docs/
│   └── api.md                       # API documentation
└── README.md                        # This file
```

## 🛠️ Development

### Adding New Features
1. Create new controller endpoints in `Controllers/`
2. Add models to `Models/`
3. Create database migrations
4. Update frontend components
5. Test thoroughly with different dietary restrictions

### Database Migrations
```bash
# Create new migration
dotnet ef migrations add MigrationName

# Update database
dotnet ef database update
```

### Medical Condition & Dietary Support
The application supports various medical conditions and dietary needs:
- **Diabetes**: Low-glycemic index foods and carb counting
- **Heart Disease**: Low-sodium, heart-healthy recipes
- **Celiac Disease**: Strict gluten-free diet
- **IBS**: Low-FODMAP diet options
- **Food Allergies**: Comprehensive allergy filtering
- **Food Intolerances**: Lactose, gluten, and other intolerance support
- **Weight Management**: Calorie-controlled meal options
- **Hypertension**: Low-sodium diet support

### Allergy Management
Common allergens are tracked and filtered:
- Nuts (tree nuts, peanuts)
- Shellfish
- Eggs
- Dairy
- Soy
- Wheat
- Fish

## 🐛 Troubleshooting

### Common Issues

**Database connection fails:**
- Verify connection string in `appsettings.json`
- Ensure SQL Server is running
- Check database permissions

**Recipe suggestions not working:**
- Verify user preferences are set
- Check dietary restriction filters
- Ensure recipe database is populated

**Frontend not connecting to backend:**
- Verify CORS configuration
- Check API base URL in frontend config
- Ensure backend is running on correct port

**Image upload fails:**
- Check image upload path exists
- Verify file size limits
- Ensure proper file permissions

## 🎯 Future Enhancements

- **Nutritional Analysis**: Detailed nutritional breakdowns and health impact tracking
- **Social Features**: Recipe sharing and community features for people with similar conditions
- **Meal Prep Planning**: Batch cooking and meal prep features
- **Restaurant Integration**: Restaurant menu filtering for dietary restrictions
- **Barcode Scanner**: Product scanning for ingredient checking
- **Health Tracking**: Integration with health apps for monitoring dietary compliance 