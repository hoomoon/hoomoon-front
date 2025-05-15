import type React from "react"
export default function DepositoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="container mx-auto px-4 py-6 max-w-2xl">{children}</div>
}
