// app/layout.tsx
import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Urbanist } from "next/font/google"
import { AuthProvider } from "./providers/AuthProvider"

const urbanist = Urbanist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-urbanist",
})

export const metadata: Metadata = {
  title: "HOOMOON - O caminho mais rápido até a valorização cripto",
  description:
    "Fundo de investimento cripto com acesso antecipado à próxima revolução em distribuição de valor cripto.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`${urbanist.variable}`}>
      <body className="font-urbanist antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
