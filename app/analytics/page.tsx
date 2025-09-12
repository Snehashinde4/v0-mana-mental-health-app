"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { AcademicPerformanceTracker } from "@/components/academic-performance-tracker"

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted pb-20 md:pb-0">
      {/* Header */}
      <div className="bg-card border-b border-border p-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild className="rounded-full">
              <Link href="/">
                <ArrowLeft className="w-5 h-5" />
              </Link>
            </Button>
            <div>
              <h1 className="text-xl font-semibold vayu-text-gradient">Academic Performance Analytics</h1>
              <p className="text-sm text-muted-foreground">
                AI-powered correlation analysis between mental health and academic success
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto max-w-6xl p-4">
        <AcademicPerformanceTracker />
      </div>

      <Navigation />
    </div>
  )
}
