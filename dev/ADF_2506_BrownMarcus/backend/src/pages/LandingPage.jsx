import { Link } from 'react-router-dom'
import { useDarkMode } from '../contexts/DarkModeContext'
import { 
  Utensils, 
  Target, 
  Calendar, 
  BarChart3, 
  Moon, 
  Sun,
  ArrowRight,
  CheckCircle,
  Star
} from 'lucide-react'
import { cn } from '../utils/cn'

const LandingPage = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode()

  const features = [
    {
      icon: Utensils,
      title: 'Recipe Discovery',
      description: 'Find new foods that match your taste preferences and dietary needs.'
    },
    {
      icon: Target,
      title: 'Customizable Goals',
      description: 'Set personal nutrition targets and track your progress over time.'
    },
    {
      icon: Calendar,
      title: 'Meal Planning',
      description: 'Plan your weekly meals with our intuitive calendar interface.'
    },
    {
      icon: BarChart3,
      title: 'Nutrition Tracking',
      description: 'Monitor calories, macros, and micronutrients with detailed analytics.'
    }
  ]

  const testimonials = [
    {
      name: 'Sarah M.',
      role: 'Parent',
      content: 'This app has completely changed how my family approaches meal planning. My picky eater is now trying new foods!',
      rating: 5
    },
    {
      name: 'Mike R.',
      role: 'Fitness Enthusiast',
      content: 'Perfect for tracking my nutrition goals while discovering delicious, healthy recipes.',
      rating: 5
    },
    {
      name: 'Emma L.',
      role: 'Student',
      content: 'Easy to use and helps me maintain a balanced diet even with my busy schedule.',
      rating: 5
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="border-b border-gray-200 bg-white/80 backdrop-blur-sm dark:border-gray-700 dark:bg-gray-900/80">
        <div className="container-custom">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-2">
              <Utensils className="h-8 w-8 text-primary-600" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                Picky Eater
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleDarkMode}
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
              
              <Link
                to="/login"
                className="btn-outline"
              >
                Sign In
              </Link>
              
              <Link
                to="/register"
                className="btn-primary"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 to-secondary-50 py-20 dark:from-gray-900 dark:to-gray-800">
        <div className="container-custom">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl dark:text-white">
                  Discover Foods You'll
                  <span className="block text-primary-600">Actually Love</span>
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300">
                  Transform your relationship with food. Our smart app helps picky eaters 
                  discover new recipes, plan meals, and achieve their nutrition goals.
                </p>
              </div>
              
              <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                <Link
                  to="/register"
                  className="btn-primary text-lg px-8 py-3"
                >
                  Start Your Journey
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  to="/login"
                  className="btn-outline text-lg px-8 py-3"
                >
                  Learn More
                </Link>
              </div>
              
              <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-success-500" />
                  <span>Free to start</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-success-500" />
                  <span>No credit card required</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative rounded-2xl bg-white p-8 shadow-2xl dark:bg-gray-800">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Today's Plan</h3>
                    <span className="text-sm text-gray-500">March 15, 2024</span>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 rounded-lg bg-primary-50 p-3 dark:bg-primary-900/20">
                      <div className="h-10 w-10 rounded-full bg-primary-100 dark:bg-primary-800"></div>
                      <div>
                        <p className="font-medium">Breakfast</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Oatmeal with berries</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 rounded-lg bg-gray-50 p-3 dark:bg-gray-700">
                      <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-600"></div>
                      <div>
                        <p className="font-medium">Lunch</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Grilled chicken salad</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 rounded-lg bg-gray-50 p-3 dark:bg-gray-700">
                      <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-600"></div>
                      <div>
                        <p className="font-medium">Dinner</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Salmon with vegetables</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="rounded-lg bg-success-50 p-3 dark:bg-success-900/20">
                    <p className="text-sm font-medium text-success-800 dark:text-success-200">
                      ✅ 1,850 calories • 45g protein • 180g carbs • 65g fat
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl dark:text-white">
              Everything you need to succeed
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our comprehensive platform provides all the tools you need to transform 
              your eating habits and achieve your nutrition goals.
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div key={index} className="card text-center space-y-4">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100 dark:bg-primary-900/20">
                  <feature.icon className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-50 py-20 dark:bg-gray-800">
        <div className="container-custom">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl dark:text-white">
              Loved by thousands of users
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              See what our community has to say about their experience.
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card space-y-4">
                <div className="flex items-center space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  "{testimonial.content}"
                </p>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center space-y-8">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl dark:text-white">
              Ready to transform your eating habits?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Join thousands of users who have already discovered the joy of trying 
              new foods and achieving their nutrition goals.
            </p>
            <Link
              to="/register"
              className="btn-primary text-lg px-8 py-3 inline-flex"
            >
              Get Started Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-12 dark:border-gray-700 dark:bg-gray-900">
        <div className="container-custom">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Utensils className="h-6 w-6 text-primary-600" />
                <span className="text-lg font-bold text-gray-900 dark:text-white">
                  Picky Eater
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Helping picky eaters discover new foods and achieve their nutrition goals.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Product</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li><a href="#" className="hover:text-gray-900 dark:hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-gray-900 dark:hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-gray-900 dark:hover:text-white">Recipes</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Support</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li><a href="#" className="hover:text-gray-900 dark:hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-gray-900 dark:hover:text-white">Contact Us</a></li>
                <li><a href="#" className="hover:text-gray-900 dark:hover:text-white">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Company</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li><a href="#" className="hover:text-gray-900 dark:hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-gray-900 dark:hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-gray-900 dark:hover:text-white">Privacy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 border-t border-gray-200 pt-8 dark:border-gray-700">
            <p className="text-center text-gray-600 dark:text-gray-400">
              © 2024 Picky Eater App. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage 