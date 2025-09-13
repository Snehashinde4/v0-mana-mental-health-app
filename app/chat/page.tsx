"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Send, Heart, Smile, Mic, Volume2 } from "lucide-react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { VoiceChat } from "@/components/voice-chat"

interface ChatMessage {
  id: string
  sender: "user" | "mana"
  message: string
  timestamp: Date
  emotionalTone?: "positive" | "negative" | "neutral" | "crisis"
  language?: string
  isVoice?: boolean
}

// AI Response Generation System
class MANAIntelligence {
  private static instance: MANAIntelligence
  private conversationHistory: ChatMessage[] = []
  private userProfile = {
    stressLevel: 5,
    academicPressure: 7,
    culturalContext: "Indian",
    preferredLanguage: "en-IN"
  }

  static getInstance(): MANAIntelligence {
    if (!MANAIntelligence.instance) {
      MANAIntelligence.instance = new MANAIntelligence()
    }
    return MANAIntelligence.instance
  }

  analyzeEmotionalTone(message: string): "positive" | "negative" | "neutral" | "crisis" {
    const lowerMessage = message.toLowerCase()
    
    // Crisis detection with expanded keywords
    const crisisKeywords = [
      "suicide", "kill myself", "end it all", "hurt myself", "die", "can't go on",
      "आत्महत्या", "मरना चाहता", "जीना नहीं चाहता", "खुद को नुकसान",
      "hopeless", "worthless", "nobody cares", "better off dead"
    ]
    if (crisisKeywords.some(keyword => lowerMessage.includes(keyword))) {
      return "crisis"
    }

    // Negative sentiment detection
    const negativeKeywords = [
      "sad", "depressed", "anxious", "worried", "stressed", "overwhelmed", 
      "lonely", "hopeless", "frustrated", "angry", "scared", "panic",
      "उदास", "परेशान", "चिंतित", "तनाव", "अकेला", "निराश", 
      "परीक्षा", "फेल", "pressure", "exam", "failure"
    ]
    if (negativeKeywords.some(keyword => lowerMessage.includes(keyword))) {
      return "negative"
    }

    // Positive sentiment detection
    const positiveKeywords = [
      "happy", "good", "great", "amazing", "wonderful", "excited", 
      "grateful", "better", "confident", "proud", "successful",
      "खुश", "अच्छा", "बेहतर", "खुशी", "प्रसन्न", "संतुष्ट"
    ]
    if (positiveKeywords.some(keyword => lowerMessage.includes(keyword))) {
      return "positive"
    }

    return "neutral"
  }

