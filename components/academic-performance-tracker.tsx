"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  TrendingUp,
  TrendingDown,
  BookOpen,
  Brain,
  Target,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  LineChart,
} from "lucide-react"

interface AcademicData {
  subject: string
  currentGrade: number
  previousGrade: number
  trend: "improving" | "declining" | "stable"
  mentalHealthCorrelation: number
  stressLevel: "low" | "medium" | "high"
  studyHours: number
  attendanceRate: number
}

interface MentalHealthMetric {
  date: string
  moodScore: number
  anxietyLevel: number
  stressLevel: number
  sleepQuality: number
  academicConfidence: number
}

interface Correlation {
  factor: string
  correlation: number
  impact: "positive" | "negative" | "neutral"
  recommendation: string
}

interface PredictiveInsight {
  type: "warning" | "opportunity" | "neutral"
  title: string
  description: string
  actionItems: string[]
  confidence: number
}

export function AcademicPerformanceTracker() {
  const [academicData, setAcademicData] = useState<AcademicData[]>([])
  const [mentalHealthData, setMentalHealthData] = useState<MentalHealthMetric[]>([])
  const [correlations, setCorrelations] = useState<Correlation[]>([])
  const [predictiveInsights, setPredictiveInsights] = useState<PredictiveInsight[]>([])
  const [selectedTimeframe, setSelectedTimeframe] = useState("semester")

  useEffect(() => {
    loadAcademicData()
    loadMentalHealthData()
    generateCorrelations()
    generatePredictiveInsights()
  }, [selectedTimeframe])

  const loadAcademicData = () => {
    const data: AcademicData[] = [
      {
        subject: "Data Structures & Algorithms",
        currentGrade: 78,
        previousGrade: 85,
        trend: "declining",
        mentalHealthCorrelation: -0.72,
        stressLevel: "high",
        studyHours: 15,
        attendanceRate: 92,
      },
      {
        subject: "Database Management Systems",
        currentGrade: 88,
        previousGrade: 82,
        trend: "improving",
        mentalHealthCorrelation: 0.65,
        stressLevel: "medium",
        studyHours: 12,
        attendanceRate: 95,
      },
      {
        subject: "Computer Networks",
        currentGrade: 75,
        previousGrade: 75,
        trend: "stable",
        mentalHealthCorrelation: 0.15,
        stressLevel: "medium",
        studyHours: 10,
        attendanceRate: 88,
      },
      {
        subject: "Software Engineering",
        currentGrade: 92,
        previousGrade: 89,
        trend: "improving",
        mentalHealthCorrelation: 0.58,
        stressLevel: "low",
        studyHours: 8,
        attendanceRate: 98,
      },
      {
        subject: "Machine Learning",
        currentGrade: 68,
        previousGrade: 72,
        trend: "declining",
        mentalHealthCorrelation: -0.45,
        stressLevel: "high",
        studyHours: 18,
        attendanceRate: 85,
      },
    ]
    setAcademicData(data)
  }

  const loadMentalHealthData = () => {
    // Simulate mental health tracking data over time
    const data: MentalHealthMetric[] = Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      moodScore: Math.floor(Math.random() * 40) + 60, // 60-100
      anxietyLevel: Math.floor(Math.random() * 50) + 20, // 20-70
      stressLevel: Math.floor(Math.random() * 60) + 30, // 30-90
      sleepQuality: Math.floor(Math.random() * 30) + 70, // 70-100
      academicConfidence: Math.floor(Math.random() * 40) + 50, // 50-90
    }))
    setMentalHealthData(data)
  }

  const generateCorrelations = () => {
    const correlationData: Correlation[] = [
      {
        factor: "Sleep Quality",
        correlation: 0.78,
        impact: "positive",
        recommendation: "Maintain 7-8 hours of quality sleep for optimal academic performance",
      },
      {
        factor: "Anxiety Levels",
        correlation: -0.65,
        impact: "negative",
        recommendation: "Practice anxiety management techniques before exams and assignments",
      },
      {
        factor: "Study Hours",
        correlation: 0.45,
        impact: "positive",
        recommendation: "Optimal study duration is 8-12 hours per week per subject",
      },
      {
        factor: "Social Support",
        correlation: 0.52,
        impact: "positive",
        recommendation: "Engage with study groups and peer support networks",
      },
      {
        factor: "Stress Levels",
        correlation: -0.71,
        impact: "negative",
        recommendation: "Implement stress reduction strategies during high-pressure periods",
      },
    ]
    setCorrelations(correlationData)
  }

  const generatePredictiveInsights = () => {
    const insights: PredictiveInsight[] = [
      {
        type: "warning",
        title: "Academic Performance Risk Detected",
        description:
          "Your Data Structures grade has declined by 7 points, correlating with increased stress levels. Intervention recommended.",
        actionItems: [
          "Schedule a session with the course instructor",
          "Join a study group for peer support",
          "Practice stress management techniques",
          "Consider reducing extracurricular commitments temporarily",
        ],
        confidence: 85,
      },
      {
        type: "opportunity",
        title: "Positive Momentum in DBMS",
        description:
          "Your improved mood and reduced anxiety are correlating with better performance in Database Management Systems.",
        actionItems: [
          "Continue current study strategies for DBMS",
          "Apply similar approaches to other challenging subjects",
          "Maintain current sleep and wellness routines",
        ],
        confidence: 78,
      },
      {
        type: "warning",
        title: "Machine Learning Performance Concern",
        description:
          "Despite increased study hours, ML grades are declining. This suggests ineffective study methods or high stress impact.",
        actionItems: [
          "Reassess study methodology for ML concepts",
          "Seek additional academic support or tutoring",
          "Practice mindfulness to improve focus during study",
          "Break down complex topics into smaller, manageable chunks",
        ],
        confidence: 72,
      },
    ]
    setPredictiveInsights(insights)
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "improving":
        return <TrendingUp className="w-4 h-4 text-green-600" />
      case "declining":
        return <TrendingDown className="w-4 h-4 text-red-600" />
      default:
        return <Target className="w-4 h-4 text-yellow-600" />
    }
  }

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

  const getCorrelationColor = (correlation: number) => {
    if (correlation > 0.5) return "text-green-600"
    if (correlation < -0.5) return "text-red-600"
    return "text-yellow-600"
  }

  const getInsightIcon = (type: string) => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-red-600" />
      case "opportunity":
        return <CheckCircle className="w-5 h-5 text-green-600" />
      default:
        return <Target className="w-5 h-5 text-blue-600" />
    }
  }

  const calculateOverallGPA = () => {
    const total = academicData.reduce((sum, subject) => sum + subject.currentGrade, 0)
    return (total / academicData.length / 10).toFixed(2)
  }

  const calculateMentalHealthAverage = () => {
    if (mentalHealthData.length === 0) return 0
    const recent = mentalHealthData.slice(-7) // Last 7 days
    const total = recent.reduce((sum, day) => sum + day.moodScore, 0)
    return Math.round(total / recent.length)
  }

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="vayu-card border-0">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Current GPA</p>
                <p className="text-xl font-bold">{calculateOverallGPA()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="vayu-card border-0">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Mental Wellness</p>
                <p className="text-xl font-bold">{calculateMentalHealthAverage()}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="vayu-card border-0">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Correlation Strength</p>
                <p className="text-xl font-bold">-0.42</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="vayu-card border-0">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Prediction Accuracy</p>
                <p className="text-xl font-bold">78%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Timeframe Selection */}
      <Card className="vayu-card border-0">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium">Analysis Timeframe:</span>
            <div className="flex gap-2">
              {["week", "month", "semester", "year"].map((timeframe) => (
                <Button
                  key={timeframe}
                  variant={selectedTimeframe === timeframe ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTimeframe(timeframe)}
                  className="capitalize"
                >
                  {timeframe}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Subject Performance Analysis */}
      <Card className="vayu-card border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            Subject Performance & Mental Health Correlation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {academicData.map((subject, index) => (
            <div key={index} className="border border-border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <h4 className="font-medium">{subject.subject}</h4>
                  {getTrendIcon(subject.trend)}
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getStressColor(subject.stressLevel)}>{subject.stressLevel} stress</Badge>
                  <span className="text-lg font-bold">{subject.currentGrade}%</span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Previous Grade</p>
                  <p className="font-medium">{subject.previousGrade}%</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Study Hours/Week</p>
                  <p className="font-medium">{subject.studyHours}h</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Attendance</p>
                  <p className="font-medium">{subject.attendanceRate}%</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Mental Health Impact</p>
                  <p className={`font-medium ${getCorrelationColor(subject.mentalHealthCorrelation)}`}>
                    {subject.mentalHealthCorrelation > 0 ? "+" : ""}
                    {subject.mentalHealthCorrelation.toFixed(2)}
                  </p>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Performance Progress</span>
                  <span>{subject.currentGrade}%</span>
                </div>
                <Progress value={subject.currentGrade} className="h-2" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Correlation Analysis */}
      <Card className="vayu-card border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LineChart className="w-5 h-5 text-primary" />
            Mental Health - Academic Performance Correlations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {correlations.map((correlation, index) => (
            <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
              <div className="flex-1">
                <h4 className="font-medium">{correlation.factor}</h4>
                <p className="text-sm text-muted-foreground">{correlation.recommendation}</p>
              </div>
              <div className="text-right">
                <p className={`font-bold ${getCorrelationColor(correlation.correlation)}`}>
                  {correlation.correlation > 0 ? "+" : ""}
                  {correlation.correlation.toFixed(2)}
                </p>
                <p className="text-xs text-muted-foreground capitalize">{correlation.impact} impact</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Predictive Insights */}
      <Card className="vayu-card border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-primary" />
            AI-Powered Predictive Insights
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Machine learning analysis of your patterns to predict and prevent academic challenges
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {predictiveInsights.map((insight, index) => (
            <div key={index} className="border border-border rounded-lg p-4 space-y-3">
              <div className="flex items-start gap-3">
                {getInsightIcon(insight.type)}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{insight.title}</h4>
                    <Badge variant="outline" className="text-xs">
                      {insight.confidence}% confidence
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{insight.description}</p>
                  <div>
                    <p className="text-sm font-medium mb-2">Recommended Actions:</p>
                    <ul className="text-sm space-y-1">
                      {insight.actionItems.map((action, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0" />
                          {action}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Academic Wellness Plan */}
      <Card className="vayu-card border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            Personalized Academic Wellness Plan
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-medium text-green-600">Strengths to Leverage</h4>
              <ul className="text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  High attendance rate correlates with better performance
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  Good sleep quality supports academic success
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  Positive mood enhances learning capacity
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-red-600">Areas for Improvement</h4>
              <ul className="text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                  High stress levels impacting DSA and ML performance
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                  Excessive study hours without proportional results
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                  Anxiety levels affecting focus and retention
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-primary/5 p-4 rounded-lg">
            <h4 className="font-medium mb-2">This Week's Focus</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Based on your patterns, prioritize stress management while maintaining study consistency.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">Stress Reduction</Badge>
              <Badge variant="outline">Sleep Optimization</Badge>
              <Badge variant="outline">Study Method Review</Badge>
              <Badge variant="outline">Peer Support</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
