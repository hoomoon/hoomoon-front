import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Perfil | HOOMOON",
  description: "Gerencie suas informações pessoais e configurações de segurança",
}

export default function PerfilLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <div className="flex min-h-screen flex-col">{children}</div>
}
