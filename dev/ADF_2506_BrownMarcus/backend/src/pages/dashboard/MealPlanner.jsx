import { useState } from 'react'
import { Calendar, Plus, Clock, Users, ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '../../utils/cn'

const MealPlanner = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())

  const meals = [
    {
      id: 1,
      name: 'Oatmeal with Berries',
      type: 'breakfast',
      time: '8:00 AM',
      calories: 320,
      completed: true
    },
    {
      id: 2,
      name: 'Grilled Chicken Salad',
      type: 'lunch',
      time: '12:30 PM',
      calories: 450,
      completed: true
    },
    {
      id: 3,
      name: 'Salmon with Vegetables',
      type: 'dinner',
      time: '7:00 PM',
      calories: 580,
      completed: false
    }
  ]

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDay = firstDay.getDay()
    
    const days = []
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDay; i++) {
      days.push(null)
    }
    
    // Add all days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i))
    }
    
    return days
  }

  const days = getDaysInMonth(currentDate)
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const isToday = (date: Date) => {
    const today = new Date()
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear()
  }

  const isSelected = (date: Date) => {
    return date.getDate() === selectedDate.getDate() &&
           date.getMonth() === selectedDate.getMonth() &&
           date.getFullYear() === selectedDate.getFullYear()
  }

  const getMealTypeColor = (type: string) => {
    switch (type) {
      case 'breakfast': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300'
      case 'lunch': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300'
      case 'dinner': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Meal Planner
          </h1>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            Plan your meals for the week ahead
          </p>
        </div>
        <button className="btn-primary">
          <Plus className="mr-2 h-4 w-4" />
          Add Meal
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Calendar */}
        <div className="lg:col-span-2">
          <div className="card">
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h2>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
                  className="rounded-lg p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setCurrentDate(new Date())}
                  className="btn-outline text-sm"
                >
                  Today
                </button>
                <button
                  onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
                  className="rounded-lg p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1">
              {/* Day headers */}
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="p-2 text-center text-sm font-medium text-gray-500 dark:text-gray-400">
                  {day}
                </div>
              ))}
              
              {/* Calendar days */}
              {days.map((date, index) => (
                <div
                  key={index}
                  className={cn(
                    "min-h-[80px] p-2 border border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors",
                    !date && "bg-gray-50 dark:bg-gray-800",
                    date && isToday(date) && "bg-primary-50 border-primary-200 dark:bg-primary-900/20 dark:border-primary-700",
                    date && isSelected(date) && "bg-primary-100 border-primary-300 dark:bg-primary-900/40 dark:border-primary-600"
                  )}
                  onClick={() => date && setSelectedDate(date)}
                >
                  {date && (
                    <>
                      <div className={cn(
                        "text-sm font-medium",
                        isToday(date) && "text-primary-600 dark:text-primary-400",
                        isSelected(date) && "text-primary-700 dark:text-primary-300"
                      )}>
                        {date.getDate()}
                      </div>
                      
                      {/* Meal indicators */}
                      <div className="mt-1 space-y-1">
                        <div className="h-1.5 w-full rounded-full bg-orange-200 dark:bg-orange-800"></div>
                        <div className="h-1.5 w-full rounded-full bg-blue-200 dark:bg-blue-800"></div>
                        <div className="h-1.5 w-full rounded-full bg-purple-200 dark:bg-purple-800"></div>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Selected Day Details */}
        <div className="space-y-6">
          {/* Selected Date Info */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {selectedDate.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </h3>
              {isToday(selectedDate) && (
                <span className="rounded-full bg-primary-100 px-2 py-1 text-xs font-medium text-primary-700 dark:bg-primary-900/20 dark:text-primary-300">
                  Today
                </span>
              )}
            </div>

            {/* Meals for selected day */}
            <div className="space-y-3">
              {meals.map((meal) => (
                <div key={meal.id} className="flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-3">
                    <div className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium",
                      getMealTypeColor(meal.type)
                    )}>
                      {meal.type.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {meal.name}
                      </p>
                      <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                        <Clock className="h-3 w-3" />
                        <span>{meal.time}</span>
                        <span>•</span>
                        <span>{meal.calories} cal</span>
                      </div>
                    </div>
                  </div>
                  
                  <button className="text-sm text-primary-600 hover:text-primary-500 dark:text-primary-400">
                    Edit
                  </button>
                </div>
              ))}
            </div>

            <button className="btn-outline w-full mt-4">
              <Plus className="mr-2 h-4 w-4" />
              Add Meal
            </button>
          </div>

          {/* Quick Stats */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Today's Summary
            </h3>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Total Calories</span>
                <span className="font-medium text-gray-900 dark:text-white">1,350</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Protein</span>
                <span className="font-medium text-gray-900 dark:text-white">45g</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Carbs</span>
                <span className="font-medium text-gray-900 dark:text-white">180g</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Fat</span>
                <span className="font-medium text-gray-900 dark:text-white">65g</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Progress</span>
                <span className="font-medium text-gray-900 dark:text-white">67%</span>
              </div>
              <div className="mt-2 h-2 rounded-full bg-gray-200 dark:bg-gray-700">
                <div className="h-2 rounded-full bg-primary-500" style={{ width: '67%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MealPlanner 