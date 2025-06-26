import React, { useState, useEffect } from 'react';
import { Header } from './components/Layout/Header';
import { Navigation } from './components/Layout/Navigation';
import { HealthOverview } from './components/Dashboard/HealthOverview';
import { AlertsPanel } from './components/Dashboard/AlertsPanel';
import { NutritionDashboard } from './components/Nutrition/NutritionDashboard';
import { AICoachInterface } from './components/AICoach/AICoachInterface';
import { useStore } from './store/useStore';
import { mockUser, mockAlerts } from './data/mockData';
import toast, { Toaster } from 'react-hot-toast';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { setUser, alerts, addAlert } = useStore();

  useEffect(() => {
    // Initialize user and mock data
    setUser(mockUser);
    
    // Add mock alerts
    mockAlerts.forEach(alert => addAlert(alert));
  }, [setUser, addAlert]);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-8">
            <HealthOverview />
            <AlertsPanel />
          </div>
        );
      case 'nutrition':
        return <NutritionDashboard />;
      case 'ai-coach':
        return <AICoachInterface />;
      case 'fitness':
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Fitness Dashboard</h2>
            <p className="text-gray-600">Comprehensive fitness tracking and workout planning coming soon!</p>
          </div>
        );
      case 'community':
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Community</h2>
            <p className="text-gray-600">Connect with others on similar health journeys!</p>
          </div>
        );
      case 'analytics':
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Health Analytics</h2>
            <p className="text-gray-600">Advanced health insights and trend analysis coming soon!</p>
          </div>
        );
      case 'settings':
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Settings</h2>
            <p className="text-gray-600">Customize your WellnessAI experience!</p>
          </div>
        );
      default:
        return <HealthOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
        <main className="flex-1 p-8">
          {renderContent()}
        </main>
      </div>
      <Toaster position="top-right" />
    </div>
  );
}

export default App;