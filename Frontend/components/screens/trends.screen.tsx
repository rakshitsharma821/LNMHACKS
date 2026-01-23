"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { motionTiming } from "@/lib/motion"
import { CityStressIndex } from "@/components/city-stress-index"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts"

const weeklyData = [
  { day: "Mon", score: 65 },
  { day: "Tue", score: 72 },
  { day: "Wed", score: 68 },
  { day: "Thu", score: 75 },
  { day: "Fri", score: 80 },
  { day: "Sat", score: 78 },
  { day: "Sun", score: 82 },
]

const campusData = [
  { name: "Engineering", focus: 72 },
  { name: "Business", focus: 68 },
  { name: "Arts", focus: 75 },
  { name: "Science", focus: 70 },
]

export function TrendsScreen() {
  const [activeChart, setActiveChart] = useState<"personal" | "campus">("personal")

  return (
    <div className="min-h-[calc(100vh-6rem)] px-4 py-6">
      <div className="max-w-lg mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Trends</h1>
          <p className="text-muted-foreground mt-1">
            Group insights from anonymous data
          </p>
        </div>

        {/* City Stress Index Hero */}
        <CityStressIndex />

        {/* Chart Toggle */}
        <div className="bg-muted rounded-2xl p-1 flex">
          <button
            onClick={() => setActiveChart("personal")}
            className={`flex-1 py-2.5 rounded-xl font-medium transition-colors ${
              activeChart === "personal"
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground"
            }`}
          >
            Weekly Mood
          </button>
          <button
            onClick={() => setActiveChart("campus")}
            className={`flex-1 py-2.5 rounded-xl font-medium transition-colors ${
              activeChart === "campus"
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground"
            }`}
          >
            Campus Focus
          </button>
        </div>

        {/* Charts */}
        <motion.div
          key={activeChart}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: motionTiming.transition }}
          className="bg-card rounded-3xl p-5 shadow-sm"
        >
          {activeChart === "personal" ? (
            <>
              <h3 className="font-semibold text-foreground mb-4">Your Weekly Mood</h3>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={weeklyData}>
                    <defs>
                      <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#F4A261" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#F4A261" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis 
                      dataKey="day" 
                      axisLine={false} 
                      tickLine={false}
                      tick={{ fill: '#6B6B6B', fontSize: 12 }}
                    />
                    <YAxis 
                      domain={[50, 100]} 
                      hide 
                    />
                    <Area
                      type="monotone"
                      dataKey="score"
                      stroke="#F4A261"
                      strokeWidth={3}
                      fill="url(#colorScore)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-between mt-4 text-sm">
                <span className="text-muted-foreground">Average: 74</span>
                <span className="text-success font-medium">+8% from last week</span>
              </div>
            </>
          ) : (
            <>
              <h3 className="font-semibold text-foreground mb-4">Campus Focus Index</h3>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={campusData}>
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false}
                      tick={{ fill: '#6B6B6B', fontSize: 11 }}
                    />
                    <YAxis 
                      domain={[60, 80]} 
                      hide 
                    />
                    <Line
                      type="monotone"
                      dataKey="focus"
                      stroke="#7BC47F"
                      strokeWidth={3}
                      dot={{ fill: '#7BC47F', strokeWidth: 0, r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                Based on anonymous data from 2,847 students
              </p>
            </>
          )}
        </motion.div>

        {/* Leaderboard */}
        <div className="bg-card rounded-3xl p-5 shadow-sm">
          <h3 className="font-semibold text-foreground mb-4">Improvement Leaders</h3>
          <div className="space-y-3">
            {[
              { rank: 1, name: "Downtown District", change: "+12%" },
              { rank: 2, name: "University Area", change: "+9%" },
              { rank: 3, name: "Tech Hub", change: "+7%" },
            ].map((item) => (
              <div
                key={item.rank}
                className="flex items-center justify-between py-2"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-sm font-bold text-primary">
                    {item.rank}
                  </span>
                  <span className="text-foreground">{item.name}</span>
                </div>
                <span className="text-success font-medium">{item.change}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Share Button */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          className="w-full py-4 bg-muted text-foreground rounded-2xl font-semibold flex items-center justify-center gap-2"
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
            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
            <polyline points="16 6 12 2 8 6" />
            <line x1="12" x2="12" y1="2" y2="15" />
          </svg>
          Share Your Progress
        </motion.button>
      </div>
    </div>
  )
}
