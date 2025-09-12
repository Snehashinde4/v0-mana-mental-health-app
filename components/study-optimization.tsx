"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Clock, Brain, Target, Zap, Calendar, BookOpen } from "lucide-react"

interface StudySession {
  subject: string
  duration: number
  focusScore: number
  retentionRate: number
  stressLevel: number
  timeOfDay: string
  method: string
}

interface OptimizationRecommendation {
  type: "timing" | "method" | "duration" | "environment"
  title: string
  description: string
  expectedImprovement: number
  difficulty: "easy" | "medium" | "hard"
}

export function StudyOptimization() {
  const [studySessions, setStudySessions] = useState<StudySession[]>([])
  const [recommendations, setRecommendations] = useState<OptimizationRecommendation[]>([])
  const [selectedSubject, setSelectedSubject] = useState("All Subjects")

  const subjects = ["All Subjects", "Data Structures", "DBMS", "Networks", "Software Engineering", "Machine Learning"]

  const mockStudySessions: StudySession[] = [
    {
      subject: "Data Structures",
      duration: 120,
      focusScore: 65,
      retentionRate: 72,
      stressLevel: 8,
      timeOfDay: "Morning",
      method: "Active Recall",
    },
    {
      subject: "Machine Learning",
      duration: 180,
      focusScore: 45,
      retentionRate: 58,
      stressLevel: 9,
      timeOfDay: "Night",
      method: "Reading",
    },
    {
      subject: "DBMS",
      duration: 90,
      focusScore: 85,
      retentionRate: 88,
      stressLevel: 4,
      timeOfDay: "Afternoon",
      method: "Practice Problems",
    },
  ]

  const mockRecommendations: OptimizationRecommendation[] = [
    {
      type: "timing",
      title: "Optimize Study Timing",
      description: "Your focus scores are 40% higher during afternoon sessions. Schedule challenging subjects then.",
      expectedImprovement: 25,
      difficulty: "easy",
    },
    {
      type: "method",
      title: "Switch to Active Learning",
      description: "Practice problems show 30% better retention than passive reading for technical subjects.",
      expectedImprovement: 30,
      difficulty: "medium",
    },
    {
      type: "duration",
      title: "Reduce Session Length",
      description: "Sessions over 2 hours show diminishing returns. Break into 90-minute focused blocks.",
      expectedImprovement: 20,
      difficulty: "easy",
    },
    {
      type: "environment",
      title: "Stress Management Integration",
      description: "High stress sessions (8+) show 45% lower retention. Include 5-minute mindfulness breaks.",
      expectedImprovement: 35,
      difficulty: "medium",
    },
  ]

  useState(() => {
    setStudySessions(mockStudySessions)
    setRecommendations(mockRecommendations)
  })

  const getMethodColor = (method: string) => {
    switch (method) {
      case "Active Recall":
        return "bg-green-100 text-green-800"
      case "Practice Problems":
        return "bg-blue-100 text-blue-800"
      case "Reading":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "hard":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "timing":
        return <Clock className="w-4 h-4" />
      case "method":
        return <Brain className="w-4 h-4" />
      case "duration":
        return <Target className="w-4 h-4" />
      case "environment":
        return <Zap className="w-4 h-4" />
      default:
        return <BookOpen className="w-4 h-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Study Performance Overview */}
      <Card className="vayu-card border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-primary" />
            AI-Powered Study Optimization
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Personalized recommendations based on your study patterns and mental health data
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">78%</div>
              <div className="text-sm text-muted-foreground">Avg Focus Score</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">72%</div>
              <div className="text-sm text-muted-foreground">Retention Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">2.5h</div>
              <div className="text-sm text-muted-foreground">Optimal Session</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">+25%</div>
              <div className="text-sm text-muted-foreground">Potential Gain</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Subject Filter */}
      <Card className="vayu-card border-0">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium">Filter by Subject:</span>
            <div className="flex flex-wrap gap-2">
              {subjects.map((subject) => (
                <Button
                  key={subject}
                  variant={selectedSubject === subject ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedSubject(subject)}
                >
                  {subject}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Study Sessions Analysis */}
      <Card className="vayu-card border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            Recent Study Sessions Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {studySessions.map((session, index) => (
            <div key={index} className="border border-border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">{session.subject}</h4>
                  <p className="text-sm text-muted-foreground">
                    {session.duration} minutes • {session.timeOfDay}
                  </p>
                </div>
                <Badge className={getMethodColor(session.method)}>{session.method}</Badge>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Focus Score</span>
                    <span>{session.focusScore}%</span>
                  </div>
                  <Progress value={session.focusScore} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Retention</span>
                    <span>{session.retentionRate}%</span>
                  </div>
                  <Progress value={session.retentionRate} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Stress Level</span>
                    <span>{session.stressLevel}/10</span>
                  </div>
                  <Progress value={session.stressLevel * 10} className="h-2" />
                </div>
                <div className="flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-lg font-bold">
                      {Math.round((session.focusScore + session.retentionRate) / 2)}%
                    </div>
                    <div className="text-xs text-muted-foreground">Efficiency</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Optimization Recommendations */}
      <Card className="vayu-card border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            Personalized Optimization Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {recommendations.map((rec, index) => (
            <div key={index} className="border border-border rounded-lg p-4 space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  {getTypeIcon(rec.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{rec.title}</h4>
                    <div className="flex items-center gap-2">
                      <Badge className={getDifficultyColor(rec.difficulty)}>{rec.difficulty}</Badge>
                      <Badge variant="outline">+{rec.expectedImprovement}%</Badge>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{rec.description}</p>
                  <div className="flex gap-2">
                    <Button size="sm" className="vayu-gradient text-white border-0">
                      Apply Recommendation
                    </Button>
                    <Button size="sm" variant="outline">
                      Learn More
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Optimal Study Schedule */}
      <Card className="vayu-card border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            AI-Generated Optimal Study Schedule
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-7 gap-2">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                <div key={day} className="text-center">
                  <div className="font-medium text-sm mb-2">{day}</div>
                  <div className="space-y-1">
                    <div className="bg-blue-100 text-blue-800 text-xs p-2 rounded">
                      9-11 AM
                      <br />
                      DSA
                    </div>
                    <div className="bg-green-100 text-green-800 text-xs p-2 rounded">
                      2-4 PM
                      <br />
                      DBMS
                    </div>
                    <div className="bg-purple-100 text-purple-800 text-xs p-2 rounded">
                      7-8 PM
                      <br />
                      Review
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-primary/5 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Schedule Optimization Notes</h4>
              <ul className="text-sm space-y-1">
                <li>• Morning slots for high-concentration subjects (DSA, ML)</li>
                <li>• Afternoon for practice-based learning (DBMS, Networks)</li>
                <li>• Evening for review and light reading</li>
                <li>• 15-minute breaks every 90 minutes for optimal focus</li>
                <li>• Stress management sessions before challenging topics</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
