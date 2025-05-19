"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import ParticlesBackground from "@/components/particles-background"

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [mounted, setMounted] = useState(false)

  // Garantir que o componente está montado antes de renderizar
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSubmit = async (e) => {
    // Verificar se o evento existe
    if (!e) return

    // Prevenir comportamento padrão do formulário
    e.preventDefault()

    setLoading(true)
    setError("")

    try {
      // Simulação de login
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Validação básica
      if (!email || !password) {
        throw new Error("Por favor, preencha todos os campos")
      }

      if (!email.includes("@")) {
        throw new Error("E-mail inválido")
      }

      if (password.length < 6) {
        throw new Error("A senha deve ter pelo menos 6 caracteres")
      }

      // Login bem-sucedido
      if (router) {
        router.push("/dashboard")
      }
    } catch (err) {
      setError(err?.message || "Ocorreu um erro ao fazer login")
    } finally {
      setLoading(false)
    }
  }

  // Não renderizar nada até que o componente esteja montado
  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 relative w-full overflow-hidden">
      {/* Fundo com partículas */}
      <div className="fixed inset-0 z-0">
        <ParticlesBackground />
      </div>

      {/* Gradientes animados (igual à landing page) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-[#66e0cc]/20 blur-[120px] animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-purple-600/20 blur-[120px] animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="w-full max-w-md bg-transparent border border-[#66e0cc] rounded-xl p-8 text-white relative z-10">
        <h2 className="text-2xl font-bold text-center mb-6">Entrar na HOOMOON</h2>

        {error && <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded-md mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => e && e.target && setEmail(e.target.value)}
              className="w-full bg-transparent border border-[#66e0cc] text-white placeholder-zinc-400 rounded-md py-2 px-4"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Senha</label>
            <input
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => e && e.target && setPassword(e.target.value)}
              className="w-full bg-transparent border border-[#66e0cc] text-white placeholder-zinc-400 rounded-md py-2 px-4"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#66e0cc] text-black font-bold py-2 rounded-xl hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm">
          <span className="text-zinc-400">Não tem uma conta?</span>{" "}
          <Link href="/cadastro" className="text-[#66e0cc] hover:underline">
            Cadastre-se
          </Link>
        </div>
      </div>
    </div>
  )
}
