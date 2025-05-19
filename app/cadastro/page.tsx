"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useSearchParams } from "next/navigation"
import { Eye, EyeOff, Check, AlertCircle, ChevronDown, ChevronUp, Search, X } from "lucide-react"
import Link from "next/link"
import ParticlesBackground from "@/components/particles-background"

export default function Cadastro() {
  // Estados para os campos do formulário
  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [telefone, setTelefone] = useState("")
  const [cpf, setCpf] = useState("")
  const [pais, setPais] = useState("")
  const [senha, setSenha] = useState("")
  const [confirmarSenha, setConfirmarSenha] = useState("")
  const [ref, setRef] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [mounted, setMounted] = useState(false)

  // Estados para o dropdown de países
  const [showDropdown, setShowDropdown] = useState(false)
  const [filtroPais, setFiltroPais] = useState("")
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Lista de países com códigos e bandeiras
  const paises = [
    { nome: "Brasil", codigo: "+55", bandeira: "🇧🇷" },
    { nome: "Portugal", codigo: "+351", bandeira: "🇵🇹" },
    { nome: "Estados Unidos", codigo: "+1", bandeira: "🇺🇸" },
    { nome: "Angola", codigo: "+244", bandeira: "🇦🇴" },
    { nome: "Moçambique", codigo: "+258", bandeira: "🇲🇿" },
    { nome: "Canadá", codigo: "+1", bandeira: "🇨🇦" },
    { nome: "Espanha", codigo: "+34", bandeira: "🇪🇸" },
    { nome: "França", codigo: "+33", bandeira: "🇫🇷" },
    { nome: "Itália", codigo: "+39", bandeira: "🇮🇹" },
    { nome: "Reino Unido", codigo: "+44", bandeira: "🇬🇧" },
    { nome: "Alemanha", codigo: "+49", bandeira: "🇩🇪" },
    { nome: "Japão", codigo: "+81", bandeira: "🇯🇵" },
    { nome: "Austrália", codigo: "+61", bandeira: "🇦🇺" },
    { nome: "Outro", codigo: "", bandeira: "🌍" },
  ]

  const paisSelecionado = paises.find((p) => p.nome === pais)

  // Verificar se o componente está montado
  useEffect(() => {
    setMounted(true)
  }, [])

  // Fechar dropdown quando clicar fora
  useEffect(() => {
    if (!mounted) return

    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [mounted])

  // Obter parâmetros da URL de forma segura
  const searchParams = useSearchParams()

  // Verificar se é um número brasileiro
  const isBrasil = telefone.startsWith("+55") || pais === "Brasil"

  // Obter código de referência da URL
  useEffect(() => {
    if (mounted && searchParams) {
      try {
        const indicacao = searchParams.get("ref") || ""
        setRef(indicacao)
      } catch (error) {
        console.error("Erro ao obter parâmetros da URL:", error)
      }
    }
  }, [searchParams, mounted])

  // Função para selecionar país
  const handleSelectPais = (paisSelecionado: { nome: string; codigo: string; bandeira: string }) => {
    if (!paisSelecionado) return

    setPais(paisSelecionado.nome)

    // Se o telefone estiver vazio ou só tiver o código de outro país, substitui pelo novo código
    if (!telefone || telefone.match(/^\+\d+$/)) {
      setTelefone(paisSelecionado.codigo)
    } else if (paisSelecionado.codigo && !telefone.startsWith(paisSelecionado.codigo)) {
      // Se já tem um número, mas com outro código, substitui o código mantendo o número
      const numeroSemCodigo = telefone.replace(/^\+\d+\s*/, "")
      setTelefone(`${paisSelecionado.codigo} ${numeroSemCodigo}`)
    }

    setShowDropdown(false)
    setFiltroPais("")
  }

  // Filtrar países com base na busca
  const paisesFiltrados = paises.filter((p) => p.nome.toLowerCase().includes(filtroPais.toLowerCase()))

  // Função para formatar telefone
  const formatarTelefone = (valor: string) => {
    if (!valor) return ""

    // Remove caracteres não numéricos, exceto o + no início
    const numeros = valor.replace(/[^\d+]/g, "")

    // Se não começar com +, adiciona o código do país selecionado
    if (!numeros.startsWith("+")) {
      const paisSelecionado = paises.find((p) => p.nome === pais)
      if (paisSelecionado && paisSelecionado.codigo) {
        return formatarTelefone(`${paisSelecionado.codigo}${numeros}`)
      }
      return numeros
    }

    // Formato brasileiro: +55 (11) 98765-4321
    if (numeros.startsWith("+55")) {
      const match = numeros.match(/^\+55(\d{0,2})(\d{0,5})(\d{0,4})$/)
      if (!match) return numeros

      const [, ddd, parte1, parte2] = match

      if (!ddd) return "+55"
      if (!parte1) return `+55 (${ddd})`
      if (!parte2) return `+55 (${ddd}) ${parte1}`
      return `+55 (${ddd}) ${parte1}-${parte2}`
    }

    // Outros países: mantém o formato simples
    return numeros
  }

  // Função para formatar CPF: 123.456.789-00
  const formatarCPF = (valor: string) => {
    if (!valor) return ""

    const numeros = valor.replace(/\D/g, "")

    if (numeros.length <= 3) return numeros
    if (numeros.length <= 6) return `${numeros.slice(0, 3)}.${numeros.slice(3)}`
    if (numeros.length <= 9) return `${numeros.slice(0, 3)}.${numeros.slice(3, 6)}.${numeros.slice(6)}`
    return `${numeros.slice(0, 3)}.${numeros.slice(3, 6)}.${numeros.slice(6, 9)}-${numeros.slice(9, 11)}`
  }

  // Função para validar o formulário
  const validarFormulario = () => {
    const novosErros: Record<string, string> = {}

    if (!nome.trim()) novosErros.nome = "Nome é obrigatório"

    if (!email.trim()) novosErros.email = "E-mail é obrigatório"
    else if (!/\S+@\S+\.\S+/.test(email)) novosErros.email = "E-mail inválido"

    if (!telefone.trim()) novosErros.telefone = "Telefone é obrigatório"

    if (!pais) novosErros.pais = "Selecione um país"

    if (isBrasil && !cpf.trim()) novosErros.cpf = "CPF é obrigatório para números brasileiros"
    else if (isBrasil && cpf.trim() && cpf.replace(/\D/g, "").length !== 11) novosErros.cpf = "CPF deve ter 11 dígitos"

    if (!senha) novosErros.senha = "Senha é obrigatória"
    else if (senha.length < 8) novosErros.senha = "A senha deve ter pelo menos 8 caracteres"

    if (senha !== confirmarSenha) novosErros.confirmarSenha = "As senhas não coincidem"

    setErrors(novosErros)
    return Object.keys(novosErros).length === 0
  }

  // Função para calcular a força da senha
  const calcularForcaSenha = (senha: string) => {
    if (!senha) return 0

    let pontos = 0

    // Comprimento mínimo
    if (senha.length >= 8) pontos += 1

    // Letras maiúsculas e minúsculas
    if (/[A-Z]/.test(senha) && /[a-z]/.test(senha)) pontos += 1

    // Números
    if (/[0-9]/.test(senha)) pontos += 1

    // Caracteres especiais
    if (/[^A-Za-z0-9]/.test(senha)) pontos += 1

    return pontos
  }

  // Calcular força da senha
  const forcaSenha = calcularForcaSenha(senha)

  // Função para lidar com o envio do formulário
  const handleSubmit = async (e: React.FormEvent) => {
    if (e && e.preventDefault) {
      e.preventDefault()
    }

    if (!validarFormulario()) return

    setIsSubmitting(true)

    try {
      // Simulação de envio para API
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Aqui você faria a chamada real para sua API
      console.log({
        nome,
        email,
        telefone,
        pais,
        cpf: isBrasil ? cpf : "",
        senha,
        codigoReferencia: ref,
      })

      // Redirecionar ou mostrar mensagem de sucesso
      alert("Cadastro realizado com sucesso!")
    } catch (error) {
      console.error("Erro ao enviar formulário:", error)
      setErrors({ form: "Ocorreu um erro ao processar seu cadastro. Tente novamente." })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Manipuladores de eventos seguros
  const handleTelefoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e && e.target) {
      setTelefone(formatarTelefone(e.target.value))
    }
  }

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e && e.target) {
      setCpf(formatarCPF(e.target.value))
    }
  }

  const handleFiltroPaisChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e && e.target) {
      setFiltroPais(e.target.value)
    }
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

      <div className="w-full max-w-md space-y-6 bg-black border border-[#66e0cc] p-8 rounded-xl shadow-md animate-in fade-in duration-500 relative z-10">
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
              if (e && e.target) {
                const target = e.target as HTMLImageElement
                if (target) {
                  target.onerror = null
                  target.src =
                    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='60' viewBox='0 0 160 60' fill='none'%3E%3Crect width='160' height='60' rx='8' fill='%2366e0cc'/%3E%3Ctext x='50%' y='50%' fontFamily='Arial' fontSize='16' fill='black' textAnchor='middle' dominantBaseline='middle'%3ELOGO%3C/text%3E%3C/svg%3E"
                }
              }
            }}
          />
        </div>

        <h2 className="text-2xl font-bold text-center">Criar sua conta</h2>

        {errors.form && (
          <div className="bg-red-50 text-red-700 p-3 rounded-xl border border-red-200">{errors.form}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <div className="relative">
              <Input
                type="text"
                placeholder="Nome completo"
                value={nome}
                onChange={(e) => e && e.target && setNome(e.target.value)}
                className={`bg-transparent border border-[#66e0cc] text-white pr-10 ${
                  errors.nome ? "border-red-400 focus:border-red-400" : "focus:border-[#66e0cc]"
                }`}
              />
              {errors.nome ? (
                <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500 h-5 w-5" />
              ) : nome ? (
                <Check className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 h-5 w-5" />
              ) : null}
            </div>
            {errors.nome && <p className="text-xs text-red-500 mt-1">{errors.nome}</p>}
          </div>

          <div className="space-y-1">
            <div className="relative">
              <Input
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => e && e.target && setEmail(e.target.value)}
                className={`bg-transparent border border-[#66e0cc] text-white pr-10 ${
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
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setShowDropdown(!showDropdown)}
                className={`flex items-center justify-between w-full px-4 py-2 rounded-xl border ${
                  errors.pais
                    ? "border-red-400 bg-transparent"
                    : "border-[#66e0cc] bg-transparent hover:bg-[#66e0cc]/10"
                } transition-colors text-white`}
              >
                <div className="flex items-center">
                  <span className="mr-2">{paisSelecionado?.bandeira || "🌍"}</span>
                  <span>{paisSelecionado?.nome || "Selecionar país"}</span>
                </div>
                {showDropdown ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>

              {errors.pais && <p className="text-xs text-red-500 mt-1">{errors.pais}</p>}

              {showDropdown && (
                <div className="absolute z-10 mt-1 w-full bg-black border border-[#66e0cc] rounded-xl shadow-lg max-h-60 overflow-y-auto">
                  <div className="sticky top-0 bg-black p-2 border-b border-[#66e0cc]/30">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#66e0cc] h-4 w-4" />
                      <Input
                        type="text"
                        placeholder="Buscar país"
                        value={filtroPais}
                        onChange={handleFiltroPaisChange}
                        className="pl-9 pr-8 py-1 h-9 bg-transparent border-[#66e0cc]/50 text-white"
                      />
                      {filtroPais && (
                        <button
                          type="button"
                          onClick={() => setFiltroPais("")}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#66e0cc] hover:text-white"
                        >
                          <X size={14} />
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="py-1">
                    {paisesFiltrados.length > 0 ? (
                      paisesFiltrados.map((p) => (
                        <button
                          key={p.nome}
                          type="button"
                          onClick={() => handleSelectPais(p)}
                          className="w-full px-4 py-2 text-left text-white hover:bg-[#66e0cc]/10 flex items-center"
                        >
                          <span className="mr-2">{p.bandeira}</span>
                          <span>{p.nome}</span>
                          {p.codigo && <span className="ml-auto text-[#66e0cc] text-sm">{p.codigo}</span>}
                        </button>
                      ))
                    ) : (
                      <div className="px-4 py-2 text-[#66e0cc]/70 text-center">Nenhum país encontrado</div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-1">
            <div className="relative">
              <Input
                type="tel"
                placeholder="Telefone"
                value={telefone}
                onChange={handleTelefoneChange}
                className={`bg-transparent border border-[#66e0cc] text-white pr-10 ${
                  errors.telefone ? "border-red-400 focus:border-red-400" : "focus:border-[#66e0cc]"
                }`}
              />
              {errors.telefone ? (
                <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500 h-5 w-5" />
              ) : telefone ? (
                <Check className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 h-5 w-5" />
              ) : null}
            </div>
            {errors.telefone && <p className="text-xs text-red-500 mt-1">{errors.telefone}</p>}
          </div>

          {isBrasil && (
            <div className="space-y-1 animate-in fade-in slide-in-from-top duration-300">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="CPF"
                  value={cpf}
                  onChange={handleCpfChange}
                  className={`bg-transparent border border-[#66e0cc] text-white pr-10 ${
                    errors.cpf ? "border-red-400 focus:border-red-400" : "focus:border-[#66e0cc]"
                  }`}
                />
                {errors.cpf ? (
                  <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500 h-5 w-5" />
                ) : cpf ? (
                  <Check className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 h-5 w-5" />
                ) : null}
              </div>
              {errors.cpf && <p className="text-xs text-red-500 mt-1">{errors.cpf}</p>}
            </div>
          )}

          <div className="space-y-1">
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Senha"
                value={senha}
                onChange={(e) => e && e.target && setSenha(e.target.value)}
                className={`bg-transparent border border-[#66e0cc] text-white pr-10 ${
                  errors.senha ? "border-red-400 focus:border-red-400" : "focus:border-[#66e0cc]"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.senha && <p className="text-xs text-red-500 mt-1">{errors.senha}</p>}

            {senha && (
              <div className="mt-2">
                <div className="flex gap-1 mb-1">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className={`h-1 rounded-full flex-1 ${
                        i < forcaSenha
                          ? forcaSenha === 1
                            ? "bg-red-400"
                            : forcaSenha === 2
                              ? "bg-orange-400"
                              : forcaSenha === 3
                                ? "bg-yellow-400"
                                : "bg-green-500"
                          : "bg-gray-200"
                      }`}
                    ></div>
                  ))}
                </div>
                <p className="text-xs text-gray-500">
                  {forcaSenha === 0 && "Senha muito fraca"}
                  {forcaSenha === 1 && "Senha fraca"}
                  {forcaSenha === 2 && "Senha média"}
                  {forcaSenha === 3 && "Senha forte"}
                  {forcaSenha === 4 && "Senha muito forte"}
                </p>
              </div>
            )}
          </div>

          <div className="space-y-1">
            <div className="relative">
              <Input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirmar senha"
                value={confirmarSenha}
                onChange={(e) => e && e.target && setConfirmarSenha(e.target.value)}
                className={`bg-transparent border border-[#66e0cc] text-white pr-10 ${
                  errors.confirmarSenha ? "border-red-400 focus:border-red-400" : "focus:border-[#66e0cc]"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.confirmarSenha && <p className="text-xs text-red-500 mt-1">{errors.confirmarSenha}</p>}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#66e0cc] text-black hover:bg-[#55cbb8] rounded-xl text-lg py-2 h-auto transition-all duration-200 hover:shadow-md"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin mr-2"></div>
                <span>Processando...</span>
              </div>
            ) : (
              <span>Criar conta</span>
            )}
          </Button>
        </form>

        <p className="text-center text-sm text-gray-600">
          Já tem conta?{" "}
          <Link href="/login" className="text-[#66e0cc] font-semibold hover:underline">
            Entrar
          </Link>
        </p>
      </div>
    </div>
  )
}
