// app/cadastro/page.tsx
"use client"

import type React from "react"
import { useCallback } from "react"

import { useState, useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useSearchParams } from "next/navigation"
import { Eye, EyeOff, Check, AlertCircle, ChevronDown, ChevronUp, Search, X } from "lucide-react"
import Link from "next/link"
import ParticlesBackground from "@/components/particles-background"
import { useRouter } from 'next/navigation'
import { register } from '@/lib/auth'
import axios, { AxiosError } from "axios"
import { toast } from 'react-hot-toast'

export default function Cadastro() {
  // Estados para os campos do formulário
  const router = useRouter()
  const [username, setUsername] = useState("")
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
  const [sponsorName, setSponsorName] = useState<string | null>(null)
  const [sponsorChecked, setSponsorChecked] = useState(false)
  const base = process.env.NEXT_PUBLIC_API_URL || "https://www.api.hoomoon.ai"

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

  const [emailChecking, setEmailChecking] = useState(false)
  const [emailExists, setEmailExists] = useState(false)
  const [cpfChecking, setCpfChecking] = useState(false)
  const [cpfExists, setCpfExists] = useState(false)

  // Função para verificar e-mail no backend
  const checkEmailExists = useCallback(async (emailToCheck: string) => {
    if (!emailToCheck || !/\S+@\S+\.\S+/.test(emailToCheck)) return
    
    setEmailChecking(true)
    try {
      const response = await fetch(`${base}/api/check-email/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailToCheck })
      })
      const data = await response.json()
      setEmailExists(data.exists)
      if (data.exists) {
        setErrors(prev => ({ ...prev, email: 'Este e-mail já está cadastrado' }))
      } else {
        setErrors(prev => {
          const newErrors = { ...prev }
          delete newErrors.email
          return newErrors
        })
      }
    } catch (error) {
      console.error('Erro ao verificar e-mail:', error)
    } finally {
      setEmailChecking(false)
    }
  }, [base])

  // Função para verificar CPF no backend
  const checkCpfExists = useCallback(async (cpfToCheck: string) => {
    const cpfNumbers = cpfToCheck.replace(/\D/g, '')
    if (!cpfNumbers || cpfNumbers.length !== 11) return
    
    setCpfChecking(true)
    try {
      const response = await fetch(`${base}/api/check-cpf/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cpf: cpfNumbers })
      })
      const data = await response.json()
      setCpfExists(data.exists)
      if (data.exists) {
        setErrors(prev => ({ ...prev, cpf: 'Este CPF já está cadastrado' }))
      } else {
        setErrors(prev => {
          const newErrors = { ...prev }
          delete newErrors.cpf
          return newErrors
        })
      }
    } catch (error) {
      console.error('Erro ao verificar CPF:', error)
    } finally {
      setCpfChecking(false)
    }
  }, [base])

  // useEffect para verificar e-mail com debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      if (email.trim() && email.includes('@')) {
        checkEmailExists(email)
      } else if (!email.trim()) {
         setErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors.email;
            return newErrors;
        });
        setEmailExists(false);
      }
    }, 500) 
  
    return () => clearTimeout(timer)
  }, [email, checkEmailExists])

  // useEffect para verificar CPF com debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      if (cpf && cpf.replace(/\D/g, '').length === 11) {
        checkCpfExists(cpf)
      }
    }, 500) // 500ms de debounce

    return () => clearTimeout(timer)
  }, [cpf, checkCpfExists])

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

  function capitalizeName(name: string): string {
    return name
      .split(' ')
      .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join(' ');
  }

  const [usernameChecking, setUsernameChecking] = useState(false)
  const [usernameExists, setUsernameExists] = useState(false)

