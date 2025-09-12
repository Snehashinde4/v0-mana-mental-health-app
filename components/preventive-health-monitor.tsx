"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Heart,
  Brain,
  Moon,
  Activity,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Calendar,
  Target,
  Shield,
} from "lucide-react"

interface WellnessMetric {
  id: string
  name: string
  value: number
  target: number
  trend: "up" | "down" | "stable"
  status: "good" | "warning" | "critical"
  lastUpdated: string
}

interface PreventiveAlert {
  id: string
  type: "early_warning" | "intervention" | "recommendation"
  severity: "low" | "medium" | "high"
  title: string
  description: string
  action: string
  culturalContext?: string
}

export default function PreventiveHealthMonitor() {
  const [metrics, setMetrics] = useState<WellnessMetric[]>([
    {
      id: "stress",
      name: "Stress Level",
      value: 65,
      target: 40,
      trend: "up",
      status: "warning",
      lastUpdated: "2 hours ago",
    },
    {
      id: "sleep",
      name: "Sleep Quality",
      value: 75,
      target: 80,
      trend: "stable",
      status: "good",
      lastUpdated: "8 hours ago",
    },
    {
      id: "mood",
      name: "Mood Stability",
      value: 70,
      target: 75,
      trend: "up",
      status: "good",
      lastUpdated: "1 hour ago",
    },
    {
      id: "social",
      name: "Social Connection",
      value: 45,
      target: 70,
      trend: "down",
      status: "warning",
      lastUpdated: "3 hours ago",
    },
  ])

  const [alerts, setAlerts] = useState<PreventiveAlert[]>([
    {
      id: "1",
      type: "early_warning",
      severity: "medium",
      title: "Stress Pattern Detected",
      description: "Your stress levels have been consistently above normal for 3 days",
      action: "Consider scheduling a counseling session or trying guided meditation",
      culturalContext: "This aligns with pre-exam stress patterns common in Indian students",
    },
    {
      id: "2",
      type: "recommendation",
      severity: "low",
      title: "Social Connection Opportunity",
      description: "Low social interaction detected during festival season",
      action: "Join campus Diwali celebrations or connect with family",
      culturalContext: "Festival participation is important for emotional well-being in Indian culture",
    },
  ])

  const [wellnessScore, setWellnessScore] = useState(68)

  const getMetricIcon = (id: string) => {
    switch (id) {
      case "stress":
        return <Brain className="h-5 w-5" />
      case "sleep":
        return <Moon className="h-5 w-5" />
      case "mood":
        return <Heart className="h-5 w-5" />
      case "social":
        return <Activity className="h-5 w-5" />
      default:
        return <Activity className="h-5 w-5" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "good":
        return "text-green-600"
      case "warning":
        return "text-yellow-600"
      case "critical":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "low":
        return "bg-blue-100 text-blue-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "high":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Wellness Score Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-blue-600" />
            Preventive Wellness Score
          </CardTitle>
          <CardDescription>AI-powered early detection and intervention system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-3xl font-bold text-blue-600">{wellnessScore}/100</div>
              <div className="text-sm text-gray-600">Overall Wellness</div>
            </div>
            <div className="text-right">
              <Badge variant={wellnessScore >= 75 ? "default" : wellnessScore >= 50 ? "secondary" : "destructive"}>
                {wellnessScore >= 75 ? "Excellent" : wellnessScore >= 50 ? "Good" : "Needs Attention"}
              </Badge>
            </div>
          </div>
          <Progress value={wellnessScore} className="h-3" />
          <div className="mt-2 text-sm text-gray-600">
            Based on continuous monitoring of stress, sleep, mood, and social patterns
          </div>
        </CardContent>
      </Card>

      {/* Active Alerts */}
      {alerts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-6 w-6 text-orange-600" />
              Preventive Alerts
            </CardTitle>
            <CardDescription>Early intervention recommendations based on pattern analysis</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {alerts.map((alert) => (
              <Alert key={alert.id} className="border-l-4 border-l-orange-500">
                <AlertDescription>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={getSeverityColor(alert.severity)}>{alert.severity.toUpperCase()}</Badge>
                        <span className="font-semibold">{alert.title}</span>
                      </div>
                      <p className="text-sm text-gray-700 mb-2">{alert.description}</p>
                      <p className="text-sm font-medium text-blue-700 mb-2">{alert.action}</p>
                      {alert.culturalContext && (
                        <p className="text-xs text-purple-600 italic">Cultural Context: {alert.culturalContext}</p>
                      )}
                    </div>
                    <Button size="sm" variant="outline">
                      Take Action
                    </Button>
                  </div>
                </AlertDescription>
              </Alert>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Wellness Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {metrics.map((metric) => (
          <Card key={metric.id}>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between text-base">
                <div className="flex items-center gap-2">
                  {getMetricIcon(metric.id)}
                  {metric.name}
                </div>
                <Badge variant="outline" className={getStatusColor(metric.status)}>
                  {metric.status}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">{metric.value}%</span>
                  <div className="flex items-center gap-1 text-sm">
                    <TrendingUp
                      className={`h-4 w-4 ${
                        metric.trend === "up"
                          ? "text-green-600"
                          : metric.trend === "down"
                            ? "text-red-600 rotate-180"
                            : "text-gray-600"
                      }`}
                    />
                    <span className="text-gray-600">{metric.trend}</span>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Current</span>
                    <span>Target: {metric.target}%</span>
                  </div>
                  <Progress value={metric.value} className="h-2" />
                </div>
                <div className="text-xs text-gray-500">Last updated: {metric.lastUpdated}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Preventive Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-6 w-6 text-green-600" />
            Personalized Prevention Plan
          </CardTitle>
          <CardDescription>AI-generated recommendations based on your patterns and cultural context</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-semibold text-green-700">Daily Practices</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Morning meditation (5-10 minutes)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Evening gratitude journaling
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Regular sleep schedule (10 PM - 6 AM)
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-blue-700">Cultural Wellness</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-blue-600" />
                  Weekly family video calls
                </li>
                <li className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-blue-600" />
                  Participate in campus cultural events
                </li>
                <li className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-blue-600" />
                  Practice yoga or traditional exercises
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
