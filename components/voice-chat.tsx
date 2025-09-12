"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mic, MicOff, Volume2, VolumeX, Languages, Loader2 } from "lucide-react"
import { SpeechRecognition } from "web-speech-api"

interface VoiceChatProps {
  onVoiceMessage: (message: string, language: string) => void
  isListening?: boolean
  currentLanguage?: string
}

export function VoiceChat({ onVoiceMessage, isListening = false, currentLanguage = "en" }: VoiceChatProps) {
  const [isRecording, setIsRecording] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [selectedLanguage, setSelectedLanguage] = useState(currentLanguage)
  const [audioLevel, setAudioLevel] = useState(0)

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const recognitionRef = useRef<SpeechRecognition | null>(null)
  const synthRef = useRef<SpeechSynthesis | null>(null)

  const supportedLanguages = [
    { code: "en-IN", name: "English (India)", nativeName: "English" },
    { code: "hi-IN", name: "Hindi", nativeName: "हिंदी" },
    { code: "bn-IN", name: "Bengali", nativeName: "বাংলা" },
    { code: "te-IN", name: "Telugu", nativeName: "తెలుగు" },
    { code: "mr-IN", name: "Marathi", nativeName: "मराठी" },
    { code: "ta-IN", name: "Tamil", nativeName: "தமிழ்" },
    { code: "gu-IN", name: "Gujarati", nativeName: "ગુજરાતી" },
    { code: "kn-IN", name: "Kannada", nativeName: "ಕನ್ನಡ" },
    { code: "ml-IN", name: "Malayalam", nativeName: "മലയാളം" },
    { code: "pa-IN", name: "Punjabi", nativeName: "ਪੰਜਾਬੀ" },
  ]

  useEffect(() => {
    // Initialize Speech Recognition
    if (typeof window !== "undefined" && SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition()

      if (recognitionRef.current) {
        recognitionRef.current.continuous = true
        recognitionRef.current.interimResults = true
        recognitionRef.current.lang = selectedLanguage

        recognitionRef.current.onresult = (event) => {
          let finalTranscript = ""
          let interimTranscript = ""

          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript
            if (event.results[i].isFinal) {
              finalTranscript += transcript
            } else {
              interimTranscript += transcript
            }
          }

          setTranscript(finalTranscript || interimTranscript)

          if (finalTranscript) {
            onVoiceMessage(finalTranscript, selectedLanguage)
            setTranscript("")
          }
        }

        recognitionRef.current.onerror = (event) => {
          console.error("Speech recognition error:", event.error)
          setIsRecording(false)
        }

        recognitionRef.current.onend = () => {
          setIsRecording(false)
        }
      }
    }

    // Initialize Speech Synthesis
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      synthRef.current = window.speechSynthesis
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }
  }, [selectedLanguage, onVoiceMessage])

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })

      // Audio level monitoring
      const audioContext = new AudioContext()
      const analyser = audioContext.createAnalyser()
      const microphone = audioContext.createMediaStreamSource(stream)
      microphone.connect(analyser)

      const dataArray = new Uint8Array(analyser.frequencyBinCount)

      const updateAudioLevel = () => {
        if (isRecording) {
          analyser.getByteFrequencyData(dataArray)
          const average = dataArray.reduce((a, b) => a + b) / dataArray.length
          setAudioLevel(average)
          requestAnimationFrame(updateAudioLevel)
        }
      }

      setIsRecording(true)
      updateAudioLevel()

      if (recognitionRef.current) {
        recognitionRef.current.start()
      }
    } catch (error) {
      console.error("Error accessing microphone:", error)
    }
  }

  const stopRecording = () => {
    setIsRecording(false)
    setAudioLevel(0)

    if (recognitionRef.current) {
      recognitionRef.current.stop()
    }
  }

  const speakText = (text: string) => {
    if (synthRef.current && text) {
      // Cancel any ongoing speech
      synthRef.current.cancel()

      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = selectedLanguage
      utterance.rate = 0.9
      utterance.pitch = 1.0

      // Find appropriate voice for the language
      const voices = synthRef.current.getVoices()
      const voice = voices.find((v) => v.lang.startsWith(selectedLanguage.split("-")[0])) || voices[0]
      if (voice) {
        utterance.voice = voice
      }

      utterance.onstart = () => setIsSpeaking(true)
      utterance.onend = () => setIsSpeaking(false)
      utterance.onerror = () => setIsSpeaking(false)

      synthRef.current.speak(utterance)
    }
  }

  const stopSpeaking = () => {
    if (synthRef.current) {
      synthRef.current.cancel()
      setIsSpeaking(false)
    }
  }

  return (
    <Card className="vayu-card border-0">
      <CardContent className="p-4 space-y-4">
        {/* Language Selection */}
        <div className="flex items-center gap-2 flex-wrap">
          <Languages className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Voice Language:</span>
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="text-sm bg-background border border-border rounded px-2 py-1"
          >
            {supportedLanguages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.nativeName}
              </option>
            ))}
          </select>
        </div>

        {/* Voice Controls */}
        <div className="flex items-center justify-center gap-4">
          {/* Recording Button */}
          <div className="relative">
            <Button
              size="lg"
              variant={isRecording ? "destructive" : "default"}
              className={`w-16 h-16 rounded-full ${isRecording ? "animate-pulse" : ""}`}
              onClick={isRecording ? stopRecording : startRecording}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : isRecording ? (
                <MicOff className="w-6 h-6" />
              ) : (
                <Mic className="w-6 h-6" />
              )}
            </Button>

            {/* Audio Level Indicator */}
            {isRecording && (
              <div
                className="absolute -inset-2 rounded-full border-2 border-primary animate-ping opacity-75"
                style={{ transform: `scale(${1 + audioLevel / 100})` }}
              />
            )}
          </div>

          {/* Speaking Control */}
          <Button
            size="lg"
            variant={isSpeaking ? "secondary" : "outline"}
            className="w-16 h-16 rounded-full"
            onClick={isSpeaking ? stopSpeaking : () => speakText("नमस्ते! मैं MANA हूं, आपका मानसिक स्वास्थ्य साथी।")}
          >
            {isSpeaking ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
          </Button>
        </div>

        {/* Status and Transcript */}
        <div className="text-center space-y-2">
          {isRecording && (
            <Badge variant="secondary" className="animate-pulse">
              <Mic className="w-3 h-3 mr-1" />
              Listening in {supportedLanguages.find((l) => l.code === selectedLanguage)?.nativeName}...
            </Badge>
          )}

          {transcript && (
            <div className="bg-muted p-3 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Transcript:</p>
              <p className="text-sm">{transcript}</p>
            </div>
          )}

          {isSpeaking && (
            <Badge variant="outline">
              <Volume2 className="w-3 h-3 mr-1" />
              MANA is speaking...
            </Badge>
          )}
        </div>

        {/* Voice Features Info */}
        <div className="bg-primary/5 p-3 rounded-lg">
          <p className="text-xs text-primary">
            🎤 Voice Features: Speak in your preferred language • Real-time transcription • Cultural context
            understanding • Emotional tone detection
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
