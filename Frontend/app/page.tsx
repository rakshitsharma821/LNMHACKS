"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { LandingPage } from "@/components/landing-page"
import { Onboarding } from "@/components/onboarding"
import { AppShell } from "@/components/app-shell"
import { DemoMode } from "@/components/demo-mode"
import { motionTiming } from "@/lib/motion"

type AppState = "landing" | "onboarding" | "app" | "demo"

export default function Home() {
  const [appState, setAppState] = useState<AppState>("landing")

  const handleGetStarted = () => {
    setAppState("onboarding")
  }

  const handleOnboardingComplete = () => {
    setAppState("app")
  }

  const handleDemoExit = () => {
    setAppState("app")
  }

  return (
    <AnimatePresence mode="wait">
      {appState === "landing" && (
        <motion.div
          key="landing"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: motionTiming.transition }}
        >
          <LandingPage onGetStarted={handleGetStarted} />
          {/* Demo Mode Entry */}
          <button
            onClick={() => setAppState("demo")}
            className="fixed bottom-4 right-4 px-4 py-2 bg-card text-foreground rounded-full text-sm font-medium shadow-lg border border-border"
          >
            Investor Demo
          </button>
        </motion.div>
      )}

      {appState === "onboarding" && (
        <motion.div
          key="onboarding"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: motionTiming.transition }}
        >
          <Onboarding onComplete={handleOnboardingComplete} />
        </motion.div>
      )}

      {appState === "app" && (
        <motion.div
          key="app"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: motionTiming.transition }}
        >
          <AppShell />
        </motion.div>
      )}

      {appState === "demo" && (
        <motion.div
          key="demo"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: motionTiming.transition }}
        >
          <DemoMode onExit={handleDemoExit} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
