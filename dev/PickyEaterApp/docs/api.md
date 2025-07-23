# PickyEaterApp API Documentation

## Overview
The PickyEaterApp API provides functionality for managing food preferences, meal planning, and dietary restrictions for picky eaters and people with medical conditions requiring specific diets.

## Base URL
- Development: `https://localhost:5001`
- Production: `https://api.pickyeaterapp.com`

## Authentication
The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## Endpoints

### Authentication

#### Register User
**POST** `/api/auth/register`

Register a new user account.

**Request Body:**
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "securepassword123",
  "firstName": "John",
  "lastName": "Doe",
  "dietaryRestrictions": ["gluten-free", "dairy-free"],
  "medicalConditions": ["diabetes", "heart-disease"],
  "allergies": ["nuts", "shellfish"],
  "preferredCuisines": ["italian", "mexican"]
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "username": "john_doe",
    "email": "john@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "dietaryRestrictions": ["gluten-free", "dairy-free"],
    "medicalConditions": ["diabetes", "heart-disease"],
    "allergies": ["nuts", "shellfish"],
    "preferredCuisines": ["italian", "mexican"]
  }
}
```

#### Login
**POST** `/api/auth/login`

Authenticate a user and receive a JWT token.

**Request Body:**
```json
{
  "username": "john_doe",
  "password": "securepassword123"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "john_doe",
    "email": "john@example.com",
    "firstName": "John",
    "lastName": "Doe"
  }
}
```

### Food Preferences

#### Get User Preferences
**GET** `/api/preferences`

Retrieve current user's food preferences.

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Response (200 OK):**
```json
{
  "dietaryRestrictions": ["gluten-free", "dairy-free"],
  "medicalConditions": ["diabetes", "heart-disease"],
  "allergies": ["nuts", "shellfish"],
  "preferredCuisines": ["italian", "mexican"],
  "dislikedIngredients": ["mushrooms", "olives"],
  "preferredIngredients": ["chicken", "rice", "tomatoes"]
}
```

#### Update Preferences
**PUT** `/api/preferences`

Update user's food preferences.

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Request Body:**
```json
{
  "dietaryRestrictions": ["gluten-free", "dairy-free", "vegetarian"],
  "medicalConditions": ["diabetes", "heart-disease", "ibs"],
  "allergies": ["nuts", "shellfish", "eggs"],
  "preferredCuisines": ["italian", "mexican", "asian"],
  "dislikedIngredients": ["mushrooms", "olives", "anchovies"],
  "preferredIngredients": ["chicken", "rice", "tomatoes", "pasta"]
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Preferences updated successfully"
}
```

### Meal Planning

#### Get Meal Suggestions
**GET** `/api/meals/suggestions`

Get personalized meal suggestions based on user preferences.

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Query Parameters:**
- `cuisine` (optional): Filter by cuisine type
- `difficulty` (optional): Filter by cooking difficulty (easy, medium, hard)
- `time` (optional): Maximum cooking time in minutes

**Response (200 OK):**
```json
{
  "meals": [
    {
      "id": 1,
      "name": "Gluten-Free Chicken Pasta",
      "description": "A delicious pasta dish with grilled chicken",
      "cuisine": "italian",
      "difficulty": "easy",
      "cookingTime": 30,
      "ingredients": [
        {
          "name": "gluten-free pasta",
          "amount": "8 oz",
          "category": "grains"
        },
        {
          "name": "chicken breast",
          "amount": "2 pieces",
          "category": "protein"
        }
      ],
      "instructions": [
        "Boil pasta according to package instructions",
        "Grill chicken until cooked through",
        "Combine and serve"
      ],
      "nutritionalInfo": {
        "calories": 450,
        "protein": 35,
        "carbs": 45,
        "fat": 12
      },
      "tags": ["gluten-free", "high-protein", "quick-meal"]
    }
  ]
}
```

#### Create Meal Plan
**POST** `/api/meals/plan`

Create a weekly meal plan.

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Request Body:**
```json
{
  "startDate": "2024-12-09",
  "endDate": "2024-12-15",
  "mealsPerDay": 3,
  "preferences": {
    "includeBreakfast": true,
    "includeLunch": true,
    "includeDinner": true,
    "maxCookingTime": 45
  }
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Meal plan created successfully",
  "mealPlan": {
    "id": 1,
    "startDate": "2024-12-09",
    "endDate": "2024-12-15",
    "meals": [
      {
        "date": "2024-12-09",
        "breakfast": {
          "id": 5,
          "name": "Oatmeal with Berries",
          "cookingTime": 10
        },
        "lunch": {
          "id": 12,
          "name": "Quinoa Salad",
          "cookingTime": 20
        },
        "dinner": {
          "id": 8,
          "name": "Grilled Salmon",
          "cookingTime": 25
        }
      }
    ]
  }
}
```

### Recipe Management

#### Get Recipe by ID
**GET** `/api/recipes/{id}`

Retrieve a specific recipe by its ID.

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Parameters:**
- `id` (path): The recipe ID

**Response (200 OK):**
```json
{
  "id": 1,
  "name": "Gluten-Free Chicken Pasta",
  "description": "A delicious pasta dish with grilled chicken",
  "cuisine": "italian",
  "difficulty": "easy",
  "cookingTime": 30,
  "servings": 4,
  "ingredients": [
    {
      "name": "gluten-free pasta",
      "amount": "8 oz",
      "category": "grains"
    },
    {
      "name": "chicken breast",
      "amount": "2 pieces",
      "category": "protein"
    }
  ],
  "instructions": [
    "Boil pasta according to package instructions",
    "Grill chicken until cooked through",
    "Combine and serve"
  ],
  "nutritionalInfo": {
    "calories": 450,
    "protein": 35,
    "carbs": 45,
    "fat": 12
  },
  "tags": ["gluten-free", "high-protein", "quick-meal"],
  "imageUrl": "/images/recipes/chicken-pasta.jpg"
}
```

#### Rate Recipe
**POST** `/api/recipes/{id}/rate`

Rate a recipe (1-5 stars).

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Parameters:**
- `id` (path): The recipe ID

**Request Body:**
```json
{
  "rating": 4,
  "comment": "Really enjoyed this recipe!"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Recipe rated successfully"
}
```

### Shopping Lists

#### Get Shopping List
**GET** `/api/shopping-list`

Get ingredients needed for planned meals.

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Response (200 OK):**
```json
{
  "items": [
    {
      "name": "gluten-free pasta",
      "amount": "16 oz",
      "category": "grains",
      "estimatedCost": 3.50
    },
    {
      "name": "chicken breast",
      "amount": "4 pieces",
      "category": "protein",
      "estimatedCost": 12.00
    }
  ],
  "totalEstimatedCost": 25.50
}
```

## Error Codes

| Status Code | Description |
|-------------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Invalid or missing token |
| 404 | Not Found - Resource not found |
| 500 | Internal Server Error |

## User Preferences

### Medical Conditions
- **diabetes**: Low-glycemic index foods and carb counting
- **heart-disease**: Low-sodium, heart-healthy recipes
- **celiac-disease**: Strict gluten-free diet
- **ibs**: Low-FODMAP diet options
- **hypertension**: Low-sodium diet support
- **weight-management**: Calorie-controlled meal options

### Dietary Restrictions
- **gluten-free**: No gluten-containing ingredients
- **dairy-free**: No dairy products
- **vegetarian**: No meat products
- **vegan**: No animal products
- **keto**: Low-carb, high-fat diet
- **paleo**: No processed foods

### Allergies
Common allergens that can be filtered out:
- nuts, shellfish, eggs, dairy, soy, wheat, fish

### Cuisine Types
- italian, mexican, asian, american, mediterranean, indian, french, thai

## Security Features

- JWT-based authentication
- Input validation and sanitization
- CORS protection
- Role-based access control
- Secure password hashing

## Rate Limiting
Currently, no rate limiting is implemented. Future versions will include rate limiting to prevent abuse.

## Third-Party Services
- **ASP.NET Core**: Web framework for backend API
- **JWT**: Token-based authentication
- **Entity Framework Core**: Database management
- **Food API**: External food database integration (optional) 