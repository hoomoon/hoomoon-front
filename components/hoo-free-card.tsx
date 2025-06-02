"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function HooFreeCard() {
  const router = useRouter()

  const handleEntrar = () => {
    router.push("/cadastro?plano=free")
  }

  return (
    <div className="bg-[#0c0c0c] border border-[#1f1f1f] p-6 rounded-2xl shadow-md flex flex-col items-center text-white gap-4 w-full md:w-[300px] hover:border-[#66e0cc]/30 transition-all duration-300 hover:shadow-[0_0_15px_rgba(102,224,204,0.15)]">
      <img
        src="/logo-lua-free.png"
        alt="Logo Lua HOO FREE"
        className="w-16 h-16 object-contain drop-shadow-[0_0_8px_rgba(102,224,204,0.6)]"
      />
      <h2 className="text-2xl font-bold text-[#66e0cc]">HOO FREE</h2>
      <p className="text-sm text-gray-400 text-center">
        Acesso gratuito
        <br />
        Indique e ganhe
        <br />
        Sem necessidade de investimento
      </p>
      <Button className="w-full bg-[#66e0cc] text-black font-bold hover:bg-[#52cbb7]" onClick={handleEntrar}>
        Entrar agora
      </Button>
    </div>
  )
}
