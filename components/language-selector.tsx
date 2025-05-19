"use client"

import type React from "react"

import { useState } from "react"
import { Check } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

interface Language {
  code: string
  name: string
  flag: string
}

export default function LanguageSelector() {
  const [currentLanguage, setCurrentLanguage] = useState("pt")

  const languages: Language[] = [
    { code: "pt", name: "Português (Portugal)", flag: "🇵🇹" },
    { code: "en", name: "Inglês", flag: "🇬🇧" },
    { code: "es", name: "Espanhol", flag: "🇪🇸" },
    { code: "ko", name: "Coreano", flag: "🇰🇷" },
    { code: "zh", name: "Mandarim", flag: "🇨🇳" },
    { code: "hi", name: "Indiano", flag: "🇮🇳" },
    { code: "vi", name: "Vietnamita", flag: "🇻🇳" },
    { code: "ru", name: "Russo", flag: "🇷🇺" },
  ]

  const handleLanguageChange = (code: string) => {
    setCurrentLanguage(code)
    console.log(`Idioma alterado para: ${code}`)
    // Aqui você implementaria a lógica real de mudança de idioma
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative" aria-label="Selecionar idioma">
          <GlobeIcon className="h-5 w-5 text-white hover:text-[#66e0cc]" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="bg-black border border-[#66e0cc]/50 text-white rounded-xl shadow-md w-48"
        align="end"
      >
        <div className="py-2 px-3 border-b border-[#66e0cc]/30">
          <p className="text-sm font-medium text-[#66e0cc]">🌍 Idiomas</p>
        </div>
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            className="py-2 px-3 hover:bg-[#66e0cc]/10 cursor-pointer flex items-center justify-between"
            onClick={() => handleLanguageChange(lang.code)}
          >
            <span className="flex items-center gap-2">
              <span className="text-base">{lang.flag}</span>
              <span>{lang.name}</span>
            </span>
            {currentLanguage === lang.code && <Check size={16} className="text-[#66e0cc]" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

// Componente de ícone de globo mais realista
function GlobeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      <path d="M2 12h20" />
      <path d="M12 2v20" />
      <path d="M2 7h5" />
      <path d="M17 7h5" />
      <path d="M2 17h5" />
      <path d="M17 17h5" />
    </svg>
  )
}
