"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Users,
  MessageCircle,
  Video,
  Calendar,
  Star,
  Shield,
  Heart,
  UserPlus,
  Clock,
  MapPin,
  Phone,
  Stethoscope,
} from "lucide-react"

interface PeerMentor {
  id: string
  name: string
  avatar?: string
  year: string
  department: string
  specialties: string[]
  rating: number
  totalSessions: number
  status: "available" | "busy" | "offline"
  languages: string[]
  bio: string
  nextAvailable: string
}

interface SupportGroup {
  id: string
  name: string
  type: "peer" | "professional" | "mixed"
  topic: string
  members: number
  maxMembers: number
  nextMeeting: string
  frequency: string
  facilitator: string
  description: string
  isPrivate: boolean
  languages: string[]
}

interface Professional {
  id: string
  name: string
  title: string
  specialization: string[]
  rating: number
  experience: string
  availability: string
  type: "counselor" | "psychiatrist" | "therapist" | "social_worker"
  languages: string[]
  location: string
  verified: boolean
}

interface CommunityPost {
  id: string
  author: string
  authorType: "peer" | "professional"
  content: string
  timestamp: string
  likes: number
  replies: number
  tags: string[]
  isAnonymous: boolean
}

export function PeerSupportNetwork() {
  const [activeTab, setActiveTab] = useState<"peers" | "groups" | "professionals" | "community">("peers")
  const [peerMentors, setPeerMentors] = useState<PeerMentor[]>([])
  const [supportGroups, setSupportGroups] = useState<SupportGroup[]>([])
  const [professionals, setProfessionals] = useState<Professional[]>([])
  const [communityPosts, setCommunityPosts] = useState<CommunityPost[]>([])

  useEffect(() => {
    loadNetworkData()
  }, [])

  const loadNetworkData = () => {
    // Mock peer mentors data
    const mentors: PeerMentor[] = [
      {
        id: "1",
        name: "Arjun Sharma",
        year: "4th Year",
        department: "Computer Science",
        specialties: ["Exam Anxiety", "Academic Pressure", "Time Management"],
        rating: 4.8,
        totalSessions: 45,
        status: "available",
        languages: ["Hindi", "English"],
        bio: "Overcame severe exam anxiety in 2nd year. Now helping others with similar challenges.",
        nextAvailable: "Today 3:00 PM",
      },
      {
        id: "2",
        name: "Priya Patel",
        year: "3rd Year",
        department: "Psychology",
        specialties: ["Depression", "Social Anxiety", "Relationship Issues"],
        rating: 4.9,
        totalSessions: 62,
        status: "available",
        languages: ["Hindi", "English", "Gujarati"],
        bio: "Psychology student with personal experience in mental health recovery.",
        nextAvailable: "Tomorrow 10:00 AM",
      },
      {
        id: "3",
        name: "Rahul Kumar",
        year: "5th Year",
        department: "Medicine",
        specialties: ["Stress Management", "Career Guidance", "Family Pressure"],
        rating: 4.7,
        totalSessions: 38,
        status: "busy",
        languages: ["Hindi", "English", "Bengali"],
        bio: "Medical student understanding the unique pressures of professional courses.",
        nextAvailable: "Wednesday 2:00 PM",
      },
    ]

    // Mock support groups data
    const groups: SupportGroup[] = [
      {
        id: "1",
        name: "Engineering Students Support Circle",
        type: "peer",
        topic: "Academic Stress & Career Anxiety",
        members: 12,
        maxMembers: 15,
        nextMeeting: "2024-11-18 18:00",
        frequency: "Weekly",
        facilitator: "Arjun Sharma (Peer Mentor)",
        description: "Safe space for engineering students to share academic challenges and coping strategies.",
        isPrivate: false,
        languages: ["Hindi", "English"],
      },
      {
        id: "2",
        name: "Women in STEM Mental Health",
        type: "mixed",
        topic: "Gender-specific challenges in STEM",
        members: 8,
        maxMembers: 12,
        nextMeeting: "2024-11-20 16:00",
        frequency: "Bi-weekly",
        facilitator: "Dr. Meera Singh (Professional)",
        description: "Addressing unique mental health challenges faced by women in STEM fields.",
        isPrivate: true,
        languages: ["Hindi", "English"],
      },
      {
        id: "3",
        name: "International Students Support",
        type: "peer",
        topic: "Cultural Adjustment & Homesickness",
        members: 15,
        maxMembers: 20,
        nextMeeting: "2024-11-19 19:00",
        frequency: "Weekly",
        facilitator: "Ravi Mehta (Senior Student)",
        description: "Support for international and out-of-state students dealing with cultural adjustment.",
        isPrivate: false,
        languages: ["English", "Hindi"],
      },
    ]

    // Mock professionals data
    const profs: Professional[] = [
      {
        id: "1",
        name: "Dr. Anjali Verma",
        title: "Clinical Psychologist",
        specialization: ["Anxiety Disorders", "Depression", "Academic Stress"],
        rating: 4.9,
        experience: "12+ years",
        availability: "Mon-Fri 9AM-6PM",
        type: "psychologist",
        languages: ["Hindi", "English", "Marathi"],
        location: "Campus Counseling Center",
        verified: true,
      },
      {
        id: "2",
        name: "Dr. Rajesh Gupta",
        title: "Psychiatrist",
        specialization: ["Medication Management", "Bipolar Disorder", "ADHD"],
        rating: 4.7,
        experience: "15+ years",
        availability: "Tue-Thu 10AM-4PM",
        type: "psychiatrist",
        languages: ["Hindi", "English"],
        location: "Medical Center",
        verified: true,
      },
    ]

    // Mock community posts
    const posts: CommunityPost[] = [
      {
        id: "1",
        author: "Anonymous Student",
        authorType: "peer",
        content: "Feeling overwhelmed with placement season approaching. Anyone else going through this?",
        timestamp: "2 hours ago",
        likes: 12,
        replies: 8,
        tags: ["placement", "anxiety", "career"],
        isAnonymous: true,
      },
      {
        id: "2",
        author: "Dr. Anjali Verma",
        authorType: "professional",
        content:
          "Remember: It's okay to take breaks during exam preparation. Your mental health matters more than perfect scores.",
        timestamp: "5 hours ago",
        likes: 24,
        replies: 6,
        tags: ["exams", "self-care", "professional-advice"],
        isAnonymous: false,
      },
    ]

    setPeerMentors(mentors)
    setSupportGroups(groups)
    setProfessionals(profs)
    setCommunityPosts(posts)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800"
      case "busy":
        return "bg-yellow-100 text-yellow-800"
      case "offline":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getGroupTypeIcon = (type: string) => {
    switch (type) {
      case "peer":
        return <Users className="w-4 h-4" />
      case "professional":
        return <Stethoscope className="w-4 h-4" />
      case "mixed":
        return <Heart className="w-4 h-4" />
      default:
        return <Users className="w-4 h-4" />
    }
  }

  const renderPeerMentors = () => (
    <div className="space-y-4">
      {peerMentors.map((mentor) => (
        <Card key={mentor.id} className="vayu-card border-0">
          <CardContent className="p-4">
            <div className="flex items-start gap-4">
              <Avatar className="w-12 h-12">
                <AvatarImage src={mentor.avatar || "/placeholder.svg"} />
                <AvatarFallback>
                  {mentor.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-medium">{mentor.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {mentor.year} • {mentor.department}
                    </p>
                  </div>
                  <Badge className={getStatusColor(mentor.status)}>{mentor.status}</Badge>
                </div>

                <div className="flex items-center gap-4 mb-3 text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span>{mentor.rating}</span>
                  </div>
                  <div>{mentor.totalSessions} sessions</div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span>{mentor.nextAvailable}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-3">
                  {mentor.specialties.map((specialty, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {specialty}
                    </Badge>
                  ))}
                </div>

                <p className="text-sm text-muted-foreground mb-3">{mentor.bio}</p>

                <div className="flex flex-wrap gap-1 mb-3">
                  {mentor.languages.map((lang, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {lang}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    className="vayu-gradient text-white border-0"
                    disabled={mentor.status === "offline"}
                  >
                    <MessageCircle className="w-4 h-4 mr-1" />
                    Chat
                  </Button>
                  <Button size="sm" variant="outline" disabled={mentor.status === "offline"}>
                    <Video className="w-4 h-4 mr-1" />
                    Video Call
                  </Button>
                  <Button size="sm" variant="outline">
                    <Calendar className="w-4 h-4 mr-1" />
                    Schedule
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )

  const renderSupportGroups = () => (
    <div className="space-y-4">
      {supportGroups.map((group) => (
        <Card key={group.id} className="vayu-card border-0">
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  {getGroupTypeIcon(group.type)}
                </div>
                <div>
                  <h4 className="font-medium">{group.name}</h4>
                  <p className="text-sm text-muted-foreground">{group.topic}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="capitalize">
                  {group.type}
                </Badge>
                {group.isPrivate && <Badge variant="secondary">Private</Badge>}
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-3">{group.description}</p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3 text-sm">
              <div>
                <span className="text-muted-foreground">Members:</span>
                <span className="ml-1 font-medium">
                  {group.members}/{group.maxMembers}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">Frequency:</span>
                <span className="ml-1 font-medium">{group.frequency}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Next Meeting:</span>
                <span className="ml-1 font-medium">{new Date(group.nextMeeting).toLocaleDateString()}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Facilitator:</span>
                <span className="ml-1 font-medium">{group.facilitator}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-1 mb-3">
              {group.languages.map((lang, idx) => (
                <Badge key={idx} variant="secondary" className="text-xs">
                  {lang}
                </Badge>
              ))}
            </div>

            <div className="flex gap-2">
              <Button size="sm" className="vayu-gradient text-white border-0">
                <UserPlus className="w-4 h-4 mr-1" />
                Join Group
              </Button>
              <Button size="sm" variant="outline">
                Learn More
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )

  const renderProfessionals = () => (
    <div className="space-y-4">
      {professionals.map((prof) => (
        <Card key={prof.id} className="vayu-card border-0">
          <CardContent className="p-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Stethoscope className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{prof.name}</h4>
                      {prof.verified && <Shield className="w-4 h-4 text-green-600" />}
                    </div>
                    <p className="text-sm text-muted-foreground">{prof.title}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm">{prof.rating}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{prof.experience}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-3">
                  {prof.specialization.map((spec, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {spec}
                    </Badge>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span>{prof.availability}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span>{prof.location}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-3">
                  {prof.languages.map((lang, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {lang}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Button size="sm" className="vayu-gradient text-white border-0">
                    <Phone className="w-4 h-4 mr-1" />
                    Book Appointment
                  </Button>
                  <Button size="sm" variant="outline">
                    <MessageCircle className="w-4 h-4 mr-1" />
                    Message
                  </Button>
                  <Button size="sm" variant="outline">
                    View Profile
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )

  const renderCommunity = () => (
    <div className="space-y-4">
      <Card className="vayu-card border-0">
        <CardContent className="p-4">
          <div className="flex gap-3">
            <Avatar className="w-10 h-10">
              <AvatarFallback>You</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <textarea
                placeholder="Share your thoughts, ask for support, or offer encouragement..."
                className="w-full p-3 border border-border rounded-lg resize-none"
                rows={3}
              />
              <div className="flex justify-between items-center mt-2">
                <div className="flex gap-2">
                  <Badge variant="outline" className="text-xs cursor-pointer">
                    Anonymous
                  </Badge>
                  <Badge variant="outline" className="text-xs cursor-pointer">
                    Add Tags
                  </Badge>
                </div>
                <Button size="sm" className="vayu-gradient text-white border-0">
                  Share
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {communityPosts.map((post) => (
        <Card key={post.id} className="vayu-card border-0">
          <CardContent className="p-4">
            <div className="flex gap-3">
              <Avatar className="w-10 h-10">
                <AvatarFallback>
                  {post.isAnonymous
                    ? "A"
                    : post.author
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-medium">{post.isAnonymous ? "Anonymous" : post.author}</span>
                  <Badge variant="outline" className="text-xs capitalize">
                    {post.authorType}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{post.timestamp}</span>
                </div>

                <p className="text-sm mb-3">{post.content}</p>

                <div className="flex flex-wrap gap-1 mb-3">
                  {post.tags.map((tag, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <button className="flex items-center gap-1 hover:text-primary">
                    <Heart className="w-4 h-4" />
                    <span>{post.likes}</span>
                  </button>
                  <button className="flex items-center gap-1 hover:text-primary">
                    <MessageCircle className="w-4 h-4" />
                    <span>{post.replies}</span>
                  </button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="vayu-card border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            Peer-to-Professional Support Network
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Connect with peer mentors, join support groups, and access professional help
          </p>
        </CardHeader>
      </Card>

      {/* Navigation Tabs */}
      <Card className="vayu-card border-0">
        <CardContent className="p-4">
          <div className="flex gap-2 overflow-x-auto">
            <Button
              variant={activeTab === "peers" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveTab("peers")}
              className="flex items-center gap-2 whitespace-nowrap"
            >
              <Users className="w-4 h-4" />
              Peer Mentors
            </Button>
            <Button
              variant={activeTab === "groups" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveTab("groups")}
              className="flex items-center gap-2 whitespace-nowrap"
            >
              <Heart className="w-4 h-4" />
              Support Groups
            </Button>
            <Button
              variant={activeTab === "professionals" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveTab("professionals")}
              className="flex items-center gap-2 whitespace-nowrap"
            >
              <Stethoscope className="w-4 h-4" />
              Professionals
            </Button>
            <Button
              variant={activeTab === "community" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveTab("community")}
              className="flex items-center gap-2 whitespace-nowrap"
            >
              <MessageCircle className="w-4 h-4" />
              Community
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Content */}
      {activeTab === "peers" && renderPeerMentors()}
      {activeTab === "groups" && renderSupportGroups()}
      {activeTab === "professionals" && renderProfessionals()}
      {activeTab === "community" && renderCommunity()}

      {/* Emergency Support */}
      <Card className="vayu-card border-0 border-red-200 bg-red-50">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-red-600" />
            <div>
              <h4 className="font-medium text-red-800">Crisis Support Available 24/7</h4>
              <p className="text-sm text-red-600">
                If you're in crisis, contact campus emergency services immediately or call the national helpline.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
