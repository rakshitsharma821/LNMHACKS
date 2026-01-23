"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { motionTiming } from "@/lib/motion"

interface EmotionalScoreCardProps {
  score: number
  onPredict?: () => void
  onViewTrends?: () => void
}

export function EmotionalScoreCard({ score, onPredict, onViewTrends }: EmotionalScoreCardProps) {
  const [displayScore, setDisplayScore] = useState(0)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    // Count up animation
    const duration = 1500
    const steps = 60
    const increment = score / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= score) {
        setDisplayScore(score)
        clearInterval(timer)
        setTimeout(() => setShowContent(true), 300)
      } else {
        setDisplayScore(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [score])

  const getScoreColor = (s: number) => {
    if (s >= 70) return "text-success"
    if (s >= 50) return "text-accent"
    return "text-primary"
  }

  const getScoreMessage = (s: number) => {
    if (s >= 80) return "You're doing wonderfully today!"
    if (s >= 70) return "You're in a good place right now."
    if (s >= 60) return "There's room for growth, and that's okay."
    if (s >= 50) return "You're navigating some challenges."
    return "It's okay to have tough days."
  }

  const getGaugeColor = (s: number) => {
    if (s >= 70) return "#7BC47F"
    if (s >= 50) return "#E9C46A"
    return "#F4A261"
  }

  const circumference = 2 * Math.PI * 90
  const strokeDashoffset = circumference - (displayScore / 100) * circumference

  return (
    <div className="min-h-[calc(100vh-6rem)] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: motionTiming.transition }}
        className="w-full max-w-sm bg-card rounded-3xl p-8 shadow-lg"
      >
        <h2 className="text-center text-lg font-semibold text-muted-foreground mb-6">
          Your Emotional Score
        </h2>

        {/* Circular Gauge */}
        <div className="relative w-48 h-48 mx-auto mb-8">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
            {/* Background circle */}
            <circle
              cx="100"
              cy="100"
              r="90"
              fill="none"
              stroke="currentColor"
              strokeWidth="12"
              className="text-muted"
            />
            {/* Progress circle */}
            <motion.circle
              cx="100"
              cy="100"
              r="90"
              fill="none"
              stroke={getGaugeColor(score)}
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`text-5xl font-bold ${getScoreColor(score)}`}>
              {displayScore}
            </span>
          </div>
        </div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={showContent ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: motionTiming.transition }}
          className="text-center mb-8"
        >
          <p className="text-foreground text-lg leading-relaxed">
            {getScoreMessage(score)}
          </p>
          <p className="text-muted-foreground text-sm mt-2">
            This score reflects your responses today.
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={showContent ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: motionTiming.transition, delay: 0.1 }}
          className="space-y-3"
        >
          <motion.button
            onClick={onPredict}
            className="w-full py-4 bg-primary text-primary-foreground rounded-2xl font-semibold text-lg"
            whileTap={{ scale: 0.98 }}
            animate={{
              scale: [1, 1.01, 1],
            }}
            transition={{
              scale: {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          >
            Predict My Improvement
          </motion.button>
          <button
            onClick={onViewTrends}
            className="w-full py-4 bg-muted text-foreground rounded-2xl font-semibold text-lg"
          >
            View Trends
          </button>
        </motion.div>
      </motion.div>
    </div>
  )
}
