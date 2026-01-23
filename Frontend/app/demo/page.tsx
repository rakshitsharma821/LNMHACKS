"use client"

import { useRouter } from "next/navigation"
import { DemoMode } from "@/components/demo-mode"

export default function DemoRoute() {
  const router = useRouter()

  return (
    <DemoMode 
      onExit={() => router.push("/")} 
    />
  )
}
