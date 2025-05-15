import type React from "react"
export default function RecuperarSenhaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="min-h-screen bg-white">{children}</div>
}
