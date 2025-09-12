import PreventiveHealthMonitor from "@/components/preventive-health-monitor"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Shield, Brain, Heart, Activity, Calendar, Users, Smartphone } from "lucide-react"

export default function WellnessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Preventive Mental Wellness</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            AI-powered early detection and intervention system designed for Indian students
          </p>
        </div>

        {/* Main Monitor */}
        <PreventiveHealthMonitor />

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          <Card className="border-l-4 border-l-blue-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-6 w-6 text-blue-600" />
                Early Detection
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                AI analyzes patterns in mood, stress, sleep, and academic performance to detect early warning signs
              </p>
              <Badge variant="secondary">24/7 Monitoring</Badge>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-6 w-6 text-green-600" />
                Cultural Intelligence
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Understands Indian family dynamics, academic pressures, and cultural stressors for personalized care
              </p>
              <Badge variant="secondary">10+ Languages</Badge>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-6 w-6 text-purple-600" />
                Proactive Interventions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Suggests timely interventions before mental health issues escalate into crises
              </p>
              <Badge variant="secondary">Smart Recommendations</Badge>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-orange-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-6 w-6 text-orange-600" />
                Academic Integration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Correlates mental health with academic performance and exam schedules for targeted support
              </p>
              <Badge variant="secondary">Grade Correlation</Badge>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-teal-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-6 w-6 text-teal-600" />
                Campus Network
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Connects with campus counselors, peer supporters, and mental health professionals seamlessly
              </p>
              <Badge variant="secondary">Instant Access</Badge>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-pink-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="h-6 w-6 text-pink-600" />
                Voice & Chat Support
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Multilingual voice-enabled chat with cultural context understanding and emergency support
              </p>
              <Badge variant="secondary">Voice Enabled</Badge>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <Card className="max-w-2xl mx-auto bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <CardContent className="p-8">
              <Shield className="h-12 w-12 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">Start Your Preventive Wellness Journey</h3>
              <p className="mb-6 opacity-90">
                Join thousands of Indian students who are proactively managing their mental health with MANA
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary">
                  Begin Assessment
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-white border-white hover:bg-white hover:text-blue-600 bg-transparent"
                >
                  Learn More
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
