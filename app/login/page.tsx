// app/login/page.tsx
"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import ParticlesBackground from "@/components/particles-background"
import { useAuth } from '@/app/providers/AuthProvider'
import { login, whoami } from "@/lib/auth"

export default function LoginPage() {
  const { setUser } = useAuth()
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      await login(email, password)
      const u = await whoami()
      setUser(u)
      router.push("/dashboard")
    } catch (err: any) {
      setError(err.message || "Falha no login")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center relative">
      <ParticlesBackground className="absolute inset-0" />

      <form
        onSubmit={handleSubmit}
        className="relative z-10 bg-transparent border border-[#66e0cc] rounded-xl p-8 space-y-4 max-w-md w-full"
        noValidate
      >
        <h2 className="text-2xl font-bold text-center">Entrar na HOOMOON</h2>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 p-2 rounded">
            {error}
          </div>
        )}

        <div>
          <label htmlFor="email" className="block text-sm mb-1">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            placeholder="seunome@exemplo.com"
            className="w-full bg-transparent border border-[#66e0cc] rounded-md py-2 px-3"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm mb-1">Senha</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            placeholder="senha"
            className="w-full bg-transparent border border-[#66e0cc] rounded-md py-2 px-3"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#66e0cc] text-black py-2 rounded-xl hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>

        <p className="text-center text-sm mt-4">
          Não tem conta?{" "}
          <Link href="/cadastro" className="text-[#66e0cc] underline">
            Cadastre-se
          </Link>
        </p>
      </form>
    </div>
  )
}
