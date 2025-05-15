"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import {
  Bell,
  Moon,
  LogOut,
  Globe,
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
  BookOpen,
  BarChart2,
  X,
  Search,
  ArrowUpRight,
  ArrowDownLeft,
  Filter,
  Plus,
  Briefcase,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"

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

// Define cryptocurrency interface
interface Cryptocurrency {
  name: string
  symbol: string
  balance: string
  valueUSD: string
  deposits: string
  withdrawals: string
  active: boolean
}

// Sample cryptocurrency data
const cryptocurrencies: Cryptocurrency[] = [
  {
    name: "Moeda Airdrop Binanbot",
    symbol: "BNBC-A",
    balance: "0,0000",
    valueUSD: "0.00",
    deposits: "0,0000",
    withdrawals: "0,0000",
    active: false,
  },
  {
    name: "Tether",
    symbol: "USDT",
    balance: "111.1309088",
    valueUSD: "111.13",
    deposits: "0,0000",
    withdrawals: "3.117,6600",
    active: true,
  },
  {
    name: "Bitcoin",
    symbol: "BTC",
    balance: "0,00740286",
    valueUSD: "518.20",
    deposits: "0,0000",
    withdrawals: "0,0000",
    active: true,
  },
  {
    name: "Ethereum",
    symbol: "ETH",
    balance: "0,12340000",
    valueUSD: "372.55",
    deposits: "0,2500",
    withdrawals: "0,1266",
    active: true,
  },
  {
    name: "Binance Coin",
    symbol: "BNB",
    balance: "1,50000000",
    valueUSD: "810.00",
    deposits: "1,5000",
    withdrawals: "0,0000",
    active: true,
  },
]