const checkUsernameExists = useCallback(async (usernameToCheck: string) => {
  if (!usernameToCheck || usernameToCheck.length < 3) {
    setErrors(prev => ({ ...prev, username: 'Nome de usuário deve ter pelo menos 3 caracteres.' }));
    setUsernameExists(false);
    return;
  }
  if (!/^[a-z0-9_.]+$/.test(usernameToCheck)) {
    setErrors(prev => ({ ...prev, username: "Apenas letras minúsculas, números, '_' e '.'" }));
    setUsernameExists(false);
    return;
  }
  setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors.username;
      return newErrors;
  });

  setUsernameChecking(true);
  try {
    const response = await fetch(`${base}/api/check-username/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: usernameToCheck })
    });
    const data = await response.json();
    setUsernameExists(data.exists);
    if (data.exists) {
      setErrors(prev => ({ ...prev, username: 'Este nome de usuário já está em uso' }));
    }
  } catch (error) {
    console.error('Erro ao verificar nome de usuário:', error);
    toast.error("Erro ao verificar nome de usuário. Tente novamente.");
  } finally {
    setUsernameChecking(false);
  }
}, [base]);

useEffect(() => {
  const timer = setTimeout(() => {
    if (username.trim()) {
      checkUsernameExists(username);
    } else {
      setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors.username;
          return newErrors;
      });
      setUsernameExists(false);
    }
  }, 700);

  return () => clearTimeout(timer);
}, [username, checkUsernameExists]);

  // Obter parâmetros da URL de forma segura
  const searchParams = useSearchParams()

  // Verificar se é um número brasileiro
  const isBrasil = telefone.startsWith("+55") || pais === "Brasil"

  // Obter código de referência da URL
  useEffect(() => {
    if (mounted && searchParams) {
      const indicacao = searchParams.get("ref") || ""
      setRef(indicacao)

      if (indicacao) {
        fetch(`${base}/api/sponsor/${indicacao}/`)
          .then(res => {
            if (!res.ok) throw new Error()
            return res.json()
          })
          .then(data => setSponsorName(capitalizeName(data.name)))
          .catch(() => setSponsorName(null))
          .finally(() => setSponsorChecked(true))
      }
    }
  }, [searchParams, mounted])

  // Verifica manualmente o código de indicação à medida que o usuário digita
  useEffect(() => {
    if (!mounted) return
    // não re-executa se veio da URL
    if (searchParams.get("ref")) return
    const pattern = /^HOO-[A-Za-z0-9]{8}$/
    if (pattern.test(ref)) {
      setSponsorChecked(false)
      fetch(`${base}/api/sponsor/${ref}/`)
        .then(res => {
          if (!res.ok) throw new Error()
          return res.json()
        })
        .then(data => setSponsorName(capitalizeName(data.name)))
        .catch(() => setSponsorName(null))
        .finally(() => setSponsorChecked(true))
    } else if (ref.length === 12) {
      // formato completo mas inválido
      setSponsorName(null)
      setSponsorChecked(true)
    } else {
      // input incompleto
      setSponsorChecked(false)
    }
  }, [ref, mounted])

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

    if (!username.trim()) {
      novosErros.username = "Nome de usuário é obrigatório";
    } else if (username.trim().length < 3) {
      novosErros.username = "Nome de usuário deve ter pelo menos 3 caracteres.";
    } else if (!/^[a-z0-9_.]+$/.test(username.trim())) {
      novosErros.username = "Nome de usuário pode conter apenas letras minúsculas, números, '_' e '.'";
    } else if (usernameExists) {
      novosErros.username = "Este nome de usuário já está em uso";
    }

    if (email.trim() && !/\S+@\S+\.\S+/.test(email)) {
      novosErros.email = "E-mail inválido";
    } else if (email.trim() && emailExists) {
        novosErros.email = "Este e-mail já está cadastrado";
    }

    if (!telefone.trim()) novosErros.telefone = "Telefone é obrigatório"

    if (!pais) novosErros.pais = "Selecione um país"

    if (isBrasil && !cpf.trim()) novosErros.cpf = "CPF é obrigatório para números brasileiros"
    else if (isBrasil && cpf.trim() && cpf.replace(/\D/g, "").length !== 11) novosErros.cpf = "CPF deve ter 11 dígitos"
    else if (isBrasil && cpfExists) novosErros.cpf = "Este CPF já está cadastrado"

    if (!senha) novosErros.senha = "Senha é obrigatória"
    else if (senha.length < 8) novosErros.senha = "A senha deve ter pelo menos 8 caracteres"

    if (senha !== confirmarSenha) novosErros.confirmarSenha = "As senhas não coincidem"

    // Validar sponsor code se preenchido
    if (ref && sponsorChecked && !sponsorName) {
      novosErros.sponsor_code = "Código de indicação inválido"
    }

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
  e.preventDefault()
  setErrors({})
  if (!validarFormulario()) return

  if (username.trim() && !usernameChecking) await checkUsernameExists(username);
  if (email.trim() && !emailChecking) await checkEmailExists(email);
  if (isBrasil && cpf.trim() && !cpfChecking) await checkCpfExists(cpf);
  await new Promise(resolve => setTimeout(resolve, 300));

  setIsSubmitting(true)
  try {
    await register({
      username: username.trim(),
      name: nome.trim(),
      email: email.trim() ? email.trim() : undefined,
      phone: telefone,
      country: pais,
      cpf: isBrasil ? cpf.replace(/\D/g, '') : undefined,
      password: senha,
      sponsor_code: ref.trim() ? ref.trim() : undefined,
    })
    // on success, backend sets HTTP-Only cookies
    toast.success('Cadastro realizado com sucesso!')
    router.push('/dashboard')
  } catch (err: any) {
    let parsedErrors: Record<string, string[]> | null = null
    if ((err as AxiosError).isAxiosError) {
      const axiosError = err as AxiosError
      parsedErrors = axiosError.response?.data as Record<string,string[]> || null
      
      // Tratamento específico para erro de sponsor_code
      if (axiosError.response?.status === 400 && parsedErrors?.sponsor_code) {
        toast.error('Código de indicação inválido. Verifique e tente novamente ou deixe em branco.')
        setErrors({ sponsor_code: 'Código de indicação inválido' })
        
        // Foca no campo de sponsor code para facilitar correção
        const sponsorInput = document.querySelector('input[placeholder*="Código de Indicação"]') as HTMLInputElement
        if (sponsorInput) {
          sponsorInput.focus()
          sponsorInput.select()
        }
        
        setIsSubmitting(false)
        return
      }
    } else {
      try {
        const msgData = JSON.parse(err.message)
        if (msgData && typeof msgData === 'object') parsedErrors = msgData
      } catch {}
    }

    if (parsedErrors) {
      const fieldErrors: Record<string,string> = {}
      Object.entries(parsedErrors).forEach(([field, msgs]) => {
        const text = Array.isArray(msgs) ? msgs.join(' ') : String(msgs)
        
        // Mensagens de erro customizadas
        if (field === 'email' && text.includes('already exists')) {
          fieldErrors[field] = 'Já existe um usuário com este e-mail.'
          toast.error('Este e-mail já está cadastrado.')
        } else if (field === 'cpf' && text.includes('já está em uso')) {
          fieldErrors[field] = 'Este CPF já está cadastrado.'
          toast.error('Este CPF já está cadastrado.')
        } else if (field === 'sponsor_code') {
          fieldErrors[field] = 'Código de indicação inválido'
          toast.error('Código de indicação inválido. Verifique e tente novamente.')
        } else {
          fieldErrors[field] = text
        }
      })
      setErrors(fieldErrors)
    } else {
      toast.error('Erro inesperado. Tente novamente.')
      setErrors({ form: err.message || 'Erro inesperado. Tente novamente.' })
    }
  } finally {
    setIsSubmitting(false)
  }
}

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e && e.target) {
      const rawUsername = e.target.value.toLowerCase().replace(/[^a-z0-9_.]/g, '');
      setUsername(rawUsername);
      setUsernameExists(false);
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.username;
        return newErrors;
      });
    }
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e && e.target) {
      setEmail(e.target.value);
      setEmailExists(false);
      setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors.email;
          return newErrors;
      });
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
        {ref && sponsorChecked && (
          <div className="text-center text-sm text-gray-600 font-medium bg-gray-50 py-2 px-3 rounded-md border border-gray-200">
            {sponsorName
              ? <>Você está sendo indicado por: <strong>{sponsorName}</strong></>
              : <>Indicação não identificada</>
            }
          </div>
        )}

        <div className="flex justify-center">
          <img
            src="/images/hoo-logo.png"
            alt="Hoomoon Logo"
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

        {/* {errors.form && (
          <div className="bg-red-50 text-red-700 p-3 rounded-xl border border-red-200">{errors.form}</div>
        )} */}

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

          {/* Nome de Usuário */}
          <div className="space-y-1">
            <div className="relative">
              <Input
                type="text"
                placeholder="Nome de usuário (ex: usuario_123)"
                value={username}
                onChange={handleUsernameChange}
                className={`bg-transparent border text-white pr-10 ${
                  errors.username || usernameExists
                    ? "border-red-400 focus:border-red-400"
                    : username && !usernameChecking && !usernameExists && /^[a-z0-9_.]+$/.test(username) && username.length >=3
                    ? "border-green-400 focus:border-green-400"
                    : "border-[#66e0cc] focus:border-[#66e0cc]"
                }`}
                aria-describedby="username-hint"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                {usernameChecking ? (
                  <div className="w-4 h-4 border-2 border-[#66e0cc] border-t-transparent rounded-full animate-spin" />
                ) : errors.username || usernameExists ? (
                  <AlertCircle className="h-5 w-5 text-red-500" />
                ) : username && !errors.username && /^[a-z0-9_.]+$/.test(username) && username.length >=3 ? (
                  <Check className="h-5 w-5 text-green-500" />
                ) : null}
              </div>
            </div>
            {/* Texto da descrição ajustado para corresponder mais à imagem */}
            <p id="username-hint" className="text-xs text-gray-500 mt-1">Apenas letras minúsculas, números, '_' 'e' '.' (mínimo 3 caracteres).</p>
            
            {usernameExists && (
              <p className="text-xs text-red-500 mt-1 flex items-center">
                <AlertCircle className="h-3 w-3 mr-1" />
                Este nome de usuário já está em uso.
              </p>
            )}
            {errors.username && !usernameExists && (
              <p className="text-xs text-red-500 mt-1">{errors.username}</p>
            )}
          </div>

          {/* E-mail */}
          <div className="space-y-1">
            <div className="relative">
              <Input
                type="email"
                placeholder="E-mail (opcional)"
                value={email}
                onChange={handleEmailChange}
                className={`bg-transparent border text-white pr-10 ${
                  errors.email || (email.trim() && emailExists)
                    ? "border-red-400 focus:border-red-400"
                    : email.trim() && !emailChecking && !emailExists && /\S+@\S+\.\S+/.test(email)
                    ? "border-green-400 focus:border-green-400"
                    : "border-[#66e0cc] focus:border-[#66e0cc]"
                }`}
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                {email.trim() && emailChecking ? (
                  <div className="w-4 h-4 border-2 border-[#66e0cc] border-t-transparent rounded-full animate-spin" />
                ) : errors.email || (email.trim() && emailExists) ? (
                  <AlertCircle className="h-5 w-5 text-red-500" />
                ) : email.trim() && /\S+@\S+\.\S+/.test(email) && !errors.email && !emailExists ? ( // Ícone de sucesso
                  <Check className="h-5 w-5 text-green-500" />
                ) : null}
              </div>
            </div>
            {emailExists && email.trim() && (
              <p className="text-xs text-red-500 mt-1 flex items-center">
                <AlertCircle className="h-3 w-3 mr-1" />
                Este e-mail já está cadastrado.
                <Link href="/login" className="ml-1 text-[#66e0cc] hover:underline">
                  Fazer login?
                </Link>
              </p>
            )}
            {errors.email && !(email.trim() && emailExists) && (
              <p className="text-xs text-red-500 mt-1">{errors.email}</p>
            )}
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

          {/* Campo de CPF melhorado (dentro do bloco condicional isBrasil) */}
          {isBrasil && (
            <div className="space-y-1 animate-in fade-in slide-in-from-top duration-300">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="CPF"
                  value={cpf}
                  onChange={(e) => {
                    if (e && e.target) {
                      setCpf(formatarCPF(e.target.value))
                      setCpfExists(false)
                    }
                  }}
                  className={`bg-transparent border text-white pr-10 ${
                    errors.cpf || cpfExists
                      ? "border-red-400 focus:border-red-400" 
                      : cpf && !cpfChecking && !cpfExists && cpf.replace(/\D/g, '').length === 11
                      ? "border-green-400 focus:border-green-400"
                      : "border-[#66e0cc] focus:border-[#66e0cc]"
                  }`}
                />
                {/* Ícone de status */}
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  {cpfChecking ? (
                    <div className="w-4 h-4 border-2 border-[#66e0cc] border-t-transparent rounded-full animate-spin" />
                  ) : errors.cpf || cpfExists ? (
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  ) : cpf && cpf.replace(/\D/g, '').length === 11 ? (
                    <Check className="h-5 w-5 text-green-500" />
                  ) : null}
                </div>
              </div>
              {/* Mensagens de erro e feedback */}
              {cpfExists && (
                <p className="text-xs text-red-500 mt-1 flex items-center">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  Este CPF já está cadastrado. 
                  <Link href="/login" className="ml-1 text-[#66e0cc] hover:underline">
                    Fazer login?
                  </Link>
                </p>
              )}
              {errors.cpf && !cpfExists && (
                <p className="text-xs text-red-500 mt-1">{errors.cpf}</p>
              )}
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

          {/* Código de Indicação */}
          <div className="space-y-1">
            <div className="relative">
              <Input
                type="text"
                placeholder="Código de Indicação (opcional)"
                value={ref}
                onChange={e => {
                  const v = e.target.value.toUpperCase()
                  setRef(v)
                  setSponsorChecked(false)
                  // Limpa erro ao digitar
                  if (errors.sponsor_code) {
                    setErrors(prev => ({ ...prev, sponsor_code: '' }))
                  }
                }}
                disabled={!!searchParams.get("ref")}
                className={`bg-transparent border text-white pr-10 ${
                  errors.sponsor_code 
                    ? "border-red-400 focus:border-red-400" 
                    : sponsorChecked && ref && sponsorName
                      ? "border-green-400"
                      : "border-[#66e0cc] focus:border-[#66e0cc]"
                }`}
              />
              {/* Ícone de status */}
              {ref && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  {!sponsorChecked ? (
                    <div className="w-4 h-4 border-2 border-[#66e0cc] border-t-transparent rounded-full animate-spin" />
                  ) : sponsorName ? (
                    <Check className="h-5 w-5 text-green-500" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  )}
                </div>
              )}
            </div>
            
            {/* Mensagem de erro */}
            {errors.sponsor_code && (
              <p className="text-xs text-red-500 mt-1">
                {errors.sponsor_code}
              </p>
            )}
            
            {/* Mensagem informativa */}
            {ref && sponsorChecked && !sponsorName && !errors.sponsor_code && (
              <p className="text-xs text-amber-500 mt-1">
                Código não encontrado. Você pode deixar em branco ou verificar o código.
              </p>
            )}
            
            {/* Mostrar nome do patrocinador se válido */}
            {sponsorName && (
              <p className="text-xs text-green-500 mt-1">
                Indicado por: {sponsorName}
              </p>
            )}
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
