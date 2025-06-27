"use client"

import { motion } from "framer-motion"
import { Heart, Moon, Footprints, Brain, TrendingUp, TrendingDown } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { generateMockHealthData } from "@/lib/utils"
import { useEffect, useState } from "react"

const healthMetrics = [
  {
    title: "Heart Rate",
    icon: Heart,
    color: "text-wellness-heart",
    bgColor: "bg-red-50",
    unit: "bpm",
    getValue: (data: any) => data.heartRate,
    getStatus: (value: number) => value > 90 ? "high" : value < 60 ? "low" : "normal"
  },
  {
    title: "Sleep",
    icon: Moon,
    color: "text-wellness-sleep",
    bgColor: "bg-purple-50",
    unit: "hrs",
    getValue: (data: any) => data.sleep.toFixed(1),
    getStatus: (value: number) => value < 6 ? "low" : value > 9 ? "high" : "normal"
  },
  {
    title: "Steps",
    icon: Footprints,
    color: "text-wellness-steps",
    bgColor: "bg-green-50",
    unit: "steps",
    getValue: (data: any) => data.steps.toLocaleString(),
    getStatus: (value: number) => value < 5000 ? "low" : value > 12000 ? "high" : "normal"
  },
  {
    title: "Stress Level",
    icon: Brain,
    color: "text-wellness-stress",
    bgColor: "bg-orange-50",
    unit: "/10",
    getValue: (data: any) => data.stress,
    getStatus: (value: number) => value > 7 ? "high" : value < 3 ? "low" : "normal"
  },
]

export function HealthCards() {
  const [healthData, setHealthData] = useState(generateMockHealthData())
  const [previousData, setPreviousData] = useState(generateMockHealthData())

  useEffect(() => {
    const interval = setInterval(() => {
      setPreviousData(healthData)
      setHealthData(generateMockHealthData())
    }, 5000)

    return () => clearInterval(interval)
  }, [healthData])

  const getTrendIcon = (current: number, previous: number) => {
    if (current > previous) return <TrendingUp className="h-4 w-4 text-green-500" />
    if (current < previous) return <TrendingDown className="h-4 w-4 text-red-500" />
    return <div className="h-4 w-4" />
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "high": return "text-red-600"
      case "low": return "text-yellow-600"
      default: return "text-green-600"
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {healthMetrics.map((metric, index) => {
        const Icon = metric.icon
        const currentValue = metric.getValue(healthData)
        const previousValue = metric.getValue(previousData)
        const numericCurrent = typeof currentValue === 'string' ? 
          parseFloat(currentValue.replace(/,/g, '')) : currentValue
        const numericPrevious = typeof previousValue === 'string' ? 
          parseFloat(previousValue.replace(/,/g, '')) : previousValue
        const status = metric.getStatus(numericCurrent)

        return (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <Card className="relative overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {metric.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${metric.bgColor}`}>
                  <Icon className={`h-5 w-5 ${metric.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-gray-900">
                      {currentValue}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {metric.unit}
                    </p>
                  </div>
                  <div className="flex flex-col items-end space-y-1">
                    {getTrendIcon(numericCurrent, numericPrevious)}
                    <span className={`text-xs font-medium ${getStatusColor(status)}`}>
                      {status}
                    </span>
                  </div>
                </div>
                
                {/* Animated pulse for heart rate */}
                {metric.title === "Heart Rate" && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-wellness-heart to-transparent opacity-30">
                    <motion.div
                      className="h-full bg-wellness-heart"
                      animate={{
                        x: ["-100%", "100%"],
                      }}
                      transition={{
                        duration: 60 / numericCurrent,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )
      })}
    </div>
  )
}