import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { message, healthData } = await request.json()

    const systemPrompt = `You are a knowledgeable and friendly AI health coach. You provide personalized health, nutrition, and fitness advice based on user data and questions.

Current user health metrics:
- Heart Rate: ${healthData.heartRate} bpm
- Sleep: ${healthData.sleep} hours
- Steps: ${healthData.steps}
- Stress Level: ${healthData.stress}/10

Guidelines:
- Be encouraging and supportive
- Provide actionable, specific advice
- Reference the user's current health metrics when relevant
- Keep responses concise but informative
- Always recommend consulting healthcare professionals for serious concerns
- Focus on evidence-based recommendations

User question: ${message}`

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: message,
        },
      ],
      max_tokens: 500,
      temperature: 0.7,
    })

    const aiResponse = completion.choices[0]?.message?.content || "I'm sorry, I couldn't generate a response right now. Please try again."

    return NextResponse.json({ message: aiResponse })
  } catch (error) {
    console.error("Error with OpenAI:", error)
    
    // Fallback response if OpenAI fails
    const fallbackResponses = [
      "Based on your current metrics, I'd recommend focusing on maintaining consistent sleep patterns and staying hydrated throughout the day.",
      "Your health data looks good! Consider incorporating more movement into your daily routine and eating balanced meals.",
      "I notice your stress levels could use some attention. Try some deep breathing exercises or a short walk to help manage stress.",
      "Great job on staying active! Remember to balance your workouts with proper rest and nutrition for optimal results.",
    ]
    
    const randomResponse = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)]
    
    return NextResponse.json({ message: randomResponse })
  }
}