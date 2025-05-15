"use client"

import type React from "react"

import { useState, useCallback, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Check, AlertCircle, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function RecuperarSenha() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [emailEnviado, setEmailEnviado] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Verificar se o componente está montado
  useEffect(() => {
    setMounted(true)
  }, [])

  // Função para validar o formulário
  const validarFormulario = useCallback(() => {
    const novosErros: Record<string, string> = {}

    if (!email.trim()) novosErros.email = "E-mail é obrigatório"
    else if (!/\S+@\S+\.\S+/.test(email)) novosErros.email = "E-mail inválido"

    setErrors(novosErros)
    return Object.keys(novosErros).length === 0
  }, [email])

  // Manipulador de evento seguro
  const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e || !e.target) return
    setEmail(e.target.value)
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
        })

        // Mostrar mensagem de sucesso
        setEmailEnviado(true)
      } catch (error) {
        console.error("Erro ao enviar formulário:", error)
        setErrors({ form: "Ocorreu um erro ao processar sua solicitação. Tente novamente." })
      } finally {
        setIsSubmitting(false)
      }
    },
    [email, validarFormulario],
  )

  // Função para tentar novamente
  const handleTryAgain = useCallback(() => {
    setEmailEnviado(false)
  }, [])

  // Se o componente não estiver montado, não renderize nada
  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-white text-black flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6 bg-white border border-gray-200 p-8 rounded-xl shadow-md animate-in fade-in duration-500">
        <div className="flex items-center mb-4">
          <Link href="/login" className="text-gray-500 hover:text-black transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h2 className="text-2xl font-bold text-center flex-1">Recuperar Senha</h2>
        </div>

        {emailEnviado ? (
          <div className="bg-green-50 text-green-700 p-6 rounded-xl border border-green-200 text-center">
            <Check className="h-12 w-12 mx-auto mb-3 text-green-500" />
            <h3 className="text-lg font-semibold mb-2">E-mail enviado com sucesso!</h3>
            <p className="mb-4">
              Enviamos um link para recuperação de senha para <strong>{email}</strong>. Por favor, verifique sua caixa
              de entrada e siga as instruções.
            </p>
            <p className="text-sm text-gray-600">
              Não recebeu o e-mail? Verifique sua pasta de spam ou{" "}
              <button type="button" onClick={handleTryAgain} className="text-[#66e0cc] font-semibold hover:underline">
                tente novamente
              </button>
              .
            </p>
          </div>
        ) : (
          <>
            <p className="text-center text-gray-600">
              Digite seu e-mail abaixo e enviaremos um link para redefinir sua senha.
            </p>

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

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#66e0cc] text-black hover:bg-[#55cbb8] rounded-xl text-lg py-2 h-auto transition-all duration-200 hover:shadow-md"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin mr-2"></div>
                    <span>Enviando...</span>
                  </div>
                ) : (
                  <span>Enviar link de recuperação</span>
                )}
              </Button>
            </form>
          </>
        )}

        <div className="text-center text-sm text-gray-600">
          <p>
            Lembrou sua senha?{" "}
            <Link href="/login" className="text-[#66e0cc] font-semibold hover:underline">
              Voltar para o login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
