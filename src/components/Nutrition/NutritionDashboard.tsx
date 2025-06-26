import React from 'react';
import { Apple, Clock, Target, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { useStore } from '../../store/useStore';
import { mockNutritionPlan } from '../../data/mockData';

export const NutritionDashboard: React.FC = () => {
  const { currentNutritionPlan, user } = useStore();
  const plan = currentNutritionPlan || mockNutritionPlan;

  const macroPercentages = {
    protein: (plan.macros.protein * 4 / plan.totalCalories) * 100,
    carbs: (plan.macros.carbs * 4 / plan.totalCalories) * 100,
    fat: (plan.macros.fat * 9 / plan.totalCalories) * 100,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Nutrition Dashboard</h2>
        <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
          Generate New Plan
        </button>
      </div>

      {/* Daily Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-wellness-calories bg-opacity-10 rounded-lg">
              <Target className="h-6 w-6 text-wellness-calories" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Daily Calories</h3>
              <p className="text-2xl font-bold text-wellness-calories">{plan.totalCalories}</p>
            </div>
          </div>
          <div className="text-sm text-gray-600">
            Target: {user?.goals.targetCalories || 2500} kcal
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          delay={0.1}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-red-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Protein</h3>
              <p className="text-2xl font-bold text-red-600">{plan.macros.protein}g</p>
            </div>
          </div>
          <div className="text-sm text-gray-600">
            {macroPercentages.protein.toFixed(0)}% of calories
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          delay={0.2}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Apple className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Carbs</h3>
              <p className="text-2xl font-bold text-blue-600">{plan.macros.carbs}g</p>
            </div>
          </div>
          <div className="text-sm text-gray-600">
            {macroPercentages.carbs.toFixed(0)}% of calories
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          delay={0.3}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Fat</h3>
              <p className="text-2xl font-bold text-yellow-600">{plan.macros.fat}g</p>
            </div>
          </div>
          <div className="text-sm text-gray-600">
            {macroPercentages.fat.toFixed(0)}% of calories
          </div>
        </motion.div>
      </div>

      {/* Meal Plan */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Meal Plan</h3>
        <div className="space-y-4">
          {plan.meals.map((meal) => (
            <motion.div
              key={meal.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {meal.image && (
                <img
                  src={meal.image}
                  alt={meal.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
              )}
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-gray-900">{meal.name}</h4>
                  <span className="text-sm text-gray-500 capitalize">{meal.type}</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {meal.calories} kcal • {meal.time} • {meal.prepTime} min prep
                </p>
                <div className="flex space-x-4 text-xs text-gray-500 mt-2">
                  <span>P: {meal.macros.protein}g</span>
                  <span>C: {meal.macros.carbs}g</span>
                  <span>F: {meal.macros.fat}g</span>
                </div>
              </div>
              <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                View Recipe
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Hydration Tracking */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Hydration Tracking</h3>
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Daily Progress</span>
              <span>{plan.hydration.current}ml / {plan.hydration.target}ml</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(plan.hydration.current / plan.hydration.target) * 100}%` }}
                className="h-3 bg-wellness-nutrition rounded-full"
              />
            </div>
          </div>
          <button className="bg-wellness-nutrition text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors">
            Add Water
          </button>
        </div>
      </div>
    </div>
  );
};