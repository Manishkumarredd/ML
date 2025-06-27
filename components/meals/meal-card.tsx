"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Clock, Edit, Trash2, Utensils } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MealForm } from "./meal-form"

interface MealCardProps {
  meal: {
    id: string
    name: string
    calories: number
    protein: number
    carbs: number
    fat: number
    time: string
    notes?: string
  }
}

export function MealCard({ meal }: MealCardProps) {
  const router = useRouter()
  const [showEditForm, setShowEditForm] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this meal?")) return
    
    setDeleting(true)
    try {
      const response = await fetch(`/api/meals/${meal.id}`, {
        method: "DELETE",
      })
      
      if (response.ok) {
        router.refresh()
      }
    } catch (error) {
      console.error("Error deleting meal:", error)
    } finally {
      setDeleting(false)
    }
  }

  const formatTime = (time: string) => {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString([], {
      hour: 'numeric',
      minute: '2-digit',
    })
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        <Card className="relative overflow-hidden hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                <Utensils className="h-5 w-5 text-primary-600" />
                <span>{meal.name}</span>
              </CardTitle>
              <div className="flex items-center space-x-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowEditForm(true)}
                  className="h-8 w-8"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleDelete}
                  disabled={deleting}
                  className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Clock className="h-4 w-4" />
              <span>{formatTime(meal.time)}</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-primary-50 rounded-lg">
                <div className="text-2xl font-bold text-primary-700">{meal.calories}</div>
                <div className="text-xs text-primary-600">Calories</div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Protein:</span>
                  <span className="font-medium text-red-600">{meal.protein}g</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Carbs:</span>
                  <span className="font-medium text-blue-600">{meal.carbs}g</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Fat:</span>
                  <span className="font-medium text-yellow-600">{meal.fat}g</span>
                </div>
              </div>
            </div>

            {meal.notes && (
              <div className="pt-2 border-t border-gray-100">
                <p className="text-sm text-gray-600 italic">{meal.notes}</p>
              </div>
            )}
          </CardContent>

          {/* Decorative gradient */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600" />
        </Card>
      </motion.div>

      <MealForm
        open={showEditForm}
        onOpenChange={setShowEditForm}
        meal={meal}
      />
    </>
  )
}