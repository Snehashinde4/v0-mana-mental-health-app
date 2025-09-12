"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Star, AlertTriangle } from "lucide-react"

interface Festival {
  name: string
  date: string
  region: string[]
  stressLevel: "low" | "medium" | "high"
  mentalHealthImpact: string
  copingStrategies: string[]
}

export function FestivalCalendar() {
  const [upcomingFestivals, setUpcomingFestivals] = useState<Festival[]>([])

  useEffect(() => {
    // Simulate festival data - in real app, this would come from API
    const festivals: Festival[] = [
      {
        name: "Diwali",
        date: "2024-11-01",
        region: ["All India"],
        stressLevel: "high",
        mentalHealthImpact:
          "Increased social obligations, family gatherings, financial pressure for gifts and celebrations",
        copingStrategies: [
          "Set a realistic budget for celebrations",
          "Practice saying no to excessive social commitments",
          "Take breaks during intensive family time",
          "Focus on gratitude and mindfulness during rituals",
        ],
      },
      {
        name: "Karva Chauth",
        date: "2024-10-20",
        region: ["North India"],
        stressLevel: "medium",
        mentalHealthImpact: "Fasting stress, relationship pressure, traditional expectations",
        copingStrategies: [
          "Communicate openly with partner about expectations",
          "Stay hydrated before fasting begins",
          "Practice meditation during fasting hours",
          "Focus on personal meaning rather than social pressure",
        ],
      },
      {
        name: "Durga Puja",
        date: "2024-10-15",
        region: ["East India"],
        stressLevel: "medium",
        mentalHealthImpact: "Community participation pressure, cultural identity stress for those away from home",
        copingStrategies: [
          "Connect virtually with family celebrations",
          "Find local Bengali community events",
          "Create personal rituals to honor the festival",
          "Practice cultural pride and identity affirmation",
        ],
      },
    ]

    setUpcomingFestivals(festivals)
  }, [])

  const getStressColor = (level: string) => {
    switch (level) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStressIcon = (level: string) => {
    switch (level) {
      case "high":
        return <AlertTriangle className="w-4 h-4" />
      case "medium":
        return <Star className="w-4 h-4" />
      case "low":
        return <Calendar className="w-4 h-4" />
      default:
        return <Calendar className="w-4 h-4" />
    }
  }

  return (
    <Card className="vayu-card border-0">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-primary" />
          Festival Mental Health Calendar
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Upcoming festivals with mental health insights and coping strategies
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {upcomingFestivals.map((festival, index) => (
          <div key={index} className="border border-border rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">{festival.name}</h4>
                <p className="text-sm text-muted-foreground">{festival.date}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge className={getStressColor(festival.stressLevel)}>
                  {getStressIcon(festival.stressLevel)}
                  <span className="ml-1 capitalize">{festival.stressLevel} Stress</span>
                </Badge>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium mb-1">Mental Health Impact:</p>
              <p className="text-sm text-muted-foreground">{festival.mentalHealthImpact}</p>
            </div>

            <div>
              <p className="text-sm font-medium mb-2">Culturally-Adapted Coping Strategies:</p>
              <ul className="text-sm space-y-1">
                {festival.copingStrategies.map((strategy, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0" />
                    {strategy}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-1">
              {festival.region.map((region, idx) => (
                <Badge key={idx} variant="outline" className="text-xs">
                  {region}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
