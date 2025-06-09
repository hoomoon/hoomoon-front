// app/providers/AuthProvider.tsx
'use client'

import React, { createContext, useContext } from 'react'

type AuthContextType = {
  user: null
  setUser: (u: null) => void
}

const AuthContext = createContext<AuthContextType>({ user: null, setUser: () => {} })

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <AuthContext.Provider value={{ user: null, setUser: () => {} }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
