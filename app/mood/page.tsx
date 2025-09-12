"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, Calendar, TrendingUp } from "lucide-react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"

interface MoodEntry {
  date: string
  moodLevel: number
  notes?: string
  triggers?: string[]
  activities?: string[]
}

const moodEmojis = [
  { emoji: "😢", label: "Very Sad", color: "text-red-500", bgColor: "bg-red-100" },
  { emoji: "☹️", label: "Sad", color: "text-orange-500", bgColor: "bg-orange-100" },
  { emoji: "😐", label: "Neutral", color: "text-yellow-500", bgColor: "bg-yellow-100" },
  { emoji: "🙂", label: "Happy", color: "text-green-500", bgColor: "bg-green-100" },
  { emoji: "😊", label: "Very Happy", color: "text-emerald-500", bgColor: "bg-emerald-100" },
]

export default function MoodAssessmentPage() {
  const [currentMood, setCurrentMood] = useState<number | null>(null)
  const [sliderValue, setSliderValue] = useState(2)
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>([])
  const [showResults, setShowResults] = useState(false)

  useEffect(() => {
    // Load mood history from localStorage
    const saved = localStorage.getItem("vayu-mood-history")
    if (saved) {
      setMoodHistory(JSON.parse(saved))
    }
  }, [])

  const handleMoodSubmit = () => {
    const newEntry: MoodEntry = {
      date: new Date().toISOString().split("T")[0],
      moodLevel: sliderValue,
    }

    const updatedHistory = [newEntry, ...moodHistory.slice(0, 6)]
    setMoodHistory(updatedHistory)
    localStorage.setItem("vayu-mood-history", JSON.stringify(updatedHistory))
    setCurrentMood(sliderValue)
    setShowResults(true)
  }

  const getMoodRecommendation = (mood: number) => {
    if (mood <= 1) {
      return {
        title: "We're here for you",
        message:
          "It's okay to feel this way. Consider reaching out to a professional or trying some breathing exercises.",
        action: "Talk to Pepo",
        actionLink: "/chat",
      }
    } else if (mood <= 2) {
      return {
        title: "Take it one step at a time",
        message: "Small steps can make a big difference. Try a short meditation or connect with someone you trust.",
        action: "Start Meditation",
        actionLink: "/meditate",
      }
    } else if (mood === 3) {
      return {
        title: "You're doing okay",
        message: "Neutral days are normal. Maybe try something that usually brings you joy or practice gratitude.",
        action: "Daily Motivation",
        actionLink: "/motivation",
      }
    } else if (mood === 4) {
      return {
        title: "Great to see you feeling good!",
        message: "Keep up the positive momentum. Consider sharing your good vibes or helping someone else.",
        action: "Share Positivity",
        actionLink: "/community",
      }
    } else {
      return {
        title: "You're radiating positive energy!",
        message: "Amazing! Your positive energy is contagious. Consider what's working well for you today.",
        action: "Track Patterns",
        actionLink: "/insights",
      }
    }
  }

  const getAverageMood = () => {
    if (moodHistory.length === 0) return 0
    const sum = moodHistory.reduce((acc, entry) => acc + entry.moodLevel, 0)
    return sum / moodHistory.length
  }

  if (showResults && currentMood !== null) {
    const recommendation = getMoodRecommendation(currentMood)
    const selectedMood = moodEmojis[currentMood]

    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted pb-20 md:pb-0">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
              <Button variant="ghost" size="icon" onClick={() => setShowResults(false)} className="rounded-full">
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <h1 className="text-2xl font-bold vayu-text-gradient">Mood Check Complete</h1>
            </div>

            {/* Current Mood Result */}
            <Card className="vayu-card border-0 mb-6">
              <CardContent className="p-8 text-center">
                <div
                  className={`w-24 h-24 ${selectedMood.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}
                >
                  <span className="text-4xl">{selectedMood.emoji}</span>
                </div>
                <h2 className="text-2xl font-bold mb-2">{selectedMood.label}</h2>
                <p className="text-muted-foreground mb-6">{recommendation.message}</p>
                <Button className="vayu-gradient text-white border-0 hover:opacity-90">
                  <Link href={recommendation.actionLink}>{recommendation.action}</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Mood History */}
            {moodHistory.length > 0 && (
              <Card className="vayu-card border-0 mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    Your Mood Journey
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-sm text-muted-foreground">Average mood:</span>
                    <span className="font-semibold">{getAverageMood().toFixed(1)}/5</span>
                    <Progress value={(getAverageMood() / 5) * 100} className="flex-1 ml-2" />
                  </div>

                  <div className="grid grid-cols-7 gap-2">
                    {moodHistory.slice(0, 7).map((entry, index) => {
                      const mood = moodEmojis[entry.moodLevel]
                      return (
                        <div key={index} className="text-center">
                          <div className={`w-10 h-10 ${mood.bgColor} rounded-lg flex items-center justify-center mb-1`}>
                            <span className="text-lg">{mood.emoji}</span>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {new Date(entry.date).toLocaleDateString("en", { weekday: "short" })}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="h-auto p-4 flex flex-col gap-2 bg-transparent">
                <Calendar className="w-6 h-6 text-primary" />
                <span className="text-sm">Check Again Tomorrow</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col gap-2 bg-transparent">
                <Link href="/chat" className="flex flex-col items-center gap-2">
                  <span className="text-2xl">🤖</span>
                  <span className="text-sm">Talk to Pepo</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
        <Navigation />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted pb-20 md:pb-0">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button variant="ghost" size="icon" asChild className="rounded-full">
              <Link href="/">
                <ArrowLeft className="w-5 h-5" />
              </Link>
            </Button>
            <div>
              <h1 className="text-2xl font-bold vayu-text-gradient">Assessment</h1>
              <p className="text-muted-foreground">How are you feeling today?</p>
            </div>
          </div>

          {/* Mood Assessment Card */}
          <Card className="vayu-card border-0 mb-8">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-xl font-semibold mb-6">How are you feeling today?</h2>

                {/* Mood Emojis */}
                <div className="flex justify-center gap-4 mb-8">
                  {moodEmojis.map((mood, index) => (
                    <div
                      key={index}
                      className={`w-16 h-16 rounded-full flex items-center justify-center cursor-pointer transition-all ${
                        sliderValue === index ? `${mood.bgColor} scale-110 shadow-lg` : "bg-muted hover:bg-muted/80"
                      }`}
                      onClick={() => setSliderValue(index)}
                    >
                      <span className="text-2xl">{mood.emoji}</span>
                    </div>
                  ))}
                </div>

                {/* Mood Slider */}
                <div className="relative mb-8">
                  <input
                    type="range"
                    min="0"
                    max="4"
                    value={sliderValue}
                    onChange={(e) => setSliderValue(Number.parseInt(e.target.value))}
                    className="w-full h-3 bg-gradient-to-r from-red-200 via-yellow-200 to-green-200 rounded-lg appearance-none cursor-pointer slider"
                    style={{
                      background: `linear-gradient(to right, 
                        #fecaca 0%, 
                        #fed7aa 25%, 
                        #fef3c7 50%, 
                        #bbf7d0 75%, 
                        #a7f3d0 100%)`,
                    }}
                  />
                  <div
                    className="absolute top-0 w-6 h-6 bg-primary rounded-full shadow-lg transform -translate-y-1.5 transition-all duration-200"
                    style={{
                      left: `calc(${(sliderValue / 4) * 100}% - 12px)`,
                    }}
                  />
                </div>

                {/* Current Selection */}
                <div className="text-center mb-8">
                  <p className="text-lg font-medium text-primary">{moodEmojis[sliderValue].label}</p>
                  <p className="text-sm text-muted-foreground mt-2">Slide to adjust or tap an emoji above</p>
                </div>

                {/* Submit Button */}
                <Button
                  onClick={handleMoodSubmit}
                  className="vayu-gradient text-white border-0 hover:opacity-90 w-full py-6 text-lg"
                >
                  Record My Mood
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Mood History Preview */}
          {moodHistory.length > 0 && (
            <Card className="vayu-card border-0">
              <CardHeader>
                <CardTitle className="text-lg">Recent Check-ins</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {moodHistory.slice(0, 5).map((entry, index) => {
                    const mood = moodEmojis[entry.moodLevel]
                    return (
                      <div key={index} className="flex-shrink-0 text-center">
                        <div className={`w-12 h-12 ${mood.bgColor} rounded-lg flex items-center justify-center mb-2`}>
                          <span className="text-lg">{mood.emoji}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {new Date(entry.date).toLocaleDateString("en", { month: "short", day: "numeric" })}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      <Navigation />
    </div>
  )
}
