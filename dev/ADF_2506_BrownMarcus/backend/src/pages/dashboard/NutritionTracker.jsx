import { useState } from 'react'
import { BarChart3, TrendingUp, Target, Calendar, ChevronDown, ChevronUp } from 'lucide-react'
import { cn } from '../../utils/cn'

const NutritionTracker = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('week')
  const [showDetails, setShowDetails] = useState(false)

  const nutritionData = {
    calories: { current: 1847, target: 2000, unit: 'cal' },
    protein: { current: 45, target: 50, unit: 'g' },
    carbs: { current: 180, target: 200, unit: 'g' },
    fat: { current: 65, target: 70, unit: 'g' },
    fiber: { current: 25, target: 30, unit: 'g' },
    sugar: { current: 45, target: 50, unit: 'g' }
  }

  const weeklyData = [
    { day: 'Mon', calories: 1850, protein: 42, carbs: 175, fat: 68 },
    { day: 'Tue', calories: 1920, protein: 48, carbs: 185, fat: 72 },
    { day: 'Wed', calories: 1780, protein: 45, carbs: 170, fat: 65 },
    { day: 'Thu', calories: 1950, protein: 50, carbs: 190, fat: 75 },
    { day: 'Fri', calories: 1847, protein: 45, carbs: 180, fat: 65 },
    { day: 'Sat', calories: 2100, protein: 55, carbs: 200, fat: 80 },
    { day: 'Sun', calories: 1950, protein: 48, carbs: 185, fat: 70 }
  ]

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100)
  }

  const getProgressColor = (percentage: number) => {
    if (percentage >= 90) return 'text-success-600 bg-success-100 dark:text-success-400 dark:bg-success-900/20'
    if (percentage >= 70) return 'text-warning-600 bg-warning-100 dark:text-warning-400 dark:bg-warning-900/20'
    return 'text-error-600 bg-error-100 dark:text-error-400 dark:bg-error-900/20'
  }

  const getMaxValue = (data: any[], key: string) => {
    return Math.max(...data.map(item => item[key]))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Nutrition Tracker
          </h1>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            Monitor your daily nutrition intake and progress
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <select 
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="input w-auto"
          >
            <option value="day">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Object.entries(nutritionData).map(([key, data]) => {
          const percentage = getProgressPercentage(data.current, data.target)
          const Icon = key === 'calories' ? BarChart3 : key === 'protein' ? Target : TrendingUp
          
          return (
            <div key={key} className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 capitalize">
                    {key}
                  </p>
                  <div className="flex items-baseline space-x-2">
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {data.current.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      / {data.target.toLocaleString()} {data.unit}
                    </p>
                  </div>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100 dark:bg-primary-900/20">
                  <Icon className="h-6 w-6 text-primary-600" />
                </div>
              </div>
              
              <div className="mt-4">
                <div className="flex items-center justify-between text-sm">
                  <span className={cn(
                    "font-medium",
                    getProgressColor(percentage)
                  )}>
                    {Math.round(percentage)}%
                  </span>
                  <span className="text-gray-500 dark:text-gray-400">
                    {data.current > data.target ? '+' : ''}{data.current - data.target} {data.unit}
                  </span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-gray-200 dark:bg-gray-700">
                  <div
                    className={cn(
                      "h-2 rounded-full transition-all duration-300",
                      percentage >= 90 && "bg-success-500",
                      percentage >= 70 && percentage < 90 && "bg-warning-500",
                      percentage < 70 && "bg-error-500"
                    )}
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                  />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Weekly Chart */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Weekly Overview
            </h2>
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <span>{showDetails ? 'Hide' : 'Show'} Details</span>
              {showDetails ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
          </div>

          {/* Chart */}
          <div className="space-y-4">
            <div className="flex items-end justify-between h-32">
              {weeklyData.map((day, index) => {
                const maxCalories = getMaxValue(weeklyData, 'calories')
                const height = (day.calories / maxCalories) * 100
                
                return (
                  <div key={day.day} className="flex flex-col items-center space-y-2">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {day.calories}
                    </div>
                    <div 
                      className="w-8 bg-primary-500 rounded-t transition-all duration-300 hover:bg-primary-600"
                      style={{ height: `${height}%` }}
                    />
                    <div className="text-xs font-medium text-gray-700 dark:text-gray-300">
                      {day.day}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Detailed breakdown */}
            {showDetails && (
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="space-y-3">
                  {weeklyData.map((day) => (
                    <div key={day.day} className="flex items-center justify-between p-2 rounded-lg bg-gray-50 dark:bg-gray-800">
                      <span className="font-medium text-gray-900 dark:text-white">{day.day}</span>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                        <span>{day.calories} cal</span>
                        <span>P: {day.protein}g</span>
                        <span>C: {day.carbs}g</span>
                        <span>F: {day.fat}g</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Nutrition Insights */}
        <div className="space-y-6">
          {/* Today's Summary */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Today's Summary
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-success-50 dark:bg-success-900/20">
                <div className="flex items-center space-x-3">
                  <div className="h-8 w-8 rounded-full bg-success-100 dark:bg-success-800 flex items-center justify-center">
                    <TrendingUp className="h-4 w-4 text-success-600" />
                  </div>
                  <div>
                    <p className="font-medium text-success-800 dark:text-success-200">
                      Great Progress!
                    </p>
                    <p className="text-sm text-success-600 dark:text-success-300">
                      You're on track with your protein goals
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-warning-50 dark:bg-warning-900/20">
                <div className="flex items-center space-x-3">
                  <div className="h-8 w-8 rounded-full bg-warning-100 dark:bg-warning-800 flex items-center justify-center">
                    <Target className="h-4 w-4 text-warning-600" />
                  </div>
                  <div>
                    <p className="font-medium text-warning-800 dark:text-warning-200">
                      Room for Improvement
                    </p>
                    <p className="text-sm text-warning-600 dark:text-warning-300">
                      Consider adding more fiber to your diet
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Quick Actions
            </h3>
            
            <div className="space-y-3">
              <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors dark:border-gray-700 dark:hover:border-gray-600">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Log a Meal</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Add today's meals</p>
                  </div>
                  <Calendar className="h-4 w-4 text-gray-400" />
                </div>
              </button>

              <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors dark:border-gray-700 dark:hover:border-gray-600">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Update Goals</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Adjust nutrition targets</p>
                  </div>
                  <Target className="h-4 w-4 text-gray-400" />
                </div>
              </button>

              <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors dark:border-gray-700 dark:hover:border-gray-600">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">View Reports</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Detailed analytics</p>
                  </div>
                  <BarChart3 className="h-4 w-4 text-gray-400" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tips Section */}
      <div className="card bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20">
        <div className="flex items-start space-x-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-100 dark:bg-primary-900/20">
            <Target className="h-5 w-5 text-primary-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Nutrition Tip
            </h3>
            <p className="mt-1 text-gray-600 dark:text-gray-300">
              Try to include a source of protein with every meal. This helps maintain muscle mass and keeps you feeling full longer.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NutritionTracker 