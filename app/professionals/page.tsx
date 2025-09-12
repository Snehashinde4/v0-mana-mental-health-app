"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Search, Star, MapPin, Clock, Filter, Phone, MessageCircle, Video } from "lucide-react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"

interface Therapist {
  id: string
  name: string
  title: string
  specializations: string[]
  rating: number
  reviewCount: number
  location: string
  availability: string
  price: string
  image: string
  bio: string
  experience: string
  languages: string[]
  verified: boolean
}

const therapists: Therapist[] = [
  {
    id: "1",
    name: "Dr. Phas Gray",
    title: "Clinical Psychologist",
    specializations: ["Anxiety Expert", "Depression", "PTSD"],
    rating: 4.5,
    reviewCount: 126,
    location: "New York, NY",
    availability: "Available Today",
    price: "$120/session",
    image: "/professional-therapist-woman.png",
    bio: "Specializing in anxiety disorders and trauma recovery with over 10 years of experience.",
    experience: "10+ years",
    languages: ["English", "Spanish"],
    verified: true,
  },
  {
    id: "2",
    name: "Dr. Sarah Chen",
    title: "Licensed Therapist",
    specializations: ["Teen Counseling", "Family Therapy", "Stress Management"],
    rating: 4.8,
    reviewCount: 89,
    location: "Los Angeles, CA",
    availability: "Next Available: Tomorrow",
    price: "$100/session",
    image: "/asian-therapist-woman.jpg",
    bio: "Passionate about helping young adults navigate life transitions and family dynamics.",
    experience: "8+ years",
    languages: ["English", "Mandarin"],
    verified: true,
  },
  {
    id: "3",
    name: "Dr. Michael Rodriguez",
    title: "Psychiatrist",
    specializations: ["Medication Management", "Bipolar Disorder", "ADHD"],
    rating: 4.6,
    reviewCount: 203,
    location: "Chicago, IL",
    availability: "Available This Week",
    price: "$150/session",
    image: "/male-psychiatrist-doctor.jpg",
    bio: "Board-certified psychiatrist focusing on comprehensive mental health treatment.",
    experience: "15+ years",
    languages: ["English", "Spanish"],
    verified: true,
  },
  {
    id: "4",
    name: "Dr. Emily Johnson",
    title: "Counseling Psychologist",
    specializations: ["Relationship Counseling", "Self-Esteem", "Life Coaching"],
    rating: 4.7,
    reviewCount: 156,
    location: "Austin, TX",
    availability: "Available Today",
    price: "$90/session",
    image: "/blonde-therapist-woman.jpg",
    bio: "Helping individuals build confidence and create meaningful relationships.",
    experience: "7+ years",
    languages: ["English"],
    verified: true,
  },
  {
    id: "5",
    name: "Dr. James Wilson",
    title: "Clinical Social Worker",
    specializations: ["Addiction Recovery", "Trauma Therapy", "Group Therapy"],
    rating: 4.4,
    reviewCount: 94,
    location: "Seattle, WA",
    availability: "Next Available: Monday",
    price: "$80/session",
    image: "/male-therapist-social-worker.jpg",
    bio: "Dedicated to supporting individuals through recovery and healing journeys.",
    experience: "12+ years",
    languages: ["English"],
    verified: true,
  },
]

const specializations = [
  "All Specializations",
  "Anxiety Expert",
  "Depression",
  "PTSD",
  "Teen Counseling",
  "Family Therapy",
  "Stress Management",
  "Medication Management",
  "Bipolar Disorder",
  "ADHD",
  "Relationship Counseling",
  "Self-Esteem",
  "Life Coaching",
  "Addiction Recovery",
  "Trauma Therapy",
  "Group Therapy",
]

