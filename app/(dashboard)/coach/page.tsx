import { ChatInterface } from "@/components/coach/chat-interface"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Heart, Apple, Dumbbell } from "lucide-react"

export default function Coach() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">AI Health Coach</h1>
        <p className="text-gray-600 mt-2">
          Get personalized health advice powered by artificial intelligence
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ChatInterface />
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Brain className="h-5 w-5 text-primary-600" />
                <span>AI Capabilities</span>
              </CardTitle>
              <CardDescription>What your AI coach can help with</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <Heart className="h-5 w-5 text-wellness-heart mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Health Analysis</p>
                  <p className="text-xs text-gray-600">Real-time health metric interpretation</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Apple className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Nutrition Guidance</p>
                  <p className="text-xs text-gray-600">Personalized meal recommendations</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Dumbbell className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Fitness Planning</p>
                  <p className="text-xs text-gray-600">Custom workout suggestions</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-sm font-medium text-blue-900">💧 Hydration</p>
                <p className="text-xs text-blue-700 mt-1">
                  Drink water regularly throughout the day for optimal health.
                </p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <p className="text-sm font-medium text-green-900">🥗 Nutrition</p>
                <p className="text-xs text-green-700 mt-1">
                  Include colorful vegetables in every meal for better nutrition.
                </p>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <p className="text-sm font-medium text-purple-900">😴 Sleep</p>
                <p className="text-xs text-purple-700 mt-1">
                  Maintain consistent sleep schedule for better recovery.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}