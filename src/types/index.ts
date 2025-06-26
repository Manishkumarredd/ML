export interface User {
  id: string;
  name: string;
  email: string;
  age: number;
  height: number; // cm
  weight: number; // kg
  gender: 'male' | 'female' | 'other';
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
  goals: UserGoals;
  preferences: UserPreferences;
  medicalInfo: MedicalInfo;
}

export interface UserGoals {
  primary: 'weight_loss' | 'muscle_gain' | 'maintenance' | 'bulking' | 'endurance';
  targetWeight?: number;
  targetSteps: number;
  targetCalories: number;
  targetSleep: number;
  targetWater: number; // ml
}

export interface UserPreferences {
  dietType: 'omnivore' | 'vegetarian' | 'vegan' | 'keto' | 'paleo' | 'mediterranean';
  allergies: string[];
  dislikes: string[];
  culturalRestrictions: string[];
  mealTiming: MealTiming;
  notifications: NotificationSettings;
}

export interface MealTiming {
  breakfast: string;
  lunch: string;
  dinner: string;
  snacks: number;
}

export interface NotificationSettings {
  meals: boolean;
  hydration: boolean;
  exercise: boolean;
  sleep: boolean;
  health_alerts: boolean;
}

export interface MedicalInfo {
  conditions: string[];
  medications: string[];
  emergencyContact: EmergencyContact;
  healthcareProvider?: HealthcareProvider;
}

export interface EmergencyContact {
  name: string;
  phone: string;
  relationship: string;
}

export interface HealthcareProvider {
  name: string;
  phone: string;
  email: string;
  specialty: string;
}

export interface HealthMetrics {
  timestamp: Date;
  heartRate: number;
  heartRateVariability: number;
  bloodOxygen: number;
  bodyTemperature: number;
  bloodPressure?: BloodPressure;
  stressLevel: number;
  steps: number;
  caloriesBurned: number;
  activeMinutes: number;
  sleepData?: SleepData;
}

export interface BloodPressure {
  systolic: number;
  diastolic: number;
}

export interface SleepData {
  duration: number; // hours
  quality: number; // 1-10
  deepSleep: number; // hours
  remSleep: number; // hours
  awakenings: number;
}

export interface NutritionPlan {
  id: string;
  date: string;
  totalCalories: number;
  macros: MacroNutrients;
  meals: Meal[];
  hydration: HydrationPlan;
  supplements?: Supplement[];
}

export interface MacroNutrients {
  protein: number; // grams
  carbs: number; // grams
  fat: number; // grams
  fiber: number; // grams
  sugar: number; // grams
}

export interface Meal {
  id: string;
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  name: string;
  time: string;
  foods: Food[];
  calories: number;
  macros: MacroNutrients;
  prepTime: number; // minutes
  instructions: string[];
  image?: string;
}

export interface Food {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  calories: number;
  macros: MacroNutrients;
  micronutrients: MicroNutrients;
}

export interface MicroNutrients {
  vitamins: Record<string, number>;
  minerals: Record<string, number>;
}

export interface HydrationPlan {
  target: number; // ml
  current: number; // ml
  reminders: string[];
}

export interface Supplement {
  name: string;
  dosage: string;
  timing: string;
  purpose: string;
}

export interface WorkoutPlan {
  id: string;
  name: string;
  type: 'strength' | 'cardio' | 'flexibility' | 'sports' | 'recovery';
  duration: number; // minutes
  intensity: 'low' | 'moderate' | 'high';
  exercises: Exercise[];
  caloriesBurn: number;
  equipment: string[];
}

export interface Exercise {
  id: string;
  name: string;
  type: 'strength' | 'cardio' | 'flexibility';
  sets?: number;
  reps?: number;
  duration?: number; // seconds
  weight?: number; // kg
  restTime?: number; // seconds
  instructions: string[];
  targetMuscles: string[];
}

export interface HealthAlert {
  id: string;
  type: 'critical' | 'warning' | 'info' | 'achievement';
  category: 'health' | 'nutrition' | 'fitness' | 'sleep' | 'hydration';
  title: string;
  message: string;
  timestamp: Date;
  actionRequired?: boolean;
  recommendations?: string[];
}

export interface AICoachMessage {
  id: string;
  type: 'user' | 'ai';
  message: string;
  timestamp: Date;
  context?: 'nutrition' | 'fitness' | 'health' | 'motivation' | 'general';
  suggestions?: string[];
}

export interface CommunityPost {
  id: string;
  userId: string;
  userName: string;
  avatar?: string;
  content: string;
  type: 'progress' | 'recipe' | 'workout' | 'question' | 'achievement';
  timestamp: Date;
  likes: number;
  comments: Comment[];
  tags: string[];
  images?: string[];
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  content: string;
  timestamp: Date;
  likes: number;
}

export interface ProgressData {
  date: string;
  weight?: number;
  bodyFat?: number;
  muscleMass?: number;
  measurements?: BodyMeasurements;
  photos?: string[];
  notes?: string;
}

export interface BodyMeasurements {
  chest?: number;
  waist?: number;
  hips?: number;
  arms?: number;
  thighs?: number;
}