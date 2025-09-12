"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Building2,
  Calendar,
  Clock,
  MapPin,
  Phone,
  Users,
  AlertCircle,
  CheckCircle,
  BookOpen,
  Stethoscope,
  Shield,
  Wifi,
  MessageSquare,
} from "lucide-react"

interface CampusResource {
  id: string
  name: string
  type: "counselor" | "medical" | "security" | "academic" | "peer"
  location: string
  availability: string
  contact: string
  status: "available" | "busy" | "offline"
  specialization?: string[]
  languages?: string[]
  emergencyContact?: boolean
}

interface CampusEvent {
  id: string
  title: string
  type: "wellness" | "academic" | "social" | "crisis"
  date: string
  time: string
  location: string
  description: string
  registrationRequired: boolean
}

interface AcademicCalendar {
  currentSemester: string
  upcomingEvents: {
    name: string
    date: string
    stressLevel: "low" | "medium" | "high"
  }[]
}

export function CampusIntegration() {
  const [selectedCampus, setSelectedCampus] = useState("IIT Delhi")
  const [campusResources, setCampusResources] = useState<CampusResource[]>([])
  const [upcomingEvents, setUpcomingEvents] = useState<CampusEvent[]>([])
  const [academicCalendar, setAcademicCalendar] = useState<AcademicCalendar | null>(null)
  const [emergencyMode, setEmergencyMode] = useState(false)

  const campuses = [
    "IIT Delhi",
    "IIT Bombay",
    "IIT Madras",
    "IIT Kanpur",
    "IIT Kharagpur",
    "AIIMS Delhi",
    "JNU",
    "DU",
    "BHU",
    "Jadavpur University",
  ]

  useEffect(() => {
    loadCampusData()
  }, [selectedCampus])

  const loadCampusData = () => {
    // Simulate campus-specific data loading
    const resources: CampusResource[] = [
      {
        id: "1",
        name: "Dr. Priya Sharma",
        type: "counselor",
        location: "Student Counseling Center, Block A-201",
        availability: "Mon-Fri 9AM-5PM",
        contact: "+91-11-2659-1234",
        status: "available",
        specialization: ["Anxiety", "Depression", "Academic Stress"],
        languages: ["Hindi", "English", "Punjabi"],
        emergencyContact: true,
      },
      {
        id: "2",
        name: "Campus Medical Center",
        type: "medical",
        location: "Health Center, Ground Floor",
        availability: "24/7",
        contact: "+91-11-2659-5678",
        status: "available",
        emergencyContact: true,
      },
      {
        id: "3",
        name: "Security Control Room",
        type: "security",
        location: "Main Gate Security Office",
        availability: "24/7",
        contact: "+91-11-2659-9999",
        status: "available",
        emergencyContact: true,
      },
      {
        id: "4",
        name: "Peer Support Group - Mental Health",
        type: "peer",
        location: "Student Activity Center, Room 105",
        availability: "Wed 6PM-8PM, Sat 2PM-4PM",
        contact: "peer.support@campus.edu",
        status: "available",
        specialization: ["Peer Counseling", "Group Support"],
      },
      {
        id: "5",
        name: "Academic Advisor - Engineering",
        type: "academic",
        location: "Engineering Block, Room 301",
        availability: "Tue-Thu 10AM-4PM",
        contact: "+91-11-2659-3456",
        status: "busy",
        specialization: ["Academic Planning", "Career Guidance"],
      },
    ]

    const events: CampusEvent[] = [
      {
        id: "1",
        title: "Mental Health Awareness Workshop",
        type: "wellness",
        date: "2024-11-15",
        time: "2:00 PM - 4:00 PM",
        location: "Auditorium Hall",
        description: "Interactive workshop on stress management and mental wellness techniques",
        registrationRequired: true,
      },
      {
        id: "2",
        title: "Exam Stress Management Session",
        type: "academic",
        date: "2024-11-20",
        time: "5:00 PM - 6:30 PM",
        location: "Library Conference Room",
        description: "Learn effective strategies to manage exam anxiety and improve performance",
        registrationRequired: false,
      },
      {
        id: "3",
        title: "Peer Support Group Meeting",
        type: "social",
        date: "2024-11-18",
        time: "6:00 PM - 8:00 PM",
        location: "Student Center Room 105",
        description: "Weekly peer support group for students facing mental health challenges",
        registrationRequired: false,
      },
    ]

    const calendar: AcademicCalendar = {
      currentSemester: "Autumn 2024",
      upcomingEvents: [
        { name: "Mid-Semester Exams", date: "2024-11-25", stressLevel: "high" },
        { name: "Project Submissions", date: "2024-12-01", stressLevel: "medium" },
        { name: "End-Semester Exams", date: "2024-12-15", stressLevel: "high" },
        { name: "Winter Break", date: "2024-12-20", stressLevel: "low" },
      ],
    }

    setCampusResources(resources)
    setUpcomingEvents(events)
    setAcademicCalendar(calendar)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "text-green-600 bg-green-50"
      case "busy":
        return "text-yellow-600 bg-yellow-50"
      case "offline":
        return "text-red-600 bg-red-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  const getResourceIcon = (type: string) => {
    switch (type) {
      case "counselor":
        return <Users className="w-5 h-5" />
      case "medical":
        return <Stethoscope className="w-5 h-5" />
      case "security":
        return <Shield className="w-5 h-5" />
      case "academic":
        return <BookOpen className="w-5 h-5" />
      case "peer":
        return <MessageSquare className="w-5 h-5" />
      default:
        return <Building2 className="w-5 h-5" />
    }
  }

  const getStressLevelColor = (level: string) => {
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

  const handleEmergencyContact = (resource: CampusResource) => {
    // In real app, this would initiate emergency contact
    alert(`Contacting ${resource.name} at ${resource.contact}`)
  }

  return (
    <div className="space-y-6">
      {/* Campus Selection */}
      <Card className="vayu-card border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-primary" />
            Campus Integration System
          </CardTitle>
          <p className="text-sm text-muted-foreground">Real-time connection to your campus mental health resources</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Select Your Campus</label>
              <select
                value={selectedCampus}
                onChange={(e) => setSelectedCampus(e.target.value)}
                className="w-full p-2 border border-border rounded-lg bg-background"
              >
                {campuses.map((campus) => (
                  <option key={campus} value={campus}>
                    {campus}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center justify-between p-3 bg-primary/5 rounded-lg">
              <div className="flex items-center gap-2">
                <Wifi className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">Campus Network Status</span>
              </div>
              <Badge className="bg-green-100 text-green-800">
                <CheckCircle className="w-3 h-3 mr-1" />
                Connected
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Emergency Quick Access */}
      <Card className="vayu-card border-0 border-red-200 bg-red-50">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <div>
                <h4 className="font-medium text-red-800">Emergency Support</h4>
                <p className="text-sm text-red-600">24/7 campus crisis support available</p>
              </div>
            </div>
            <Button variant="destructive" size="sm" onClick={() => setEmergencyMode(true)}>
              Emergency Contact
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Campus Resources */}
      <Card className="vayu-card border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            Available Campus Resources
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {campusResources.map((resource) => (
            <div key={resource.id} className="border border-border rounded-lg p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    {getResourceIcon(resource.type)}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{resource.name}</h4>
                    <p className="text-sm text-muted-foreground capitalize">{resource.type}</p>
                  </div>
                </div>
                <Badge className={getStatusColor(resource.status)}>{resource.status}</Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span>{resource.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span>{resource.availability}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span>{resource.contact}</span>
                </div>
              </div>

              {resource.specialization && (
                <div>
                  <p className="text-sm font-medium mb-1">Specializations:</p>
                  <div className="flex flex-wrap gap-1">
                    {resource.specialization.map((spec, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {spec}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {resource.languages && (
                <div>
                  <p className="text-sm font-medium mb-1">Languages:</p>
                  <div className="flex flex-wrap gap-1">
                    {resource.languages.map((lang, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {lang}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-2">
                <Button
                  size="sm"
                  className="vayu-gradient text-white border-0"
                  disabled={resource.status === "offline"}
                >
                  Book Appointment
                </Button>
                <Button size="sm" variant="outline" disabled={resource.status === "offline"}>
                  Quick Chat
                </Button>
                {resource.emergencyContact && (
                  <Button size="sm" variant="destructive" onClick={() => handleEmergencyContact(resource)}>
                    Emergency
                  </Button>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Academic Calendar Integration */}
      {academicCalendar && (
        <Card className="vayu-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Academic Calendar & Stress Prediction
            </CardTitle>
            <p className="text-sm text-muted-foreground">Current Semester: {academicCalendar.currentSemester}</p>
          </CardHeader>
          <CardContent className="space-y-4">
            {academicCalendar.upcomingEvents.map((event, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div>
                  <h4 className="font-medium">{event.name}</h4>
                  <p className="text-sm text-muted-foreground">{event.date}</p>
                </div>
                <Badge className={getStressLevelColor(event.stressLevel)}>{event.stressLevel} stress</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Campus Events */}
      <Card className="vayu-card border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            Upcoming Wellness Events
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {upcomingEvents.map((event) => (
            <div key={event.id} className="border border-border rounded-lg p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-medium">{event.title}</h4>
                  <p className="text-sm text-muted-foreground capitalize">{event.type} event</p>
                </div>
                {event.registrationRequired && <Badge variant="outline">Registration Required</Badge>}
              </div>

              <p className="text-sm">{event.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span>{event.location}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button size="sm" className="vayu-gradient text-white border-0">
                  {event.registrationRequired ? "Register" : "Add to Calendar"}
                </Button>
                <Button size="sm" variant="outline">
                  Learn More
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
