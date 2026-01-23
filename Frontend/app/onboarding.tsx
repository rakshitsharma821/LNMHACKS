"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { motionTiming } from "@/lib/motion"

interface OnboardingProps {
  onComplete: () => void
}

const slides = [
  {
    title: "Chat anonymously",
    description: "Have a private conversation with our empathetic AI. No account needed, no judgment.",
    icon: (
      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    title: "Understand how you feel",
    description: "Get an emotional score that helps you track your wellbeing over time.",
    icon: (
      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
  },
  {
    title: "Predict improvement & earn rewards",
    description: "Make predictions about your wellbeing and earn tokens when you're right.",
    icon: (
      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v12" />
        <path d="M15 9.5a3 3 0 1 0 0 5H9" />
      </svg>
    ),
  },
]

export function Onboarding({ onComplete }: OnboardingProps) {
  const [currentSlide, setCurrentSlide] = useState(0)

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1)
    } else {
      onComplete()
    }
  }

  const handleSkip = () => {
    onComplete()
  }

  return (
    <div className="min-h-screen bg-background flex flex-col px-6 py-8">
      {/* Skip button */}
      <div className="flex justify-end">
        <button
          onClick={handleSkip}
          className="text-muted-foreground font-medium px-4 py-2"
        >
          Skip
        </button>
      </div>

      {/* Slide content */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: motionTiming.transition }}
            className="text-center max-w-sm"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: motionTiming.transition, delay: 0.1 }}
              className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8 text-primary"
            >
              {slides[currentSlide].icon}
            </motion.div>

            <h2 className="text-2xl font-bold text-foreground mb-4 text-balance">
              {slides[currentSlide].title}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {slides[currentSlide].description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress and CTA */}
      <div className="space-y-6">
        {/* Progress dots */}
        <div className="flex justify-center gap-2">
          {slides.map((_, index) => (
            <motion.div
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "w-8 bg-primary"
                  : index < currentSlide
                  ? "w-2 bg-primary/50"
                  : "w-2 bg-muted"
              }`}
              layoutId={`dot-${index}`}
            />
          ))}
        </div>

        {/* CTA Button */}
        <motion.button
          onClick={handleNext}
          className="w-full py-4 bg-primary text-primary-foreground rounded-2xl font-semibold text-lg"
          whileTap={{ scale: 0.98 }}
        >
          {currentSlide === slides.length - 1 ? "Get Started" : "Next"}
        </motion.button>

        {/* Optional wallet connect */}
        {currentSlide === slides.length - 1 && (
          <motion.button
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={onComplete}
            className="w-full py-3 text-muted-foreground font-medium"
          >
            Connect Wallet (optional)
          </motion.button>
        )}
      </div>
    </div>
  )
}
