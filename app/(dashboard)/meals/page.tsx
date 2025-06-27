import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { MealCard } from "@/components/meals/meal-card"
import { MealForm } from "@/components/meals/meal-form"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

async function getMeals(userId: string) {
  return await prisma.meal.findMany({
    where: { userId },
    orderBy: { time: 'asc' },
  })
}

export default async function Meals() {
  const session = await getServerSession(authOptions)
  const meals = await getMeals(session!.user!.id!)

  const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0)
  const totalProtein = meals.reduce((sum, meal) => sum + meal.protein, 0)
  const totalCarbs = meals.reduce((sum, meal) => sum + meal.carbs, 0)
  const totalFat = meals.reduce((sum, meal) => sum + meal.fat, 0)

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Meal Planner</h1>
          <p className="text-gray-600 mt-2">
            Plan and track your daily nutrition intake
          </p>
        </div>
        <MealFormTrigger />
      </div>

      {/* Daily Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Calories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary-600">{totalCalories}</div>
            <p className="text-xs text-gray-500">kcal today</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Protein</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{totalProtein.toFixed(1)}g</div>
            <p className="text-xs text-gray-500">total protein</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Carbs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{totalCarbs.toFixed(1)}g</div>
            <p className="text-xs text-gray-500">total carbs</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Fat</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{totalFat.toFixed(1)}g</div>
            <p className="text-xs text-gray-500">total fat</p>
          </CardContent>
        </Card>
      </div>

      {/* Meals Grid */}
      {meals.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {meals.map((meal) => (
            <MealCard key={meal.id} meal={meal} />
          ))}
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>No meals planned yet</CardTitle>
            <CardDescription>
              Start by adding your first meal to begin tracking your nutrition.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <MealFormTrigger />
          </CardContent>
        </Card>
      )}
    </div>
  )
}

function MealFormTrigger() {
  return (
    <MealForm open={false} onOpenChange={() => {}}>
      <Button className="flex items-center space-x-2">
        <Plus className="h-4 w-4" />
        <span>Add Meal</span>
      </Button>
    </MealForm>
  )
}