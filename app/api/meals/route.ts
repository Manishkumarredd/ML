import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { name, calories, protein, carbs, fat, time, notes } = body

    const meal = await prisma.meal.create({
      data: {
        name,
        calories: parseInt(calories),
        protein: parseFloat(protein),
        carbs: parseFloat(carbs),
        fat: parseFloat(fat),
        time,
        notes: notes || null,
        userId: session.user.id,
      },
    })

    return NextResponse.json(meal)
  } catch (error) {
    console.error("Error creating meal:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}