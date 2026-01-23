"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { motionTiming } from "@/lib/motion"

const cities = [
  { name: "San Francisco", index: 42, status: "Moderate" },
  { name: "New York", index: 58, status: "Elevated" },
  { name: "Austin", index: 35, status: "Calm" },
  { name: "Seattle", index: 48, status: "Moderate" },
]

interface CityStressIndexProps {
  fullScreen?: boolean
}

export function CityStressIndex({ fullScreen = false }: CityStressIndexProps) {
  const [selectedCity, setSelectedCity] = useState(cities[0])
  const [displayIndex, setDisplayIndex] = useState(0)
  const [showSelector, setShowSelector] = useState(false)

  useEffect(() => {
    // Count up animation
    const duration = 1000
    const steps = 40
    const increment = selectedCity.index / steps
    let current = 0
    setDisplayIndex(0)
    
    const timer = setInterval(() => {
      current += increment
      if (current >= selectedCity.index) {
        setDisplayIndex(selectedCity.index)
        clearInterval(timer)
      } else {
        setDisplayIndex(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [selectedCity])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Calm":
        return "text-success bg-success/10"
      case "Moderate":
        return "text-accent bg-accent/10"
      case "Elevated":
        return "text-secondary bg-secondary/10"
      default:
        return "text-muted-foreground bg-muted"
    }
  }

  const getRingColor = (status: string) => {
    switch (status) {
      case "Calm":
        return "#7BC47F"
      case "Moderate":
        return "#E9C46A"
      case "Elevated":
        return "#E76F51"
      default:
        return "#F4A261"
    }
  }

  const circumference = 2 * Math.PI * 45

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: motionTiming.transition }}
      className={`bg-card rounded-3xl p-6 shadow-sm ${fullScreen ? 'min-h-[60vh]' : ''}`}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground">City Stress Index</h3>
        <button
          onClick={() => setShowSelector(!showSelector)}
          className="text-sm text-primary font-medium"
        >
          {selectedCity.name}
          <svg
            className="inline-block ml-1 w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>
      </div>

      {/* City Selector Dropdown */}
      {showSelector && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute right-4 mt-1 bg-card rounded-2xl shadow-lg border border-border p-2 z-10"
        >
          {cities.map((city) => (
            <button
              key={city.name}
              onClick={() => {
                setSelectedCity(city)
                setShowSelector(false)
              }}
              className="w-full text-left px-4 py-2 rounded-xl hover:bg-muted transition-colors text-foreground"
            >
              {city.name}
            </button>
          ))}
        </motion.div>
      )}

      {/* Main Display */}
      <div className="flex items-center gap-6">
        {/* Ring Gauge */}
        <div className="relative w-28 h-28 flex-shrink-0">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              className="text-muted"
            />
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke={getRingColor(selectedCity.status)}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: circumference - (displayIndex / 100) * circumference }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl font-bold text-foreground">{displayIndex}</span>
          </div>
        </div>

        {/* Info */}
        <div className="flex-1">
          <span
            className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-2 ${getStatusColor(
              selectedCity.status
            )}`}
          >
            {selectedCity.status}
          </span>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Based on anonymous check-ins from people in {selectedCity.name}.
          </p>
        </div>
      </div>

      {/* Share CTA */}
      <motion.button
        whileTap={{ scale: 0.98 }}
        className="w-full mt-4 py-3 bg-muted text-foreground rounded-xl font-medium flex items-center justify-center gap-2 text-sm"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
          <polyline points="16 6 12 2 8 6" />
          <line x1="12" x2="12" y1="2" y2="15" />
        </svg>
        Share Index
      </motion.button>

      <p className="text-xs text-muted-foreground text-center mt-3">
        All data is anonymous and aggregated
      </p>
    </motion.div>
  )
}

