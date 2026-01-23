"use client"

import React from "react"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { motionTiming } from "@/lib/motion"

interface NavItem {
  id: string
  label: string
  icon: React.ReactNode
}

interface BottomNavigationProps {
  activeTab: string
  onTabChange: (tab: string) => void
  disabled?: boolean
}

const navItems: NavItem[] = [
  {
    id: "check-in",
    label: "Check-In",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    id: "markets",
    label: "Markets",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20V10" />
        <path d="M18 20V4" />
        <path d="M6 20v-4" />
      </svg>
    ),
  },
  {
    id: "trends",
    label: "Trends",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18" />
        <path d="m19 9-5 5-4-4-3 3" />
      </svg>
    ),
  },
  {
    id: "rewards",
    label: "Rewards",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v12" />
        <path d="M15 9.5a3 3 0 1 0 0 5H9" />
      </svg>
    ),
  },
]

export function BottomNavigation({ activeTab, onTabChange, disabled }: BottomNavigationProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-t border-border safe-area-pb">
      <div className="flex items-center justify-around px-2 py-2 max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive = activeTab === item.id
          return (
            <motion.button
              key={item.id}
              onClick={() => !disabled && onTabChange(item.id)}
              disabled={disabled}
              className={cn(
                "relative flex flex-col items-center justify-center w-16 h-14 rounded-2xl transition-colors",
                isActive ? "text-primary" : "text-muted-foreground",
                disabled && "opacity-50 cursor-not-allowed"
              )}
              whileTap={disabled ? {} : { scale: 0.95 }}
              transition={{ duration: motionTiming.press }}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-primary/10 rounded-2xl"
                  initial={false}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{item.icon}</span>
              <span className="relative z-10 text-xs font-medium mt-1">{item.label}</span>
            </motion.button>
          )
        })}
      </div>
    </nav>
  )
}
