"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Play, Pause, RotateCcw, Plus, Minus, Volume2 } from "lucide-react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"

interface MeditationSession {
  id: string
  title: string
  description: string
  duration: number
  completed: boolean
  startTime?: Date
  completedTime?: Date
  sessionType: "breathing" | "mindfulness" | "sleep" | "anxiety"
}

const meditationTypes = [
  {
    id: "breathing",
    title: "Be Calm and Breathe Slowly",
    description: "Focus on your breath and find inner peace",
    defaultDuration: 150, // 2 min 30 sec
    color: "bg-blue-100 text-blue-700",
    icon: "🫁",
  },
  {
    id: "mindfulness",
    title: "Mindful Awareness",
    description: "Stay present and aware of the moment",
    defaultDuration: 300, // 5 min
    color: "bg-green-100 text-green-700",
    icon: "🧘‍♀️",
  },
  {
    id: "anxiety",
    title: "Anxiety Relief",
    description: "Calm your mind and reduce anxiety",
    defaultDuration: 420, // 7 min
    color: "bg-purple-100 text-purple-700",
    icon: "💜",
  },
  {
    id: "sleep",
    title: "Sleep Preparation",
    description: "Prepare your mind for restful sleep",
    defaultDuration: 600, // 10 min
    color: "bg-indigo-100 text-indigo-700",
    icon: "🌙",
  },
]