export default function BinanbotDashboard() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [showNotifications, setShowNotifications] = useState(false)
  const [cryptos, setCryptos] = useState<Cryptocurrency[]>(cryptocurrencies || [])
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

  // Safe search handler
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e || !e.target) return
    setSearchQuery(e.target.value)
  }, [])

  // Toggle menu safely
  const toggleMenu = useCallback(() => {
    setMenuOpen((prev) => !prev)
  }, [])

  // Toggle notifications safely
  const toggleNotifications = useCallback(() => {
    setShowNotifications((prev) => !prev)
  }, [])

  // Filter cryptocurrencies based on search query
  const filteredCryptos = cryptos.filter((crypto) => {
    if (!crypto || !crypto.name || !crypto.symbol || !searchQuery) return true
    return (
      crypto.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })

  // Se não estiver no cliente, retorne um placeholder
  if (!isClient) {
    return <div className="flex items-center justify-center min-h-screen bg-black text-white">Carregando...</div>
  }

  return (
    <div className="flex min-h-screen bg-black text-white">
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
        } transition-transform duration-300 ease-in-out z-50 flex flex-col`}
      >
        <div className="flex flex-col items-center justify-center p-6 border-b border-gray-800">
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

        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
              JD
            </div>
            <div>
              <p className="font-medium">João Dias</p>
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
          <SidebarItem icon={<Headset size={18} />} label="Suporte" />
          <SidebarItem icon={<Settings size={18} />} label="Configuração" />
          <SidebarItem icon={<BookOpen size={18} />} label="Material de Marketing" />
          <SidebarItem icon={<BarChart2 size={18} />} label="Opções Binárias" />
        </nav>

        <div className="p-4 border-t border-gray-800 mt-auto">
          <Button variant="destructive" className="w-full justify-start" size="sm">
            <LogOut size={16} className="mr-2" /> Sair
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-30 flex justify-between items-center px-4 py-3 bg-[#111] shadow">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-white sidebar-trigger" onClick={toggleMenu}>
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
            <nav className="hidden lg:flex gap-4 text-sm text-gray-300">
              <a href="#" className="hover:text-white transition-colors font-medium">
                Painel
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Comércio BNBC
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Lançamentos aéreos
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Trocar
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Afiliados
              </a>
            </nav>
          </div>

          <div className="flex items-center gap-3 text-gray-300">
            <div className="relative">
              <Button variant="ghost" size="icon" className="relative" onClick={toggleNotifications}>
                <Bell size={18} />
                <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center bg-[#66e0cc] text-[10px] text-black">
                  3
                </Badge>
              </Button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-[#111] border border-gray-800 rounded-md shadow-lg p-2 z-50">
                  <div className="flex justify-between items-center mb-2 p-2">
                    <h3 className="font-medium">Notificações</h3>
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

            <div className="bg-gray-800 px-3 py-1 rounded text-sm hidden sm:block">$ 1.267,28</div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User size={18} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-[#111] border-gray-800 text-white">
                <DropdownMenuItem className="hover:bg-gray-800">
                  <User size={16} className="mr-2" /> Perfil
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-gray-800">
                  <Wallet size={16} className="mr-2" /> Carteira
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-gray-800">
                  <Globe size={16} className="mr-2" /> Idioma
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-gray-800">
                  <Moon size={16} className="mr-2" /> Tema escuro
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-500 hover:bg-gray-800">
                  <LogOut size={16} className="mr-2" /> Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Moon size={18} />
            </Button>

            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Globe size={18} />
            </Button>

            <Button variant="ghost" size="icon" className="text-red-500 hidden md:flex">
              <LogOut size={18} />
            </Button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1">
          {/* Visão Geral da Carteira */}
          <div className="px-4 py-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Visão geral da carteira</h2>
              <Button variant="outline" size="sm" className="text-gray-300 border-gray-700">
                <Filter size={14} className="mr-2" /> Filtrar
              </Button>
            </div>

            <div className="bg-[#111] p-5 rounded-xl flex flex-col gap-6 md:flex-row md:justify-between">
              <div>
                <div className="text-sm text-gray-400">Saldo total</div>
                <div className="text-2xl font-bold mt-1">≈$ 2.811,88</div>
                <div className="flex items-center text-xs text-[#66e0cc] mt-1">
                  <span className="mr-1">+2.4%</span>
                  <span className="text-gray-500">nas últimas 24h</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 md:flex md:gap-10">
                <div>
                  <div className="text-sm text-gray-400 mb-1">Rendas</div>
                  <div className="flex items-center">
                    <ArrowUpRight size={16} className="text-[#66e0cc] mr-2" />
                    <div className="text-[#66e0cc] font-semibold">$ 0,00</div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">0 transações</div>
                </div>

                <div>
                  <div className="text-sm text-gray-400 mb-1">Retiradas</div>
                  <div className="flex items-center">
                    <ArrowDownLeft size={16} className="text-red-400 mr-2" />
                    <div className="text-red-400 font-semibold">$ 0,00</div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">0 transações</div>
                </div>

                <div className="col-span-2 md:col-span-1">
                  <Link href="/deposito">
                    <Button className="w-full md:w-auto bg-[#66e0cc] hover:bg-[#50c4b0] text-black">
                      <Plus size={16} className="mr-2" /> Novo Depósito
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Carteira Spot */}
          <div className="bg-white text-black rounded-t-3xl p-4 md:p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div>
                <h3 className="font-semibold text-lg">Carteira Spot</h3>
                <p className="text-sm text-gray-500">Gerencie seus ativos digitais</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <div className="relative w-full sm:w-64">
                  <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Buscar por nome ou símbolo"
                    className="pl-9 bg-gray-100 border-gray-200"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                </div>

                <Link href="/deposito">
                  <Button className="bg-[#66e0cc] hover:bg-[#50c4b0] text-black">Novo Depósito</Button>
                </Link>
              </div>
            </div>

            <Tabs defaultValue="all" className="mb-6">
              <TabsList className="bg-gray-100">
                <TabsTrigger value="all">Todos</TabsTrigger>
                <TabsTrigger value="favorites">Favoritos</TabsTrigger>
                <TabsTrigger value="stablecoins">Stablecoins</TabsTrigger>
                <TabsTrigger value="tokens">Tokens</TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Mobile View */}
            <div className="md:hidden space-y-4">
              {filteredCryptos && filteredCryptos.length > 0 ? (
                filteredCryptos.map((crypto, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="font-medium">{crypto?.name || "Nome desconhecido"}</div>
                        <div className="text-xs text-gray-500">{crypto?.symbol || "???"}</div>
                      </div>
                      <Badge
                        variant={crypto?.active ? "default" : "secondary"}
                        className={crypto?.active ? "bg-[#66e0cc] text-black" : "bg-gray-200 text-gray-600"}
                      >
                        {crypto?.active ? "Ativo" : "Inativo"}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                      <div>
                        <div className="text-gray-500">Saldo</div>
                        <div className="font-medium">{crypto?.balance || "0"}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">Valor (USD)</div>
                        <div className="font-medium">${crypto?.valueUSD || "0.00"}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">Depósitos</div>
                        <div className="text-[#66e0cc]">
                          {crypto?.deposits || "0"} {crypto?.symbol || ""}
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-500">Retiradas</div>
                        <div className="text-red-600">
                          {crypto?.withdrawals || "0"} {crypto?.symbol || ""}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Link href="/deposito" className="flex-1">
                        <Button
                          size="sm"
                          className={`w-full ${
                            crypto?.active ? "bg-[#66e0cc] hover:bg-[#50c4b0] text-black" : "bg-gray-200 text-gray-500"
                          }`}
                          disabled={!crypto?.active}
                        >
                          Depósito
                        </Button>
                      </Link>
                      <Button
                        size="sm"
                        className={`flex-1 ${
                          crypto?.active ? "bg-yellow-500 hover:bg-yellow-600" : "bg-gray-200 text-gray-500"
                        }`}
                        disabled={!crypto?.active}
                      >
                        Retirar
                      </Button>
                      <Button size="sm" className="flex-1 bg-blue-500 hover:bg-blue-600">
                        História
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-10 text-gray-500">
                  <div className="mb-2">Nenhum resultado encontrado</div>
                  <div className="text-sm">Tente uma pesquisa diferente</div>
                </div>
              )}
            </div>

            {/* Desktop View */}
            <div className="overflow-x-auto hidden md:block">
              {filteredCryptos && filteredCryptos.length > 0 ? (
                <table className="w-full text-sm">
                  <thead className="text-left text-gray-500 border-b">
                    <tr>
                      <th className="py-3 pl-4">Nome</th>
                      <th className="py-3">Símbolo</th>
                      <th className="py-3">Saldo</th>
                      <th className="py-3">Valor (USD)</th>
                      <th className="py-3">Depósitos</th>
                      <th className="py-3">Retiradas</th>
                      <th className="py-3">Status</th>
                      <th className="py-3 pr-4">Ação</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    {filteredCryptos.map((crypto, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="py-4 pl-4">{crypto?.name || "Nome desconhecido"}</td>
                        <td className="py-4">{crypto?.symbol || "???"}</td>
                        <td className="py-4">{crypto?.balance || "0"}</td>
                        <td className="py-4">${crypto?.valueUSD || "0.00"}</td>
                        <td className="py-4 text-[#66e0cc]">
                          {crypto?.deposits || "0"} {crypto?.symbol || ""}
                        </td>
                        <td className="py-4 text-red-600">
                          {crypto?.withdrawals || "0"} {crypto?.symbol || ""}
                        </td>
                        <td className="py-4">
                          <Badge
                            variant={crypto?.active ? "default" : "secondary"}
                            className={crypto?.active ? "bg-[#66e0cc] text-black" : "bg-gray-200 text-gray-600"}
                          >
                            {crypto?.active ? "Ativo" : "Inativo"}
                          </Badge>
                        </td>
                        <td className="py-4 pr-4 space-x-2">
                          <Link href="/deposito">
                            <Button
                              size="sm"
                              className={
                                crypto?.active
                                  ? "bg-[#66e0cc] hover:bg-[#50c4b0] text-black"
                                  : "bg-gray-200 text-gray-500"
                              }
                              disabled={!crypto?.active}
                            >
                              Depósito
                            </Button>
                          </Link>
                          <Button
                            size="sm"
                            className={
                              crypto?.active ? "bg-yellow-500 hover:bg-yellow-600" : "bg-gray-200 text-gray-500"
                            }
                            disabled={!crypto?.active}
                          >
                            Retirar
                          </Button>
                          <Button size="sm" className="bg-blue-500 hover:bg-blue-600">
                            História
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="text-center py-10 text-gray-500">
                  <div className="mb-2">Nenhum resultado encontrado</div>
                  <div className="text-sm">Tente uma pesquisa diferente</div>
                </div>
              )}
            </div>
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
        active ? "bg-[#66e0cc]/20 text-[#66e0cc] font-medium" : "text-gray-300 hover:bg-gray-800 hover:text-[#66e0cc]"
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
    <div className={`p-3 border-b border-gray-800 ${isNew ? "bg-gray-800/30" : ""}`}>
      <div className="flex justify-between">
        <h4 className="font-medium text-sm">{title}</h4>
        {isNew && <Badge className="bg-[#66e0cc] text-[10px] text-black">Novo</Badge>}
      </div>
      <p className="text-xs text-gray-400 mt-1">{message}</p>
      <div className="text-[10px] text-gray-500 mt-2">{time}</div>
    </div>
  )
}
