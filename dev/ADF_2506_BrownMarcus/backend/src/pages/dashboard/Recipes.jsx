import { useState } from 'react'
import { Search, Filter, Heart, Clock, Users, Star, Plus } from 'lucide-react'
import { cn } from '../../utils/cn'

const Recipes = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)

  const filters = [
    { id: 'breakfast', label: 'Breakfast' },
    { id: 'lunch', label: 'Lunch' },
    { id: 'dinner', label: 'Dinner' },
    { id: 'snack', label: 'Snacks' },
    { id: 'vegetarian', label: 'Vegetarian' },
    { id: 'vegan', label: 'Vegan' },
    { id: 'gluten-free', label: 'Gluten-Free' },
    { id: 'quick', label: 'Quick (< 30 min)' },
    { id: 'easy', label: 'Easy' },
    { id: 'kid-friendly', label: 'Kid-Friendly' }
  ]

  const recipes = [
    {
      id: 1,
      title: 'Oatmeal with Berries and Honey',
      description: 'A healthy and delicious breakfast that\'s perfect for picky eaters.',
      image: 'https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?w=400&h=300&fit=crop',
      prepTime: 5,
      cookTime: 10,
      servings: 2,
      difficulty: 'Easy',
      rating: 4.8,
      reviews: 124,
      tags: ['breakfast', 'vegetarian', 'quick', 'kid-friendly'],
      calories: 320,
      protein: 12,
      carbs: 45,
      fat: 8,
      isFavorite: true
    },
    {
      id: 2,
      title: 'Grilled Chicken Salad',
      description: 'Fresh and nutritious salad with tender grilled chicken.',
      image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop',
      prepTime: 15,
      cookTime: 20,
      servings: 4,
      difficulty: 'Medium',
      rating: 4.6,
      reviews: 89,
      tags: ['lunch', 'dinner', 'gluten-free'],
      calories: 280,
      protein: 35,
      carbs: 8,
      fat: 12,
      isFavorite: false
    },
    {
      id: 3,
      title: 'Smoothie Bowl',
      description: 'Colorful and fun smoothie bowl that kids will love.',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop',
      prepTime: 10,
      cookTime: 0,
      servings: 2,
      difficulty: 'Easy',
      rating: 4.9,
      reviews: 156,
      tags: ['breakfast', 'snack', 'vegetarian', 'vegan', 'kid-friendly'],
      calories: 220,
      protein: 8,
      carbs: 35,
      fat: 5,
      isFavorite: true
    },
    {
      id: 4,
      title: 'Baked Salmon with Vegetables',
      description: 'Simple and healthy dinner with omega-3 rich salmon.',
      image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop',
      prepTime: 10,
      cookTime: 25,
      servings: 4,
      difficulty: 'Easy',
      rating: 4.7,
      reviews: 203,
      tags: ['dinner', 'gluten-free'],
      calories: 380,
      protein: 42,
      carbs: 12,
      fat: 18,
      isFavorite: false
    },
    {
      id: 5,
      title: 'Quinoa Buddha Bowl',
      description: 'Nutritious and colorful bowl packed with protein and vegetables.',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop',
      prepTime: 20,
      cookTime: 15,
      servings: 2,
      difficulty: 'Medium',
      rating: 4.5,
      reviews: 67,
      tags: ['lunch', 'dinner', 'vegetarian', 'vegan', 'gluten-free'],
      calories: 420,
      protein: 18,
      carbs: 55,
      fat: 14,
      isFavorite: false
    },
    {
      id: 6,
      title: 'Apple Cinnamon Muffins',
      description: 'Healthy muffins that are perfect for breakfast or snacks.',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
      prepTime: 15,
      cookTime: 20,
      servings: 12,
      difficulty: 'Easy',
      rating: 4.4,
      reviews: 98,
      tags: ['breakfast', 'snack', 'vegetarian', 'kid-friendly'],
      calories: 180,
      protein: 4,
      carbs: 28,
      fat: 6,
      isFavorite: true
    }
  ]

  const toggleFilter = (filterId: string) => {
    setSelectedFilters(prev => 
      prev.includes(filterId) 
        ? prev.filter(id => id !== filterId)
        : [...prev, filterId]
    )
  }

  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         recipe.description.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesFilters = selectedFilters.length === 0 || 
                          selectedFilters.some(filter => recipe.tags.includes(filter))
    
    return matchesSearch && matchesFilters
  })

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-success-600 bg-success-100 dark:text-success-400 dark:bg-success-900/20'
      case 'Medium': return 'text-warning-600 bg-warning-100 dark:text-warning-400 dark:bg-warning-900/20'
      case 'Hard': return 'text-error-600 bg-error-100 dark:text-error-400 dark:bg-error-900/20'
      default: return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-700'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Discover Recipes
          </h1>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            Find new foods that match your taste preferences
          </p>
        </div>
        <button className="btn-primary">
          <Plus className="mr-2 h-4 w-4" />
          Add Recipe
        </button>
      </div>

      {/* Search and Filters */}
      <div className="card">
        <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search recipes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input pl-10"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={cn(
              "btn-outline flex items-center justify-center",
              selectedFilters.length > 0 && "border-primary-500 text-primary-600"
            )}
          >
            <Filter className="mr-2 h-4 w-4" />
            Filters
            {selectedFilters.length > 0 && (
              <span className="ml-2 rounded-full bg-primary-100 px-2 py-0.5 text-xs font-medium text-primary-700 dark:bg-primary-900/20 dark:text-primary-300">
                {selectedFilters.length}
              </span>
            )}
          </button>
        </div>

        {/* Filter Tags */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => toggleFilter(filter.id)}
                  className={cn(
                    "rounded-full px-3 py-1 text-sm font-medium transition-colors",
                    selectedFilters.includes(filter.id)
                      ? "bg-primary-100 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                  )}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {filteredRecipes.length} recipe{filteredRecipes.length !== 1 ? 's' : ''} found
        </p>
        <select className="input w-auto">
          <option>Sort by: Popular</option>
          <option>Sort by: Rating</option>
          <option>Sort by: Prep Time</option>
          <option>Sort by: Calories</option>
        </select>
      </div>

      {/* Recipe Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredRecipes.map((recipe) => (
          <div key={recipe.id} className="card group hover:shadow-lg transition-shadow">
            {/* Recipe Image */}
            <div className="relative mb-4 overflow-hidden rounded-lg">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="h-48 w-full object-cover transition-transform group-hover:scale-105"
              />
              <button className="absolute top-3 right-3 rounded-full bg-white/80 p-2 hover:bg-white transition-colors">
                <Heart className={cn(
                  "h-4 w-4",
                  recipe.isFavorite 
                    ? "fill-error-500 text-error-500" 
                    : "text-gray-400 hover:text-error-500"
                )} />
              </button>
              <div className="absolute bottom-3 left-3">
                <span className={cn(
                  "rounded-full px-2 py-1 text-xs font-medium",
                  getDifficultyColor(recipe.difficulty)
                )}>
                  {recipe.difficulty}
                </span>
              </div>
            </div>

            {/* Recipe Content */}
            <div className="space-y-3">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 transition-colors">
                  {recipe.title}
                </h3>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                  {recipe.description}
                </p>
              </div>

              {/* Recipe Meta */}
              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{recipe.prepTime + recipe.cookTime}m</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>{recipe.servings}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>{recipe.rating}</span>
                  <span className="text-xs">({recipe.reviews})</span>
                </div>
              </div>

              {/* Nutrition Info */}
              <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>{recipe.calories} cal</span>
                <div className="flex space-x-2">
                  <span>P: {recipe.protein}g</span>
                  <span>C: {recipe.carbs}g</span>
                  <span>F: {recipe.fat}g</span>
                </div>
              </div>

              {/* Recipe Tags */}
              <div className="flex flex-wrap gap-1">
                {recipe.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-400"
                  >
                    {tag}
                  </span>
                ))}
                {recipe.tags.length > 3 && (
                  <span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-400">
                    +{recipe.tags.length - 3}
                  </span>
                )}
              </div>

              {/* View Recipe Button */}
              <button className="btn-outline w-full">
                View Recipe
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      {filteredRecipes.length > 0 && (
        <div className="text-center">
          <button className="btn-outline">
            Load More Recipes
          </button>
        </div>
      )}

      {/* Empty State */}
      {filteredRecipes.length === 0 && (
        <div className="card text-center py-12">
          <Search className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
            No recipes found
          </h3>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Try adjusting your search or filters to find more recipes.
          </p>
        </div>
      )}
    </div>
  )
}

export default Recipes 