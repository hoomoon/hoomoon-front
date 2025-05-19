import type React from "react"
export default function ConfiguracaoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <section className="min-h-screen bg-black">{children}</section>
}
