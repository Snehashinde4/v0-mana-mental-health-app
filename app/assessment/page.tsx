"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, Info, CheckCircle, AlertCircle } from "lucide-react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"

interface Question {
  id: string
  question: string
  options: { value: number; label: string }[]
}

interface Assessment {
  id: string
  title: string
  description: string
  questions: Question[]
  scoringInfo: {
    ranges: { min: number; max: number; severity: string; description: string; color: string }[]
  }
}

const phq9Questions: Question[] = [
  {
    id: "phq9_1",
    question: "Little interest or pleasure in doing things",
    options: [
      { value: 0, label: "Not at all" },
      { value: 1, label: "Several days" },
      { value: 2, label: "More than half the days" },
      { value: 3, label: "Nearly every day" },
    ],
  },
  {
    id: "phq9_2",
    question: "Feeling down, depressed, or hopeless",
    options: [
      { value: 0, label: "Not at all" },
      { value: 1, label: "Several days" },
      { value: 2, label: "More than half the days" },
      { value: 3, label: "Nearly every day" },
    ],
  },
  {
    id: "phq9_3",
    question: "Trouble falling or staying asleep, or sleeping too much",
    options: [
      { value: 0, label: "Not at all" },
      { value: 1, label: "Several days" },
      { value: 2, label: "More than half the days" },
      { value: 3, label: "Nearly every day" },
    ],
  },
  {
    id: "phq9_4",
    question: "Feeling tired or having little energy",
    options: [
      { value: 0, label: "Not at all" },
      { value: 1, label: "Several days" },
      { value: 2, label: "More than half the days" },
      { value: 3, label: "Nearly every day" },
    ],
  },
  {
    id: "phq9_5",
    question: "Poor appetite or overeating",
    options: [
      { value: 0, label: "Not at all" },
      { value: 1, label: "Several days" },
      { value: 2, label: "More than half the days" },
      { value: 3, label: "Nearly every day" },
    ],
  },
]

const gad7Questions: Question[] = [
  {
    id: "gad7_1",
    question: "Feeling nervous, anxious, or on edge",
    options: [
      { value: 0, label: "Not at all" },
      { value: 1, label: "Several days" },
      { value: 2, label: "More than half the days" },
      { value: 3, label: "Nearly every day" },
    ],
  },
  {
    id: "gad7_2",
    question: "Not being able to stop or control worrying",
    options: [
      { value: 0, label: "Not at all" },
      { value: 1, label: "Several days" },
      { value: 2, label: "More than half the days" },
      { value: 3, label: "Nearly every day" },
    ],
  },
  {
    id: "gad7_3",
    question: "Worrying too much about different things",
    options: [
      { value: 0, label: "Not at all" },
      { value: 1, label: "Several days" },
      { value: 2, label: "More than half the days" },
      { value: 3, label: "Nearly every day" },
    ],
  },
  {
    id: "gad7_4",
    question: "Trouble relaxing",
    options: [
      { value: 0, label: "Not at all" },
      { value: 1, label: "Several days" },
      { value: 2, label: "More than half the days" },
      { value: 3, label: "Nearly every day" },
    ],
  },
  {
    id: "gad7_5",
    question: "Being so restless that it's hard to sit still",
    options: [
      { value: 0, label: "Not at all" },
      { value: 1, label: "Several days" },
      { value: 2, label: "More than half the days" },
      { value: 3, label: "Nearly every day" },
    ],
  },
]

const assessments: Assessment[] = [
  {
    id: "phq9",
    title: "PHQ-9 Depression Assessment",
    description:
      "The Patient Health Questionnaire (PHQ) is a self-administered version of the PRIME-MD diagnostic instrument for common mental disorders. The PHQ-9 is the depression module, which scores each of the 9 DSM-IV criteria as '0' (not at all) to '3' (nearly every day).",
    questions: phq9Questions,
    scoringInfo: {
      ranges: [
        { min: 0, max: 4, severity: "Minimal", description: "No depression", color: "text-green-600 bg-green-100" },
        {
          min: 5,
          max: 9,
          severity: "Mild",
          description: "Mild depression symptoms",
          color: "text-yellow-600 bg-yellow-100",
        },
        {
          min: 10,
          max: 14,
          severity: "Moderate",
          description: "Moderate depression symptoms",
          color: "text-orange-600 bg-orange-100",
        },
        {
          min: 15,
          max: 19,
          severity: "Moderately Severe",
          description: "Moderately severe depression",
          color: "text-red-600 bg-red-100",
        },
        {
          min: 20,
          max: 27,
          severity: "Severe",
          description: "Severe depression symptoms",
          color: "text-red-800 bg-red-200",
        },
      ],
    },
  },
  {
    id: "gad7",
    title: "GAD-7 Anxiety Assessment",
    description:
      "The Generalized Anxiety Disorder 7-item (GAD-7) scale is a validated tool for screening and measuring the severity of generalized anxiety disorder symptoms.",
    questions: gad7Questions,
    scoringInfo: {
      ranges: [
        { min: 0, max: 4, severity: "Minimal", description: "No anxiety", color: "text-green-600 bg-green-100" },
        {
          min: 5,
          max: 9,
          severity: "Mild",
          description: "Mild anxiety symptoms",
          color: "text-yellow-600 bg-yellow-100",
        },
        {
          min: 10,
          max: 14,
          severity: "Moderate",
          description: "Moderate anxiety symptoms",
          color: "text-orange-600 bg-orange-100",
        },
        {
          min: 15,
          max: 21,
          severity: "Severe",
          description: "Severe anxiety symptoms",
          color: "text-red-600 bg-red-100",
        },
      ],
    },
  },
]

