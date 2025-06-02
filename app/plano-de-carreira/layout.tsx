import type React from "react"
export default function PlanoDeCarreiraLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="min-h-screen bg-black">{children}</div>
}
