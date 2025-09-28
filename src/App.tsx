import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Dashboard from './components/Dashboard';
import CropPrediction from './components/CropPrediction';
import WeatherDashboard from './components/WeatherDashboard';
import FarmingAssistant from './components/FarmingAssistant';

type Screen = 'login' | 'signup' | 'dashboard' | 'crop-prediction' | 'weather' | 'assistant';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [user, setUser] = useState<any>(null);

  const handleLogin = (email: string, password: string) => {
    // Mock login
    setUser({ email, name: 'Demo User' });
    setCurrentScreen('dashboard');
  };

  const handleSignup = (userData: any) => {
    // Mock signup
    setUser(userData);
    setCurrentScreen('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentScreen('login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      {currentScreen === 'login' && (
        <LoginForm
          onLogin={handleLogin}
          onSwitchToSignup={() => setCurrentScreen('signup')}
        />
      )}
      
      {currentScreen === 'signup' && (
        <SignupForm
          onSignup={handleSignup}
          onSwitchToLogin={() => setCurrentScreen('login')}
        />
      )}
      
      {currentScreen === 'dashboard' && (
        <Dashboard
          user={user}
          onLogout={handleLogout}
          onNavigate={(screen) => setCurrentScreen(screen as Screen)}
        />
      )}
      
      {currentScreen === 'crop-prediction' && (
        <CropPrediction
          user={user}
          onLogout={handleLogout}
          onNavigate={(screen) => setCurrentScreen(screen as Screen)}
        />
      )}
      
      {currentScreen === 'weather' && (
        <WeatherDashboard
          user={user}
          onLogout={handleLogout}
          onNavigate={(screen) => setCurrentScreen(screen as Screen)}
        />
      )}
      
      {currentScreen === 'assistant' && (
        <FarmingAssistant
          user={user}
          onLogout={handleLogout}
          onNavigate={(screen) => setCurrentScreen(screen as Screen)}
        />
      )}
    </div>
  );
}

export default App;