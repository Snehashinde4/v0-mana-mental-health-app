"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Calendar, BookOpen, Heart, Brain, Lightbulb, TrendingUp } from "lucide-react"

interface CulturalContext {
  festival: string
  academicPeriod: string
  regionalContext: string
  familyDynamics: string[]
  culturalFactors: {
    familyExpectations: number
    academicPressure: number
    socialHarmony: number
    religiousInfluence: number
  }
  seasonalPatterns: {
    monsoonDepression: boolean
    festivalStress: boolean
    examAnxiety: boolean
    placementPressure: boolean
  }
  recommendations: string[]
}

interface CulturalInsight {
  type: "family" | "academic" | "social" | "seasonal"
  title: string
  description: string
  severity: "low" | "medium" | "high"
  actionItems: string[]
}

export function CulturalIntelligence() {
  const [context, setContext] = useState<CulturalContext>({
    festival: "Diwali Season",
    academicPeriod: "Mid-Semester Exams",
    regionalContext: "North India",
    familyDynamics: ["Family Expectations", "Career Pressure", "Academic Performance", "Marriage Discussions"],
    culturalFactors: {
      familyExpectations: 85,
      academicPressure: 92,
      socialHarmony: 65,
      religiousInfluence: 70,
    },
    seasonalPatterns: {
      monsoonDepression: false,
      festivalStress: true,
      examAnxiety: true,
      placementPressure: false,
    },
    recommendations: [
      "Practice family communication techniques",
      "Use culturally-adapted breathing exercises",
      "Connect with peer support groups",
      "Schedule regular check-ins with campus counselor",
    ],
  })

  const [insights, setInsights] = useState<CulturalInsight[]>([])
  const [selectedRegion, setSelectedRegion] = useState("North India")

  const regions = ["North India", "South India", "West India", "East India", "Northeast India", "Central India"]

  const festivals = {
    "North India": ["Diwali", "Holi", "Karva Chauth", "Dussehra", "Eid"],
    "South India": ["Onam", "Pongal", "Ugadi", "Dussehra", "Diwali"],
    "West India": ["Ganesh Chaturthi", "Navratri", "Gudi Padwa", "Diwali"],
    "East India": ["Durga Puja", "Kali Puja", "Poila Boishakh", "Diwali"],
    "Northeast India": ["Bihu", "Hornbill Festival", "Wangala", "Diwali"],
    "Central India": ["Diwali", "Holi", "Dussehra", "Teej"],
  }

  useEffect(() => {
    generateCulturalInsights()
  }, [context])

  const generateCulturalInsights = () => {
    const newInsights: CulturalInsight[] = []

    // Family pressure insight
    if (context.culturalFactors.familyExpectations > 80) {
      newInsights.push({
        type: "family",
        title: "High Family Expectations Detected",
        description:
          "Your cultural context shows significant family pressure, especially around academic performance and career choices.",
        severity: "high",
        actionItems: [
          "Practice assertive communication with family",
          "Set healthy boundaries while respecting cultural values",
          "Seek family counseling if needed",
          "Connect with others facing similar pressures",
        ],
      })
    }

    // Academic pressure insight
    if (context.culturalFactors.academicPressure > 85 && context.seasonalPatterns.examAnxiety) {
      newInsights.push({
        type: "academic",
        title: "Exam Season Cultural Stress",
        description:
          "The combination of exam pressure and cultural expectations around academic success is creating heightened stress.",
        severity: "high",
        actionItems: [
          "Use culturally-adapted study techniques",
          "Practice mindfulness rooted in Indian traditions",
          "Communicate with family about realistic expectations",
          "Join study groups for peer support",
        ],
      })
    }

    // Seasonal insight
    if (context.seasonalPatterns.festivalStress) {
      newInsights.push({
        type: "seasonal",
        title: "Festival Season Stress",
        description:
          "Festival periods can increase social obligations and family interactions, potentially adding stress.",
        severity: "medium",
        actionItems: [
          "Plan festival activities mindfully",
          "Set limits on social obligations",
          "Practice gratitude and mindfulness during celebrations",
          "Take breaks during intensive social periods",
        ],
      })
    }

    // Social harmony insight
    if (context.culturalFactors.socialHarmony < 70) {
      newInsights.push({
        type: "social",
        title: "Social Harmony Concerns",
        description:
          "There may be challenges in maintaining social relationships while managing personal mental health needs.",
        severity: "medium",
        actionItems: [
          "Practice conflict resolution skills",
          "Seek mediation when needed",
          "Build supportive peer networks",
          "Learn to balance individual needs with group harmony",
        ],
      })
    }

    setInsights(newInsights)
  }

  const updateRegionalContext = (region: string) => {
    setSelectedRegion(region)
    setContext((prev) => ({
      ...prev,
      regionalContext: region,
      festival: festivals[region as keyof typeof festivals][0],
    }))
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "text-red-600 bg-red-50"
      case "medium":
        return "text-yellow-600 bg-yellow-50"
      case "low":
        return "text-green-600 bg-green-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  return (
    <div className="space-y-6">
      {/* Main Cultural Context Card */}
      <Card className="vayu-card border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-primary" />
            Cultural Intelligence Engine™
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            AI-powered understanding of Indian cultural context and mental health patterns
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Regional Selection */}
          <div>
            <label className="text-sm font-medium mb-2 block">Regional Context</label>
            <div className="flex flex-wrap gap-2">
              {regions.map((region) => (
                <Button
                  key={region}
                  variant={selectedRegion === region ? "default" : "outline"}
                  size="sm"
                  onClick={() => updateRegionalContext(region)}
                  className="text-xs"
                >
                  {region}
                </Button>
              ))}
            </div>
          </div>

          {/* Current Context */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">{context.festival}</p>
                <p className="text-xs text-muted-foreground">Current Festival</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">{context.academicPeriod}</p>
                <p className="text-xs text-muted-foreground">Academic Period</p>
              </div>
            </div>
          </div>

          {/* Cultural Factors Analysis */}
          <div>
            <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Cultural Stress Factors
            </h4>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Family Expectations</span>
                  <span className="text-muted-foreground">{context.culturalFactors.familyExpectations}%</span>
                </div>
                <Progress value={context.culturalFactors.familyExpectations} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Academic Pressure</span>
                  <span className="text-muted-foreground">{context.culturalFactors.academicPressure}%</span>
                </div>
                <Progress value={context.culturalFactors.academicPressure} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Social Harmony</span>
                  <span className="text-muted-foreground">{context.culturalFactors.socialHarmony}%</span>
                </div>
                <Progress value={context.culturalFactors.socialHarmony} className="h-2" />
              </div>
            </div>
          </div>

          {/* Current Patterns */}
          <div>
            <h4 className="text-sm font-medium mb-2">Active Patterns</h4>
            <div className="flex flex-wrap gap-2">
              {Object.entries(context.seasonalPatterns).map(
                ([pattern, active]) =>
                  active && (
                    <Badge key={pattern} variant="secondary" className="text-xs">
                      {pattern.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                    </Badge>
                  ),
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cultural Insights */}
      {insights.length > 0 && (
        <Card className="vayu-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-primary" />
              Cultural Insights & Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {insights.map((insight, index) => (
              <div key={index} className={`p-4 rounded-lg border ${getSeverityColor(insight.severity)}`}>
                <div className="flex items-start gap-3">
                  <div className="flex-1">
                    <h5 className="font-medium text-sm mb-1">{insight.title}</h5>
                    <p className="text-xs mb-3 opacity-80">{insight.description}</p>
                    <div>
                      <p className="text-xs font-medium mb-2">Recommended Actions:</p>
                      <ul className="text-xs space-y-1">
                        {insight.actionItems.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="w-1 h-1 bg-current rounded-full mt-2 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {insight.severity}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Culturally-Adapted Recommendations */}
      <Card className="vayu-card border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-primary" />
            Culturally-Adapted Coping Strategies
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {context.recommendations.map((recommendation, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                <span className="text-sm">{recommendation}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 p-3 bg-primary/5 rounded-lg">
            <p className="text-sm text-primary">
              <strong>MANA's Cultural Understanding:</strong> Based on your {context.regionalContext} background during{" "}
              {context.festival} season with {context.academicPeriod} pressure, these strategies are specifically
              adapted to honor your cultural values while supporting your mental health.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
