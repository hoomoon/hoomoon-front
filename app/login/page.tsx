"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useSearchParams } from "next/navigation"
import { Eye, EyeOff, Check, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function Login() {
  // Estados para os campos do formulário
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [ref, setRef] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [mounted, setMounted] = useState(false)
  const [loginSuccess, setLoginSuccess] = useState(false)

  // Verificar se o componente está montado
  useEffect(() => {
    setMounted(true)
  }, [])

  // Obter parâmetros da URL de forma segura
  const searchParams = useSearchParams()

  // Obter código de referência da URL
  useEffect(() => {
    if (!mounted || !searchParams) return

    try {
      const indicacao = searchParams.get("ref") || ""
      setRef(indicacao)
    } catch (error) {
      console.error("Erro ao obter parâmetros da URL:", error)
    }
  }, [searchParams, mounted])

  // Função para validar o formulário
  const validarFormulario = useCallback(() => {
    const novosErros: Record<string, string> = {}

    if (!email.trim()) novosErros.email = "E-mail é obrigatório"
    else if (!/\S+@\S+\.\S+/.test(email)) novosErros.email = "E-mail inválido"

    if (!senha) novosErros.senha = "Senha é obrigatória"

    setErrors(novosErros)
    return Object.keys(novosErros).length === 0
  }, [email, senha])

  // Manipuladores de eventos seguros
  const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e || !e.target) return
    setEmail(e.target.value)
  }, [])

  const handleSenhaChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e || !e.target) return
    setSenha(e.target.value)
  }, [])

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prev) => !prev)
  }, [])

  // Função para lidar com o envio do formulário
  const handleSubmit = useCallback(
    async (e?: React.FormEvent) => {
      if (e) {
        e.preventDefault()
      }

      if (!validarFormulario()) return

      setIsSubmitting(true)

      try {
        // Simulação de envio para API
        await new Promise((resolve) => setTimeout(resolve, 1500))

        // Aqui você faria a chamada real para sua API
        console.log({
          email,
          senha,
          codigoReferencia: ref,
        })

        // Simular login bem-sucedido
        setLoginSuccess(true)

        // Redirecionar após login bem-sucedido
        setTimeout(() => {
          if (typeof window !== "undefined") {
            window.location.href = "/"
          }
        }, 1000)
      } catch (error) {
        console.error("Erro ao enviar formulário:", error)
        setErrors({ form: "E-mail ou senha incorretos. Tente novamente." })
      } finally {
        setIsSubmitting(false)
      }
    },
    [email, senha, ref, validarFormulario],
  )

  // Se o componente não estiver montado, não renderize nada
  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-white text-black flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6 bg-white border border-gray-200 p-8 rounded-xl shadow-md animate-in fade-in duration-500">
        {ref && (
          <div className="text-center text-sm text-gray-600 font-medium bg-gray-50 py-2 px-3 rounded-md border border-gray-200">
            Patrocinador: <span className="text-black font-bold">{ref}</span>
          </div>
        )}

        <div className="flex justify-center">
          <img
            src="/logo-dashboard.png"
            alt="Logo da empresa"
            className="w-48 mb-4"
            onError={(e) => {
              if (!e || !e.target) return
              const target = e.target as HTMLImageElement
              if (target) {
                target.onerror = null
                target.src =
                  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='60' viewBox='0 0 160 60' fill='none'%3E%3Crect width='160' height='60' rx='8' fill='%2366e0cc'/%3E%3Ctext x='50%' y='50%' fontFamily='Arial' fontSize='16' fill='black' textAnchor='middle' dominantBaseline='middle'%3ELOGO%3C/text%3E%3C/svg%3E"
              }
            }}
          />
        </div>

        <h2 className="text-2xl font-bold text-center">Entrar na sua conta</h2>

        {loginSuccess ? (
          <div className="bg-green-50 text-green-700 p-4 rounded-xl border border-green-200 text-center">
            <Check className="h-8 w-8 mx-auto mb-2 text-green-500" />
            <p className="font-medium">Login realizado com sucesso!</p>
            <p className="text-sm mt-1">Redirecionando...</p>
          </div>
        ) : (
          <>
            {errors.form && (
              <div className="bg-red-50 text-red-700 p-3 rounded-xl border border-red-200">{errors.form}</div>
            )}

            <form
              onSubmit={(e) => {
                if (!e) return
                handleSubmit(e)
              }}
              className="space-y-4"
            >
              <div className="space-y-1">
                <div className="relative">
                  <Input
                    type="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={handleEmailChange}
                    className={`bg-gray-100 text-black pr-10 ${
                      errors.email ? "border-red-400 focus:border-red-400" : "focus:border-[#66e0cc]"
                    }`}
                  />
                  {errors.email ? (
                    <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500 h-5 w-5" />
                  ) : email ? (
                    <Check className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 h-5 w-5" />
                  ) : null}
                </div>
                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
              </div>

              <div className="space-y-1">
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Senha"
                    value={senha}
                    onChange={handleSenhaChange}
                    className={`bg-gray-100 text-black pr-10 ${
                      errors.senha ? "border-red-400 focus:border-red-400" : "focus:border-[#66e0cc]"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.senha && <p className="text-xs text-red-500 mt-1">{errors.senha}</p>}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#66e0cc] text-black hover:bg-[#55cbb8] rounded-xl text-lg py-2 h-auto transition-all duration-200 hover:shadow-md"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin mr-2"></div>
                    <span>Entrando...</span>
                  </div>
                ) : (
                  <span>Entrar</span>
                )}
              </Button>
            </form>
          </>
        )}

        <div className="text-center text-sm text-gray-600 space-y-2">
          <p>
            Esqueceu sua senha?{" "}
            <Link href="/recuperar-senha" className="text-[#66e0cc] font-semibold hover:underline">
              Recuperar
            </Link>
          </p>
          <p>
            Não tem uma conta?{" "}
            <Link href="/cadastro" className="text-[#66e0cc] font-semibold hover:underline">
              Criar conta
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
