import { useAuth } from '../../contexts/AuthContext'
import { 
  Calendar, 
  Target, 
  BarChart3, 
  TrendingUp, 
  Clock,
  CheckCircle,
  AlertCircle,
  Plus,
  ArrowRight
} from 'lucide-react'
import { cn } from '../../utils/cn'

const DashboardHome = () => {
  const { user } = useAuth()

  const stats = [
    {
      name: 'Calories Today',
      value: '1,847',
      target: '2,000',
      unit: 'cal',
      change: '+12%',
      changeType: 'positive' as const,
      icon: BarChart3
    },
    {
      name: 'Protein',
      value: '45',
      target: '50',
      unit: 'g',
      change: '+8%',
      changeType: 'positive' as const,
      icon: Target
    },
    {
      name: 'Meals Planned',
      value: '3',
      target: '3',
      unit: '',
      change: '100%',
      changeType: 'positive' as const,
      icon: Calendar
    },
    {
      name: 'Goals Met',
      value: '2',
      target: '3',
      unit: '',
      change: '67%',
      changeType: 'neutral' as const,
      icon: TrendingUp
    }
  ]

  const recentMeals = [
    {
      id: 1,
      name: 'Oatmeal with Berries',
      time: '8:00 AM',
      calories: 320,
      type: 'breakfast' as const,
      completed: true
    },
    {
      id: 2,
      name: 'Grilled Chicken Salad',
      time: '12:30 PM',
      calories: 450,
      type: 'lunch' as const,
      completed: true
    },
    {
      id: 3,
      name: 'Salmon with Vegetables',
      time: '7:00 PM',
      calories: 580,
      type: 'dinner' as const,
      completed: false
    }
  ]

  const quickActions = [
    {
      name: 'Add Meal',
      description: 'Log a new meal or snack',
      icon: Plus,
      href: '/dashboard/meal-planner',
      color: 'primary'
    },
    {
      name: 'Find Recipe',
      description: 'Discover new recipes',
      icon: ArrowRight,
      href: '/dashboard/recipes',
      color: 'secondary'
    },
    {
      name: 'Set Goals',
      description: 'Update nutrition targets',
      icon: Target,
      href: '/dashboard/goals',
      color: 'success'
    }
  ]

  const getProgressPercentage = (value: string, target: string) => {
    const numValue = parseInt(value.replace(/,/g, ''))
    const numTarget = parseInt(target.replace(/,/g, ''))
    return Math.min((numValue / numTarget) * 100, 100)
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
      {/* Welcome Section */}
      <div className="card">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Welcome back, {user?.firstName || 'User'}! 👋
            </h1>
            <p className="mt-1 text-gray-600 dark:text-gray-400">
              Here's what's happening with your nutrition today.
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500 dark:text-gray-400">Today</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          const progress = getProgressPercentage(stat.value, stat.target)
          
          return (
            <div key={stat.name} className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {stat.name}
                  </p>
                  <div className="flex items-baseline space-x-2">
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {stat.value}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      / {stat.target} {stat.unit}
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
                    stat.changeType === 'positive' && "text-success-600 dark:text-success-400",
                    stat.changeType === 'negative' && "text-error-600 dark:text-error-400",
                    stat.changeType === 'neutral' && "text-gray-600 dark:text-gray-400"
                  )}>
                    {stat.change}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400">
                    {Math.round(progress)}%
                  </span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-gray-200 dark:bg-gray-700">
                  <div
                    className={cn(
                      "h-2 rounded-full transition-all duration-300",
                      progress >= 100 && "bg-success-500",
                      progress >= 80 && progress < 100 && "bg-warning-500",
                      progress < 80 && "bg-primary-500"
                    )}
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Meals */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Today's Meals
            </h2>
            <button className="text-sm text-primary-600 hover:text-primary-500 dark:text-primary-400">
              View all
            </button>
          </div>
          
          <div className="space-y-3">
            {recentMeals.map((meal) => (
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
                
                <div className="flex items-center space-x-2">
                  {meal.completed ? (
                    <CheckCircle className="h-5 w-5 text-success-500" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-warning-500" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Quick Actions
          </h2>
          
          <div className="space-y-3">
            {quickActions.map((action) => {
              const Icon = action.icon
              return (
                <button
                  key={action.name}
                  className="flex w-full items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors dark:border-gray-700 dark:hover:border-gray-600"
                >
                  <div className="flex items-center space-x-3">
                    <div className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-lg",
                      action.color === 'primary' && "bg-primary-100 dark:bg-primary-900/20",
                      action.color === 'secondary' && "bg-secondary-100 dark:bg-secondary-900/20",
                      action.color === 'success' && "bg-success-100 dark:bg-success-900/20"
                    )}>
                      <Icon className={cn(
                        "h-4 w-4",
                        action.color === 'primary' && "text-primary-600",
                        action.color === 'secondary' && "text-secondary-600",
                        action.color === 'success' && "text-success-600"
                      )} />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-gray-900 dark:text-white">
                        {action.name}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {action.description}
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-gray-400" />
                </button>
              )
            })}
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
              Daily Tip
            </h3>
            <p className="mt-1 text-gray-600 dark:text-gray-300">
              Try adding a new vegetable to your dinner tonight. Small changes lead to big improvements in your nutrition!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardHome 