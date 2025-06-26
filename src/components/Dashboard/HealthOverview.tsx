import React, { useEffect } from 'react';
import { Heart, Footprints, Flame, Moon, Thermometer, Activity, Droplets, Brain } from 'lucide-react';
import { MetricCard } from './MetricCard';
import { useStore } from '../../store/useStore';
import { generateRealtimeMetrics } from '../../data/mockData';

export const HealthOverview: React.FC = () => {
  const { currentMetrics, isDeviceConnected, updateMetrics, user } = useStore();

  useEffect(() => {
    if (!isDeviceConnected) return;

    const interval = setInterval(() => {
      updateMetrics(generateRealtimeMetrics());
    }, 3000);

    return () => clearInterval(interval);
  }, [isDeviceConnected, updateMetrics]);

  const getHeartRateStatus = (hr: number) => {
    if (hr > 100) return 'critical';
    if (hr > 90) return 'warning';
    return 'normal';
  };

  const getStressStatus = (level: number) => {
    if (level > 7) return 'critical';
    if (level > 5) return 'warning';
    return 'normal';
  };

  const metrics = [
    {
      title: 'Heart Rate',
      value: isDeviceConnected && currentMetrics ? currentMetrics.heartRate : '--',
      unit: 'bpm',
      icon: Heart,
      color: 'red',
      trend: 'stable' as const,
      status: currentMetrics ? getHeartRateStatus(currentMetrics.heartRate) : 'normal',
    },
    {
      title: 'Steps Today',
      value: isDeviceConnected && currentMetrics ? currentMetrics.steps.toLocaleString() : '--',
      unit: 'steps',
      icon: Footprints,
      color: 'green',
      progress: currentMetrics?.steps || 0,
      target: user?.goals.targetSteps || 10000,
      trend: 'up' as const,
    },
    {
      title: 'Calories Burned',
      value: isDeviceConnected && currentMetrics ? currentMetrics.caloriesBurned.toLocaleString() : '--',
      unit: 'kcal',
      icon: Flame,
      color: 'orange',
      progress: currentMetrics?.caloriesBurned || 0,
      target: user?.goals.targetCalories || 2500,
      trend: 'up' as const,
    },
    {
      title: 'Sleep Quality',
      value: isDeviceConnected && currentMetrics?.sleepData ? currentMetrics.sleepData.quality : '--',
      unit: '/10',
      icon: Moon,
      color: 'purple',
      progress: currentMetrics?.sleepData?.quality || 0,
      target: 10,
      trend: 'stable' as const,
    },
    {
      title: 'Blood Oxygen',
      value: isDeviceConnected && currentMetrics ? `${currentMetrics.bloodOxygen}%` : '--',
      unit: 'SpO2',
      icon: Activity,
      color: 'blue',
      trend: 'stable' as const,
    },
    {
      title: 'Body Temperature',
      value: isDeviceConnected && currentMetrics ? currentMetrics.bodyTemperature.toFixed(1) : '--',
      unit: '°C',
      icon: Thermometer,
      color: 'pink',
      trend: 'stable' as const,
    },
    {
      title: 'Hydration',
      value: isDeviceConnected ? '1.2L' : '--',
      unit: 'today',
      icon: Droplets,
      color: 'cyan',
      progress: 1200,
      target: user?.goals.targetWater || 2500,
      trend: 'up' as const,
    },
    {
      title: 'Stress Level',
      value: isDeviceConnected && currentMetrics ? currentMetrics.stressLevel : '--',
      unit: '/10',
      icon: Brain,
      color: 'indigo',
      trend: 'stable' as const,
      status: currentMetrics ? getStressStatus(currentMetrics.stressLevel) : 'normal',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Health Overview</h2>
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${isDeviceConnected ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
          <span className="text-sm text-gray-600">
            {isDeviceConnected ? 'Live Data' : 'Disconnected'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      {!isDeviceConnected && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <Activity className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-blue-900">Connect Your Smartwatch</h3>
              <p className="text-blue-700 mt-1">
                Connect your smartwatch to start tracking real-time health metrics and receive personalized AI recommendations.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};