export default function ProfessionalsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSpecialization, setSelectedSpecialization] = useState("All Specializations")
  const [showFilters, setShowFilters] = useState(false)

  const filteredTherapists = therapists.filter((therapist) => {
    const matchesSearch =
      therapist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      therapist.specializations.some((spec) => spec.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesSpecialization =
      selectedSpecialization === "All Specializations" || therapist.specializations.includes(selectedSpecialization)

    return matchesSearch && matchesSpecialization
  })

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
      />
    ))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted pb-20 md:pb-0">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button variant="ghost" size="icon" asChild className="rounded-full">
              <Link href="/">
                <ArrowLeft className="w-5 h-5" />
              </Link>
            </Button>
            <div>
              <h1 className="text-2xl font-bold vayu-text-gradient">Contact Professionals</h1>
              <p className="text-muted-foreground">Find the right therapist for you</p>
            </div>
          </div>

          {/* Search and Filters */}
          <Card className="vayu-card border-0 mb-6">
            <CardContent className="p-6">
              <div className="flex gap-4 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search by name or specialization..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="bg-transparent">
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
              </div>

              {showFilters && (
                <div className="border-t border-border pt-4">
                  <h3 className="font-medium mb-3">Specializations</h3>
                  <div className="flex flex-wrap gap-2">
                    {specializations.map((spec) => (
                      <Badge
                        key={spec}
                        variant={selectedSpecialization === spec ? "default" : "outline"}
                        className={`cursor-pointer ${
                          selectedSpecialization === spec
                            ? "bg-primary text-primary-foreground"
                            : "bg-transparent hover:bg-primary/10"
                        }`}
                        onClick={() => setSelectedSpecialization(spec)}
                      >
                        {spec}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-muted-foreground">
              {filteredTherapists.length} professional{filteredTherapists.length !== 1 ? "s" : ""} found
            </p>
          </div>

          {/* Therapist List */}
          <div className="space-y-4">
            {filteredTherapists.map((therapist) => (
              <Card key={therapist.id} className="vayu-card border-0 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    {/* Profile Image */}
                    <div className="flex-shrink-0">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center overflow-hidden">
                        <img
                          src={therapist.image || "/placeholder.svg"}
                          alt={therapist.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    {/* Therapist Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-lg">{therapist.name}</h3>
                            {therapist.verified && (
                              <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                                Verified
                              </Badge>
                            )}
                          </div>
                          <p className="text-muted-foreground text-sm">{therapist.title}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-primary">{therapist.price}</p>
                          <p className="text-xs text-muted-foreground">{therapist.experience}</p>
                        </div>
                      </div>

                      {/* Rating */}
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex">{renderStars(therapist.rating)}</div>
                        <span className="text-sm font-medium">{therapist.rating}</span>
                        <span className="text-sm text-muted-foreground">({therapist.reviewCount} reviews)</span>
                      </div>

                      {/* Specializations */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        {therapist.specializations.slice(0, 3).map((spec) => (
                          <Badge key={spec} variant="outline" className="text-xs bg-transparent">
                            {spec}
                          </Badge>
                        ))}
                        {therapist.specializations.length > 3 && (
                          <Badge variant="outline" className="text-xs bg-transparent">
                            +{therapist.specializations.length - 3} more
                          </Badge>
                        )}
                      </div>

                      {/* Location and Availability */}
                      <div className="flex items-center gap-4 mb-3 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {therapist.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {therapist.availability}
                        </div>
                      </div>

                      {/* Bio */}
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{therapist.bio}</p>

                      {/* Languages */}
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-xs text-muted-foreground">Languages:</span>
                        {therapist.languages.map((lang) => (
                          <Badge key={lang} variant="outline" className="text-xs bg-transparent">
                            {lang}
                          </Badge>
                        ))}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <Button className="vayu-gradient text-white border-0 hover:opacity-90 flex-1">
                          <Phone className="w-4 h-4 mr-2" />
                          Contact
                        </Button>
                        <Button variant="outline" className="bg-transparent">
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Message
                        </Button>
                        <Button variant="outline" className="bg-transparent">
                          <Video className="w-4 h-4 mr-2" />
                          Video Call
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* No Results */}
          {filteredTherapists.length === 0 && (
            <Card className="vayu-card border-0">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="font-semibold mb-2">No professionals found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search terms or filters to find more results.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("")
                    setSelectedSpecialization("All Specializations")
                  }}
                  className="bg-transparent"
                >
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Emergency Resources */}
          <Card className="vayu-card border-0 mt-8 bg-red-50 border-red-200">
            <CardContent className="p-6">
              <h3 className="font-semibold text-red-800 mb-2">Crisis Resources</h3>
              <p className="text-red-700 text-sm mb-4">
                If you're experiencing a mental health crisis, please reach out for immediate help:
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-red-600" />
                  <span className="text-red-800">
                    <strong>988 Suicide & Crisis Lifeline:</strong> Call or text 988
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-red-600" />
                  <span className="text-red-800">
                    <strong>Crisis Text Line:</strong> Text HOME to 741741
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-red-600" />
                  <span className="text-red-800">
                    <strong>Emergency:</strong> Call 911
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Navigation />
    </div>
  )
}
