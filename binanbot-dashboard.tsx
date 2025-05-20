// binanbot-dashboard.tsx
"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import {
  Bell,
  LogOut,
  User,
  Wallet,
  Menu,
  Home,
  DollarSign,
  TrendingUp,
  Users,
  Gift,
  Headset,
  Settings,
  BarChart2,
  X,
  Briefcase,
  Share2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"
import ApertumDashboard from "./components/apertum-dashboard"
import WalletOverview from "./components/wallet-overview"
import ParticlesBackground from "./components/particles-background"
import LanguageSelector from "./components/language-selector"
import { useRouter } from "next/navigation"
import { logout } from "@/lib/auth"
import { useAuth } from '@/app/providers/AuthProvider'

// Define TypeScript interfaces for our components
interface SidebarItemProps {
  icon: React.ReactNode
  label: string
  active?: boolean
  href?: string
}

interface NotificationItemProps {
  title: string
  message: string
  time: string
  isNew?: boolean
}

export default function BinanbotDashboard() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [isClient, setIsClient] = useState(false)

  // Verificar se estamos no cliente
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    if (!isClient) return

    const handleClickOutside = (event: MouseEvent) => {
      if (!event) return
      const target = event.target as HTMLElement | null
      if (!target) return

      // Check if target exists and if click is outside the sidebar and backdrop
      if (menuOpen && !target.closest(".sidebar") && !target.closest(".sidebar-trigger")) {
        setMenuOpen(false)
      }
    }

    // Add event listener when sidebar is open
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    // Clean up
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [menuOpen, isClient])

  // Close sidebar on window resize (if screen becomes larger)
  useEffect(() => {
    if (!isClient) return

    const handleResize = () => {
      if (typeof window !== "undefined" && window.innerWidth > 1024 && menuOpen) {
        setMenuOpen(false)
      }
    }

    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize)
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize)
      }
    }
  }, [menuOpen, isClient])

  // Toggle menu safely
  const toggleMenu = useCallback(() => {
    setMenuOpen((prev) => !prev)
  }, [])

  // Toggle notifications safely
  const toggleNotifications = useCallback(() => {
    setShowNotifications((prev) => !prev)
  }, [])

  // Função para lidar com o logout
  const router = useRouter()
  const { setUser } = useAuth()
  const handleLogout = useCallback(async () => {
  try {
    await logout()
    setUser(null)
  } catch (err) {
    console.error("Logout falhou", err)
  } finally {
    router.push("/login")     // manda pro login mesmo se der erro
  }
}, [router, setUser])

  // Se não estiver no cliente, retorne um placeholder
  if (!isClient) {
    return <div className="flex items-center justify-center min-h-screen bg-black text-white">Carregando...</div>
  }

  return (
    <div className="flex min-h-screen bg-black text-white w-full overflow-x-hidden relative">
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

      {/* Backdrop overlay when sidebar is open */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <div
        className={`sidebar fixed top-0 left-0 h-full w-[280px] bg-black text-white shadow-xl transform ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-50 flex flex-col border-r border-[#66e0cc]`}
      >
        <div className="flex flex-col items-center justify-center p-6 border-b border-[#66e0cc]">
          <div className="h-16 w-16 relative mb-2">
            <img
              src="/images/hoo-logo.png"
              alt="HOOMOON Logo"
              className="h-full w-full object-contain"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.onerror = null
                target.src =
                  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32' fill='none'%3E%3Ccircle cx='16' cy='16' r='16' fill='%2300BFA5'/%3E%3C/svg%3E"
              }}
            />
          </div>
          <h2 className="text-lg font-bold text-white">HOOMOON</h2>
        </div>

        <div className="p-4 border-b border-[#66e0cc]/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
              JD
            </div>
            <div>
              <p className="font-medium text-white">João Dias</p>
              <p className="text-xs text-gray-400">ID: 87654321</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <SidebarItem icon={<Home size={18} />} label="Início" active />
          <SidebarItem icon={<DollarSign size={18} />} label="Fazer Depósito" href="/deposito" />
          <SidebarItem icon={<TrendingUp size={18} />} label="Investir" href="/investir" />
          <SidebarItem icon={<Briefcase size={18} />} label="Meus Investimentos" href="/meus-investimentos" />
          <SidebarItem icon={<Users size={18} />} label="Minha Rede" href="/minha-rede" />
          <SidebarItem icon={<Users size={18} />} label="Programa de Afiliados" href="/afiliados" />
          <SidebarItem icon={<Gift size={18} />} label="Meus Ganhos" href="/meus-ganhos" />
          <SidebarItem icon={<Wallet size={18} />} label="Saque" href="/saque" />
          <SidebarItem icon={<Headset size={18} />} label="Suporte" href="/suporte" />
          <SidebarItem icon={<Settings size={18} />} label="Configuração" href="/configuracao" />
          <SidebarItem icon={<Share2 size={18} />} label="Material de Marketing" href="/material-de-marketing" />
          <SidebarItem icon={<BarChart2 size={18} />} label="Opções Binárias" />
          <SidebarItem icon={<User size={18} />} label="Perfil" href="/perfil" />
        </nav>

        <div className="p-4 border-t border-[#66e0cc]/50 mt-auto">
          <Button variant="destructive" className="w-full justify-start" size="sm" onClick={handleLogout}>
            <LogOut size={16} className="mr-2" /> Sair
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col w-full relative z-10">
        {/* Header */}
        <header className="sticky top-0 z-30 flex justify-between items-center px-4 py-3 bg-transparent border-b border-[#66e0cc] shadow-none w-full">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-white sidebar-trigger"
              onClick={toggleMenu}
              aria-label="Menu"
            >
              <Menu size={24} />
            </Button>
            <div className="h-[45px] w-auto relative mb-2">
              <img
                src="/images/hoo-logo.png"
                alt="HOOMOON Logo"
                className="h-full w-auto object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.onerror = null
                  target.src =
                    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32' fill='none'%3E%3Ccircle cx='16' cy='16' r='16' fill='%2300BFA5'/%3E%3C/svg%3E"
                }}
              />
            </div>
            {/* REMOVED NAVIGATION */}
          </div>

          <div className="flex items-center gap-3 text-white">
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={toggleNotifications}
                aria-label="Notificações"
              >
                <Bell size={18} />
                <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center bg-[#66e0cc] text-[10px] text-black">
                  3
                </Badge>
              </Button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 max-w-[90vw] bg-transparent border border-[#66e0cc] rounded-md shadow-none p-2 z-50">
                  <div className="flex justify-between items-center mb-2 p-2">
                    <h3 className="font-medium text-white">Notificações</h3>
                    <Button variant="ghost" size="sm" onClick={() => setShowNotifications(false)}>
                      <X size={14} />
                    </Button>
                  </div>
                  <div className="max-h-[300px] overflow-y-auto">
                    <NotificationItem
                      title="Depósito confirmado"
                      message="Seu depósito de 500 USDT foi confirmado"
                      time="Agora mesmo"
                      isNew
                    />
                    <NotificationItem
                      title="Novo airdrop disponível"
                      message="BNBC-A airdrop está disponível para reivindicar"
                      time="2 horas atrás"
                      isNew
                    />
                    <NotificationItem
                      title="Alerta de preço"
                      message="BTC atingiu seu preço alvo de $70,000"
                      time="5 horas atrás"
                      isNew
                    />
                  </div>
                  <Button variant="ghost" size="sm" className="w-full mt-2 text-xs text-[#66e0cc]">
                    Ver todas as notificações
                  </Button>
                </div>
              )}
            </div>

            <Link href="/deposito">
              <Button className="bg-[#66e0cc] hover:bg-[#50c4b0] px-3 py-1 h-8 text-sm font-semibold text-black">
                Depósito
              </Button>
            </Link>

            {/* REMOVED MONETARY VALUE */}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Perfil">
                  <User size={18} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-transparent border border-[#66e0cc] text-white">
                <Link href="/perfil" passHref>
                  <DropdownMenuItem className="hover:bg-[#66e0cc]/10 text-white cursor-pointer">
                    <User size={16} className="mr-2" /> Perfil
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem className="text-red-500 hover:bg-[#66e0cc]/10" onClick={handleLogout}>
                  <LogOut size={16} className="mr-2" /> Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* REMOVED MOON BUTTON */}

            {/* Novo seletor de idiomas posicionado antes do botão de sair */}
            <div className="hidden md:flex">
              <LanguageSelector />
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="text-red-500 hidden md:flex"
              aria-label="Sair"
              onClick={handleLogout}
            >
              <LogOut size={18} />
            </Button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 w-full max-w-full overflow-x-hidden">
          {/* Visão Geral da Carteira - Novo Componente */}
          <div className="px-4 py-6 w-full">
            <WalletOverview />
          </div>

          {/* Espaço onde estava a seção "Carteira Spot" - agora com o ApertumDashboard */}
          <div className="px-4 pb-6 w-full">
            <ApertumDashboard />
          </div>
        </main>
      </div>
    </div>
  )
}

// Sidebar Item Component
function SidebarItem({ icon, label, active = false, href = "#" }: SidebarItemProps) {
  if (!label) {
    return null // Return null if label is missing
  }

  return (
    <Link
      href={href || "#"}
      className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
        active ? "bg-[#66e0cc]/20 text-[#66e0cc] font-medium" : "text-white hover:bg-[#66e0cc]/10 hover:text-[#66e0cc]"
      }`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  )
}

// Notification Item Component
function NotificationItem({ title, message, time, isNew = false }: NotificationItemProps) {
  if (!title || !message || !time) {
    return null // Return null if any required props are missing
  }

  return (
    <div className={`p-3 border-b border-[#66e0cc]/30 ${isNew ? "bg-[#66e0cc]/10" : ""}`}>
      <div className="flex justify-between">
        <h4 className="font-medium text-sm text-white">{title}</h4>
        {isNew && <Badge className="bg-[#66e0cc] text-[10px] text-black">Novo</Badge>}
      </div>
      <p className="text-xs text-gray-400 mt-1">{message}</p>
      <div className="text-[10px] text-gray-500 mt-2">{time}</div>
    </div>
  )
}
