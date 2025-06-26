import { User, HealthMetrics, NutritionPlan, WorkoutPlan, HealthAlert, CommunityPost } from '../types';

export const mockUser: User = {
  id: '1',
  name: 'Alex Johnson',
  email: 'alex@example.com',
  age: 28,
  height: 175,
  weight: 70,
  gender: 'male',
  activityLevel: 'moderate',
  goals: {
    primary: 'muscle_gain',
    targetWeight: 75,
    targetSteps: 10000,
    targetCalories: 2500,
    targetSleep: 8,
    targetWater: 2500,
  },
  preferences: {
    dietType: 'omnivore',
    allergies: ['nuts'],
    dislikes: ['mushrooms'],
    culturalRestrictions: [],
    mealTiming: {
      breakfast: '07:00',
      lunch: '12:30',
      dinner: '19:00',
      snacks: 2,
    },
    notifications: {
      meals: true,
      hydration: true,
      exercise: true,
      sleep: true,
      health_alerts: true,
    },
  },
  medicalInfo: {
    conditions: [],
    medications: [],
    emergencyContact: {
      name: 'Sarah Johnson',
      phone: '+1-555-0123',
      relationship: 'Spouse',
    },
  },
};

export const generateRealtimeMetrics = (): HealthMetrics => ({
  timestamp: new Date(),
  heartRate: 72 + Math.floor(Math.random() * 20),
  heartRateVariability: 35 + Math.floor(Math.random() * 15),
  bloodOxygen: 96 + Math.floor(Math.random() * 4),
  bodyTemperature: 36.5 + Math.random() * 0.8,
  stressLevel: Math.floor(Math.random() * 10) + 1,
  steps: Math.floor(Math.random() * 100) + 8000,
  caloriesBurned: Math.floor(Math.random() * 50) + 2000,
  activeMinutes: Math.floor(Math.random() * 10) + 45,
  sleepData: {
    duration: 7.5 + Math.random() * 1.5,
    quality: 7 + Math.floor(Math.random() * 3),
    deepSleep: 2 + Math.random() * 1,
    remSleep: 1.5 + Math.random() * 0.5,
    awakenings: Math.floor(Math.random() * 3),
  },
});

export const mockNutritionPlan: NutritionPlan = {
  id: '1',
  date: new Date().toISOString().split('T')[0],
  totalCalories: 2500,
  macros: {
    protein: 150,
    carbs: 250,
    fat: 100,
    fiber: 35,
    sugar: 50,
  },
  meals: [
    {
      id: '1',
      type: 'breakfast',
      name: 'Protein Power Bowl',
      time: '07:00',
      foods: [
        {
          id: '1',
          name: 'Greek Yogurt',
          quantity: 200,
          unit: 'g',
          calories: 130,
          macros: { protein: 20, carbs: 9, fat: 0, fiber: 0, sugar: 9 },
          micronutrients: { vitamins: { B12: 1.2 }, minerals: { calcium: 200 } },
        },
        {
          id: '2',
          name: 'Blueberries',
          quantity: 100,
          unit: 'g',
          calories: 57,
          macros: { protein: 0.7, carbs: 14, fat: 0.3, fiber: 2.4, sugar: 10 },
          micronutrients: { vitamins: { C: 9.7 }, minerals: { potassium: 77 } },
        },
      ],
      calories: 450,
      macros: { protein: 35, carbs: 40, fat: 15, fiber: 8, sugar: 12 },
      prepTime: 5,
      instructions: [
        'Add Greek yogurt to bowl',
        'Top with fresh blueberries',
        'Sprinkle with granola if desired',
      ],
      image: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg',
    },
  ],
  hydration: {
    target: 2500,
    current: 500,
    reminders: ['09:00', '12:00', '15:00', '18:00'],
  },
};

export const mockWorkoutPlan: WorkoutPlan = {
  id: '1',
  name: 'Upper Body Strength',
  type: 'strength',
  duration: 45,
  intensity: 'moderate',
  exercises: [
    {
      id: '1',
      name: 'Push-ups',
      type: 'strength',
      sets: 3,
      reps: 12,
      restTime: 60,
      instructions: [
        'Start in plank position',
        'Lower body until chest nearly touches floor',
        'Push back up to starting position',
      ],
      targetMuscles: ['chest', 'shoulders', 'triceps'],
    },
  ],
  caloriesBurn: 300,
  equipment: ['none'],
};

export const mockAlerts: HealthAlert[] = [
  {
    id: '1',
    type: 'warning',
    category: 'health',
    title: 'Elevated Heart Rate',
    message: 'Your resting heart rate has been elevated for the past hour. Consider taking a break.',
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    actionRequired: true,
    recommendations: ['Take deep breaths', 'Sit down and rest', 'Stay hydrated'],
  },
  {
    id: '2',
    type: 'info',
    category: 'nutrition',
    title: 'Meal Reminder',
    message: 'Time for your afternoon snack! Your body needs fuel for the rest of the day.',
    timestamp: new Date(Date.now() - 15 * 60 * 1000),
    actionRequired: false,
  },
  {
    id: '3',
    type: 'achievement',
    category: 'fitness',
    title: 'Step Goal Achieved!',
    message: 'Congratulations! You\'ve reached your daily step goal of 10,000 steps.',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    actionRequired: false,
  },
];

export const mockCommunityPosts: CommunityPost[] = [
  {
    id: '1',
    userId: '2',
    userName: 'Sarah M.',
    content: 'Just completed my first 5K run! The AI coach\'s training plan really worked. Feeling amazing! 🏃‍♀️',
    type: 'achievement',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    likes: 24,
    comments: [
      {
        id: '1',
        userId: '3',
        userName: 'Mike R.',
        content: 'Congratulations! That\'s awesome progress!',
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
        likes: 3,
      },
    ],
    tags: ['running', 'achievement', 'fitness'],
    images: ['https://images.pexels.com/photos/2402777/pexels-photo-2402777.jpeg'],
  },
];