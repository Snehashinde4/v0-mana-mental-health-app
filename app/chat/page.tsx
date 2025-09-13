"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Send, Heart, Smile, Mic, Volume2 } from "lucide-react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"


interface ChatMessage {
  id: string
  sender: "user" | "mana"
  message: string
  timestamp: Date
  emotionalTone?: "positive" | "negative" | "neutral" | "crisis"
  language?: string
  
}

const manaResponses = {
  greeting: [
    "नमस्ते! मैं MANA हूं, आपका मानसिक स्वास्थ्य साथी। आज आपका मन कैसा है? 🙂",
    "Hi there! I'm MANA, your culturally-intelligent mental health companion. What's on your mind today?",
    "Hello! Great to connect with you. How are you feeling right now?",
  ],
  sadness: [
    "मुझे खुशी होगी अगर आप अपनी परेशानी साझा करें। आपकी भावनाएं बिल्कुल सही हैं।",
    "I'm so sorry to hear that you're feeling this way. Your feelings are completely valid.",
    "It sounds like you're going through a tough time. I'm here to listen and support you.",
  ],
  anxiety: [
    "चिंता होना सामान्य है, खासकर परीक्षा के समय। आइए इसे एक कदम में लेते हैं।",
    "I understand that anxiety can be overwhelming, especially during exam season. Let's take this one step at a time.",
    "Anxiety is tough, but you're not alone. What's been causing you the most worry lately?",
  ],
  stress: [
    "तनाव सभी को प्रभावित करता है। क्या आपके परिवार का दबाव भी इसमें शामिल है?",
    "Stress affects us all differently, especially with family expectations. What usually helps you feel more relaxed?",
    "That sounds really challenging. Have you been able to take any breaks for yourself?",
  ],
  positive: [
    "यह सुनकर बहुत खुशी हुई! आपकी सकारात्मक ऊर्जा अद्भुत है।",
    "That's wonderful to hear! I'm so glad you're feeling good. What's been going well for you?",
    "Your positive energy is amazing! What's been bringing you joy lately?",
  ],
  support: [
    "याद रखें, कभी-कभी ठीक न होना भी ठीक है। आप बहुत बहादुर हैं।",
    "Remember, it's okay to not be okay sometimes. You're taking a brave step by reaching out.",
    "You're stronger than you know. Every small step forward counts.",
  ],
  cultural: [
    "मैं समझ सकता हूं कि भारतीय परिवारों में अपेक्षाएं कैसी होती हैं। आपकी स्थिति कैसी है?",
    "I understand how family expectations work in Indian culture. How are you managing the pressure?",
    "Festival season can add extra stress with family gatherings. How are you feeling about it?",
  ],
}

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [showVoiceChat, setShowVoiceChat] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState("en-IN")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Load chat history from localStorage
    const savedMessages = localStorage.getItem("mana-chat-history")
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages))
    } else {
      // Send initial greeting
      const greeting: ChatMessage = {
        id: "1",
        sender: "mana",
        message: manaResponses.greeting[0],
        timestamp: new Date(),
        emotionalTone: "positive",
        language: "hi-IN",
      }
      setMessages([greeting])
    }
  }, [])

  useEffect(() => {
    // Save messages to localStorage
    if (messages.length > 0) {
      localStorage.setItem("mana-chat-history", JSON.stringify(messages))
    }
  }, [messages])

  useEffect(() => {
    // Scroll to bottom when new messages arrive
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const analyzeMessage = (message: string): "positive" | "negative" | "neutral" | "crisis" => {
    const lowerMessage = message.toLowerCase()

    // Crisis keywords (English and Hindi)
    const crisisKeywords = [
      "suicide",
      "kill myself",
      "end it all",
      "hurt myself",
      "die",
      "can't go on",
      "आत्महत्या",
      "मरना चाहता",
      "जीना नहीं चाहता",
      "खुद को नुकसान",
    ]
    if (crisisKeywords.some((keyword) => lowerMessage.includes(keyword))) {
      return "crisis"
    }

    // Negative keywords (English and Hindi)
    const negativeKeywords = [
      "sad",
      "depressed",
      "anxious",
      "worried",
      "stressed",
      "overwhelmed",
      "lonely",
      "hopeless",
      "उदास",
      "परेशान",
      "चिंतित",
      "तनाव",
      "अकेला",
      "निराश",
      "परीक्षा",
      "फेल",
    ]
    if (negativeKeywords.some((keyword) => lowerMessage.includes(keyword))) {
      return "negative"
    }

    // Positive keywords (English and Hindi)
    const positiveKeywords = [
      "happy",
      "good",
      "great",
      "amazing",
      "wonderful",
      "excited",
      "grateful",
      "better",
      "खुश",
      "अच्छा",
      "बेहतर",
      "खुशी",
      "प्रसन्न",
      "संतुष्ट",
    ]
    if (positiveKeywords.some((keyword) => lowerMessage.includes(keyword))) {
      return "positive"
    }

    return "neutral"
  }

  const generateManaResponse = (userMessage: string, tone: string, language: string): string => {
    const lowerMessage = userMessage.toLowerCase()
    const isHindi = language.startsWith("hi")


    // Crisis response
    if (tone === "crisis") {
      return isHindi
        ? "मुझे आपकी बहुत चिंता है। कृपया तुरंत किसी विशेषज्ञ से संपर्क करें। आप महत्वपूर्ण हैं।"
        : "I'm really concerned about you. Please reach out to a mental health professional immediately. You matter."
    }

    // Cultural context responses
    if (lowerMessage.includes("family") || lowerMessage.includes("परिवार") || lowerMessage.includes("parents")) {
      return isHindi
        ? "मैं समझ सकता हूं कि परिवार का दबाव कैसा होता है। आपकी भावनाएं महत्वपूर्ण हैं।"
        : "I understand family pressure can be intense in our culture. Your feelings are valid and important."
    }


    if (lowerMessage.includes("exam") || lowerMessage.includes("परीक्षा") || lowerMessage.includes("study")) {
      return isHindi
        ? "परीक्षा का तनाव सामान्य है। एक परीक्षा आपकी पूरी जिंदगी तय नहीं करती।"
        : "Exam stress is completely normal. Remember, one exam doesn't define your entire future or worth."





    }

    // Greeting responses
    if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("नमस्ते")) {
      return isHindi ? manaResponses.greeting[0] : manaResponses.greeting[1]







    }

    // Tone-based responses
    switch (tone) {
      case "negative":
        if (lowerMessage.includes("anxious") || lowerMessage.includes("चिंतित")) {
          return isHindi ? manaResponses.anxiety[0] : manaResponses.anxiety[1]
        }
        if (lowerMessage.includes("stress") || lowerMessage.includes("तनाव")) {
          return isHindi ? manaResponses.stress[0] : manaResponses.stress[1]
        }
        return isHindi ? manaResponses.sadness[0] : manaResponses.sadness[1]


      case "positive":
        return isHindi ? manaResponses.positive[0] : manaResponses.positive[1]








      default:
        return isHindi ? manaResponses.support[0] : manaResponses.support[1]







    }
  }
