"use client"

import { useState } from "react"
import Link from "next/link"
import { Home, Brain, Timer, Users, Heart, Mic, Shield } from "lucide-react"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/mood", label: "Mood Check", icon: Heart },
    { href: "/chat", label: "Voice Chat", icon: Mic },
    { href: "/wellness", label: "Preventive Care", icon: Shield },
    { href: "/meditate", label: "Meditate", icon: Timer },
    { href: "/professionals", label: "Campus Support", icon: Users },
    { href: "/assessment", label: "Academic Analytics", icon: Brain },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border md:relative md:border-0 md:bg-transparent z-50">
      {/* Mobile Navigation */}
      <div className="md:hidden">
        <div className="flex justify-around items-center py-2">
          {navItems.slice(0, 5).map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col items-center gap-1 p-2 text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                <Icon className="w-5 h-5" />
                <span className="text-[10px]">{item.label.split(" ")[0]}</span>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-6">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="text-muted-foreground hover:text-primary transition-colors font-medium"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  )
}
