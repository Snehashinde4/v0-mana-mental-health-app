"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Heart, Share, Bookmark, RefreshCw, Sparkles } from "lucide-react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"

interface MotivationCard {
  id: string
  title: string
  message: string
  category: "motivation" | "affirmation" | "mindfulness" | "gratitude" | "strength"
  backgroundImage: string
  backgroundColor: string
  textColor: string
  author?: string
}

const motivationCards: MotivationCard[] = [
  {
    id: "1",
    title: "We got you.",
    message:
      "You're not alone in this journey. Every step forward, no matter how small, is progress worth celebrating.",
    category: "motivation",
    backgroundImage: "/images/mountain-landscape.jpg",
    backgroundColor: "bg-gradient-to-br from-teal-400 to-blue-500",
    textColor: "text-white",
  },
  {
    id: "2",
    title: "Amazing, don't give up!",
    message: "Your resilience is your superpower. Keep going, because something amazing is waiting for you.",
    category: "motivation",
    backgroundImage: "/images/sunrise-nature.jpg",
    backgroundColor: "bg-gradient-to-br from-orange-400 to-pink-500",
    textColor: "text-white",
  },
  {
    id: "3",
    title: "New beginning.",
    message:
      "Every sunrise brings new opportunities. Today is your chance to start fresh and create something beautiful.",
    category: "mindfulness",
    backgroundImage: "/images/peaceful-lake.jpg",
    backgroundColor: "bg-gradient-to-br from-green-400 to-teal-500",
    textColor: "text-white",
  },
  {
    id: "4",
    title: "You are enough.",
    message:
      "Right here, right now, exactly as you are - you are enough. Your worth isn't determined by your productivity or achievements.",
    category: "affirmation",
    backgroundImage: "/images/forest-path.jpg",
    backgroundColor: "bg-gradient-to-br from-purple-400 to-indigo-500",
    textColor: "text-white",
  },
  {
    id: "5",
    title: "Breathe and reset.",
    message: "Take a deep breath. Feel your feet on the ground. You have the power to reset your day at any moment.",
    category: "mindfulness",
    backgroundImage: "/images/ocean-waves.jpg",
    backgroundColor: "bg-gradient-to-br from-blue-400 to-cyan-500",
    textColor: "text-white",
  },
  {
    id: "6",
    title: "Progress over perfection.",
    message:
      "You don't have to be perfect. You just have to be willing to try, to grow, and to be kind to yourself along the way.",
    category: "motivation",
    backgroundImage: "/images/mountain-peak.jpg",
    backgroundColor: "bg-gradient-to-br from-emerald-400 to-green-500",
    textColor: "text-white",
  },
  {
    id: "7",
    title: "Your feelings are valid.",
    message:
      "Whatever you're feeling right now is okay. Your emotions are messengers, not enemies. Listen with compassion.",
    category: "affirmation",
    backgroundImage: "/images/calm-meadow.jpg",
    backgroundColor: "bg-gradient-to-br from-yellow-400 to-orange-500",
    textColor: "text-white",
  },
  {
    id: "8",
    title: "Small steps count.",
    message:
      "Getting out of bed is an achievement. Drinking water is self-care. Every small step is moving you forward.",
    category: "motivation",
    backgroundImage: "/images/stepping-stones.jpg",
    backgroundColor: "bg-gradient-to-br from-pink-400 to-rose-500",
    textColor: "text-white",
  },
]

const categories = [
  { id: "all", label: "All", icon: "✨" },
  { id: "motivation", label: "Motivation", icon: "🚀" },
  { id: "affirmation", label: "Affirmations", icon: "💖" },
  { id: "mindfulness", label: "Mindfulness", icon: "🧘‍♀️" },
  { id: "gratitude", label: "Gratitude", icon: "🙏" },
  { id: "strength", label: "Strength", icon: "💪" },
]

