"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { motionTiming } from "@/lib/motion"
import { cn } from "@/lib/utils"

type MarketState = "open" | "pending" | "resolved"

interface Market {
  id: string
  question: string
  state: MarketState
  commitment?: number
  prediction?: "yes" | "no"
  result?: boolean
  insight?: string
}

const initialMarkets: Market[] = [
  {
    id: "1",
    question: "Will I feel more energized tomorrow?",
    state: "open",
  },
  {
    id: "2",
    question: "Will I sleep better this week?",
    state: "pending",
    commitment: 50,
    prediction: "yes",
  },
  {
    id: "3",
    question: "Did I feel more connected last week?",
    state: "resolved",
    commitment: 75,
    prediction: "yes",
    result: true,
    insight: "You reported feeling more connected on 5 out of 7 days. Great progress!",
  },
]

export function MarketsScreen() {
  const [markets, setMarkets] = useState<Market[]>(initialMarkets)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [commitment, setCommitment] = useState(50)
  const [selectedPrediction, setSelectedPrediction] = useState<"yes" | "no" | null>(null)

  const currentMarket = markets[currentIndex]

  const handleCommit = () => {
    if (!selectedPrediction || !currentMarket) return

    setMarkets(prev => prev.map((m, i) => 
      i === currentIndex 
        ? { ...m, state: "pending" as MarketState, commitment, prediction: selectedPrediction }
        : m
    ))
    setSelectedPrediction(null)
    setCommitment(50)
    
    // Move to next open market
    const nextOpen = markets.findIndex((m, i) => i > currentIndex && m.state === "open")
    if (nextOpen !== -1) {
      setTimeout(() => setCurrentIndex(nextOpen), 500)
    }
  }

  const goToNext = () => {
    if (currentIndex < markets.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const goToPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  return (
    <div className="min-h-[calc(100vh-6rem)] px-4 py-6">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">Your Predictions</h1>
          <p className="text-muted-foreground mt-1">
            Predict your emotional improvement
          </p>
        </div>

        {/* Progress dots */}
        <div className="flex justify-center gap-2 mb-6">
          {markets.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={cn(
                "w-2.5 h-2.5 rounded-full transition-colors",
                i === currentIndex ? "bg-primary" : "bg-muted"
              )}
            />
          ))}
        </div>

        {/* Market Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentMarket?.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: motionTiming.transition }}
            className="bg-card rounded-3xl p-6 shadow-sm"
          >
            {currentMarket?.state === "open" && (
              <OpenMarket
                market={currentMarket}
                commitment={commitment}
                setCommitment={setCommitment}
                selectedPrediction={selectedPrediction}
                setSelectedPrediction={setSelectedPrediction}
                onCommit={handleCommit}
              />
            )}

            {currentMarket?.state === "pending" && (
              <PendingMarket market={currentMarket} />
            )}

            {currentMarket?.state === "resolved" && (
              <ResolvedMarket market={currentMarket} />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          <button
            onClick={goToPrev}
            disabled={currentIndex === 0}
            className="px-4 py-2 text-muted-foreground disabled:opacity-30"
          >
            Previous
          </button>
          <button
            onClick={goToNext}
            disabled={currentIndex === markets.length - 1}
            className="px-4 py-2 text-muted-foreground disabled:opacity-30"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

function OpenMarket({
  market,
  commitment,
  setCommitment,
  selectedPrediction,
  setSelectedPrediction,
  onCommit,
}: {
  market: Market
  commitment: number
  setCommitment: (v: number) => void
  selectedPrediction: "yes" | "no" | null
  setSelectedPrediction: (v: "yes" | "no" | null) => void
  onCommit: () => void
}) {
  return (
    <>
      <div className="text-center mb-6">
        <span className="inline-block px-3 py-1 bg-success/10 text-success text-sm font-medium rounded-full mb-4">
          Open
        </span>
        <h2 className="text-xl font-bold text-foreground leading-relaxed">
          {market.question}
        </h2>
      </div>

      {/* Prediction cards */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <motion.button
          onClick={() => setSelectedPrediction("yes")}
          className={cn(
            "p-6 rounded-2xl border-2 transition-colors",
            selectedPrediction === "yes"
              ? "border-success bg-success/10"
              : "border-border bg-muted/50"
          )}
          whileTap={{ scale: 0.98 }}
        >
          <span className="text-3xl font-bold text-success block mb-1">Yes</span>
          <span className="text-sm text-muted-foreground">I will improve</span>
        </motion.button>
        <motion.button
          onClick={() => setSelectedPrediction("no")}
          className={cn(
            "p-6 rounded-2xl border-2 transition-colors",
            selectedPrediction === "no"
              ? "border-accent bg-accent/10"
              : "border-border bg-muted/50"
          )}
          whileTap={{ scale: 0.98 }}
        >
          <span className="text-3xl font-bold text-accent block mb-1">No</span>
          <span className="text-sm text-muted-foreground">Not this time</span>
        </motion.button>
      </div>

      {/* Commitment slider */}
      {selectedPrediction && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-medium text-foreground">Commitment Level</span>
            <span className="text-lg font-bold text-primary">{commitment}%</span>
          </div>
          <input
            type="range"
            min="10"
            max="100"
            step="10"
            value={commitment}
            onChange={(e) => setCommitment(Number(e.target.value))}
            className="w-full h-2 bg-muted rounded-full appearance-none cursor-pointer accent-primary"
          />
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Higher commitment = higher potential rewards
          </p>
        </motion.div>
      )}

      {/* Commit button */}
      <motion.button
        onClick={onCommit}
        disabled={!selectedPrediction}
        className="w-full py-4 bg-primary text-primary-foreground rounded-2xl font-semibold disabled:opacity-50"
        whileTap={{ scale: 0.98 }}
      >
        Commit to Prediction
      </motion.button>
    </>
  )
}

function PendingMarket({ market }: { market: Market }) {
  return (
    <div className="text-center py-4">
      <span className="inline-block px-3 py-1 bg-accent/10 text-accent text-sm font-medium rounded-full mb-4">
        Pending
      </span>
      <h2 className="text-xl font-bold text-foreground leading-relaxed mb-4">
        {market.question}
      </h2>
      <div className="bg-muted/50 rounded-2xl p-4 mb-4">
        <p className="text-sm text-muted-foreground">Your prediction</p>
        <p className="text-2xl font-bold text-foreground mt-1">
          {market.prediction === "yes" ? "Yes" : "No"}
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          {market.commitment}% committed
        </p>
      </div>
      <p className="text-sm text-muted-foreground">
        Results will be available soon based on your check-ins.
      </p>
    </div>
  )
}

function ResolvedMarket({ market }: { market: Market }) {
  const isCorrect = market.prediction === "yes" ? market.result : !market.result

  return (
    <div className="text-center py-4">
      <motion.span
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className={cn(
          "inline-block px-3 py-1 text-sm font-medium rounded-full mb-4",
          isCorrect ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"
        )}
      >
        {isCorrect ? "Prediction Matched" : "Outcome Different"}
      </motion.span>
      <h2 className="text-xl font-bold text-foreground leading-relaxed mb-4">
        {market.question}
      </h2>
      
      {/* Reflection card */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-muted/50 rounded-2xl p-4 text-left"
      >
        <h3 className="font-semibold text-foreground mb-2">Reflection</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {market.insight}
        </p>
      </motion.div>

      {isCorrect && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-4 p-3 bg-success/10 rounded-xl"
        >
          <p className="text-success font-medium">
            +{market.commitment} tokens earned
          </p>
        </motion.div>
      )}
    </div>
  )
}
