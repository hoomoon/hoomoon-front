import type React from "react"
import "../globals.css"
import type { Metadata } from "next"
import { Urbanist } from "next/font/google"
import { AuthProvider } from "../providers/AuthProvider"
import { Toaster } from 'react-hot-toast'

const urbanist = Urbanist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-urbanist",
})

export const metadata: Metadata = {
  title: "HOOMOON - O caminho mais rápido até a valorização cripto",
  description:
    "Fundo de investimento cripto com acesso antecipado à próxima revolução em distribuição de valor cripto.",
  generator: 'v0.dev',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
}

export async function generateStaticParams() {
  return [
    { lang: 'en' },
    { lang: 'pt-BR' },
    { lang: 'es' },
    { lang: 'fr' },
    { lang: 'vi' },
    { lang: 'ko' },
    { lang: 'ru' },
    { lang: 'hi' },
    { lang: 'it' },
    { lang: 'de' },
  ]
}

export default async function LangLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  
  return (
    <div className={urbanist.variable}>
      <AuthProvider>
        {children}
        <Toaster
          position="top-center"
          toastOptions={{
            success: {
              duration: 5000,
              style: {
                background: '#4CAF50',
                color: '#ffffff',
              },
            },
            error: {
              duration: 5000,
              style: {
                background: '#F44336',
                color: '#ffffff',
              },
            },
          }}
        />  
      </AuthProvider>
    </div>
  )
} 