"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import dynamic from "next/dynamic"

// Componente de fallback para quando o dashboard não puder ser carregado
const DashboardFallback = () => (
  <div className="flex items-center justify-center min-h-screen bg-black text-white">
    <div className="text-center">
      <p className="mb-4">Erro ao carregar o dashboard. Por favor, tente novamente.</p>
      <button
        onClick={() => window.location.reload()}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Recarregar página
      </button>
    </div>
  </div>
)

// Import the dashboard component with proper error handling
const BinanbotDashboard = dynamic(
  () =>
    import("../binanbot-dashboard").catch((err) => {
      console.error("Error loading BinanbotDashboard:", err)
      return DashboardFallback
    }),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">Carregando...</div>
    ),
  },
)

// Componente ErrorBoundary melhorado
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("Error caught in ErrorBoundary:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return <DashboardFallback />
    }
    return this.props.children
  }
}

// Componente Home com verificação de erros
export default function Home() {
  const router = useRouter()

  useEffect(() => {
    // Redirecionar para a página de cadastro
    if (router) {
      router.push("/cadastro")
    }
  }, [router])

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-[#66e0cc] border-t-transparent rounded-full animate-spin"></div>
    </div>
  )
}
