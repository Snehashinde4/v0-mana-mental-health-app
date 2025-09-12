"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { PeerSupportNetwork } from "@/components/peer-support-network"

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted pb-20 md:pb-0">
      {/* Header */}
      <div className="bg-card border-b border-border p-4">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild className="rounded-full">
              <Link href="/">
                <ArrowLeft className="w-5 h-5" />
              </Link>
            </Button>
            <div>
              <h1 className="text-xl font-semibold vayu-text-gradient">Support Network</h1>
              <p className="text-sm text-muted-foreground">
                Connect with peers and professionals for mental health support
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto max-w-4xl p-4">
        <PeerSupportNetwork />
      </div>

      <Navigation />
    </div>
  )
}
