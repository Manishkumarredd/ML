import { motion } from "framer-motion"
import { HealthCards } from "@/components/dashboard/health-cards"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Health Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Monitor your real-time health metrics and wellness progress
        </p>
      </div>

      <HealthCards />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Today's Summary</CardTitle>
            <CardDescription>Your health overview for today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Overall Health Score</span>
                <span className="text-2xl font-bold text-green-600">85/100</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }} />
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Active Minutes</p>
                  <p className="font-semibold">45 min</p>
                </div>
                <div>
                  <p className="text-gray-600">Calories Goal</p>
                  <p className="font-semibold">78% Complete</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Health Insights</CardTitle>
            <CardDescription>AI-powered recommendations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-sm font-medium text-blue-900">💡 Sleep Optimization</p>
                <p className="text-sm text-blue-700 mt-1">
                  Your sleep quality has improved by 15% this week. Keep maintaining your bedtime routine!
                </p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <p className="text-sm font-medium text-green-900">🎯 Activity Goal</p>
                <p className="text-sm text-green-700 mt-1">
                  You're 2,000 steps away from your daily goal. A 20-minute walk should get you there!
                </p>
              </div>
              <div className="p-3 bg-orange-50 rounded-lg">
                <p className="text-sm font-medium text-orange-900">🧘 Stress Management</p>
                <p className="text-sm text-orange-700 mt-1">
                  Your stress levels are slightly elevated. Consider a 5-minute breathing exercise.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}