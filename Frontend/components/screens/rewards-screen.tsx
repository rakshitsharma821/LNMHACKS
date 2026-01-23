"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { motionTiming } from "@/lib/motion"
import { cn } from "@/lib/utils"

interface PredictionHistory {
  id: string
  question: string
  date: string
  prediction: "yes" | "no"
  result: boolean
  tokens: number
  expanded?: boolean
}

const historyData: PredictionHistory[] = [
  {
    id: "1",
    question: "Will I feel more energized this week?",
    date: "Jan 20, 2026",
    prediction: "yes",
    result: true,
    tokens: 75,
  },
  {
    id: "2",
    question: "Will I sleep better tonight?",
    date: "Jan 18, 2026",
    prediction: "yes",
    result: true,
    tokens: 50,
  },
  {
    id: "3",
    question: "Will I feel less stressed tomorrow?",
    date: "Jan 15, 2026",
    prediction: "no",
    result: false,
    tokens: 25,
  },
  {
    id: "4",
    question: "Will I feel more connected this week?",
    date: "Jan 12, 2026",
    prediction: "yes",
    result: false,
    tokens: 0,
  },
]

export function RewardsScreen() {
  const [balance, setBalance] = useState(0)
  const [history, setHistory] = useState(historyData)
  const targetBalance = 425

  useEffect(() => {
    // Count up animation for balance
    const duration = 1200
    const steps = 50
    const increment = targetBalance / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= targetBalance) {
        setBalance(targetBalance)
        clearInterval(timer)
      } else {
        setBalance(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [])

  const toggleExpand = (id: string) => {
    setHistory(prev =>
      prev.map(item =>
        item.id === id ? { ...item, expanded: !item.expanded } : item
      )
    )
  }

  return (
    <div className="min-h-[calc(100vh-6rem)] px-4 py-6">
      <div className="max-w-lg mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Rewards</h1>
          <p className="text-muted-foreground mt-1">
            Tokens earned from your predictions
          </p>
        </div>

        {/* Wallet Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: motionTiming.transition }}
          className="bg-card rounded-3xl p-6 shadow-sm"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-muted-foreground font-medium">Token Balance</span>
            <span className="px-3 py-1 bg-success/10 text-success text-sm font-medium rounded-full">
              Active
            </span>
          </div>

          <div className="flex items-baseline gap-2 mb-6">
            <span className="text-5xl font-bold text-foreground">{balance}</span>
            <span className="text-xl text-muted-foreground">tokens</span>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">12</p>
              <p className="text-xs text-muted-foreground">Predictions</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-success">75%</p>
              <p className="text-xs text-muted-foreground">Accuracy</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">7</p>
              <p className="text-xs text-muted-foreground">Day Streak</p>
            </div>
          </div>
        </motion.div>

        {/* Connect Wallet */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          className="w-full py-4 bg-primary text-primary-foreground rounded-2xl font-semibold flex items-center justify-center gap-2"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="20" height="14" x="2" y="5" rx="2" />
            <line x1="2" x2="22" y1="10" y2="10" />
          </svg>
          Connect Wallet
        </motion.button>

        {/* History */}
        <div>
          <h3 className="font-semibold text-foreground mb-4">Prediction History</h3>
          <div className="space-y-3">
            {history.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card rounded-2xl overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => toggleExpand(item.id)}
                  className="w-full p-4 flex items-center justify-between text-left"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-foreground font-medium truncate pr-4">
                      {item.question}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">{item.date}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={cn(
                        "font-semibold",
                        item.tokens > 0 ? "text-success" : "text-muted-foreground"
                      )}
                    >
                      {item.tokens > 0 ? `+${item.tokens}` : "0"}
                    </span>
                    <motion.svg
                      animate={{ rotate: item.expanded ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-muted-foreground"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </motion.svg>
                  </div>
                </button>

                <AnimatePresence>
                  {item.expanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: motionTiming.transition }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 border-t border-border pt-3">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Your prediction</p>
                            <p className="font-medium text-foreground mt-1">
                              {item.prediction === "yes" ? "Yes" : "No"}
                            </p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Outcome</p>
                            <p className="font-medium text-foreground mt-1">
                              {item.result ? "Improved" : "No change"}
                            </p>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-3">
                          {item.tokens > 0
                            ? "Your self-awareness is growing. Keep reflecting!"
                            : "Every prediction helps you understand yourself better."}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
