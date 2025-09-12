import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Heart, MessageCircle, Brain, Users, Timer, ArrowRight, Star, CheckCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { LanguageSelector } from "@/components/language-selector"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted">
      {/* Header */}
      <header className="container mx-auto px-4 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">M</span>
          </div>
          <span className="text-2xl font-bold vayu-text-gradient">MANA</span>
          <Badge variant="outline" className="text-xs">
            मन
          </Badge>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <Link href="#features" className="text-muted-foreground hover:text-primary transition-colors">
            Features
          </Link>
          <Link href="#about" className="text-muted-foreground hover:text-primary transition-colors">
            About
          </Link>
          <Link href="#contact" className="text-muted-foreground hover:text-primary transition-colors">
            Contact
          </Link>
          <LanguageSelector />
        </div>
        <Button className="vayu-gradient text-white border-0 hover:opacity-90 transition-opacity" asChild>
          <Link href="/mood">Get Started</Link>
        </Button>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div>
              <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm font-medium">
                🇮🇳 Digital Psychological Intervention Ecosystem 🇮🇳
              </Badge>
            </div>

            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-balance leading-tight">
                Being a <span className="vayu-text-gradient">Student</span> can be{" "}
                <span className="text-foreground">tough.</span>
              </h1>

              <p className="text-xl md:text-2xl text-muted-foreground text-balance max-w-2xl">
                Culturally-responsive mental health support in your language. AI-powered care with campus integration
                and peer-to-professional support.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="vayu-gradient text-white border-0 hover:opacity-90 transition-opacity text-lg px-8 py-4 group"
                  asChild
                >
                  <Link href="/chat">
                    Chat with MANA AI
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground text-lg px-8 py-4 bg-transparent"
                >
                  Campus Integration
                </Button>
              </div>

              {/* Trust indicators */}
              <div className="flex items-center gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-primary/20 border-2 border-background"></div>
                    <div className="w-8 h-8 rounded-full bg-secondary/20 border-2 border-background"></div>
                    <div className="w-8 h-8 rounded-full bg-accent/20 border-2 border-background"></div>
                  </div>
                  <span className="text-sm text-muted-foreground">Trusted by 50k+ Indian students</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm text-muted-foreground ml-1">4.9/5</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative lg:order-2">
            <div className="vayu-card rounded-3xl p-8 relative overflow-hidden">
              <Image
                src="/images/hero-illustration.jpg"
                alt="Peaceful meditation illustration with MANA mascot"
                width={600}
                height={500}
                className="w-full h-auto rounded-2xl ml-auto"
              />
              <div className="absolute top-6 right-6 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                MANA in your Campus.
              </div>
              {/* Floating elements */}
              <div className="absolute -top-4 -left-4 w-20 h-20 bg-primary/10 rounded-full blur-xl"></div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-secondary/10 rounded-full blur-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 vayu-text-gradient">
            Culturally-Intelligent Mental Health Ecosystem
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            AI-powered support in regional languages with campus integration and peer-to-professional care
          </p>
        </div>

        {/* Feature Cards with Real Images */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Link href="/mood" className="group">
            <Card className="vayu-card border-0 overflow-hidden hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="/images/welcome-screen.png"
                  alt="Kickstart with Calm Vibes - Welcome screen with MANA mascot"
                  width={400}
                  height={300}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <Badge className="bg-primary/90 text-primary-foreground mb-2">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Get Started
                  </Badge>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  Kickstart with Calm Vibes ✨
                </h3>
                <p className="text-muted-foreground text-sm">
                  When things get too much, we got you covered! Start your journey with our welcoming dashboard and
                  track your daily feels.
                </p>
                <div className="flex items-center mt-4 text-primary text-sm font-medium">
                  Start your journey
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/mood" className="group">
            <Card className="vayu-card border-0 overflow-hidden hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="/images/mood-assessment.png"
                  alt="Mood-o-Meter assessment interface with emoji slider"
                  width={400}
                  height={300}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <Badge className="bg-secondary/90 text-secondary-foreground mb-2">
                    <Heart className="w-3 h-3 mr-1" />
                    Track Mood
                  </Badge>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  Mood-o-Meter: Check Yourself 🧠
                </h3>
                <p className="text-muted-foreground text-sm">
                  Our mood tracker is on point! It's like journaling but faster. Track your ups and downs, see what
                  sparks joy.
                </p>
                <div className="flex items-center mt-4 text-primary text-sm font-medium">
                  Check your mood
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/meditate" className="group">
            <Card className="vayu-card border-0 overflow-hidden hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="/images/meditation-timer.png"
                  alt="Meditation interface with guided sessions and timer"
                  width={400}
                  height={300}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <Badge className="bg-accent/90 text-accent-foreground mb-2">
                    <Timer className="w-3 h-3 mr-1" />
                    Meditate
                  </Badge>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  Meditate Like a Pro 🧘
                </h3>
                <p className="text-muted-foreground text-sm">
                  Need a break? Get into the zone with guided meditations. Whether it's 2 minutes or 20, we've got your
                  mental health routine covered.
                </p>
                <div className="flex items-center mt-4 text-primary text-sm font-medium">
                  Start meditating
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Additional Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Link href="/chat" className="group">
            <Card className="vayu-card border-0 p-6 hover:shadow-lg transition-all duration-300 group-hover:scale-105">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <MessageCircle className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  Voice-Enabled AI Chat
                </h3>
                <p className="text-muted-foreground">
                  Chat with MANA AI in your preferred language - text or voice. Cultural intelligence engine understands
                  Indian family dynamics and academic pressure.
                </p>
                <div className="flex items-center mt-4 text-primary text-sm font-medium">
                  Chat now
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/professionals" className="group">
            <Card className="vayu-card border-0 p-6 hover:shadow-lg transition-all duration-300 group-hover:scale-105">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-secondary/20 transition-colors">
                  <Users className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  Campus-Integrated Support
                </h3>
                <p className="text-muted-foreground">
                  Seamless connection to campus counselors, peer support network, and local mental health professionals.
                  Real-time appointment scheduling.
                </p>
                <div className="flex items-center mt-4 text-primary text-sm font-medium">
                  Find support
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/assessment" className="group">
            <Card className="vayu-card border-0 p-6 hover:shadow-lg transition-all duration-300 group-hover:scale-105">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <Brain className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  Academic Stress Analytics
                </h3>
                <p className="text-muted-foreground">
                  Grade-pattern stress prediction and subject-specific anxiety management. Culturally-adapted
                  assessments with family context understanding.
                </p>
                <div className="flex items-center mt-4 text-primary text-sm font-medium">
                  Analyze patterns
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="vayu-gradient py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-balance">
            Transform your campus mental health ecosystem
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join the revolution in culturally-intelligent mental health support. Available in 12+ Indian languages! 🇮🇳
          </p>
          <Button size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-4" asChild>
            <Link href="/mood">Start Your Journey</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold">M</span>
                </div>
                <span className="text-xl font-bold vayu-text-gradient">MANA</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Digital Psychological Intervention Ecosystem for Indian students
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-3 text-primary">Navigation</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/" className="hover:text-primary transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/resources" className="hover:text-primary transition-colors">
                    Resources
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-primary transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-primary transition-colors">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3 text-primary">Community</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/community" className="hover:text-primary transition-colors">
                    Community
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-primary transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-primary transition-colors">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3 text-primary">Stay Updated</h4>
              <div className="flex gap-2">
                <Input placeholder="Subscribe for updates in your inbox" className="text-sm" />
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Subscribe</Button>
              </div>
            </div>
          </div>

          <div className="border-t border-border pt-6 text-center text-sm text-muted-foreground">
            Copyright © 2024, All Rights Reserved | MANA - Mental Health for All
          </div>
        </div>
      </footer>
    </div>
  )
}
