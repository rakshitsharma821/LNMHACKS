"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { motionVariants, motionTiming } from "@/lib/motion"
import { EmotionalScoreCard } from "@/components/emotional-score-card"
import { SafetyModal } from "@/components/safety-modal"

interface Message {
  id: string
  type: "ai" | "user"
  content: string
}

const questions = [
  "Hey there! How are you feeling right now?",
  "What's been on your mind lately?",
  "How well did you sleep last night?",
  "On a scale of 1-10, how would you rate your energy today?",
  "What's something that made you smile recently?",
  "How connected do you feel to the people around you?",
  "What's one thing you're looking forward to?",
]

const responses = [
  ["Great to hear from you!", "Thanks for sharing that with me.", "I appreciate you opening up."],
  ["That makes sense.", "I understand.", "Thanks for being honest."],
  ["Sleep is so important.", "Rest matters a lot.", "That's helpful to know."],
  ["Got it, thanks.", "I hear you.", "That gives me a good picture."],
  ["That's wonderful!", "Love that.", "Small joys matter."],
  ["Connection is everything.", "That's meaningful.", "Thanks for sharing."],
  ["Something to look forward to helps.", "That's great!", "Anticipation is powerful."],
]

interface CheckInScreenProps {
  onNavigate?: (tab: string) => void
}

export function CheckInScreen({ onNavigate }: CheckInScreenProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [showScore, setShowScore] = useState(false)
  const [showSafetyModal, setShowSafetyModal] = useState(false)
  const [score, setScore] = useState(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    // Start with first AI message
    if (messages.length === 0) {
      setIsTyping(true)
      setTimeout(() => {
        setMessages([{ id: "1", type: "ai", content: questions[0] }])
        setIsTyping(false)
      }, 1000)
    }
  }, [messages.length])

  const handleSend = () => {
    if (!inputValue.trim() || currentQuestion >= questions.length) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
    }

    // Check for concerning keywords (simplified detection)
    const concerningKeywords = ["hopeless", "end it", "give up", "can't go on", "no point"]
    const hasConcern = concerningKeywords.some(keyword => 
      inputValue.toLowerCase().includes(keyword)
    )

    setMessages(prev => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    setTimeout(() => {
      if (hasConcern && Math.random() > 0.5) {
        setShowSafetyModal(true)
      }

      const nextQ = currentQuestion + 1
      if (nextQ < questions.length) {
        const responseIndex = Math.floor(Math.random() * 3)
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          type: "ai",
          content: `${responses[currentQuestion][responseIndex]} ${questions[nextQ]}`,
        }
        setMessages(prev => [...prev, aiResponse])
        setCurrentQuestion(nextQ)
      } else {
        const finalMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: "ai",
          content: "Thanks for sharing with me today. Let me put together your emotional score...",
        }
        setMessages(prev => [...prev, finalMessage])
        setTimeout(() => {
          setScore(Math.floor(Math.random() * 30) + 60) // Score between 60-90
          setShowScore(true)
        }, 1500)
      }
      setIsTyping(false)
    }, 1200)
  }

  if (showScore) {
    return (
      <EmotionalScoreCard 
        score={score} 
        onPredict={() => onNavigate?.("markets")}
        onViewTrends={() => onNavigate?.("trends")}
      />
    )
  }

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)]">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm px-4 py-4 border-b border-border">
        <div className="max-w-lg mx-auto">
          <h1 className="text-xl font-bold text-foreground">Daily Check-In</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {currentQuestion + 1} of {questions.length}
          </p>
          <div className="w-full h-1.5 bg-muted rounded-full mt-3 overflow-hidden">
            <motion.div
              className="h-full bg-primary rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              transition={{ duration: motionTiming.transition, ease: "easeOut" }}
            />
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="max-w-lg mx-auto space-y-4">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={motionVariants.slideUp.initial}
                animate={motionVariants.slideUp.animate}
                className={cn(
                  "flex",
                  message.type === "user" ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[85%] px-4 py-3 rounded-3xl",
                    message.type === "user"
                      ? "bg-primary text-primary-foreground rounded-br-lg"
                      : "bg-card text-card-foreground rounded-bl-lg shadow-sm"
                  )}
                >
                  <p className="text-[15px] leading-relaxed">{message.content}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing indicator */}
          <AnimatePresence>
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="flex justify-start"
              >
                <div className="bg-card text-card-foreground px-4 py-3 rounded-3xl rounded-bl-lg shadow-sm">
                  <div className="flex gap-1.5">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-2 h-2 bg-muted-foreground/50 rounded-full"
                        animate={{ 
                          scale: [1, 1.2, 1],
                          opacity: [0.5, 1, 0.5]
                        }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          delay: i * 0.2,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="sticky bottom-0 bg-background/95 backdrop-blur-sm border-t border-border px-4 py-4 pb-28">
        <div className="max-w-lg mx-auto flex gap-3">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type your response..."
            className="flex-1 px-4 py-3 bg-card rounded-2xl border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            disabled={currentQuestion >= questions.length}
          />
          <motion.button
            onClick={handleSend}
            disabled={!inputValue.trim() || currentQuestion >= questions.length}
            className="px-5 py-3 bg-primary text-primary-foreground rounded-2xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            whileTap={{ scale: 0.95 }}
            transition={{ duration: motionTiming.press }}
          >
            Send
          </motion.button>
        </div>
      </div>

      {/* Safety Modal */}
      <SafetyModal 
        open={showSafetyModal} 
        onClose={() => setShowSafetyModal(false)} 
      />
    </div>
  )
}
