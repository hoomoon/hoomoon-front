"use client"

import type React from "react"

import Background from "@/components/background"

export default function Template({ children }: { children: React.ReactNode }) {
  return <Background>{children}</Background>
}
