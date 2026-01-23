"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { BottomNavigation } from "./bottom-navigation"
import { CheckInScreen } from "./screens/check-in-screen"
import { MarketsScreen } from "./screens/markets-screen"
import { TrendsScreen } from "./screens/trends-screen"
import { RewardsScreen } from "./screens/rewards-screen"
import { motionVariants } from "@/lib/motion"

interface AppShellProps {
  demoMode?: boolean
  initialTab?: string
}

export function AppShell({ demoMode = false, initialTab = "check-in" }: AppShellProps) {
  const [activeTab, setActiveTab] = useState(initialTab)

  const renderScreen = () => {
    switch (activeTab) {
      case "check-in":
        return <CheckInScreen key="check-in" onNavigate={setActiveTab} />
      case "markets":
        return <MarketsScreen key="markets" />
      case "trends":
        return <TrendsScreen key="trends" />
      case "rewards":
        return <RewardsScreen key="rewards" />
      default:
        return <CheckInScreen key="check-in" onNavigate={setActiveTab} />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="pb-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={motionVariants.fadeIn.initial}
            animate={motionVariants.fadeIn.animate}
            exit={motionVariants.fadeIn.exit}
            transition={motionVariants.fadeIn.transition}
          >
            {renderScreen()}
          </motion.div>
        </AnimatePresence>
      </main>
      <BottomNavigation 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        disabled={demoMode}
      />
    </div>
  )
}
