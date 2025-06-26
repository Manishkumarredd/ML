import { DailyStats, HealthAlert, UserProfile } from '../types/health';

export const mockUserProfile: UserProfile = {
  name: 'Alex Johnson',
  age: 28,
  height: 175,
  weight: 70,
  targetSteps: 10000,
  targetCalories: 2200,
  targetSleep: 8,
};

export const mockDailyStats: DailyStats[] = [
  {
    date: '2024-01-15',
    heartRate: [72, 75, 78, 82, 85, 88, 92, 89, 86, 83, 80, 77],
    steps: 8500,
    calories: 2100,
    sleepHours: 7.5,
    activeMinutes: 45,
  },
  {
    date: '2024-01-16',
    heartRate: [70, 73, 76, 80, 84, 87, 90, 88, 85, 82, 79, 76],
    steps: 12000,
    calories: 2300,
    sleepHours: 8.2,
    activeMinutes: 60,
  },
  {
    date: '2024-01-17',
    heartRate: [74, 77, 80, 84, 88, 91, 95, 92, 89, 86, 83, 80],
    steps: 9200,
    calories: 2050,
    sleepHours: 6.8,
    activeMinutes: 38,
  },
];

export const mockAlerts: HealthAlert[] = [
  {
    id: '1',
    type: 'warning',
    title: 'Low Sleep Duration',
    message: 'You slept only 6.8 hours last night. Consider going to bed earlier.',
    timestamp: new Date('2024-01-17T08:00:00'),
  },
  {
    id: '2',
    type: 'info',
    title: 'Step Goal Achieved!',
    message: 'Congratulations! You reached your daily step goal of 10,000 steps.',
    timestamp: new Date('2024-01-16T18:30:00'),
  },
  {
    id: '3',
    type: 'critical',
    title: 'Irregular Heart Rate',
    message: 'Your heart rate has been elevated for an extended period. Consider taking a break.',
    timestamp: new Date('2024-01-17T14:15:00'),
  },
];

export const generateRealtimeData = () => {
  const now = new Date();
  return {
    heartRate: 72 + Math.floor(Math.random() * 20),
    steps: Math.floor(Math.random() * 100) + 8000,
    calories: Math.floor(Math.random() * 50) + 2000,
    sleepHours: 7 + Math.random() * 2,
    timestamp: now,
  };
};