  generateContextualResponse(userMessage: string, tone: string, language: string): string {
    const isHindi = language.startsWith("hi")
    const lowerMessage = userMessage.toLowerCase()

    // Crisis intervention
    if (tone === "crisis") {
      const crisisResponses = isHindi ? [
        "मुझे आपकी बहुत चिंता है। आप अकेले नहीं हैं। कृपया तुरंत किसी विशेषज्ञ से संपर्क करें - 1800-599-0019 (iCall) या 9152987821 (AASRA)।",
        "आपकी जिंदगी बहुत कीमती है। यह कठिन समय गुजर जाएगा। कृपया campus counselor या emergency helpline से तुरंत बात करें।"
      ] : [
        "I'm really concerned about you. You're not alone in this. Please reach out immediately - Campus Emergency: 911 or Crisis Helpline: 988.",
        "Your life has value and meaning. This difficult time will pass. Please contact a mental health professional right away."
      ]
      return crisisResponses[Math.floor(Math.random() * crisisResponses.length)]
    }

    // Academic stress responses
    if (lowerMessage.includes("exam") || lowerMessage.includes("परीक्षा") || lowerMessage.includes("study")) {
      const academicResponses = isHindi ? [
        "परीक्षा का तनाव सामान्य है। याद रखें, एक परीक्षा आपकी पूरी जिंदगी तय नहीं करती। क्या आप अपनी study strategy के बारे में बात करना चाहेंगे?",
        "मैं समझ सकता हूं कि academic pressure कितना overwhelming हो सकता है। आइए कुछ effective study techniques और stress management पर बात करते हैं।"
      ] : [
        "Exam stress is completely normal, especially in our competitive academic environment. Remember, one exam doesn't define your entire future. Would you like to discuss some study strategies?",
        "I understand how overwhelming academic pressure can feel. Let's talk about some effective study techniques and stress management methods that work well for Indian students."
      ]
      return academicResponses[Math.floor(Math.random() * academicResponses.length)]
    }

    // Family pressure responses
    if (lowerMessage.includes("family") || lowerMessage.includes("parents") || lowerMessage.includes("परिवार")) {
      const familyResponses = isHindi ? [
        "भारतीय परिवारों में expectations का pressure मैं समझ सकता हूं। आपकी भावनाएं बिल्कुल valid हैं। क्या आप इस बारे में और बताना चाहेंगे?",
        "Family pressure एक common challenge है जिसका सामना कई Indian students करते हैं। आपके parents आपसे प्यार करते हैं, लेकिन कभी-कभी उनकी expectations overwhelming हो सकती हैं।"
      ] : [
        "I understand how intense family expectations can be in Indian culture. Your feelings are completely valid. Would you like to talk about strategies for communicating with your family?",
        "Family pressure is something many Indian students face. Your parents love you, but sometimes their expectations can feel overwhelming. Let's explore healthy ways to manage this."
      ]
      return familyResponses[Math.floor(Math.random() * familyResponses.length)]
    }

    // Tone-based responses with cultural context
    switch (tone) {
      case "negative":
        const negativeResponses = isHindi ? [
          "मुझे लगता है कि आप कुछ कठिन समय से गुजर रहे हैं। यह बिल्कुल ठीक है - हर किसी के जीवन में ऐसे phases आते हैं। आप अकेले नहीं हैं।",
          "आपकी feelings को acknowledge करना important है। जो भी आप महसूस कर रहे हैं, वह valid है। क्या आप इसके बारे में और बात करना चाहेंगे?"
        ] : [
          "It sounds like you're going through a tough time. That's completely okay - everyone faces difficult phases. You're not alone in this journey.",
          "I hear that you're struggling right now. Your feelings are valid and it's important to acknowledge them. Would you like to talk more about what's bothering you?"
        ]
        return negativeResponses[Math.floor(Math.random() * negativeResponses.length)]

      case "positive":
        const positiveResponses = isHindi ? [
          "यह सुनकर बहुत खुशी हुई! आपकी positive energy wonderful है। क्या कोई खास बात है जो आपको खुश कर रही है?",
          "आपकी खुशी मुझे भी खुश कर रही है! यह attitude maintain करना और भी अच्छी चीजें लाएगा आपकी जिंदगी में।"
        ] : [
          "That's wonderful to hear! Your positive energy is contagious. What's been going well for you lately?",
          "I'm so glad you're feeling good! This positive mindset will help you tackle any challenges that come your way."
        ]
        return positiveResponses[Math.floor(Math.random() * positiveResponses.length)]

      default:
        const neutralResponses = isHindi ? [
          "मैं यहां आपकी बात सुनने के लिए हूं। आप जो भी share करना चाहते हैं, मैं समझने की कोशिश करूंगा।",
          "आपका mental health important है। कोई भी बात हो, बेझिझक share करें। मैं आपका साथ दूंगा।"
        ] : [
          "I'm here to listen and support you. Whatever you'd like to share, I'll do my best to understand and help.",
          "Your mental health matters. Feel free to share anything that's on your mind - I'm here for you."
        ]
        return neutralResponses[Math.floor(Math.random() * neutralResponses.length)]
    }
  }