export default function MeditatePage() {
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [duration, setDuration] = useState(150) // Default 2:30
  const [timeLeft, setTimeLeft] = useState(150)
  const [isActive, setIsActive] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [sessionCount, setSessionCount] = useState(0)
  const [completedSessions, setCompletedSessions] = useState<MeditationSession[]>([])
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Load session data from localStorage
    const savedSessions = localStorage.getItem("vayu-meditation-sessions")
    if (savedSessions) {
      setCompletedSessions(JSON.parse(savedSessions))
    }

    const savedCount = localStorage.getItem("vayu-session-count")
    if (savedCount) {
      setSessionCount(Number.parseInt(savedCount))
    }
  }, [])

  useEffect(() => {
    if (isActive && !isPaused && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((time) => {
          if (time <= 1) {
            handleSessionComplete()
            return 0
          }
          return time - 1
        })
      }, 1000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isActive, isPaused, timeLeft])

  const handleSessionComplete = () => {
    setIsActive(false)
    setIsPaused(false)

    const newSession: MeditationSession = {
      id: Date.now().toString(),
      title: meditationTypes.find((t) => t.id === selectedType)?.title || "Meditation",
      description: meditationTypes.find((t) => t.id === selectedType)?.description || "",
      duration: duration,
      completed: true,
      completedTime: new Date(),
      sessionType: (selectedType as any) || "breathing",
    }

    const updatedSessions = [newSession, ...completedSessions.slice(0, 9)]
    setCompletedSessions(updatedSessions)
    localStorage.setItem("vayu-meditation-sessions", JSON.stringify(updatedSessions))

    const newCount = sessionCount + 1
    setSessionCount(newCount)
    localStorage.setItem("vayu-session-count", newCount.toString())

    // Reset for next session
    setTimeLeft(duration)
  }

  const startSession = (type: string) => {
    const selectedMeditation = meditationTypes.find((t) => t.id === type)
    if (selectedMeditation) {
      setSelectedType(type)
      setDuration(selectedMeditation.defaultDuration)
      setTimeLeft(selectedMeditation.defaultDuration)
      setIsActive(true)
      setIsPaused(false)
    }
  }

  const togglePause = () => {
    setIsPaused(!isPaused)
  }

  const resetSession = () => {
    setIsActive(false)
    setIsPaused(false)
    setTimeLeft(duration)
  }

  const adjustDuration = (seconds: number) => {
    const newDuration = Math.max(30, duration + seconds)
    setDuration(newDuration)
    if (!isActive) {
      setTimeLeft(newDuration)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const getProgress = () => {
    return ((duration - timeLeft) / duration) * 100
  }

  if (selectedType && (isActive || isPaused)) {
    const currentMeditation = meditationTypes.find((t) => t.id === selectedType)

    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 pb-20 md:pb-0">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
              <Button variant="ghost" size="icon" onClick={() => setSelectedType(null)} className="rounded-full">
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-xl font-bold vayu-text-gradient">Meditate</h1>
                <p className="text-muted-foreground">{currentMeditation?.title}</p>
              </div>
            </div>

            {/* Meditation Interface */}
            <Card className="vayu-card border-0 mb-6">
              <CardContent className="p-8 text-center">
                {/* Meditation Illustration */}
                <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center">
                  <span className="text-6xl">{currentMeditation?.icon}</span>
                </div>

                <h2 className="text-2xl font-bold mb-2 vayu-text-gradient">{currentMeditation?.title}</h2>
                <p className="text-muted-foreground mb-6">Duration: {formatTime(duration)}</p>

                {/* Circular Progress */}
                <div className="relative w-48 h-48 mx-auto mb-8">
                  <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="transparent"
                      className="text-muted"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      stroke="currentColor"
                      strokeWidth="3"
                      fill="transparent"
                      strokeDasharray={`${2 * Math.PI * 45}`}
                      strokeDashoffset={`${2 * Math.PI * 45 * (1 - getProgress() / 100)}`}
                      className="text-primary transition-all duration-1000 ease-in-out"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl font-bold vayu-text-gradient">{formatTime(timeLeft)}</div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {sessionCount > 0 && `Session ${sessionCount + 1}`}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Controls */}
                <div className="flex justify-center gap-4 mb-6">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={resetSession}
                    className="w-12 h-12 rounded-full bg-transparent"
                  >
                    <RotateCcw className="w-5 h-5" />
                  </Button>

                  <Button
                    onClick={togglePause}
                    className="w-16 h-16 rounded-full vayu-gradient text-white border-0 hover:opacity-90"
                  >
                    {isPaused ? <Play className="w-6 h-6" /> : <Pause className="w-6 h-6" />}
                  </Button>

                  <Button variant="outline" size="icon" className="w-12 h-12 rounded-full bg-transparent">
                    <Volume2 className="w-5 h-5" />
                  </Button>
                </div>

                {/* Duration Adjustment */}
                {!isActive && (
                  <div className="flex items-center justify-center gap-4">
                    <Button variant="outline" size="icon" onClick={() => adjustDuration(-30)} className="rounded-full">
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="text-sm text-muted-foreground">Adjust Duration</span>
                    <Button variant="outline" size="icon" onClick={() => adjustDuration(30)} className="rounded-full">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Session Stats */}
            {sessionCount > 0 && (
              <Card className="vayu-card border-0">
                <CardContent className="p-6">
                  <div className="text-center">
                    <h3 className="font-semibold mb-2">Your Progress</h3>
                    <p className="text-2xl font-bold text-primary">{sessionCount}</p>
                    <p className="text-sm text-muted-foreground">Sessions Completed</p>
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
              <h1 className="text-2xl font-bold vayu-text-gradient">Meditate</h1>
              <p className="text-muted-foreground">Find your inner peace</p>
            </div>
          </div>

          {/* Session Stats */}
          {sessionCount > 0 && (
            <Card className="vayu-card border-0 mb-6">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold mb-1">Your Journey</h3>
                    <p className="text-sm text-muted-foreground">Keep up the great work!</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary">{sessionCount}</p>
                    <p className="text-sm text-muted-foreground">Sessions</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Meditation Types */}
          <div className="space-y-4 mb-8">
            <h2 className="text-xl font-semibold">Choose Your Practice</h2>
            {meditationTypes.map((type) => (
              <Card key={type.id} className="vayu-card border-0 hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6" onClick={() => startSession(type.id)}>
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl ${type.color} flex items-center justify-center text-2xl`}>
                      {type.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{type.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{type.description}</p>
                      <p className="text-xs text-primary font-medium">Duration: {formatTime(type.defaultDuration)}</p>
                    </div>
                    <Button className="vayu-gradient text-white border-0 hover:opacity-90">Start</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Recent Sessions */}
          {completedSessions.length > 0 && (
            <Card className="vayu-card border-0">
              <CardHeader>
                <CardTitle>Recent Sessions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {completedSessions.slice(0, 3).map((session) => (
                    <div key={session.id} className="flex items-center justify-between py-2">
                      <div>
                        <p className="font-medium text-sm">{session.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {session.completedTime &&
                            new Date(session.completedTime).toLocaleDateString("en", {
                              month: "short",
                              day: "numeric",
                              hour: "numeric",
                              minute: "2-digit",
                            })}
                        </p>
                      </div>
                      <span className="text-sm text-primary font-medium">{formatTime(session.duration)}</span>
                    </div>
                  ))}
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
