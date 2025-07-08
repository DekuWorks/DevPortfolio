import { Routes, Route } from 'react-router-dom'
import { DarkModeProvider } from './contexts/DarkModeContext.jsx'
import { AuthProvider } from './contexts/AuthContext.jsx'
import LandingPage from './pages/LandingPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import Dashboard from './pages/Dashboard.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'

function App() {
  return (
    <DarkModeProvider>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50 transition-colors duration-200 dark:bg-gray-900">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/dashboard/*"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </AuthProvider>
    </DarkModeProvider>
  )
}

export default App 