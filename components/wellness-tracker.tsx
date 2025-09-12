"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, Target, CheckCircle2, AlertCircle, BarChart3 } from "lucide-react"

interface WellnessGoal {
  id: string
  title: string
  description: string
  target: number
  current: number
  unit: string
  category: "daily" | "weekly" | "monthly"
  status: "on-track" | "behind" | "achieved"
}

interface WellnessHabit {
  id: string
  name: string
  streak: number
  completedToday: boolean
  category: string
  culturalRelevance?: string
}

export default function WellnessTracker() {
  const [goals, setGoals] = useState<WellnessGoal[]>([
    {
      id: "1",
      title: "Daily Meditation",
      description: "Practice mindfulness meditation",
      target: 10,
      current: 7,
      unit: "minutes",
      category: "daily",
      status: "on-track",
    },
    {
      id: "2",
      title: "Sleep Quality",
      description: "Maintain consistent sleep schedule",
      target: 8,
      current: 6.5,
      unit: "hours",
      category: "daily",
      status: "behind",
    },
    {
      id: "3",
      title: "Social Connection",
      description: "Meaningful conversations with friends/family",
      target: 5,
      current: 4,
      unit: "interactions",
      category: "weekly",
      status: "on-track",
    },
  ])

  const [habits, setHabits] = useState<WellnessHabit[]>([
    {
      id: "1",
      name: "Morning Gratitude",
      streak: 12,
      completedToday: true,
      category: "Mindfulness",
      culturalRelevance: "Inspired by traditional Indian gratitude practices",
    },
    {
      id: "2",
      name: "Evening Family Call",
      streak: 8,
      completedToday: false,
      category: "Social",
      culturalRelevance: "Maintaining family bonds important in Indian culture",
    },
    {
      id: "3",
      name: "Yoga/Exercise",
      streak: 5,
      completedToday: true,
      category: "Physical",
      culturalRelevance: "Traditional Indian wellness practice",
    },
  ])

  const toggleHabit = (habitId: string) => {
    setHabits(
      habits.map((habit) =>
        habit.id === habitId
          ? {
              ...habit,
              completedToday: !habit.completedToday,
              streak: !habit.completedToday ? habit.streak + 1 : Math.max(0, habit.streak - 1),
            }
          : habit,
      ),
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "achieved":
        return "bg-green-100 text-green-800"
      case "on-track":
        return "bg-blue-100 text-blue-800"
      case "behind":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "achieved":
        return <CheckCircle2 className="h-4 w-4" />
      case "on-track":
        return <TrendingUp className="h-4 w-4" />
      case "behind":
        return <AlertCircle className="h-4 w-4" />
      default:
        return <Target className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="goals" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="goals">Wellness Goals</TabsTrigger>
          <TabsTrigger value="habits">Daily Habits</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="goals" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-6 w-6 text-blue-600" />
                Personal Wellness Goals
              </CardTitle>
              <CardDescription>Track your progress towards better mental health</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {goals.map((goal) => (
                  <div key={goal.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-semibold">{goal.title}</h4>
                        <p className="text-sm text-gray-600">{goal.description}</p>
                      </div>
                      <Badge className={getStatusColor(goal.status)}>
                        {getStatusIcon(goal.status)}
                        {goal.status.replace("-", " ")}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>
                          Progress: {goal.current} / {goal.target} {goal.unit}
                        </span>
                        <span>{Math.round((goal.current / goal.target) * 100)}%</span>
                      </div>
                      <Progress value={(goal.current / goal.target) * 100} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="habits" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
                Daily Wellness Habits
              </CardTitle>
              <CardDescription>Build consistent habits for long-term mental wellness</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {habits.map((habit) => (
                  <div key={habit.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <Button
                          variant={habit.completedToday ? "default" : "outline"}
                          size="sm"
                          onClick={() => toggleHabit(habit.id)}
                          className="w-8 h-8 p-0"
                        >
                          {habit.completedToday && <CheckCircle2 className="h-4 w-4" />}
                        </Button>
                        <div>
                          <h4 className="font-medium">{habit.name}</h4>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Badge variant="outline">{habit.category}</Badge>
                            <span>🔥 {habit.streak} day streak</span>
                          </div>
                          {habit.culturalRelevance && (
                            <p className="text-xs text-purple-600 mt-1">{habit.culturalRelevance}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-6 w-6 text-purple-600" />
                AI-Powered Wellness Insights
              </CardTitle>
              <CardDescription>Personalized recommendations based on your patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Weekly Pattern Analysis</h4>
                  <p className="text-sm text-blue-800 mb-3">
                    Your stress levels tend to peak on Tuesdays and Wednesdays, likely due to mid-week academic
                    pressure.
                  </p>
                  <Badge className="bg-blue-100 text-blue-800">
                    Recommendation: Schedule lighter activities on these days
                  </Badge>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">Cultural Wellness Opportunity</h4>
                  <p className="text-sm text-green-800 mb-3">
                    Upcoming Diwali celebrations could boost your social connection scores. Consider participating in
                    campus events.
                  </p>
                  <Badge className="bg-green-100 text-green-800">
                    Cultural Context: Festival participation enhances well-being
                  </Badge>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-900 mb-2">Sleep Optimization</h4>
                  <p className="text-sm text-purple-800 mb-3">
                    Your sleep quality improves by 23% when you complete evening meditation. Consider making this a
                    daily habit.
                  </p>
                  <Badge className="bg-purple-100 text-purple-800">Data-driven insight from 30-day analysis</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