export default function MotivationPage() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [savedCards, setSavedCards] = useState<string[]>([])
  const [dailyCard, setDailyCard] = useState<MotivationCard | null>(null)

  useEffect(() => {
    // Load saved cards from localStorage
    const saved = localStorage.getItem("vayu-saved-cards")
    if (saved) {
      setSavedCards(JSON.parse(saved))
    }

    // Set daily card based on date
    const today = new Date().toDateString()
    const savedDailyCard = localStorage.getItem("vayu-daily-card")
    const savedDate = localStorage.getItem("vayu-daily-card-date")

    if (savedDailyCard && savedDate === today) {
      setDailyCard(JSON.parse(savedDailyCard))
    } else {
      // Generate new daily card
      const randomCard = motivationCards[Math.floor(Math.random() * motivationCards.length)]
      setDailyCard(randomCard)
      localStorage.setItem("vayu-daily-card", JSON.stringify(randomCard))
      localStorage.setItem("vayu-daily-card-date", today)
    }
  }, [])

  const filteredCards = motivationCards.filter((card) =>
    selectedCategory === "all" ? true : card.category === selectedCategory,
  )

  const currentCard = filteredCards[currentCardIndex] || filteredCards[0]

  const handleNextCard = () => {
    setCurrentCardIndex((prev) => (prev + 1) % filteredCards.length)
  }

  const handlePreviousCard = () => {
    setCurrentCardIndex((prev) => (prev - 1 + filteredCards.length) % filteredCards.length)
  }

  const handleSaveCard = (cardId: string) => {
    const newSavedCards = savedCards.includes(cardId)
      ? savedCards.filter((id) => id !== cardId)
      : [...savedCards, cardId]

    setSavedCards(newSavedCards)
    localStorage.setItem("vayu-saved-cards", JSON.stringify(newSavedCards))
  }

  const handleShareCard = async (card: MotivationCard) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: card.title,
          text: card.message,
          url: window.location.href,
        })
      } catch (error) {
        console.log("Error sharing:", error)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(`${card.title}\n\n${card.message}`)
    }
  }

  const getRandomCard = () => {
    const randomIndex = Math.floor(Math.random() * filteredCards.length)
    setCurrentCardIndex(randomIndex)
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
              <h1 className="text-2xl font-bold vayu-text-gradient">Daily Vibes: Help Cards</h1>
              <p className="text-muted-foreground">Sometimes, all you need is a little boost</p>
            </div>
          </div>

          {/* Daily Card */}
          {dailyCard && (
            <Card className="vayu-card border-0 mb-6 overflow-hidden">
              <CardContent className="p-0">
                <div className={`${dailyCard.backgroundColor} p-6 text-center relative overflow-hidden`}>
                  <div className="absolute inset-0 opacity-20">
                    <img
                      src={dailyCard.backgroundImage || "/placeholder.svg?height=200&width=400"}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <Sparkles className="w-5 h-5 text-white" />
                      <span className="text-white font-medium">Today's Card</span>
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <h2 className={`text-2xl font-bold mb-4 ${dailyCard.textColor}`}>{dailyCard.title}</h2>
                    <p className={`${dailyCard.textColor} text-balance leading-relaxed`}>{dailyCard.message}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Category Filter */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setSelectedCategory(category.id)
                  setCurrentCardIndex(0)
                }}
                className={`flex-shrink-0 ${
                  selectedCategory === category.id
                    ? "vayu-gradient text-white border-0"
                    : "bg-transparent hover:bg-primary/10"
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.label}
              </Button>
            ))}
          </div>

          {/* Main Card Display */}
          {currentCard && (
            <Card className="vayu-card border-0 mb-6 overflow-hidden">
              <CardContent className="p-0">
                <div
                  className={`${currentCard.backgroundColor} p-8 text-center relative overflow-hidden min-h-[300px]`}
                >
                  <div className="absolute inset-0 opacity-30">
                    <img
                      src={currentCard.backgroundImage || "/placeholder.svg?height=300&width=500"}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="relative z-10 flex flex-col justify-center h-full">
                    <h2 className={`text-3xl font-bold mb-6 ${currentCard.textColor} text-balance`}>
                      {currentCard.title}
                    </h2>
                    <p className={`${currentCard.textColor} text-lg leading-relaxed text-balance max-w-md mx-auto`}>
                      {currentCard.message}
                    </p>
                    {currentCard.author && (
                      <p className={`${currentCard.textColor} text-sm mt-4 opacity-80`}>— {currentCard.author}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Card Navigation */}
          <div className="flex items-center justify-between mb-6">
            <Button variant="outline" onClick={handlePreviousCard} className="bg-transparent">
              ← Previous
            </Button>

            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {currentCardIndex + 1} of {filteredCards.length}
              </span>
            </div>

            <Button variant="outline" onClick={handleNextCard} className="bg-transparent">
              Next →
            </Button>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <Button
              variant="outline"
              onClick={() => currentCard && handleSaveCard(currentCard.id)}
              className={`bg-transparent ${savedCards.includes(currentCard?.id || "") ? "text-primary border-primary" : ""}`}
            >
              <Bookmark
                className={`w-4 h-4 mr-2 ${savedCards.includes(currentCard?.id || "") ? "fill-current" : ""}`}
              />
              {savedCards.includes(currentCard?.id || "") ? "Saved" : "Save"}
            </Button>

            <Button
              variant="outline"
              onClick={() => currentCard && handleShareCard(currentCard)}
              className="bg-transparent"
            >
              <Share className="w-4 h-4 mr-2" />
              Share
            </Button>

            <Button variant="outline" onClick={getRandomCard} className="bg-transparent">
              <RefreshCw className="w-4 h-4 mr-2" />
              Random
            </Button>
          </div>

          {/* Saved Cards */}
          {savedCards.length > 0 && (
            <Card className="vayu-card border-0">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-primary" />
                  Your Saved Cards ({savedCards.length})
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {motivationCards
                    .filter((card) => savedCards.includes(card.id))
                    .slice(0, 4)
                    .map((card) => (
                      <div
                        key={card.id}
                        className={`${card.backgroundColor} p-4 rounded-lg cursor-pointer hover:scale-105 transition-transform`}
                        onClick={() => {
                          const cardIndex = filteredCards.findIndex((c) => c.id === card.id)
                          if (cardIndex !== -1) setCurrentCardIndex(cardIndex)
                        }}
                      >
                        <h4 className={`font-semibold text-sm ${card.textColor} mb-1`}>{card.title}</h4>
                        <p className={`${card.textColor} text-xs opacity-90 line-clamp-2`}>
                          {card.message.substring(0, 60)}...
                        </p>
                      </div>
                    ))}
                </div>
                {savedCards.length > 4 && (
                  <p className="text-sm text-muted-foreground mt-3 text-center">
                    +{savedCards.length - 4} more saved cards
                  </p>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      <Navigation />
    </div>
  )
}
