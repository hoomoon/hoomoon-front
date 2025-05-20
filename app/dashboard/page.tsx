// app/dashboard/page.tsx
"use client"

import React, { useEffect, useState } from "react"
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
    import("../../binanbot-dashboard").catch((err) => {
      console.error("Error loading BinanbotDashboard:", err)
      return DashboardFallback
    }),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <div className="w-12 h-12 border-4 border-[#66e0cc] border-t-transparent rounded-full animate-spin"></div>
      </div>
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

// Componente Dashboard que renderiza diretamente o dashboard
export default function Dashboard() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <div className="w-12 h-12 border-4 border-[#66e0cc] border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <ErrorBoundary>
      <BinanbotDashboard />
    </ErrorBoundary>
  )
}