export default function AssessmentPage() {
  const [selectedAssessment, setSelectedAssessment] = useState<Assessment | null>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [showResults, setShowResults] = useState(false)
  const [showInfo, setShowInfo] = useState(false)

  const handleAnswerSelect = (questionId: string, value: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }))
  }

  const handleNext = () => {
    if (selectedAssessment && currentQuestionIndex < selectedAssessment.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      setShowResults(true)
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const calculateScore = () => {
    if (!selectedAssessment) return 0
    return selectedAssessment.questions.reduce((total, question) => {
      return total + (answers[question.id] || 0)
    }, 0)
  }

  const getSeverityInfo = (score: number) => {
    if (!selectedAssessment) return null
    return selectedAssessment.scoringInfo.ranges.find((range) => score >= range.min && score <= range.max)
  }

  const getProgress = () => {
    if (!selectedAssessment) return 0
    return ((currentQuestionIndex + 1) / selectedAssessment.questions.length) * 100
  }

  const resetAssessment = () => {
    setSelectedAssessment(null)
    setCurrentQuestionIndex(0)
    setAnswers({})
    setShowResults(false)
    setShowInfo(false)
  }

  const saveResults = () => {
    if (!selectedAssessment) return

    const result = {
      assessmentId: selectedAssessment.id,
      title: selectedAssessment.title,
      score: calculateScore(),
      severity: getSeverityInfo(calculateScore()),
      date: new Date().toISOString(),
      answers,
    }

    const existingResults = JSON.parse(localStorage.getItem("vayu-assessment-results") || "[]")
    const updatedResults = [result, ...existingResults.slice(0, 9)]
    localStorage.setItem("vayu-assessment-results", JSON.stringify(updatedResults))
  }

  useEffect(() => {
    if (showResults) {
      saveResults()
    }
  }, [showResults])

  // Assessment Selection Screen
  if (!selectedAssessment) {
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
                <h1 className="text-2xl font-bold vayu-text-gradient">CBT Assessment</h1>
                <p className="text-muted-foreground">Choose an assessment to begin</p>
              </div>
            </div>

            {/* Assessment Options */}
            <div className="space-y-4">
              {assessments.map((assessment) => (
                <Card
                  key={assessment.id}
                  className="vayu-card border-0 hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => setSelectedAssessment(assessment)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-2">{assessment.title}</h3>
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{assessment.description}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{assessment.questions.length} questions</span>
                          <span>~5 minutes</span>
                        </div>
                      </div>
                      <Button className="vayu-gradient text-white border-0 hover:opacity-90 ml-4">Start</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Disclaimer */}
            <Card className="vayu-card border-0 mt-8 bg-blue-50 border-blue-200">
              <CardContent className="p-6">
                <div className="flex gap-3">
                  <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-blue-800 mb-2">Important Disclaimer</h3>
                    <p className="text-blue-700 text-sm">
                      These assessments are screening tools and not diagnostic instruments. Results should not replace
                      professional medical advice. If you're experiencing severe symptoms, please consult with a mental
                      health professional.
                    </p>
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

  // Results Screen
  if (showResults) {
    const score = calculateScore()
    const severityInfo = getSeverityInfo(score)

    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted pb-20 md:pb-0">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
              <Button variant="ghost" size="icon" onClick={resetAssessment} className="rounded-full">
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold vayu-text-gradient">Test Results</h1>
                <p className="text-muted-foreground">{selectedAssessment.title}</p>
              </div>
            </div>

            {/* Score Card */}
            <Card className="vayu-card border-0 mb-6">
              <CardContent className="p-8 text-center">
                <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center">
                  <span className="text-3xl font-bold text-primary">{score}</span>
                </div>

                <h2 className="text-2xl font-bold mb-2">
                  {selectedAssessment.id.toUpperCase()}: Total {score}
                </h2>

                {severityInfo && (
                  <div className={`inline-block px-4 py-2 rounded-full ${severityInfo.color} mb-4`}>
                    <span className="font-semibold">Severity: {severityInfo.severity}</span>
                  </div>
                )}

                <p className="text-muted-foreground mb-6">{severityInfo?.description}</p>

                {/* Recommendations */}
                <div className="text-left bg-muted/50 rounded-lg p-4">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    Recommendations
                  </h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {severityInfo?.severity === "Minimal" && (
                      <>
                        <li>• Continue maintaining good mental health habits</li>
                        <li>• Regular exercise and healthy sleep schedule</li>
                        <li>• Stay connected with friends and family</li>
                      </>
                    )}
                    {severityInfo?.severity === "Mild" && (
                      <>
                        <li>• Consider talking to a counselor or therapist</li>
                        <li>• Practice stress management techniques</li>
                        <li>• Maintain regular self-care routines</li>
                      </>
                    )}
                    {(severityInfo?.severity === "Moderate" ||
                      severityInfo?.severity === "Moderately Severe" ||
                      severityInfo?.severity === "Severe") && (
                      <>
                        <li>• Strongly consider professional mental health support</li>
                        <li>• Contact a mental health professional soon</li>
                        <li>• Reach out to trusted friends or family members</li>
                        <li>• Consider crisis resources if symptoms worsen</li>
                      </>
                    )}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <Button variant="outline" onClick={resetAssessment} className="bg-transparent">
                Take Another Assessment
              </Button>
              <Button className="vayu-gradient text-white border-0 hover:opacity-90" asChild>
                <Link href="/professionals">Find Professional Help</Link>
              </Button>
            </div>

            {/* Crisis Alert */}
            {severityInfo && (severityInfo.severity === "Severe" || severityInfo.severity === "Moderately Severe") && (
              <Card className="vayu-card border-0 bg-red-50 border-red-200">
                <CardContent className="p-6">
                  <div className="flex gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-red-800 mb-2">Immediate Support Available</h3>
                      <p className="text-red-700 text-sm mb-3">
                        Your results suggest you may benefit from immediate professional support. Please consider
                        reaching out:
                      </p>
                      <div className="space-y-1 text-sm text-red-800">
                        <p>• Crisis Text Line: Text HOME to 741741</p>
                        <p>• National Suicide Prevention Lifeline: 988</p>
                        <p>• Emergency: 911</p>
                      </div>
                    </div>
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

  // Assessment Questions Screen
  const currentQuestion = selectedAssessment.questions[currentQuestionIndex]
  const isLastQuestion = currentQuestionIndex === selectedAssessment.questions.length - 1
  const currentAnswer = answers[currentQuestion.id]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted pb-20 md:pb-0">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button variant="ghost" size="icon" onClick={resetAssessment} className="rounded-full">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex-1">
              <h1 className="text-xl font-bold vayu-text-gradient">{selectedAssessment.title}</h1>
              <p className="text-muted-foreground">
                Question {currentQuestionIndex + 1} of {selectedAssessment.questions.length}
              </p>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setShowInfo(!showInfo)} className="rounded-full">
              <Info className="w-5 h-5" />
            </Button>
          </div>

          {/* Progress */}
          <div className="mb-8">
            <Progress value={getProgress()} className="h-2" />
          </div>

          {/* Info Panel */}
          {showInfo && (
            <Card className="vayu-card border-0 mb-6 bg-blue-50 border-blue-200">
              <CardContent className="p-6">
                <h3 className="font-semibold text-blue-800 mb-2">About This Assessment</h3>
                <p className="text-blue-700 text-sm">{selectedAssessment.description}</p>
              </CardContent>
            </Card>
          )}

          {/* Question Card */}
          <Card className="vayu-card border-0 mb-8">
            <CardContent className="p-8">
              <h2 className="text-xl font-semibold mb-6 text-balance">{currentQuestion.question}</h2>

              <div className="space-y-3">
                {currentQuestion.options.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleAnswerSelect(currentQuestion.id, option.value)}
                    className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                      currentAnswer === option.value
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-transparent hover:border-primary/50 hover:bg-primary/5"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          currentAnswer === option.value ? "border-primary bg-primary" : "border-muted-foreground"
                        }`}
                      >
                        {currentAnswer === option.value && <div className="w-2 h-2 bg-white rounded-full" />}
                      </div>
                      <span className="font-medium">{option.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              className="bg-transparent"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            <Button
              onClick={handleNext}
              disabled={currentAnswer === undefined}
              className="vayu-gradient text-white border-0 hover:opacity-90"
            >
              {isLastQuestion ? "View Results" : "Next"}
              {!isLastQuestion && <ArrowRight className="w-4 h-4 ml-2" />}
            </Button>
          </div>
        </div>
      </div>
      <Navigation />
    </div>
  )
}
