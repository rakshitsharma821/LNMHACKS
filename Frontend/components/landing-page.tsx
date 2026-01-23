"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { motionTiming } from "@/lib/motion"
import { CityStressIndex } from "./city-stress-index"
import { ThemeToggle } from "./theme-toggle"

interface LandingPageProps {
  onGetStarted: () => void
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95])

  return (
    <div ref={containerRef} className="min-h-screen bg-background">
      {/* Theme Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      
      {/* Hero Section */}
      <motion.section
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="min-h-screen flex flex-col items-center justify-center px-6 py-12 sticky top-0"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: motionTiming.reveal, ease: "easeOut" }}
          className="text-center max-w-md mx-auto"
        >
          {/* Logo */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-20 h-20 bg-primary rounded-3xl flex items-center justify-center mx-auto mb-8"
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
          </motion.div>

          <h1 className="text-4xl font-bold text-foreground leading-tight text-balance mb-4">
            Track How You Feel. Predict How You'll Improve.
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            Anonymous emotional check-ins turned into insight and rewards.
          </p>

          <motion.button
            onClick={onGetStarted}
            className="w-full py-4 bg-primary text-primary-foreground rounded-2xl font-semibold text-lg shadow-lg shadow-primary/20"
            whileTap={{ scale: 0.98 }}
            animate={{
              scale: [1, 1.02, 1],
            }}
            transition={{
              scale: {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          >
            Check In Anonymously
          </motion.button>

          <p className="text-sm text-muted-foreground mt-4">
            No account required to start
          </p>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-muted-foreground"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* How It Works */}
      <section className="relative bg-background py-20 px-6">
        <div className="max-w-md mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-2xl font-bold text-foreground text-center mb-12"
          >
            How It Works
          </motion.h2>

          <div className="space-y-8">
            {[
              {
                step: "1",
                title: "Chat",
                description: "Have a quick, anonymous conversation with our empathetic AI.",
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                ),
              },
              {
                step: "2",
                title: "Score",
                description: "Get an emotional score that reflects how you're feeling today.",
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                ),
              },
              {
                step: "3",
                title: "Predict",
                description: "Predict your improvement and earn rewards when you're right.",
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 20V10" />
                    <path d="M18 20V4" />
                    <path d="M6 20v-4" />
                  </svg>
                ),
              },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-4"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0 text-primary">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* City Stress Index Preview */}
      <section className="bg-muted/30 py-20 px-6">
        <div className="max-w-md mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-2xl font-bold text-foreground text-center mb-4"
          >
            City Stress Index
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-center mb-8"
          >
            See how your city is feeling, anonymously aggregated.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <CityStressIndex />
          </motion.div>
        </div>
      </section>

      {/* Safety & Ethics */}
      <section className="py-20 px-6">
        <div className="max-w-md mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-2xl font-bold text-foreground text-center mb-4"
          >
            Built with Care
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-center mb-8"
          >
            Your wellbeing and privacy come first.
          </motion.p>

          <div className="grid grid-cols-2 gap-4">
            {[
              { title: "Anonymous", desc: "No personal data required" },
              { title: "Private", desc: "Your responses stay yours" },
              { title: "Safe", desc: "Crisis support built-in" },
              { title: "Respectful", desc: "No judgment, ever" },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-card rounded-2xl p-4 shadow-sm"
              >
                <h4 className="font-semibold text-foreground mb-1">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="bg-muted/30 py-20 px-6">
        <div className="max-w-md mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <p className="text-4xl font-bold text-foreground mb-2">50,000+</p>
            <p className="text-muted-foreground mb-8">Anonymous check-ins completed</p>
          </motion.div>

          <div className="flex justify-center gap-8">
            {[
              { value: "4.8", label: "App Rating" },
              { value: "73%", label: "Improvement Rate" },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
              >
                <p className="text-2xl font-bold text-primary">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6">
        <div className="max-w-md mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-2xl font-bold text-foreground mb-4"
          >
            Start Your Journey
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground mb-8"
          >
            Take your first emotional check-in today.
          </motion.p>

          <motion.button
            onClick={onGetStarted}
            className="w-full py-4 bg-primary text-primary-foreground rounded-2xl font-semibold text-lg"
            whileTap={{ scale: 0.98 }}
          >
            Get Started Free
          </motion.button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border">
        <div className="max-w-md mx-auto text-center">
          <p className="text-sm text-muted-foreground">
            MindScoreAI - Your emotional wellness companion
          </p>
        </div>
      </footer>
    </div>
  )
}
