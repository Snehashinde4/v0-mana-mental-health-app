"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Brain, Target, Heart, Star, MessageCircle } from "lucide-react"

interface MatchingCriteria {
  challenges: string[]
  preferredLanguage: string
  timePreference: string
  communicationStyle: string
  experienceLevel: string
}

interface MentorMatch {
  id: string
  name: string
  matchScore: number
  commonChallenges: string[]
  sharedExperiences: string[]
  availability: string
  languages: string[]
  bio: string
  successStories: number
}

export function MentorMatching() {
  const [step, setStep] = useState(1)
  const [criteria, setCriteria] = useState<MatchingCriteria>({
    challenges: [],
    preferredLanguage: "English",
    timePreference: "flexible",
    communicationStyle: "supportive",
    experienceLevel: "beginner",
  })
  const [matches, setMatches] = useState<MentorMatch[]>([])

  const challengeOptions = [
    "Exam Anxiety",
    "Academic Pressure",
    "Family Expectations",
    "Social Anxiety",
    "Depression",
    "Time Management",
    "Career Confusion",
    "Relationship Issues",
    "Financial Stress",
    "Cultural Adjustment",
  ]

  const handleChallengeToggle = (challenge: string) => {
    setCriteria((prev) => ({
      ...prev,
      challenges: prev.challenges.includes(challenge)
        ? prev.challenges.filter((c) => c !== challenge)
        : [...prev.challenges, challenge],
    }))
  }

  const generateMatches = () => {
    // Simulate AI matching algorithm
    const mockMatches: MentorMatch[] = [
      {
        id: "1",
        name: "Arjun Sharma",
        matchScore: 95,
        commonChallenges: ["Exam Anxiety", "Academic Pressure"],
        sharedExperiences: ["Engineering Student", "Overcame Anxiety", "Time Management"],
        availability: "Weekday Evenings",
        languages: ["Hindi", "English"],
        bio: "4th year CS student who overcame severe exam anxiety. Specialized in helping with academic stress.",
        successStories: 12,
      },
      {
        id: "2",
        name: "Priya Patel",
        matchScore: 88,
        commonChallenges: ["Family Expectations", "Career Confusion"],
        sharedExperiences: ["Female in STEM", "Family Pressure", "Career Guidance"],
        availability: "Weekend Mornings",
        languages: ["Hindi", "English", "Gujarati"],
        bio: "Psychology student with experience in family dynamics and career counseling.",
        successStories: 8,
      },
      {
        id: "3",
        name: "Rahul Kumar",
        matchScore: 82,
        commonChallenges: ["Academic Pressure", "Time Management"],
        sharedExperiences: ["Medical Student", "High Achiever", "Stress Management"],
        availability: "Flexible",
        languages: ["Hindi", "English"],
        bio: "Medical student who learned to balance academics with mental health.",
        successStories: 15,
      },
    ]
    setMatches(mockMatches)
    setStep(3)
  }

  const renderStep1 = () => (
    <Card className="vayu-card border-0">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="w-5 h-5 text-primary" />
          What challenges are you facing?
        </CardTitle>
        <p className="text-sm text-muted-foreground">Select all that apply to find the best mentor match</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {challengeOptions.map((challenge) => (
            <Button
              key={challenge}
              variant={criteria.challenges.includes(challenge) ? "default" : "outline"}
              size="sm"
              onClick={() => handleChallengeToggle(challenge)}
              className="text-xs h-auto py-2 px-3"
            >
              {challenge}
            </Button>
          ))}
        </div>
        <Button
          className="w-full vayu-gradient text-white border-0"
          onClick={() => setStep(2)}
          disabled={criteria.challenges.length === 0}
        >
          Continue
        </Button>
      </CardContent>
    </Card>
  )

  const renderStep2 = () => (
    <Card className="vayu-card border-0">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-primary" />
          Preferences & Communication Style
        </CardTitle>
        <p className="text-sm text-muted-foreground">Help us find a mentor who matches your preferences</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <label className="text-sm font-medium mb-2 block">Preferred Language</label>
          <select
            value={criteria.preferredLanguage}
            onChange={(e) => setCriteria((prev) => ({ ...prev, preferredLanguage: e.target.value }))}
            className="w-full p-2 border border-border rounded-lg bg-background"
          >
            <option value="English">English</option>
            <option value="Hindi">Hindi</option>
            <option value="Bengali">Bengali</option>
            <option value="Tamil">Tamil</option>
            <option value="Telugu">Telugu</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Time Preference</label>
          <div className="grid grid-cols-2 gap-2">
            {["Morning", "Afternoon", "Evening", "Flexible"].map((time) => (
              <Button
                key={time}
                variant={criteria.timePreference === time.toLowerCase() ? "default" : "outline"}
                size="sm"
                onClick={() => setCriteria((prev) => ({ ...prev, timePreference: time.toLowerCase() }))}
              >
                {time}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Communication Style</label>
          <div className="grid grid-cols-2 gap-2">
            {["Supportive", "Direct", "Empathetic", "Practical"].map((style) => (
              <Button
                key={style}
                variant={criteria.communicationStyle === style.toLowerCase() ? "default" : "outline"}
                size="sm"
                onClick={() => setCriteria((prev) => ({ ...prev, communicationStyle: style.toLowerCase() }))}
              >
                {style}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
            Back
          </Button>
          <Button className="flex-1 vayu-gradient text-white border-0" onClick={generateMatches}>
            Find Matches
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  const renderStep3 = () => (
    <div className="space-y-4">
      <Card className="vayu-card border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-primary" />
            Your AI-Matched Mentors
          </CardTitle>
          <p className="text-sm text-muted-foreground">Based on your preferences, here are your top mentor matches</p>
        </CardHeader>
      </Card>

      {matches.map((match) => (
        <Card key={match.id} className="vayu-card border-0">
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-medium">{match.name}</h4>
                <p className="text-sm text-muted-foreground">{match.bio}</p>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 mb-1">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm font-medium">{match.matchScore}% Match</span>
                </div>
                <p className="text-xs text-muted-foreground">{match.successStories} success stories</p>
              </div>
            </div>

            <div className="mb-3">
              <div className="flex justify-between text-sm mb-1">
                <span>Compatibility Score</span>
                <span>{match.matchScore}%</span>
              </div>
              <Progress value={match.matchScore} className="h-2" />
            </div>

            <div className="space-y-2 mb-3">
              <div>
                <p className="text-sm font-medium mb-1">Common Challenges:</p>
                <div className="flex flex-wrap gap-1">
                  {match.commonChallenges.map((challenge, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {challenge}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium mb-1">Shared Experiences:</p>
                <div className="flex flex-wrap gap-1">
                  {match.sharedExperiences.map((exp, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {exp}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
              <div>
                <span className="text-muted-foreground">Availability:</span>
                <span className="ml-1 font-medium">{match.availability}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Languages:</span>
                <span className="ml-1 font-medium">{match.languages.join(", ")}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <Button size="sm" className="vayu-gradient text-white border-0">
                <MessageCircle className="w-4 h-4 mr-1" />
                Connect Now
              </Button>
              <Button size="sm" variant="outline">
                View Profile
              </Button>
              <Button size="sm" variant="outline">
                Schedule Meeting
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}

      <Card className="vayu-card border-0">
        <CardContent className="p-4 text-center">
          <Button variant="outline" onClick={() => setStep(1)}>
            Find Different Matches
          </Button>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Progress Indicator */}
      <Card className="vayu-card border-0">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium">Mentor Matching Progress:</span>
            <div className="flex-1">
              <Progress value={(step / 3) * 100} className="h-2" />
            </div>
            <span className="text-sm text-muted-foreground">Step {step} of 3</span>
          </div>
        </CardContent>
      </Card>

      {/* Steps */}
      {step === 1 && renderStep1()}
      {step === 2 && renderStep2()}
      {step === 3 && renderStep3()}
    </div>
  )
}
