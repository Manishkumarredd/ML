import React, { useState, useEffect } from 'react';
import { Heart, Footprints, Flame, Moon } from 'lucide-react';
import { MetricCard } from './MetricCard';
import { HeartRateChart } from './HeartRateChart';
import { AlertPanel } from './AlertPanel';
import { mockDailyStats, mockAlerts, mockUserProfile, generateRealtimeData } from '../data/mockData';
import { HealthAlert } from '../types/health';

interface DashboardProps {
  isConnected: boolean;
}

export const Dashboard: React.FC<DashboardProps> = ({ isConnected }) => {
  const [currentData, setCurrentData] = useState(generateRealtimeData());
  const [alerts, setAlerts] = useState<HealthAlert[]>(mockAlerts);
  const todayStats = mockDailyStats[mockDailyStats.length - 1];

  useEffect(() => {
    if (!isConnected) return;

    const interval = setInterval(() => {
      setCurrentData(generateRealtimeData());
    }, 3000);

    return () => clearInterval(interval);
  }, [isConnected]);

  const handleDismissAlert = (id: string) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  const metrics = [
    {
      title: 'Heart Rate',
      value: isConnected ? currentData.heartRate : '--',
      unit: 'bpm',
      icon: Heart,
      color: 'red',
      trend: 'stable' as const,
    },
    {
      title: 'Steps Today',
      value: isConnected ? currentData.steps.toLocaleString() : '--',
      unit: 'steps',
      icon: Footprints,
      color: 'green',
      progress: isConnected ? currentData.steps : 0,
      target: mockUserProfile.targetSteps,
      trend: 'up' as const,
    },
    {
      title: 'Calories Burned',
      value: isConnected ? currentData.calories.toLocaleString() : '--',
      unit: 'kcal',
      icon: Flame,
      color: 'orange',
      progress: isConnected ? currentData.calories : 0,
      target: mockUserProfile.targetCalories,
      trend: 'up' as const,
    },
    {
      title: 'Sleep Duration',
      value: isConnected ? currentData.sleepHours.toFixed(1) : '--',
      unit: 'hours',
      icon: Moon,
      color: 'purple',
      progress: isConnected ? currentData.sleepHours : 0,
      target: mockUserProfile.targetSleep,
      trend: 'stable' as const,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Welcome back, {mockUserProfile.name}
        </h2>
        <p className="text-gray-600">
          {isConnected 
            ? "Your health data is syncing in real-time" 
            : "Connect your smartwatch to start tracking"
          }
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <HeartRateChart data={isConnected ? todayStats.heartRate : Array(12).fill(0)} />
        <AlertPanel alerts={alerts} onDismiss={handleDismissAlert} />
      </div>

      {!isConnected && (
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <svg className="h-8 w-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-medium text-blue-900">Connect Your Smartwatch</h3>
              <p className="text-blue-700 mt-1">
                To start tracking your health metrics, please connect your smartwatch using the button in the top right corner.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};