import { create } from 'zustand';
import { User, HealthMetrics, NutritionPlan, WorkoutPlan, HealthAlert, AICoachMessage } from '../types';

interface AppState {
  // User & Auth
  user: User | null;
  isAuthenticated: boolean;
  
  // Device Connection
  isDeviceConnected: boolean;
  
  // Health Data
  currentMetrics: HealthMetrics | null;
  healthHistory: HealthMetrics[];
  
  // Nutrition
  currentNutritionPlan: NutritionPlan | null;
  nutritionHistory: NutritionPlan[];
  
  // Fitness
  currentWorkoutPlan: WorkoutPlan | null;
  workoutHistory: WorkoutPlan[];
  
  // Alerts & Notifications
  alerts: HealthAlert[];
  
  // AI Coach
  coachMessages: AICoachMessage[];
  
  // Actions
  setUser: (user: User) => void;
  setDeviceConnection: (connected: boolean) => void;
  updateMetrics: (metrics: HealthMetrics) => void;
  addAlert: (alert: HealthAlert) => void;
  dismissAlert: (id: string) => void;
  addCoachMessage: (message: AICoachMessage) => void;
  setNutritionPlan: (plan: NutritionPlan) => void;
  setWorkoutPlan: (plan: WorkoutPlan) => void;
}

export const useStore = create<AppState>((set, get) => ({
  // Initial state
  user: null,
  isAuthenticated: false,
  isDeviceConnected: false,
  currentMetrics: null,
  healthHistory: [],
  currentNutritionPlan: null,
  nutritionHistory: [],
  currentWorkoutPlan: null,
  workoutHistory: [],
  alerts: [],
  coachMessages: [],
  
  // Actions
  setUser: (user) => set({ user, isAuthenticated: true }),
  
  setDeviceConnection: (connected) => set({ isDeviceConnected: connected }),
  
  updateMetrics: (metrics) => set((state) => ({
    currentMetrics: metrics,
    healthHistory: [...state.healthHistory, metrics].slice(-100), // Keep last 100 entries
  })),
  
  addAlert: (alert) => set((state) => ({
    alerts: [alert, ...state.alerts],
  })),
  
  dismissAlert: (id) => set((state) => ({
    alerts: state.alerts.filter(alert => alert.id !== id),
  })),
  
  addCoachMessage: (message) => set((state) => ({
    coachMessages: [...state.coachMessages, message],
  })),
  
  setNutritionPlan: (plan) => set({ currentNutritionPlan: plan }),
  
  setWorkoutPlan: (plan) => set({ currentWorkoutPlan: plan }),
}));