"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, User, MapPin, Phone, Video } from "lucide-react"

interface TimeSlot {
  id: string
  time: string
  available: boolean
  type: "in-person" | "video" | "phone"
}

interface Counselor {
  id: string
  name: string
  title: string
  specialization: string[]
  languages: string[]
  location: string
  image?: string
}

export function AppointmentScheduler() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0])
  const [selectedCounselor, setSelectedCounselor] = useState<Counselor | null>(null)
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null)
  const [appointmentType, setAppointmentType] = useState<"in-person" | "video" | "phone">("in-person")

  const counselors: Counselor[] = [
    {
      id: "1",
      name: "Dr. Priya Sharma",
      title: "Senior Counselor",
      specialization: ["Anxiety", "Depression", "Academic Stress"],
      languages: ["Hindi", "English", "Punjabi"],
      location: "Student Counseling Center, Block A-201",
    },
    {
      id: "2",
      name: "Dr. Rajesh Kumar",
      title: "Clinical Psychologist",
      specialization: ["Trauma", "Relationship Issues", "Career Counseling"],
      languages: ["Hindi", "English", "Bengali"],
      location: "Psychology Department, Block B-105",
    },
  ]

  const timeSlots: TimeSlot[] = [
    { id: "1", time: "09:00 AM", available: true, type: "in-person" },
    { id: "2", time: "10:00 AM", available: false, type: "in-person" },
    { id: "3", time: "11:00 AM", available: true, type: "video" },
    { id: "4", time: "02:00 PM", available: true, type: "in-person" },
    { id: "5", time: "03:00 PM", available: true, type: "phone" },
    { id: "6", time: "04:00 PM", available: false, type: "video" },
  ]

  const handleBookAppointment = () => {
    if (selectedCounselor && selectedSlot) {
      // In real app, this would make API call to book appointment
      alert(`Appointment booked with ${selectedCounselor.name} on ${selectedDate} at ${selectedSlot.time}`)
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="w-4 h-4" />
      case "phone":
        return <Phone className="w-4 h-4" />
      default:
        return <User className="w-4 h-4" />
    }
  }

  return (
    <Card className="vayu-card border-0">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-primary" />
          Smart Appointment Scheduling
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          AI-optimized booking with counselor-student compatibility matching
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Date Selection */}
        <div>
          <label className="text-sm font-medium mb-2 block">Select Date</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            min={new Date().toISOString().split("T")[0]}
            className="w-full p-2 border border-border rounded-lg bg-background"
          />
        </div>

        {/* Counselor Selection */}
        <div>
          <label className="text-sm font-medium mb-3 block">Choose Counselor</label>
          <div className="space-y-3">
            {counselors.map((counselor) => (
              <div
                key={counselor.id}
                className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                  selectedCounselor?.id === counselor.id
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
                onClick={() => setSelectedCounselor(counselor)}
              >
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{counselor.name}</h4>
                    <p className="text-sm text-muted-foreground">{counselor.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <MapPin className="w-3 h-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{counselor.location}</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {counselor.specialization.slice(0, 2).map((spec, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {spec}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {counselor.languages.map((lang, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {lang}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Appointment Type */}
        <div>
          <label className="text-sm font-medium mb-3 block">Appointment Type</label>
          <div className="flex gap-2">
            {["in-person", "video", "phone"].map((type) => (
              <Button
                key={type}
                variant={appointmentType === type ? "default" : "outline"}
                size="sm"
                onClick={() => setAppointmentType(type as any)}
                className="flex items-center gap-2"
              >
                {getTypeIcon(type)}
                <span className="capitalize">{type.replace("-", " ")}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Time Slots */}
        {selectedCounselor && (
          <div>
            <label className="text-sm font-medium mb-3 block">Available Time Slots</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {timeSlots
                .filter((slot) => slot.type === appointmentType)
                .map((slot) => (
                  <Button
                    key={slot.id}
                    variant={selectedSlot?.id === slot.id ? "default" : "outline"}
                    size="sm"
                    disabled={!slot.available}
                    onClick={() => setSelectedSlot(slot)}
                    className="flex items-center gap-2"
                  >
                    <Clock className="w-3 h-3" />
                    {slot.time}
                  </Button>
                ))}
            </div>
          </div>
        )}

        {/* Booking Summary */}
        {selectedCounselor && selectedSlot && (
          <div className="bg-muted/50 p-4 rounded-lg space-y-2">
            <h4 className="font-medium">Appointment Summary</h4>
            <div className="text-sm space-y-1">
              <p>
                <strong>Counselor:</strong> {selectedCounselor.name}
              </p>
              <p>
                <strong>Date:</strong> {selectedDate}
              </p>
              <p>
                <strong>Time:</strong> {selectedSlot.time}
              </p>
              <p>
                <strong>Type:</strong> {appointmentType.replace("-", " ")}
              </p>
              <p>
                <strong>Location:</strong> {appointmentType === "in-person" ? selectedCounselor.location : "Online"}
              </p>
            </div>
          </div>
        )}

        {/* Book Button */}
        <Button
          className="w-full vayu-gradient text-white border-0"
          disabled={!selectedCounselor || !selectedSlot}
          onClick={handleBookAppointment}
        >
          Book Appointment
        </Button>

        {/* Emergency Note */}
        <div className="bg-red-50 border border-red-200 p-3 rounded-lg">
          <p className="text-sm text-red-800">
            <strong>Crisis Support:</strong> If you need immediate help, contact campus emergency services at
            +91-11-2659-9999 or visit the medical center directly.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
