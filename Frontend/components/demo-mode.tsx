"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { motionTiming } from "@/lib/motion"
import { Onboarding } from "./onboarding"
import { EmotionalScoreCard } from "./emotional-score-card"
import { CityStressIndex } from "./city-stress-index"
import { SafetyModal } from "./safety-modal"

type DemoStep = 
  | "onboarding"
  | "check-in"
  | "score"
  | "market"
  | "city-stress"
  | "safety"
  | "complete"

interface Message {
  id: string
  type: "ai" | "user"
  content: string
}

const demoConversation = [
  { type: "ai" as const, content: "Hey there! How are you feeling right now?" },
  { type: "user" as const, content: "I've been feeling a bit overwhelmed lately with work." },
  { type: "ai" as const, content: "I understand. That makes a lot of sense. What's been the most challenging part?" },
  { type: "user" as const, content: "Just the constant deadlines and pressure to perform." },
  { type: "ai" as const, content: "Thank you for sharing that with me. It sounds like you're carrying a lot. Let me put together your emotional score..." },
]

interface DemoModeProps {
  onExit: () => void
}

export function DemoMode({ onExit }: DemoModeProps) {
  const [step, setStep] = useState<DemoStep>("onboarding")
  const [messages, setMessages] = useState<Message[]>([])
  const [messageIndex, setMessageIndex] = useState(0)
  const [showSafety, setShowSafety] = useState(false)

  // Auto-progress through demo check-in
  useEffect(() => {
    if (step === "check-in" && messageIndex < demoConversation.length) {
      const timer = setTimeout(() => {
        const newMessage: Message = {
          id: messageIndex.toString(),
          type: demoConversation[messageIndex].type,
          content: demoConversation[messageIndex].content,
        }
        setMessages(prev => [...prev, newMessage])
        setMessageIndex(messageIndex + 1)
      }, messageIndex === 0 ? 500 : 1500)

      return () => clearTimeout(timer)
    } else if (step === "check-in" && messageIndex >= demoConversation.length) {
      const timer = setTimeout(() => setStep("score"), 2000)
      return () => clearTimeout(timer)
    }
  }, [step, messageIndex])

  const handleOnboardingComplete = () => {
    setStep("check-in")
  }

  const renderStep = () => {
    switch (step) {
      case "onboarding":
        return <Onboarding onComplete={handleOnboardingComplete} />

      case "check-in":
        return (
          <div className="min-h-screen bg-background">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm px-4 py-4 border-b border-border">
              <div className="max-w-lg mx-auto">
                <h1 className="text-xl font-bold text-foreground">Daily Check-In</h1>
                <p className="text-sm text-muted-foreground mt-1">Demo Mode</p>
                <div className="w-full h-1.5 bg-muted rounded-full mt-3 overflow-hidden">
                  <motion.div
                    className="h-full bg-primary rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${(messageIndex / demoConversation.length) * 100}%` }}
                    transition={{ duration: motionTiming.transition }}
                  />
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="px-4 py-4">
              <div className="max-w-lg mx-auto space-y-4">
                <AnimatePresence>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[85%] px-4 py-3 rounded-3xl ${
                          message.type === "user"
                            ? "bg-primary text-primary-foreground rounded-br-lg"
                            : "bg-card text-card-foreground rounded-bl-lg shadow-sm"
                        }`}
                      >
                        <p className="text-[15px] leading-relaxed">{message.content}</p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {messageIndex < demoConversation.length && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="bg-card text-card-foreground px-4 py-3 rounded-3xl rounded-bl-lg shadow-sm">
                      <div className="flex gap-1.5">
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            className="w-2 h-2 bg-muted-foreground/50 rounded-full"
                            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        )

      case "score":
        return (
          <EmotionalScoreCard
            score={68}
            onPredict={() => setStep("market")}
            onViewTrends={() => setStep("city-stress")}
          />
        )

      case "market":
        return (
          <div className="min-h-screen bg-background px-4 py-6">
            <div className="max-w-lg mx-auto">
              <h1 className="text-2xl font-bold text-foreground mb-6">Your Prediction</h1>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-card rounded-3xl p-6 shadow-sm"
              >
                <div className="text-center mb-6">
                  <span className="inline-block px-3 py-1 bg-success/10 text-success text-sm font-medium rounded-full mb-4">
                    Open
                  </span>
                  <h2 className="text-xl font-bold text-foreground leading-relaxed">
                    Will I feel less overwhelmed by next week?
                  </h2>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-6 rounded-2xl border-2 border-success bg-success/10">
                    <span className="text-3xl font-bold text-success block mb-1">Yes</span>
                    <span className="text-sm text-muted-foreground">I will improve</span>
                  </div>
                  <div className="p-6 rounded-2xl border-2 border-border bg-muted/50">
                    <span className="text-3xl font-bold text-accent block mb-1">No</span>
                    <span className="text-sm text-muted-foreground">Not this time</span>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-medium text-foreground">Commitment Level</span>
                    <span className="text-lg font-bold text-primary">70%</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full">
                    <div className="w-[70%] h-full bg-primary rounded-full" />
                  </div>
                </div>

                <motion.button
                  onClick={() => setStep("city-stress")}
                  className="w-full py-4 bg-primary text-primary-foreground rounded-2xl font-semibold"
                  whileTap={{ scale: 0.98 }}
                >
                  Commit to Prediction
                </motion.button>
              </motion.div>
            </div>
          </div>
        )

      case "city-stress":
        return (
          <div className="min-h-screen bg-background px-4 py-6">
            <div className="max-w-lg mx-auto">
              <h1 className="text-2xl font-bold text-foreground mb-6">City Trends</h1>
              <CityStressIndex fullScreen />
              <motion.button
                onClick={() => setStep("safety")}
                className="w-full mt-6 py-4 bg-primary text-primary-foreground rounded-2xl font-semibold"
                whileTap={{ scale: 0.98 }}
              >
                Continue Demo
              </motion.button>
            </div>
          </div>
        )

      case "safety":
        return (
          <div className="min-h-screen bg-background flex items-center justify-center px-4">
            <div className="text-center max-w-sm">
              <h2 className="text-xl font-bold text-foreground mb-4">Safety Features</h2>
              <p className="text-muted-foreground mb-6">
                MindScoreAI includes built-in support for when you need it most.
              </p>
              <motion.button
                onClick={() => setShowSafety(true)}
                className="w-full py-4 bg-primary text-primary-foreground rounded-2xl font-semibold mb-4"
                whileTap={{ scale: 0.98 }}
              >
                View Safety Modal
              </motion.button>
              <button
                onClick={() => setStep("complete")}
                className="text-muted-foreground font-medium"
              >
                Skip to end
              </button>
            </div>
            <SafetyModal open={showSafety} onClose={() => {
              setShowSafety(false)
              setStep("complete")
            }} />
          </div>
        )

      case "complete":
        return (
          <div className="min-h-screen bg-background flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center max-w-sm"
            >
              <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-success"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Demo Complete</h2>
              <p className="text-muted-foreground mb-8">
                You've seen how MindScoreAI helps people track their emotional wellbeing and improve over time.
              </p>
              <motion.button
                onClick={onExit}
                className="w-full py-4 bg-primary text-primary-foreground rounded-2xl font-semibold"
                whileTap={{ scale: 0.98 }}
              >
                Start Using MindScoreAI
              </motion.button>
            </motion.div>
          </div>
        )
    }
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={step}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: motionTiming.transition * 1.5 }}
      >
        {renderStep()}
      </motion.div>
    </AnimatePresence>
  )
}
