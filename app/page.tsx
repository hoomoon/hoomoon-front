// app/page.tsx
"use client"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import TypewriterEffect from "@/components/typewriter-effect"
import { ArrowRight, ChevronRight, ExternalLink, Github, Twitter, Linkedin, Instagram } from "lucide-react"
import ParticlesBackground from "@/components/particles-background"
import Counter from "@/components/counter"

export default function LandingPage() {
  const [isLoading, setIsLoading] = useState(true)
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  // Parallax effect values
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 300])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -300])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0])

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  // Stats data
  const stats = [
    { value: "30,000+", label: "Carteiras únicas" },
    { value: "12,000+", label: "Transações diárias" },
    { value: "$15M+", label: "Em volume diário" },
    { value: "100+", label: "Pools DEX ativos" },
    { value: "Avalanche", label: "Tecnologia base" },
  ]

  // Roadmap data
  const roadmap = [
    { month: "Janeiro", value: "$1,00", status: "completo" },
    { month: "Fevereiro", value: "$1,03", status: "completo" },
    { month: "Março", value: "$1,07", status: "completo" },
    { month: "Abril", value: "$1,11", status: "atual" },
    { month: "Maio", value: "$1,14", status: "futuro" },
  ]

  return (
    <>
      {/* Preloader */}
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="flex flex-col items-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-32 h-32 relative mb-8">
              <Image src="/images/hoomoon-logo.png" alt="HOOMOON Logo" layout="fill" objectFit="contain" priority />
            </div>
            <div className="h-1 w-48 bg-zinc-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#66e0cc] to-purple-600"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              ></motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}

      <div ref={containerRef} className="bg-black min-h-screen font-urbanist text-white overflow-hidden">
        {/* Particles Background */}
        <div className="fixed inset-0 z-0">
          <ParticlesBackground />
        </div>

        {/* Header */}
        <motion.header
          className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-md border-b border-zinc-800/50"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 2.2 }}
        >
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="text-2xl font-bold text-white flex items-center gap-2">
              <div className="w-8 h-8 relative">
                <Image src="/images/hoomoon-logo.png" alt="HOOMOON Logo" layout="fill" objectFit="contain" priority />
              </div>
              HOO<span className="text-[#66e0cc]">MOON</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/login" className="text-sm text-gray-300 hover:text-[#66e0cc] transition-colors">
                Entrar
              </Link>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/cadastro"
                  className="bg-[#66e0cc] text-black text-sm font-medium px-4 py-2 rounded-full hover:bg-[#66e0cc]/90 transition-colors"
                >
                  Criar Conta
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.header>

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
          {/* Animated gradient background */}
          <div className="absolute inset-0 z-0">
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-[#66e0cc]/20 blur-[120px] animate-pulse"></div>
            <div
              className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-purple-600/20 blur-[120px] animate-pulse"
              style={{ animationDelay: "1s" }}
            ></div>
          </div>

          {/* Logo background */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-10 pointer-events-none"
            style={{ y: y1, opacity }}
          >
            <div className="w-full h-full bg-gradient-radial from-[#66e0cc]/20 to-transparent rounded-full"></div>
          </motion.div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              className="max-w-3xl"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2.5 }}
            >
              <motion.div
                className="inline-block bg-[#66e0cc]/10 border border-[#66e0cc]/20 rounded-full px-4 py-1 text-[#66e0cc] text-sm font-medium mb-6"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 2.7 }}
              >
                Fundo de investimento cripto
              </motion.div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                <TypewriterEffect
                  text={`Nãão criamos uma moeda. Criamos um caminho direto até a valorização dela`}
                  delay={3000}
                />
              </h1>

              <motion.p
                className="text-gray-400 text-lg mb-8 max-w-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 5 }}
              >
                O acesso antecipado à próxima revolução em distribuição de valor cripto.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 5.2 }}
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/cadastro"
                    className="group bg-[#66e0cc] text-black font-bold px-8 py-4 rounded-xl flex items-center justify-center hover:bg-[#66e0cc]/90 transition-all duration-300 relative overflow-hidden"
                  >
                    <span className="relative z-10">Começar Agora</span>
                    <span className="group-hover:translate-x-1 transition-transform duration-300 ml-2 relative z-10">
                      <ArrowRight size={18} />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#66e0cc] to-[#66e0cc]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="#planos"
                    className="group border border-gray-700 text-white px-8 py-4 rounded-xl flex items-center justify-center hover:bg-gray-900 transition-all duration-300 relative overflow-hidden"
                  >
                    <span className="relative z-10">Ver Planos</span>
                    <span className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 ml-0 group-hover:ml-2 relative z-10">
                      <ChevronRight size={18} />
                    </span>
                  </Link>
                </motion.div>
              </motion.div>

              <motion.div
                className="bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 rounded-xl p-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 5.5 }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full bg-[#66e0cc]"></div>
                  <p className="text-sm font-medium">
                    HOOMOON detém <span className="text-[#66e0cc]">630 milhões</span> de APTM (30% do supply total)
                  </p>
                </div>
                <div className="h-3 bg-zinc-800 rounded-full overflow-hidden mb-4">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#66e0cc] to-[#66e0cc]/70 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: "30%" }}
                    transition={{ duration: 1, delay: 6 }}
                  ></motion.div>
                </div>
                <p className="text-xs text-gray-500 text-center">Movido por tecnologia. Sustentado por fatos.</p>
              </motion.div>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 6.5 }}
          >
            <div className="flex flex-col items-center">
              <p className="text-xs text-gray-500 mb-2">Scroll para descobrir</p>
              <motion.div
                className="w-6 h-10 border-2 border-gray-500 rounded-full flex justify-center"
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
              >
                <motion.div
                  className="w-1 h-2 bg-[#66e0cc] rounded-full mt-2"
                  animate={{ y: [0, 4, 0] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                ></motion.div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Stats Section */}
        <motion.section
          className="py-20 bg-zinc-900/50 relative z-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="container mx-auto px-4">
            <motion.div
              className="max-w-3xl mx-auto text-center mb-16"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Por que confiar na APTM?</h2>
              <p className="text-gray-400">
                A APTM (Apertum) é uma blockchain de Camada 1 compatível com EVM, escalável e com taxa ultrabaixa.
                Recentemente, foi listada na MEXC, uma das 10 maiores exchanges do mundo.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 hover:border-[#66e0cc]/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#66e0cc]/5"
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    className="w-12 h-12 mx-auto bg-[#66e0cc]/10 rounded-full flex items-center justify-center text-[#66e0cc] mb-4"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    {i === 0 && <motion.div className="text-xl">👛</motion.div>}
                    {i === 1 && <motion.div className="text-xl">📊</motion.div>}
                    {i === 2 && <motion.div className="text-xl">💰</motion.div>}
                    {i === 3 && <motion.div className="text-xl">🔄</motion.div>}
                    {i === 4 && <motion.div className="text-xl">🌐</motion.div>}
                  </motion.div>
                  <motion.div
                    className="text-xl md:text-2xl font-bold text-white mb-1"
                    initial={{ scale: 0.5, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Counter value={stat.value} />
                  </motion.div>
                  <div className="text-xs text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="max-w-3xl mx-auto mt-12 bg-zinc-900 p-6 rounded-xl border border-zinc-800"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold mb-4 text-center">MEXC:</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-zinc-800 p-4 rounded-lg text-center">
                  <p className="text-[#66e0cc] font-bold">7ª maior do mundo</p>
                </div>
                <div className="bg-zinc-800 p-4 rounded-lg text-center">
                  <p className="text-[#66e0cc] font-bold">+6 milhões</p>
                  <p className="text-sm text-gray-400">de visitas semanais</p>
                </div>
                <div className="bg-zinc-800 p-4 rounded-lg text-center">
                  <p className="text-[#66e0cc] font-bold">US$2,5 bilhões</p>
                  <p className="text-sm text-gray-400">em volume diário</p>
                </div>
              </div>
              <p className="text-center text-gray-400 mt-4">
                A HOOMOON é uma das maiores detentoras institucionais da APTM.
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* Parallax Section */}
        <motion.section
          className="py-20 relative overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div className="absolute inset-0 z-0 opacity-20" style={{ y: y2 }}>
            {/* Removendo a referência à imagem de fundo blockchain-grid */}
            <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 to-black"></div>
          </motion.div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              className="max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.h2
                className="text-3xl md:text-4xl font-bold text-center mb-6"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                A matemática da HOOMOON
              </motion.h2>
              <motion.p
                className="text-gray-400 text-center mb-12"
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                A cada US$0,01 que a APTM valoriza, a HOOMOON lucra US$6,3 milhões. Com o preço atual em US$1,14, o
                fundo já gerou US$88,2 milhões de lucro — sem vender um único token.
              </motion.p>

              <motion.div
                className="bg-zinc-900 rounded-xl p-8 mb-12"
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-bold mb-4">Cálculo simples:</h3>
                <div className="space-y-4">
                  {[
                    { label: "HOOMOON detém", value: "630 milhões de APTM" },
                    { label: "Cada US$0,01 de valorização", value: "= US$6.3 milhões" },
                    { label: "Valorização atual", value: "US$88.2 milhões", highlight: true },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      className="flex justify-between items-center p-3 bg-zinc-800 rounded-lg"
                      initial={{ x: -30, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="text-sm">{item.label}</div>
                      <div className={`font-medium ${item.highlight ? "text-green-400" : "text-[#66e0cc]"}`}>
                        {item.value}
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-zinc-800 rounded-lg">
                  <h4 className="font-bold mb-2">E se chegar a US$5,00?</h4>
                  <p className="text-sm text-gray-300">
                    O fundo HOOMOON valerá mais de US$3,15 bilhões, com mais de US$2,5 bilhões em lucro acumulado.
                  </p>
                </div>
              </motion.div>

              {/* Roadmap */}
              <motion.h3
                className="text-xl font-bold text-center mb-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                Roadmap de valorização — já em andamento
              </motion.h3>
              <div className="relative">
                <motion.div
                  className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-zinc-800 -translate-x-1/2"
                  initial={{ height: 0 }}
                  whileInView={{ height: "100%" }}
                  transition={{ duration: 1 }}
                  viewport={{ once: true }}
                ></motion.div>

                {roadmap.map((item, i) => (
                  <motion.div
                    key={i}
                    className="relative mb-8 last:mb-0"
                    initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * i }}
                    viewport={{ once: true }}
                  >
                    <motion.div
                      className={`absolute left-1/2 top-0 w-4 h-4 rounded-full -translate-x-1/2 -translate-y-1/2 ${
                        item.status === "completo"
                          ? "bg-green-400"
                          : item.status === "atual"
                            ? "bg-[#66e0cc]"
                            : "bg-zinc-700"
                      }`}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, delay: 0.2 + i * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.2 }}
                    ></motion.div>
                    <motion.div
                      className={`ml-[calc(50%+20px)] pl-4 ${item.status === "futuro" ? "opacity-50" : ""}`}
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="text-sm font-medium">{item.month} 2025</div>
                      <div className="text-2xl font-bold">{item.value}</div>
                      {item.status === "atual" && (
                        <motion.div
                          className="text-xs text-[#66e0cc] mt-1"
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
                        >
                          Estamos aqui
                        </motion.div>
                      )}
                    </motion.div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                className="mt-12 text-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="inline-block bg-[#66e0cc]/10 border border-[#66e0cc]/20 rounded-full px-6 py-2">
                  <p className="text-[#66e0cc] font-bold">📊 Lucro acumulado do fundo HOOMOON: US$88,2 milhões</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* Video Section - Agora seção de captação */}
        <motion.section
          className="py-20 bg-zinc-900 relative overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-purple-600/20 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#66e0cc]/20 rounded-full blur-[100px]"></div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              className="max-w-3xl mx-auto text-center mb-10"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Por que captar apenas US$10 milhões?</h2>
              <p className="text-gray-400">
                A liquidez já existe
                <br />O lucro já foi gerado
                <br />A captação é apenas para expansão, estrutura e valorização estratégica
              </p>
            </motion.div>

            <motion.div
              className="bg-zinc-800 rounded-xl p-8 max-w-3xl mx-auto"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold mb-4 text-center">Exemplo:</h3>
              <div className="space-y-4">
                <div className="p-3 bg-zinc-700 rounded-lg">
                  <p className="font-medium">Captação: US$10.000.000</p>
                </div>
                <div className="p-3 bg-zinc-700 rounded-lg">
                  <p className="font-medium">Plano CALLISTO: 160% de retorno em 40 dias</p>
                </div>
                <div className="p-3 bg-zinc-700 rounded-lg">
                  <p className="font-medium">Precisa-se de US$6M para pagar tudo</p>
                </div>

                <div className="p-4 bg-[#66e0cc]/10 rounded-lg border border-[#66e0cc]/30 mt-6">
                  <p className="font-bold text-[#66e0cc]">Com US$88,2M de lucro no fundo:</p>
                  <ul className="mt-2 space-y-2">
                    <li className="flex items-center">
                      <span className="mr-2">→</span>
                      <span>A HOOMOON consegue pagar mais de 14 ciclos completos de CALLISTO</span>
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2">→</span>
                      <span>Sem depender de novas entradas</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Planos Section */}
        <motion.section
          id="planos"
          className="py-20 relative overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="absolute inset-0 z-0">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#66e0cc]/10 blur-[100px]"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-purple-600/10 blur-[100px]"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              className="max-w-3xl mx-auto text-center mb-12"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">🌙 Planos HOOMOON | Escolha sua LUA</h2>
              <p className="text-gray-400">
                Como funciona?
                <br />
                Escolha sua LUA
                <br />
                Ative com Pix, cripto ou saldo interno
                <br />
                Receba lucros diários automáticos
                <br />
                Saques liberados após 24h — de segunda a sexta
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* HOO FREE */}
              <motion.div
                className="bg-zinc-900 rounded-xl p-6 border border-zinc-800"
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, boxShadow: "0 10px 30px -15px rgba(102, 224, 204, 0.2)" }}
              >
                <div className="text-2xl font-bold mb-2">🆓 HOO FREE</div>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Acesso gratuito</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Indique e ganhe</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Sem necessidade de investimento</span>
                  </li>
                </ul>
                <button className="w-full bg-[#66e0cc] text-black font-bold py-3 rounded-lg hover:bg-[#66e0cc]/90 transition-colors">
                  Começar Grátis
                </button>
              </motion.div>

              {/* HOO TITAN */}
              <motion.div
                className="bg-zinc-900 rounded-xl p-6 border border-zinc-800"
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, boxShadow: "0 10px 30px -15px rgba(102, 224, 204, 0.2)" }}
              >
                <div className="text-2xl font-bold mb-2">💠 HOO TITAN</div>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>US$5 por 40 dias</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>130% de retorno (3,25% ao dia)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Saques a cada 3 dias</span>
                  </li>
                </ul>
                <button className="w-full bg-[#66e0cc] text-black font-bold py-3 rounded-lg hover:bg-[#66e0cc]/90 transition-colors">
                  Investir Agora
                </button>
              </motion.div>

              {/* HOO CALLISTO */}
              <motion.div
                className="bg-zinc-900 rounded-xl p-6 border border-[#66e0cc]/30"
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, boxShadow: "0 10px 30px -15px rgba(102, 224, 204, 0.3)" }}
              >
                <div className="absolute top-4 right-4 bg-[#66e0cc] text-black text-xs font-bold px-2 py-1 rounded-full">
                  Popular
                </div>
                <div className="text-2xl font-bold mb-2">🪐 HOO CALLISTO</div>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>US$10 por 40 dias</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>160% de retorno (4,57% ao dia)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Saques a cada 10 dias</span>
                  </li>
                </ul>
                <button className="w-full bg-[#66e0cc] text-black font-bold py-3 rounded-lg hover:bg-[#66e0cc]/90 transition-colors">
                  Investir Agora
                </button>
              </motion.div>
            </div>

            {/* Programa de Recompensa */}
            <motion.div
              className="max-w-3xl mx-auto mt-16"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-center mb-8">🧠 Programa de Recompensa por Indicação</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* HOO SILVER */}
                <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
                  <h4 className="text-xl font-bold mb-3">🥈 HOO SILVER</h4>
                  <ul className="space-y-2 text-sm">
                    <li>Acesso automático com qualquer ativação</li>
                    <li>Comissão direta: 10%</li>
                    <li>Desbloqueia níveis 2 e 3 com US$50 de ganhos em equipe</li>
                  </ul>
                </div>

                {/* HOO GOLD */}
                <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
                  <h4 className="text-xl font-bold mb-3">🥇 HOO GOLD</h4>
                  <ul className="space-y-2 text-sm">
                    <li>Desbloqueado com US$250 em ganhos acumulados (níveis 1 a 4)</li>
                  </ul>
                </div>

                {/* HOO BLACK */}
                <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
                  <h4 className="text-xl font-bold mb-3">🖤 HOO BLACK</h4>
                  <ul className="space-y-2 text-sm">
                    <li>Libera comissões até o 8º nível</li>
                    <li>Upgrade automático assim que critérios forem atingidos</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Transparência */}
            <motion.div
              className="max-w-3xl mx-auto mt-16 bg-zinc-900 p-8 rounded-xl border border-zinc-800"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-center mb-6">🔍 Transparência Total</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-zinc-800 p-4 rounded-lg text-center">
                  <p className="text-sm">Registro em blockchain pública</p>
                </div>
                <div className="bg-zinc-800 p-4 rounded-lg text-center">
                  <p className="text-sm">Carteiras auditáveis</p>
                </div>
                <div className="bg-zinc-800 p-4 rounded-lg text-center">
                  <p className="text-sm">Painel de rendimentos em tempo real</p>
                </div>
                <div className="bg-zinc-800 p-4 rounded-lg text-center">
                  <p className="text-sm">Governança DAO em desenvolvimento</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          className="py-20 relative overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="absolute inset-0 z-0">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#66e0cc]/10 blur-[100px]"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-purple-600/10 blur-[100px]"></div>
          </div>

          <div className="container mx-auto px-4 text-center relative z-10">
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-6 max-w-3xl mx-auto"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Você não entra para sustentar o sistema. Você entra para aproveitar o lucro que ele já gerou.
            </motion.h2>
            <motion.p
              className="text-gray-400 max-w-2xl mx-auto mb-8"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              A HOOMOON entrega o que o mercado nunca conseguiu: Rentabilidade real. Controle transparente. Distribuição
              baseada em um fundo que já valorizou milhões.
            </motion.p>
            <motion.div
              initial={{ y: 30, opacity: 0, scale: 0.9 }}
              whileInView={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/cadastro"
                className="group bg-[#66e0cc] text-black font-bold px-10 py-4 rounded-xl inline-flex items-center hover:bg-[#66e0cc]/90 transition-all duration-300 relative overflow-hidden"
              >
                <span className="relative z-10">Seja um dos primeiros a acessar o fundo</span>
                <span className="group-hover:translate-x-1 transition-transform duration-300 ml-2 relative z-10">
                  <ArrowRight size={18} />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#66e0cc] to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            </motion.div>
          </div>
        </motion.section>

        {/* Footer */}
        <footer className="bg-zinc-900 py-12 relative z-10">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
              <motion.div
                className="text-2xl font-bold text-white mb-4 md:mb-0 flex items-center"
                initial={{ x: -30, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="w-8 h-8 relative mr-2">
                  <Image src="/images/hoomoon-logo.png" alt="HOOMOON Logo" layout="fill" objectFit="contain" />
                </div>
                HOO<span className="text-[#66e0cc]">MOON</span>
              </motion.div>
              <motion.div
                className="flex gap-6 flex-wrap justify-center"
                initial={{ x: 30, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Link
                  href="https://www.hoomoon.ai"
                  target="_blank"
                  className="text-sm text-gray-400 hover:text-white transition-colors flex items-center"
                >
                  www.hoomoon.ai <ExternalLink size={12} className="ml-1" />
                </Link>
                <Link href="/termos" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Termos de uso
                </Link>
                <Link href="/privacidade" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Política de privacidade
                </Link>
              </motion.div>
            </div>

            <div className="border-t border-zinc-800 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <motion.p
                  className="text-sm text-gray-500 mb-4 md:mb-0"
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  Sede: Dubai | Lançado em Janeiro de 2025
                </motion.p>
                <motion.div
                  className="flex gap-4"
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  {[
                    { icon: <Twitter size={18} />, href: "#" },
                    { icon: <Github size={18} />, href: "#" },
                    { icon: <Linkedin size={18} />, href: "#" },
                    { icon: <Instagram size={18} />, href: "#" },
                  ].map((social, i) => (
                    <motion.a
                      key={i}
                      href={social.href}
                      className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-gray-400 hover:bg-[#66e0cc]/20 hover:text-[#66e0cc] transition-colors"
                      whileHover={{ y: -3 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </motion.div>
              </div>
              <motion.p
                className="text-center text-xs text-gray-500 mt-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                © {new Date().getFullYear()} HOOMOON. Todos os direitos reservados.
              </motion.p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
