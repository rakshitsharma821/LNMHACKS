"use client"

import { motion, AnimatePresence } from "framer-motion"
import { motionTiming } from "@/lib/motion"

interface SafetyModalProps {
  open: boolean
  onClose: () => void
}

export function SafetyModal({ open, onClose }: SafetyModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: motionTiming.transition }}
            className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: motionTiming.transition, ease: "easeOut" }}
            className="fixed bottom-0 left-0 right-0 z-50 p-4 pb-8"
          >
            <div className="max-w-lg mx-auto bg-card rounded-3xl p-6 shadow-xl">
              <div className="w-12 h-1.5 bg-muted rounded-full mx-auto mb-6" />
              
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-foreground mb-3">
                  You don't have to go through this alone.
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  It sounds like you might be going through a difficult time. 
                  There are people who care and want to help.
                </p>
              </div>

              <div className="space-y-3">
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-primary text-primary-foreground rounded-2xl font-semibold"
                >
                  Talk to Someone Now
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-muted text-foreground rounded-2xl font-semibold"
                >
                  View Resources
                </motion.button>
                <button
                  onClick={onClose}
                  className="w-full py-3 text-muted-foreground font-medium"
                >
                  Continue Check-In
                </button>
              </div>

              <p className="text-xs text-muted-foreground text-center mt-6">
                Your privacy is protected. We're here when you need us.
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
