// app/providers/AuthProvider.tsx
'use client'

import React, { useState, useEffect, createContext, useContext } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { whoami, User } from '@/lib/auth'

// Rotas públicas onde não requer autenticação
const publicRoutes = ['/', '/login', '/cadastro', '/recuperar-senha']

type AuthContextType = {
  user: User | null
  setUser: (u: User | null) => void
}

const AuthContext = createContext<AuthContextType>({ user: null, setUser: () => {} })

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  // Busca info do usuário ao carregar a aplicação
  useEffect(() => {
    whoami()
      .then((u) => setUser(u))
      .catch(() => setUser(null))
      .finally(() => setLoading(false))
  }, [])

  // Redireciona baseado em estado do usuário e rota atual
  useEffect(() => {
    if (loading) return

    if (user) {
      // Se usuário autenticado e em rota pública, manda pra dashboard
      if (publicRoutes.includes(pathname)) {
        router.replace('/dashboard')
      }
    } else {
      // Se não autenticado e em rota protegida, manda pro login
      if (!publicRoutes.includes(pathname)) {
        router.replace('/login')
      }
    }
  }, [loading, user, pathname, router])

  // Enquanto carrega, mostrar loading
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Carregando...
      </div>
    )
  }

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