  updateUserProfile(message: string, tone: string) {
    // Update user profile based on conversation patterns
    if (tone === "negative") {
      this.userProfile.stressLevel = Math.min(10, this.userProfile.stressLevel + 1)
    } else if (tone === "positive") {
      this.userProfile.stressLevel = Math.max(1, this.userProfile.stressLevel - 1)
    }

    if (message.toLowerCase().includes("exam") || message.toLowerCase().includes("परीक्षा")) {
      this.userProfile.academicPressure = Math.min(10, this.userProfile.academicPressure + 1)
    }
  }
}

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [showVoiceChat, setShowVoiceChat] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState("en-IN")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const manaAI = MANAIntelligence.getInstance()

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
        message: "नमस्ते! मैं MANA हूं, आपका AI-powered मानसिक स्वास्थ्य साथी। मैं आपकी भावनाओं को समझता हूं और culturally-relevant support देता हूं। आज आपका मन कैसा है? 🙂",
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

  const handleSendMessage = async (messageText?: string, language?: string, isVoice = false) => {
    const text = messageText || inputMessage.trim()
    if (!text) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      message: text,
      timestamp: new Date(),
      language: language || currentLanguage,
      isVoice,
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsTyping(true)

    // Analyze the message and generate response
    const tone = manaAI.analyzeEmotionalTone(text)
    const responseText = manaAI.generateContextualResponse(text, tone, language || currentLanguage)
    
    // Update user profile for better future responses
    manaAI.updateUserProfile(text, tone)

    // Simulate typing delay
    setTimeout(() => {
      const manaMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: "mana",
        message: responseText,
        timestamp: new Date(),
        emotionalTone: tone,
        language: language || currentLanguage,
      }

      setMessages((prev) => [...prev, manaMessage])
      setIsTyping(false)

      // Auto-speak MANA's response if it was a voice message
      if (isVoice && "speechSynthesis" in window) {
        const utterance = new SpeechSynthesisUtterance(responseText)
        utterance.lang = language || currentLanguage
        speechSynthesis.speak(utterance)
      }
    }, Math.random() * 1000 + 1000) // More natural response timing
  }

  const handleVoiceMessage = (transcript: string, language: string) => {
    handleSendMessage(transcript, language, true)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat("en", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(date)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted flex flex-col pb-20 md:pb-0">
      {/* Header */}
      <div className="bg-card border-b border-border p-4">
        <div className="container mx-auto max-w-2xl">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild className="rounded-full">
              <Link href="/">
                <ArrowLeft className="w-5 h-5" />
              </Link>
            </Button>
            <div className="flex items-center gap-3 flex-1">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-bold">M</span>
              </div>
              <div>
                <h1 className="font-semibold vayu-text-gradient">MANA AI</h1>
                <p className="text-sm text-muted-foreground">Your culturally-intelligent companion</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={() => setShowVoiceChat(!showVoiceChat)}
            >
              <Mic className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Voice Chat Panel */}
      {showVoiceChat && (
        <div className="bg-muted/50 border-b border-border p-4">
          <div className="container mx-auto max-w-2xl">
            <VoiceChat onVoiceMessage={handleVoiceMessage} currentLanguage={currentLanguage} />
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        <div className="container mx-auto max-w-2xl p-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[80%] ${message.sender === "user" ? "order-2" : "order-1"}`}>
                {message.sender === "mana" && (
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-primary-foreground text-xs font-bold">M</span>
                    </div>
                    <span className="text-xs text-muted-foreground">MANA AI</span>
                    {message.isVoice && <Volume2 className="w-3 h-3 text-primary" />}
                  </div>
                )}
                <div
                  className={`rounded-2xl px-4 py-3 ${
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground ml-auto"
                      : "bg-card border border-border"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.message}</p>
                  <div className="flex items-center justify-between mt-2">
                    <p
                      className={`text-xs ${
                        message.sender === "user" ? "text-primary-foreground/70" : "text-muted-foreground"
                      }`}
                    >
                      {formatTime(new Date(message.timestamp))}
                    </p>
                    {message.isVoice && (
                      <Mic
                        className={`w-3 h-3 ${
                          message.sender === "user" ? "text-primary-foreground/70" : "text-muted-foreground"
                        }`}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="max-w-[80%]">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-primary-foreground text-xs font-bold">M</span>
                  </div>
                  <span className="text-xs text-muted-foreground">MANA is thinking...</span>
                </div>
                <div className="bg-card border border-border rounded-2xl px-4 py-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-100" />
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Quick Responses */}
      <div className="bg-card border-t border-border p-4">
        <div className="container mx-auto max-w-2xl">
          <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-shrink-0 bg-transparent"
              onClick={() => handleSendMessage("मुझे चिंता हो रही है", "hi-IN")}
            >
              <Heart className="w-4 h-4 mr-1" />
              चिंता हो रही है
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex-shrink-0 bg-transparent"
              onClick={() => handleSendMessage("I need some motivation")}
            >
              <Smile className="w-4 h-4 mr-1" />
              Need motivation
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex-shrink-0 bg-transparent"
              onClick={() => handleSendMessage("परिवार का दबाव है", "hi-IN")}
            >
              Family pressure
            </Button>
          </div>

          {/* Message Input */}
          <div className="flex gap-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message... / अपना संदेश लिखें..."
              className="flex-1"
              disabled={isTyping}
            />
            <Button
              onClick={() => handleSendMessage()}
              disabled={!inputMessage.trim() || isTyping}
              className="vayu-gradient text-white border-0 hover:opacity-90"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <Navigation />
    </div>
  )
}