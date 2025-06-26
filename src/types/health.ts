export interface HealthMetrics {
  heartRate: number;
  steps: number;
  calories: number;
  sleepHours: number;
  timestamp: Date;
}

export interface DailyStats {
  date: string;
  heartRate: number[];
  steps: number;
  calories: number;
  sleepHours: number;
  activeMinutes: number;
}

export interface HealthAlert {
  id: string;
  type: 'warning' | 'critical' | 'info';
  title: string;
  message: string;
  timestamp: Date;
}

export interface UserProfile {
  name: string;
  age: number;
  height: number; // cm
  weight: number; // kg
  targetSteps: number;
  targetCalories: number;
  targetSleep: number;
}