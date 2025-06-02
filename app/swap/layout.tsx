import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Swap APTM - HOOMOON",
  description: "Converta seus tokens APTM para USDT",
}

export default function SwapLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
