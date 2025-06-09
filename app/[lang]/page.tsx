"use client"

import { useEffect, useState, useRef, use } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import TypewriterEffect from "@/components/typewriter-effect"
import { ArrowRight, ChevronRight, ExternalLink, Github, Twitter, Linkedin, Instagram, Globe } from "lucide-react"
import ParticlesBackground from "@/components/particles-background"
import Counter from "@/components/counter"

// Traduções completas
const translations = {
  'en': {
    platformMessage: "This platform is an official Hoomoon environment.",
    login: "Login",
    hero: {
      tag: "Crypto investment fund",
      title: "Wee didn't create a currency. We created a direct path to its appreciation",
      subtitle: "Early access to the next revolution in crypto value distribution.",
      getStarted: "Get Started", 
      viewPlans: "View Plans",
      fundInfo: "HOOMOON holds 630 million APTM (30% of total supply)",
      techInfo: "Powered by technology. Backed by facts.",
      scrollText: "Scroll to discover"
    },
    stats: {
      title: "Why trust APTM?",
      description: "APTM (Apertum) is a Layer 1 EVM-compatible blockchain, scalable with ultra-low fees. Recently, it was listed on MEXC, one of the world's top 10 exchanges.",
      uniqueWallets: "Unique Wallets",
      dailyTransactions: "Daily Transactions",
      dailyVolume: "In Daily Volume", 
      activePools: "Active DEX Pools",
      baseTechnology: "Base Technology",
      mexcTitle: "MEXC:",
      mexcStats: {
        rank: "7th largest in the world",
        visits: "+6 million weekly visits",
        volume: "US$2.5 billion daily volume"
      },
      institutional: "HOOMOON is one of the largest institutional holders of APTM."
    },
    math: {
      title: "HOOMOON's mathematics",
      description: "For every US$0.01 that APTM appreciates, HOOMOON profits US$6.3 million. With the current price at US$1.14, the fund has already generated US$88.2 million in profit — without selling a single token.",
      calculation: "Simple calculation:",
      items: {
        holds: "HOOMOON holds 630 million APTM",
        appreciation: "Each US$0.01 appreciation = US$6.3 million",
        current: "Current appreciation US$88.2 million"
      },
      future: {
        title: "What if it reaches US$5.00?",
        description: "The HOOMOON fund will be worth over US$3.15 billion, with over US$2.5 billion in accumulated profit."
      }
    },
    roadmap: {
      title: "Appreciation roadmap — already underway",
      months: ["January", "February", "March", "April", "May"],
      status: {
        complete: "complete",
        current: "current", 
        future: "future"
      },
      currentStatus: "We are here",
      finalProfit: "HOOMOON fund accumulated profit: US$88.2 million"
    },
    captation: {
      title: "Why raise only US$10 million?",
      subtitle: "The liquidity already exists\nThe profit has already been generated\nThe fundraising is only for expansion, structure and strategic appreciation",
      example: "Example:",
      items: {
        fundraising: "Fundraising: US$10,000,000",
        plan: "CALLISTO Plan: 160% return in 40 days", 
        needed: "US$6M needed to pay everything"
      },
      conclusion: {
        title: "With US$88.2M profit in the fund:",
        items: [
          "HOOMOON can pay more than 14 complete CALLISTO cycles",
          "Without depending on new entries"
        ]
      }
    },
    plans: {
      title: "🌙 HOOMOON Plans | Choose your MOON",
      description: "How does it work?\nChoose your MOON\nActivate with Pix, crypto or internal balance\nReceive automatic daily profits\nWithdrawals released after 24h — Monday to Friday",
      free: {
        title: "🆓 HOO FREE",
        features: [
          "Free access",
          "Refer and earn",
          "No investment required"
        ],
        button: "Start Free"
      },
      pandora: {
        title: "🌙 HOO PANDORA",
        features: [
          "US$5 for 60 days",
          "120% return (2.00% per day)",
          "Daily withdrawals"
        ],
        button: "Invest Now"
      },
      titan: {
        title: "💠 HOO TITAN", 
        features: [
          "US$10 for 40 days",
          "140% return (3.25% per day)",
          "Withdrawals every 3 days"
        ],
        button: "Invest Now"
      },
      callisto: {
        title: "🪐 HOO CALLISTO",
        features: [
          "US$20 for 40 days",
          "160% return (4.57% per day)",
          "Withdrawals every 10 days"
        ],
        button: "Invest Now",
        popular: "Popular"
      }
    },
    rewards: {
      title: "🧠 Referral Reward Program",
      silver: {
        title: "🥈 HOO SILVER",
        features: [
          "Automatic access with any activation",
          "Direct commission: 10%",
          "Unlocks levels 2 and 3 with US$50 team earnings"
        ]
      },
      gold: {
        title: "🥇 HOO GOLD",
        features: [
          "Unlocked with US$250 in accumulated earnings (levels 1 to 4)"
        ]
      },
      black: {
        title: "🖤 HOO BLACK",
        features: [
          "Releases commissions up to 10th level",
          "Automatic upgrade when criteria are met"
        ]
      }
    },
    transparency: {
      title: "🔍 Total Transparency",
      features: [
        "Public blockchain registration",
        "Auditable wallets", 
        "Real-time earnings panel",
        "DAO governance in development"
      ]
    },
    cta: {
      title: "You don't join to sustain the system. You join to take advantage of the profit it has already generated.",
      subtitle: "HOOMOON delivers what the market never could: Real profitability. Transparent control. Distribution based on a fund that has already appreciated millions.",
      button: "Be one of the first to access the fund"
    },
    footer: {
      links: {
        website: "www.hoomoon.ai",
        terms: "Terms of use",
        privacy: "Privacy policy"
      },
      location: "Headquarters: Dubai | Launched in January 2025",
      copyright: "All rights reserved."
    },
    dynamicValues: {
      math: {
        holds: "630 million APTM",
        appreciation: "= US$6.3 million", 
        current: "US$88.2 million"
      },
      mexc: {
        visits: "+6 million",
        volume: "US$2.5 billion"
      }
    }
  },
  'pt-BR': {
    platformMessage: "Esta plataforma é um ambiente oficial da Hoomoon.",
    login: "Entrar",
    hero: {
      tag: "Fundo de investimento cripto",
      title: "Nãão criamos uma moeda. Criamos um caminho direto até a valorização dela",
      subtitle: "O acesso antecipado à próxima revolução em distribuição de valor cripto.",
      getStarted: "Começar agora",
      viewPlans: "Ver Planos", 
      fundInfo: "HOOMOON detém 630 milhões de APTM (30% do fornecimento total)",
      techInfo: "Movido por tecnologia. Sustentado por fatos.",
      scrollText: "Scroll para descobrir"
    },
    stats: {
      title: "Por que confiar na APTM?",
      description: "A APTM (Apertum) é uma blockchain de Camada 1 compatível com EVM, escalável e com taxa ultrabaixa. Recentemente, foi listada na MEXC, uma das 10 maiores exchanges do mundo.",
      uniqueWallets: "Carteiras únicas",
      dailyTransactions: "Transações diárias",
      dailyVolume: "Em volume diário",
      activePools: "Pools DEX ativos",
      baseTechnology: "Tecnologia base",
      mexcTitle: "MEXC:",
      mexcStats: {
        rank: "7ª maior do mundo",
        visits: "+6 milhões de visitas semanais", 
        volume: "US$2,5 bilhões em volume diário"
      },
      institutional: "A HOOMOON é uma das maiores detentoras institucionais da APTM."
    },
    math: {
      title: "A matemática da HOOMOON",
      description: "A cada US$0,01 que a APTM valoriza, a HOOMOON lucra US$6,3 milhões. Com o preço atual em US$1,14, o fundo já gerou US$88,2 milhões de lucro — sem vender um único token.",
      calculation: "Cálculo simples:",
      items: {
        holds: "HOOMOON detém 630 milhões de APTM",
        appreciation: "Cada US$0,01 de valorização = US$6.3 milhões",
        current: "Valorização atual US$88.2 milhões"
      },
      future: {
        title: "E se chegar a US$5,00?",
        description: "O fundo HOOMOON valerá mais de US$3,15 bilhões, com mais de US$2,5 bilhões em lucro acumulado."
      }
    },
    roadmap: {
      title: "Roadmap de valorização — já em andamento",
      months: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio"],
      status: {
        complete: "completo",
        current: "atual",
        future: "futuro"
      },
      currentStatus: "Estamos aqui",
      finalProfit: "📊 Lucro acumulado do fundo HOOMOON: US$88,2 milhões"
    },
    captation: {
      title: "Por que captar apenas US$10 milhões?",
      subtitle: "A liquidez já existe\nO lucro já foi gerado\nA captação é apenas para expansão, estrutura e valorização estratégica",
      example: "Exemplo:",
      items: {
        fundraising: "Captação: US$10.000.000",
        plan: "Plano CALLISTO: 160% de retorno em 40 dias",
        needed: "Precisa-se de US$6M para pagar tudo"
      },
      conclusion: {
        title: "Com US$88,2M de lucro no fundo:",
        items: [
          "A HOOMOON consegue pagar mais de 14 ciclos completos de CALLISTO",
          "Sem depender de novas entradas"
        ]
      }
    },
    plans: {
      title: "🌙 Planos HOOMOON | Escolha sua LUA",
      description: "Como funciona?\nEscolha sua LUA\nAtive com Pix, cripto ou saldo interno\nReceba lucros diários automáticos\nSaques liberados após 24h — de segunda a sexta",
      free: {
        title: "🆓 HOO FREE",
        features: [
          "Acesso gratuito",
          "Indique e ganhe",
          "Sem necessidade de investimento"
        ],
        button: "Começar Grátis"
      },
      pandora: {
        title: "🌙 HOO PANDORA",
        features: [
          "US$5 por 60 dias",
          "120% de retorno (2,00% ao dia)",
          "Saques diários"
        ],
        button: "Investir Agora"
      },
      titan: {
        title: "💠 HOO TITAN",
        features: [
          "US$10 por 40 dias",
          "140% de retorno (3,25% ao dia)",
          "Saques a cada 3 dias"
        ],
        button: "Investir Agora"
      },
      callisto: {
        title: "🪐 HOO CALLISTO",
        features: [
          "US$20 por 40 dias",
          "160% de retorno (4,57% ao dia)",
          "Saques a cada 10 dias"
        ],
        button: "Investir Agora",
        popular: "Popular"
      }
    },
    rewards: {
      title: "🧠 Programa de Recompensa por Indicação",
      silver: {
        title: "🥈 HOO SILVER",
        features: [
          "Acesso automático com qualquer ativação",
          "Comissão direta: 10%",
          "Desbloqueia níveis 2 e 3 com US$50 de ganhos em equipe"
        ]
      },
      gold: {
        title: "🥇 HOO GOLD",
        features: [
          "Desbloqueado com US$250 em ganhos acumulados (níveis 1 a 4)"
        ]
      },
      black: {
        title: "🖤 HOO BLACK",
        features: [
          "Libera comissões até o 10º nível",
          "Upgrade automático assim que critérios forem atingidos"
        ]
      }
    },
    transparency: {
      title: "🔍 Transparência Total",
      features: [
        "Registro em blockchain pública",
        "Carteiras auditáveis",
        "Painel de rendimentos em tempo real",
        "Governança DAO em desenvolvimento"
      ]
    },
    cta: {
      title: "Você não entra para sustentar o sistema. Você entra para aproveitar o lucro que ele já gerou.",
      subtitle: "A HOOMOON entrega o que o mercado nunca conseguiu: Rentabilidade real. Controle transparente. Distribuição baseada em um fundo que já valorizou milhões.",
      button: "Seja um dos primeiros a acessar o fundo"
    },
    footer: {
      links: {
        website: "www.hoomoon.ai",
        terms: "Termos de uso",
        privacy: "Política de privacidade"
      },
      location: "Sede: Dubai | Lançado em Janeiro de 2025",
      copyright: "Todos os direitos reservados."
    },
    dynamicValues: {
      math: {
        holds: "630 milhões de APTM",
        appreciation: "= US$6.3 milhões",
        current: "US$88.2 milhões"
      },
      mexc: {
        visits: "+6 milhões", 
        volume: "US$2,5 bilhões"
      }
    }
  },
  "es": {
    "platformMessage": "Esta plataforma es un entorno oficial de Hoomoon.",
    "login": "Iniciar sesión",
    "hero": {
      "tag": "Fondo de inversión en criptomonedas",
      "title": "Noo creamos una moneda. Creamos un camino directo hacia su valorización",
      "subtitle": "Acceso anticipado a la próxima revolución en la distribución de valor cripto.",
      "getStarted": "Empezar ahora",
      "viewPlans": "Ver planes",
      "fundInfo": "HOOMOON posee 630 millones de APTM (30% del suministro total)",
      "techInfo": "Impulsado por tecnología. Respaldado por hechos.",
      "scrollText": "Desliza para descubrir"
    },
    "stats": {
      "title": "¿Por qué confiar en APTM?",
      "description": "APTM (Apertum) es una blockchain de Capa 1 compatible con EVM, escalable y con tarifas ultra bajas. Recientemente fue listada en MEXC, uno de los 10 principales exchanges del mundo.",
      "uniqueWallets": "Billeteras únicas",
      "dailyTransactions": "Transacciones diarias",
      "dailyVolume": "Volumen diario",
      "activePools": "Pools DEX activos",
      "baseTechnology": "Tecnología base",
      "mexcTitle": "MEXC:",
      "mexcStats": {
        "rank": "7º más grande del mundo",
        "visits": "+6 millones de visitas semanales",
        "volume": "US$2.5 mil millones de volumen diario"
      },
      "institutional": "HOOMOON es uno de los mayores tenedores institucionales de APTM."
    },
    "math": {
      "title": "Las matemáticas de HOOMOON",
      "description": "Por cada US$0.01 que APTM se valoriza, HOOMOON obtiene US$6.3 millones de ganancia. Con el precio actual de US$1.14, el fondo ya ha generado US$88.2 millones — sin vender un solo token.",
      "calculation": "Cálculo simple:",
      "items": {
        "holds": "HOOMOON posee 630 millones de APTM",
        "appreciation": "Cada US$0.01 de valorización = US$6.3 millones",
        "current": "Valorización actual: US$88.2 millones"
      },
      "future": {
        "title": "¿Y si llega a US$5.00?",
        "description": "El fondo HOOMOON valdría más de US$3.15 mil millones, con más de US$2.5 mil millones en ganancias acumuladas."
      }
    },
    "roadmap": {
      "title": "Hoja de ruta de valorización — ya en marcha",
      "months": ["Enero", "Febrero", "Marzo", "Abril", "Mayo"],
      "status": {
        "complete": "completo",
        "current": "actual",
        "future": "futuro"
      },
      "currentStatus": "Estamos aquí",
      "finalProfit": "Ganancia acumulada del fondo HOOMOON: US$88.2 millones"
    },
    "captation": {
      "title": "¿Por qué recaudar solo US$10 millones?",
      "subtitle": "La liquidez ya existe\nLa ganancia ya fue generada\nLa recaudación es solo para expansión, estructura y valorización estratégica",
      "example": "Ejemplo:",
      "items": {
        "fundraising": "Recaudación: US$10,000,000",
        "plan": "Plan CALLISTO: 160% de retorno en 40 días",
        "needed": "US$6M necesarios para pagar todo"
      },
      "conclusion": {
        "title": "Con US$88.2M de ganancia en el fondo:",
        "items": [
          "HOOMOON puede cubrir más de 14 ciclos completos de CALLISTO",
          "Sin depender de nuevas entradas"
        ]
      }
    },
    "plans": {
      "title": "🌙 Planes HOOMOON | Elige tu LUNA",
      "description": "¿Cómo funciona?\nElige tu LUNA\nActiva con Pix, cripto o saldo interno\nRecibe ganancias diarias automáticas\nRetiros disponibles después de 24h — de lunes a viernes",
      "free": {
        "title": "🆓 HOO FREE",
        "features": [
          "Acceso gratuito",
          "Refiere y gana",
          "Sin inversión requerida"
        ],
        "button": "Comenzar gratis"
      },
      "pandora": {
        "title": "🌙 HOO PANDORA",
        "features": [
          "US$5 por 60 días",
          "Retorno de 120% (2.00% diario)",
          "Retiros diarios"
        ],
        "button": "Invertir ahora"
      },
      "titan": {
        "title": "💠 HOO TITAN",
        "features": [
          "US$10 por 40 días",
          "Retorno de 140% (3.25% diario)",
          "Retiros cada 3 días"
        ],
        "button": "Invertir ahora"
      },
      "callisto": {
        "title": "🪐 HOO CALLISTO",
        "features": [
          "US$20 por 40 días",
          "Retorno de 160% (4.57% diario)",
          "Retiros cada 10 días"
        ],
        "button": "Invertir ahora",
        "popular": "Popular"
      }
    },
    "rewards": {
      "title": "🧠 Programa de Recompensas por Referidos",
      "silver": {
        "title": "🥈 HOO SILVER",
        "features": [
          "Acceso automático con cualquier activación",
          "Comisión directa: 10%",
          "Desbloquea niveles 2 y 3 con US$50 en ganancias del equipo"
        ]
      },
      "gold": {
        "title": "🥇 HOO GOLD",
        "features": [
          "Desbloqueado con US$250 en ganancias acumuladas (niveles 1 a 4)"
        ]
      },
      "black": {
        "title": "🖤 HOO BLACK",
        "features": [
          "Libera comisiones hasta el 10º nivel",
          "Ascenso automático al cumplir los criterios"
        ]
      }
    },
    "transparency": {
      "title": "🔍 Transparencia total",
      "features": [
        "Registro público en blockchain",
        "Carteras auditables",
        "Panel de ganancias en tiempo real",
        "Gobernanza DAO en desarrollo"
      ]
    },
    "cta": {
      "title": "No entras para sostener el sistema. Entras para aprovechar las ganancias ya generadas.",
      "subtitle": "HOOMOON entrega lo que el mercado nunca pudo: Rentabilidad real. Control transparente. Distribución basada en un fondo que ya se valorizó millones.",
      "button": "Sé uno de los primeros en acceder al fondo"
    },
    "footer": {
      "links": {
        "website": "www.hoomoon.ai",
        "terms": "Términos de uso",
        "privacy": "Política de privacidad"
      },
      "location": "Sede: Dubái | Lanzado en enero de 2025",
      "copyright": "Todos los derechos reservados."
    },
    dynamicValues: {
      math: {
        holds: "630 millones de APTM",
        appreciation: "= US$6.3 millones", 
        current: "US$88.2 millones"
      },
      mexc: {
        visits: "+6 millones",
        volume: "US$2.5 mil millones"
      }
    }
  },
  "fr": {
    "platformMessage": "Cette plateforme est un environnement officiel de Hoomoon.",
    "login": "Se connecter",
    "hero": {
      "tag": "Fonds d'investissement en cryptomonnaies",
      "title": "Noous n'avons pas créé une monnaie. Nous avons créé un chemin direct vers sa valorisation",
      "subtitle": "Accès anticipé à la prochaine révolution dans la distribution de valeur crypto.",
      "getStarted": "Commencer",
      "viewPlans": "Voir les plans",
      "fundInfo": "HOOMOON détient 630 millions d'APTM (30 % de l'offre totale)",
      "techInfo": "Propulsé par la technologie. Appuyé par des faits.",
      "scrollText": "Faites défiler pour découvrir"
    },
    "stats": {
      "title": "Pourquoi faire confiance à APTM ?",
      "description": "APTM (Apertum) est une blockchain Layer 1 compatible avec l’EVM, évolutive et à frais ultra-réduits. Récemment listée sur MEXC, l'un des 10 plus grands exchanges au monde.",
      "uniqueWallets": "Portefeuilles uniques",
      "dailyTransactions": "Transactions quotidiennes",
      "dailyVolume": "Volume quotidien",
      "activePools": "Pools DEX actives",
      "baseTechnology": "Technologie de base",
      "mexcTitle": "MEXC :",
      "mexcStats": {
        "rank": "7e plus grande au monde",
        "visits": "+6 millions de visites hebdomadaires",
        "volume": "Volume quotidien de 2,5 milliards USD"
      },
      "institutional": "HOOMOON est l'un des plus grands détenteurs institutionnels d'APTM."
    },
    "math": {
      "title": "Les mathématiques de HOOMOON",
      "description": "Pour chaque hausse de 0,01 USD de l’APTM, HOOMOON gagne 6,3 millions USD. Avec un prix actuel de 1,14 USD, le fonds a déjà généré 88,2 millions USD de bénéfices — sans vendre un seul jeton.",
      "calculation": "Calcul simple :",
      "items": {
        "holds": "HOOMOON détient 630 millions d’APTM",
        "appreciation": "Chaque hausse de 0,01 USD = 6,3 millions USD",
        "current": "Valorisation actuelle : 88,2 millions USD"
      },
      "future": {
        "title": "Et si le prix atteignait 5,00 USD ?",
        "description": "Le fonds HOOMOON vaudrait plus de 3,15 milliards USD, avec plus de 2,5 milliards USD de bénéfices accumulés."
      }
    },
    "roadmap": {
      "title": "Feuille de route de valorisation — déjà en cours",
      "months": ["Janvier", "Février", "Mars", "Avril", "Mai"],
      "status": {
        "complete": "terminé",
        "current": "en cours",
        "future": "futur"
      },
      "currentStatus": "Nous sommes ici",
      "finalProfit": "Bénéfice cumulé du fonds HOOMOON : 88,2 millions USD"
    },
    "captation": {
      "title": "Pourquoi lever seulement 10 millions USD ?",
      "subtitle": "La liquidité existe déjà\nLe profit a déjà été généré\nLa levée de fonds est uniquement destinée à l'expansion, la structure et la valorisation stratégique",
      "example": "Exemple :",
      "items": {
        "fundraising": "Levée de fonds : 10 000 000 USD",
        "plan": "Plan CALLISTO : 160 % de retour en 40 jours",
        "needed": "6M USD nécessaires pour tout payer"
      },
      "conclusion": {
        "title": "Avec 88,2M USD de bénéfices dans le fonds :",
        "items": [
          "HOOMOON peut couvrir plus de 14 cycles complets CALLISTO",
          "Sans dépendre de nouvelles entrées"
        ]
      }
    },
    "plans": {
      "title": "🌙 Plans HOOMOON | Choisissez votre LUNE",
      "description": "Comment ça marche ?\nChoisissez votre LUNE\nActivez avec Pix, crypto ou solde interne\nRecevez des bénéfices quotidiens automatiques\nRetraits disponibles après 24h — du lundi au vendredi",
      "free": {
        "title": "🆓 HOO FREE",
        "features": [
          "Accès gratuit",
          "Parrainez et gagnez",
          "Aucun investissement requis"
        ],
        "button": "Commencer gratuitement"
      },
      "pandora": {
        "title": "🌙 HOO PANDORA",
        "features": [
          "5 USD pour 60 jours",
          "Retour de 120 % (2,00 % par jour)",
          "Retraits quotidiens"
        ],
        "button": "Investir maintenant"
      },
      "titan": {
        "title": "💠 HOO TITAN",
        "features": [
          "10 USD pour 40 jours",
          "Retour de 140 % (3,25 % par jour)",
          "Retraits tous les 3 jours"
        ],
        "button": "Investir maintenant"
      },
      "callisto": {
        "title": "🪐 HOO CALLISTO",
        "features": [
          "20 USD pour 40 jours",
          "Retour de 160 % (4,57 % par jour)",
          "Retraits tous les 10 jours"
        ],
        "button": "Investir maintenant",
        "popular": "Populaire"
      }
    },
    "rewards": {
      "title": "🧠 Programme de Récompenses de Parrainage",
      "silver": {
        "title": "🥈 HOO SILVER",
        "features": [
          "Accès automatique avec toute activation",
          "Commission directe : 10 %",
          "Déverrouille les niveaux 2 et 3 avec 50 USD de gains en équipe"
        ]
      },
      "gold": {
        "title": "🥇 HOO GOLD",
        "features": [
          "Déverrouillé avec 250 USD de gains cumulés (niveaux 1 à 4)"
        ]
      },
      "black": {
        "title": "🖤 HOO BLACK",
        "features": [
          "Commissions jusqu'au 10e niveau",
          "Mise à niveau automatique lorsque les critères sont remplis"
        ]
      }
    },
    "transparency": {
      "title": "🔍 Transparence Totale",
      "features": [
        "Enregistrement public sur la blockchain",
        "Portefeuilles auditables",
        "Tableau de gains en temps réel",
        "Gouvernance DAO en développement"
      ]
    },
    "cta": {
      "title": "Vous ne rejoignez pas pour soutenir le système. Vous rejoignez pour profiter du profit déjà généré.",
      "subtitle": "HOOMOON offre ce que le marché n'a jamais pu : Rentabilité réelle. Contrôle transparent. Distribution basée sur un fonds déjà valorisé à des millions.",
      "button": "Soyez parmi les premiers à accéder au fonds"
    },
    "footer": {
      "links": {
        "website": "www.hoomoon.ai",
        "terms": "Conditions d'utilisation",
        "privacy": "Politique de confidentialité"
      },
      "location": "Siège : Dubaï | Lancé en janvier 2025",
      "copyright": "Tous droits réservés."
    },
    "dynamicValues": {
      "math": {
        "holds": "630 millions APTM",
        "appreciation": "= 6,3 millions USD",
        "current": "88,2 millions USD"
      },
      "mexc": {
        "visits": "+6 millions",
        "volume": "2,5 milliards USD"
      }
    }
  },
  "vn": {
    "platformMessage": "Nền tảng này là môi trường chính thức của Hoomoon.",
    "login": "Đăng nhập",
    "hero": {
      "tag": "Quỹ đầu tư tiền điện tử",
      "title": "Chhúng tôi không tạo ra một đồng tiền. Chúng tôi tạo ra con đường trực tiếp đến sự tăng giá của nó.",
      "subtitle": "Truy cập sớm vào cuộc cách mạng tiếp theo trong phân phối giá trị tiền điện tử.",
      "getStarted": "Bắt đầu",
      "viewPlans": "Xem kế hoạch",
      "fundInfo": "HOOMOON nắm giữ 630 triệu APTM (30% tổng cung)",
      "techInfo": "Được hỗ trợ bởi công nghệ. Dựa trên sự thật.",
      "scrollText": "Cuộn xuống để khám phá"
    },
    "stats": {
      "title": "Tại sao nên tin tưởng APTM?",
      "description": "APTM (Apertum) là blockchain lớp 1 tương thích EVM, có khả năng mở rộng với phí cực thấp. Gần đây đã được niêm yết trên MEXC — một trong 10 sàn giao dịch hàng đầu thế giới.",
      "uniqueWallets": "Ví duy nhất",
      "dailyTransactions": "Giao dịch hàng ngày",
      "dailyVolume": "Khối lượng giao dịch hàng ngày",
      "activePools": "Pool DEX đang hoạt động",
      "baseTechnology": "Công nghệ nền tảng",
      "mexcTitle": "MEXC:",
      "mexcStats": {
        "rank": "Thứ 7 trên thế giới",
        "visits": "+6 triệu lượt truy cập mỗi tuần",
        "volume": "2,5 tỷ USD giao dịch mỗi ngày"
      },
      "institutional": "HOOMOON là một trong những tổ chức nắm giữ APTM lớn nhất."
    },
    "math": {
      "title": "Toán học của HOOMOON",
      "description": "Mỗi khi APTM tăng 0,01 USD, HOOMOON thu được 6,3 triệu USD lợi nhuận. Với mức giá hiện tại là 1,14 USD, quỹ đã tạo ra 88,2 triệu USD lợi nhuận — mà không cần bán một token nào.",
      "calculation": "Phép tính đơn giản:",
      "items": {
        "holds": "HOOMOON nắm giữ 630 triệu APTM",
        "appreciation": "Mỗi lần tăng 0,01 USD = 6,3 triệu USD",
        "current": "Tăng giá hiện tại: 88,2 triệu USD"
      },
      "future": {
        "title": "Nếu giá đạt 5,00 USD thì sao?",
        "description": "Quỹ HOOMOON sẽ có giá trị hơn 3,15 tỷ USD, với hơn 2,5 tỷ USD lợi nhuận tích lũy."
      }
    },
    "roadmap": {
      "title": "Lộ trình tăng giá — đang được triển khai",
      "months": ["Tháng Một", "Tháng Hai", "Tháng Ba", "Tháng Tư", "Tháng Năm"],
      "status": {
        "complete": "hoàn thành",
        "current": "hiện tại",
        "future": "tương lai"
      },
      "currentStatus": "Chúng tôi đang ở đây",
      "finalProfit": "Lợi nhuận tích lũy của quỹ HOOMOON: 88,2 triệu USD"
    },
    "captation": {
      "title": "Tại sao chỉ huy động 10 triệu USD?",
      "subtitle": "Thanh khoản đã có\nLợi nhuận đã được tạo ra\nHuy động vốn chỉ để mở rộng, cấu trúc và tăng giá chiến lược",
      "example": "Ví dụ:",
      "items": {
        "fundraising": "Huy động vốn: 10.000.000 USD",
        "plan": "Kế hoạch CALLISTO: Lợi nhuận 160% trong 40 ngày",
        "needed": "Cần 6 triệu USD để thanh toán toàn bộ"
      },
      "conclusion": {
        "title": "Với 88,2 triệu USD lợi nhuận trong quỹ:",
        "items": [
          "HOOMOON có thể chi trả hơn 14 chu kỳ CALLISTO hoàn chỉnh",
          "Không cần phụ thuộc vào dòng tiền mới"
        ]
      }
    },
    "plans": {
      "title": "🌙 Kế hoạch HOOMOON | Chọn MẶT TRĂNG của bạn",
      "description": "Hoạt động như thế nào?\nChọn MẶT TRĂNG của bạn\nKích hoạt bằng Pix, crypto hoặc số dư nội bộ\nNhận lợi nhuận hàng ngày tự động\nRút tiền sau 24h — từ thứ Hai đến thứ Sáu",
      "free": {
        "title": "🆓 HOO FREE",
        "features": [
          "Truy cập miễn phí",
          "Giới thiệu và nhận thưởng",
          "Không cần đầu tư"
        ],
        "button": "Bắt đầu miễn phí"
      },
      "pandora": {
        "title": "🌙 HOO PANDORA",
        "features": [
          "5 USD trong 60 ngày",
          "Lợi nhuận 120% (2,00% mỗi ngày)",
          "Rút tiền hàng ngày"
        ],
        "button": "Đầu tư ngay"
      },
      "titan": {
        "title": "💠 HOO TITAN",
        "features": [
          "10 USD trong 40 ngày",
          "Lợi nhuận 140% (3,25% mỗi ngày)",
          "Rút tiền mỗi 3 ngày"
        ],
        "button": "Đầu tư ngay"
      },
      "callisto": {
        "title": "🪐 HOO CALLISTO",
        "features": [
          "20 USD trong 40 ngày",
          "Lợi nhuận 160% (4,57% mỗi ngày)",
          "Rút tiền mỗi 10 ngày"
        ],
        "button": "Đầu tư ngay",
        "popular": "Phổ biến"
      }
    },
    "rewards": {
      "title": "🧠 Chương trình thưởng giới thiệu",
      "silver": {
        "title": "🥈 HOO SILVER",
        "features": [
          "Truy cập tự động với bất kỳ kích hoạt nào",
          "Hoa hồng trực tiếp: 10%",
          "Mở khóa cấp 2 và 3 khi đội nhóm đạt 50 USD"
        ]
      },
      "gold": {
        "title": "🥇 HOO GOLD",
        "features": [
          "Mở khóa với 250 USD lợi nhuận tích lũy (cấp 1 đến 4)"
        ]
      },
      "black": {
        "title": "🖤 HOO BLACK",
        "features": [
          "Hoa hồng lên đến cấp 10",
          "Tự động nâng cấp khi đáp ứng điều kiện"
        ]
      }
    },
    "transparency": {
      "title": "🔍 Minh bạch tuyệt đối",
      "features": [
        "Đăng ký trên blockchain công khai",
        "Ví có thể kiểm toán",
        "Bảng điều khiển lợi nhuận thời gian thực",
        "DAO đang được phát triển"
      ]
    },
    "cta": {
      "title": "Bạn không tham gia để duy trì hệ thống. Bạn tham gia để hưởng lợi từ lợi nhuận đã được tạo ra.",
      "subtitle": "HOOMOON mang lại điều mà thị trường chưa từng làm được: Lợi nhuận thực. Kiểm soát minh bạch. Phân phối dựa trên một quỹ đã tăng giá hàng triệu.",
      "button": "Hãy là một trong những người đầu tiên truy cập quỹ"
    },
    "footer": {
      "links": {
        "website": "www.hoomoon.ai",
        "terms": "Điều khoản sử dụng",
        "privacy": "Chính sách quyền riêng tư"
      },
      "location": "Trụ sở chính: Dubai | Ra mắt tháng 1 năm 2025",
      "copyright": "Bảo lưu mọi quyền."
    },
    "dynamicValues": {
      "math": {
        "holds": "630 triệu APTM",
        "appreciation": "= 6,3 triệu USD",
        "current": "88,2 triệu USD"
      },
      "mexc": {
        "visits": "+6 triệu",
        "volume": "2,5 tỷ USD"
      }
    }
  },
  "ko": {
    "platformMessage": "이 플랫폼은 공식 Hoomoon 환경입니다.",
    "login": "로그인",
    "hero": {
      "tag": "암호화폐 투자 펀드",
      "title": "우리리는 화폐를 만든 것이 아닙니다. 우리는 그것의 가치 상승으로 가는 직행로를 만들었습니다.",
      "subtitle": "암호화폐 가치 분배의 다음 혁명에 조기 접근하세요.",
      "getStarted": "시작하기",
      "viewPlans": "플랜 보기",
      "fundInfo": "HOOMOON은 APTM 6억 3천만 개(전체 공급량의 30%)를 보유하고 있습니다.",
      "techInfo": "기술로 구동되고, 사실로 뒷받침됩니다.",
      "scrollText": "아래로 스크롤하여 확인"
    },
    "stats": {
      "title": "왜 APTM을 신뢰해야 할까요?",
      "description": "APTM(Apertum)은 EVM 호환 Layer 1 블록체인으로, 확장 가능하고 수수료가 매우 저렴합니다. 최근 세계 10대 거래소 중 하나인 MEXC에 상장되었습니다.",
      "uniqueWallets": "고유 지갑 수",
      "dailyTransactions": "일일 거래 수",
      "dailyVolume": "일일 거래량",
      "activePools": "활성 DEX 풀",
      "baseTechnology": "기반 기술",
      "mexcTitle": "MEXC:",
      "mexcStats": {
        "rank": "세계 7위",
        "visits": "주간 방문자 수 600만+",
        "volume": "일일 거래량 25억 달러"
      },
      "institutional": "HOOMOON은 APTM의 주요 기관 보유자 중 하나입니다."
    },
    "math": {
      "title": "HOOMOON의 수학",
      "description": "APTM이 0.01달러 오를 때마다 HOOMOON은 630만 달러의 수익을 얻습니다. 현재 가격이 1.14달러일 때, 펀드는 이미 8,820만 달러의 수익을 창출했습니다 — 단 한 개의 토큰도 판매하지 않고.",
      "calculation": "간단한 계산:",
      "items": {
        "holds": "HOOMOON은 APTM 6억 3천만 개 보유",
        "appreciation": "0.01달러 상승당 수익 = 630만 달러",
        "current": "현재 누적 수익: 8,820만 달러"
      },
      "future": {
        "title": "가격이 5달러에 도달한다면?",
        "description": "HOOMOON 펀드의 가치는 31억 5천만 달러를 초과하며, 누적 수익은 25억 달러를 넘습니다."
      }
    },
    "roadmap": {
      "title": "가치 상승 로드맵 — 이미 진행 중",
      "months": ["1월", "2월", "3월", "4월", "5월"],
      "status": {
        "complete": "완료됨",
        "current": "현재",
        "future": "예정"
      },
      "currentStatus": "우리는 여기 있습니다",
      "finalProfit": "HOOMOON 펀드 누적 수익: 8,820만 달러"
    },
    "captation": {
      "title": "왜 1,000만 달러만 모금할까요?",
      "subtitle": "유동성은 이미 확보됨\n수익은 이미 창출됨\n모금은 확장, 구조화, 전략적 가치 상승을 위한 것일 뿐",
      "example": "예시:",
      "items": {
        "fundraising": "모금액: 1,000만 달러",
        "plan": "CALLISTO 플랜: 40일 동안 160% 수익",
        "needed": "전체 지급에 필요한 금액: 600만 달러"
      },
      "conclusion": {
        "title": "펀드 내 수익 8,820만 달러로:",
        "items": [
          "HOOMOON은 14개 이상의 CALLISTO 사이클을 완전하게 지급할 수 있음",
          "신규 유입 없이도 가능"
        ]
      }
    },
    "plans": {
      "title": "🌙 HOOMOON 플랜 | 당신의 MOON을 선택하세요",
      "description": "어떻게 작동하나요?\nMOON을 선택하세요\nPix, 암호화폐 또는 내부 잔액으로 활성화\n일일 자동 수익 지급\n출금은 월~금 24시간 후 가능",
      "free": {
        "title": "🆓 HOO FREE",
        "features": [
          "무료 접근",
          "추천하고 수익 받기",
          "투자 불필요"
        ],
        "button": "무료 시작"
      },
      "pandora": {
        "title": "🌙 HOO PANDORA",
        "features": [
          "60일 동안 5달러",
          "120% 수익 (하루 2.00%)",
          "매일 출금 가능"
        ],
        "button": "지금 투자하기"
      },
      "titan": {
        "title": "💠 HOO TITAN",
        "features": [
          "40일 동안 10달러",
          "140% 수익 (하루 3.25%)",
          "3일마다 출금 가능"
        ],
        "button": "지금 투자하기"
      },
      "callisto": {
        "title": "🪐 HOO CALLISTO",
        "features": [
          "40일 동안 20달러",
          "160% 수익 (하루 4.57%)",
          "10일마다 출금 가능"
        ],
        "button": "지금 투자하기",
        "popular": "인기"
      }
    },
    "rewards": {
      "title": "🧠 추천 보상 프로그램",
      "silver": {
        "title": "🥈 HOO SILVER",
        "features": [
          "모든 활성화 시 자동 참여",
          "직접 커미션: 10%",
          "팀 수익 50달러 달성 시 2~3단계 개방"
        ]
      },
      "gold": {
        "title": "🥇 HOO GOLD",
        "features": [
          "누적 수익 250달러로 1~4단계 개방"
        ]
      },
      "black": {
        "title": "🖤 HOO BLACK",
        "features": [
          "최대 10단계까지 커미션 수령 가능",
          "조건 충족 시 자동 승급"
        ]
      }
    },
    "transparency": {
      "title": "🔍 완전한 투명성",
      "features": [
        "공개 블록체인 등록",
        "감사 가능한 지갑",
        "실시간 수익 패널",
        "개발 중인 DAO 거버넌스"
      ]
    },
    "cta": {
      "title": "당신은 시스템을 유지하기 위해 가입하는 것이 아닙니다. 이미 발생한 수익을 누리기 위해 가입하는 것입니다.",
      "subtitle": "HOOMOON은 시장이 결코 제공하지 못한 것을 제공합니다: 실질적인 수익성. 투명한 제어. 이미 가치가 상승한 펀드를 기반으로 한 분배.",
      "button": "펀드에 가장 먼저 접근하세요"
    },
    "footer": {
      "links": {
        "website": "www.hoomoon.ai",
        "terms": "이용 약관",
        "privacy": "개인정보 보호정책"
      },
      "location": "본사: 두바이 | 2025년 1월 출시",
      "copyright": "모든 권리 보유."
    },
    "dynamicValues": {
      "math": {
        "holds": "6억 3천만 APTM",
        "appreciation": "= 630만 달러",
        "current": "8,820만 달러"
      },
      "mexc": {
        "visits": "600만+",
        "volume": "25억 달러"
      }
    }
  }




}

// Função auxiliar para acessar valores dinâmicos
function getDynamicValue(translations: any, lang: string, section: string, key: string): string {
  return translations[lang]?.dynamicValues?.[section]?.[key] || translations['en']?.dynamicValues?.[section]?.[key] || ''
}

// Componente para seleção de idioma
function LanguageSelector({ currentLang }: { currentLang: string }) {
  const [isOpen, setIsOpen] = useState(false)
  
  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'pt-BR', name: 'Português', flag: '🇧🇷' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'vn', name: 'Việt Nam', flag: '🇻🇳' },
    { code: 'ko', name: '한국어', flag: '🇰🇷' }
  ]
  
  const currentLanguage = languages.find(lang => lang.code === currentLang)
  
  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-zinc-900/50 border border-zinc-700 rounded-lg hover:border-[#66e0cc]/50 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Globe className="w-4 h-4" />
        <span className="text-sm">{currentLanguage?.flag}</span>
      </motion.button>
      
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="absolute top-full mt-2 right-0 bg-zinc-900 border border-zinc-700 rounded-lg overflow-hidden z-50"
        >
          {languages.map((lang) => (
            <Link
              key={lang.code}
              href={`/${lang.code}`}
              className="flex items-center gap-3 px-4 py-3 hover:bg-zinc-800 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <span>{lang.flag}</span>
              <span className="text-sm">{lang.name}</span>
            </Link>
          ))}
        </motion.div>
      )}
    </div>
  )
}

export default function LandingPage({ params }: { params: Promise<{ lang: string }> }) {
  const [isLoading, setIsLoading] = useState(true)
  const [isMounted, setIsMounted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Unwrap params usando React.use()
  const resolvedParams = use(params)
  const lang = resolvedParams.lang as keyof typeof translations
  const t = translations[lang] || translations['en']

  // Only initialize useScroll when mounted and ref is available
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  // Parallax effect values - only use when mounted
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 300])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -300])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0])

  useEffect(() => {
    // Set mounted state first
    setIsMounted(true)

    // Simulate loading with a shorter delay to reduce SSR issues
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  // Stats data
  const stats = [
    { value: "30,000+", label: t.stats.uniqueWallets },
    { value: "12,000+", label: t.stats.dailyTransactions },
    { value: "$15M+", label: t.stats.dailyVolume },
    { value: "100+", label: t.stats.activePools },
    { value: "Avalanche", label: t.stats.baseTechnology },
  ]

  // Roadmap data
  const roadmap = [
    { month: t.roadmap.months[0], value: "$1,00", status: "completo" },
    { month: t.roadmap.months[1], value: "$1,03", status: "completo" },
    { month: t.roadmap.months[2], value: "$1,07", status: "completo" },
    { month: t.roadmap.months[3], value: "$1,11", status: "atual" },
    { month: t.roadmap.months[4], value: "$1,14", status: "futuro" },
  ]

  // Show a simple loading state during SSR and initial mount
  if (!isMounted) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <div className="text-white text-2xl font-bold">
          HOO<span className="text-[#66e0cc]">MOON</span>
        </div>
      </div>
    )
  }

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
            <div className="w-32 h-32 relative mb-8 flex items-center justify-center">
              <div className="text-4xl font-bold text-white">
                HOO<span className="text-[#66e0cc]">MOON</span>
              </div>
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
          transition={{ duration: 0.5, delay: 1.7 }}
        >
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            {/* Logo  frase institucional */}
            <div className="flex flex-col items-start">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 relative">
                  <Image
                    src="/images/hoomoon-logo.png"
                    alt="HOOMOON Logo"
                    fill
                    style={{ objectFit: "contain" }}
                    priority
                  />
                </div>
                <span className="text-2xl font-bold text-white">HOOMOON</span>
              </div>
              <p className="text-xs text-gray-300">
                {t.platformMessage}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <LanguageSelector currentLang={lang} />
              <Link 
                href="https://app.hoomoon.ai/#/login" 
                className="bg-[#66e0cc] text-black font-medium px-6 py-2 rounded-full flex items-center gap-2 hover:bg-[#66e0cc]/90 transition-colors"
              >
                {t.login}
                <ArrowRight className="w-4 h-4" />
              </Link>
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
              transition={{ duration: 0.8, delay: 2 }}
            >
              <motion.div
                className="inline-block bg-[#66e0cc]/10 border border-[#66e0cc]/20 rounded-full px-4 py-1 text-[#66e0cc] text-sm font-medium mb-6"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 2.2 }}
              >
                {t.hero.tag}
              </motion.div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                <TypewriterEffect
                  text={t.hero.title}
                  delay={2500}
                />
              </h1>

              <motion.p
                className="text-gray-400 text-lg mb-8 max-w-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 4.5 }}
              >
                {t.hero.subtitle}
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 4.7 }}
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="https://app.hoomoon.ai/#/login"
                    className="group bg-[#66e0cc] text-black font-bold px-8 py-4 rounded-xl flex items-center justify-center hover:bg-[#66e0cc]/90 transition-all duration-300 relative overflow-hidden"
                  >
                    <span className="relative z-10">{t.hero.getStarted}</span>
                    <span className="group-hover:translate-x-1 transition-transform duration-300 ml-2 relative z-10">
                      <ArrowRight size={18} />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#66e0cc] to-[#66e0cc]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Link>
                </motion.div>
              </motion.div>

              <motion.div
                className="bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 rounded-xl p-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 5 }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full bg-[#66e0cc]"></div>
                  <p className="text-sm font-medium">
                    {t.hero.fundInfo}
                  </p>
                </div>
                <div className="h-3 bg-zinc-800 rounded-full overflow-hidden mb-4">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#66e0cc] to-[#66e0cc]/70 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: "30%" }}
                    transition={{ duration: 1, delay: 5.5 }}
                  ></motion.div>
                </div>
                <p className="text-xs text-gray-500 text-center">{t.hero.techInfo}</p>
              </motion.div>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 6 }}
          >
            <div className="flex flex-col items-center">
              <p className="text-xs text-gray-500 mb-2">{t.hero.scrollText}</p>
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
              <h2 className="text-3xl md:text-4xl font-bold mb-6">{t.stats.title}</h2>
              <p className="text-gray-400">
                {t.stats.description}
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
              <h3 className="text-xl font-bold mb-4 text-center">{t.stats.mexcTitle}</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-zinc-800 p-4 rounded-lg text-center">
                  <p className="text-[#66e0cc] font-bold">{t.stats.mexcStats.rank}</p>
                </div>
                <div className="bg-zinc-800 p-4 rounded-lg text-center">
                  <p className="text-[#66e0cc] font-bold">{getDynamicValue(translations, lang, 'mexc', 'visits')}</p>
                  <p className="text-sm text-gray-400">{t.stats.mexcStats.visits}</p>
                </div>
                <div className="bg-zinc-800 p-4 rounded-lg text-center">
                  <p className="text-[#66e0cc] font-bold">{getDynamicValue(translations, lang, 'mexc', 'volume')}</p>
                  <p className="text-sm text-gray-400">{t.stats.mexcStats.volume}</p>
                </div>
              </div>
              <p className="text-center text-gray-400 mt-4">
                {t.stats.institutional}
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
                {t.math.title}
              </motion.h2>
              <motion.p
                className="text-gray-400 text-center mb-12"
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                {t.math.description}
              </motion.p>

              <motion.div
                className="bg-zinc-900 rounded-xl p-8 mb-12"
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-bold mb-4">{t.math.calculation}</h3>
                <div className="space-y-4">
                  {[
                    { label: t.math.items.holds, value: getDynamicValue(translations, lang, 'math', 'holds') },
                    { label: t.math.items.appreciation, value: getDynamicValue(translations, lang, 'math', 'appreciation') },
                    { label: t.math.items.current, value: getDynamicValue(translations, lang, 'math', 'current'), highlight: true },
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
                  <h4 className="font-bold mb-2">{t.math.future.title}</h4>
                  <p className="text-sm text-gray-300">
                    {t.math.future.description}
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
                {t.roadmap.title}
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
                          {t.roadmap.status.current}
                        </motion.div>
                      )}
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Current Status */}
            <motion.div
              className="mt-12 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="inline-block bg-[#66e0cc]/10 border border-[#66e0cc]/20 rounded-full px-6 py-2">
                <p className="text-[#66e0cc] font-bold">
                  {t.roadmap.finalProfit}
                </p>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Captation Section */}
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
              <h2 className="text-3xl md:text-4xl font-bold mb-6">{t.captation.title}</h2>
              <p className="text-gray-400 whitespace-pre-line">{t.captation.subtitle}</p>
            </motion.div>

            <motion.div
              className="bg-zinc-800 rounded-xl p-8 max-w-3xl mx-auto"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold mb-4 text-center">{t.captation.example}</h3>
              <div className="space-y-4">
                <div className="p-3 bg-zinc-700 rounded-lg">
                  <p className="font-medium">{t.captation.items.fundraising}</p>
                </div>
                <div className="p-3 bg-zinc-700 rounded-lg">
                  <p className="font-medium">{t.captation.items.plan}</p>
                </div>
                <div className="p-3 bg-zinc-700 rounded-lg">
                  <p className="font-medium">{t.captation.items.needed}</p>
                </div>

                <div className="p-4 bg-[#66e0cc]/10 rounded-lg border border-[#66e0cc]/30 mt-6">
                  <p className="font-bold text-[#66e0cc]">{t.captation.conclusion.title}</p>
                  <ul className="mt-2 space-y-2">
                    {t.captation.conclusion.items.map((item, index) => (
                      <li key={index} className="flex items-center">
                        <span className="mr-2">→</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Plans Section */}
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
              <h2 className="text-3xl md:text-4xl font-bold mb-6">{t.plans.title}</h2>
              <p className="text-gray-400 whitespace-pre-line">{t.plans.description}</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {/* HOO FREE */}
              <motion.div
                className="bg-zinc-900 rounded-xl p-6 border border-zinc-800"
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, boxShadow: "0 10px 30px -15px rgba(102, 224, 204, 0.2)" }}
              >
                <div className="text-2xl font-bold mb-2">{t.plans.free.title}</div>
                <ul className="space-y-2 mb-6">
                  {t.plans.free.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className="w-full bg-[#66e0cc] text-black font-bold py-3 rounded-lg hover:bg-[#66e0cc]/90 transition-colors">
                  {t.plans.free.button}
                </button>
              </motion.div>

              {/* HOO PANDORA */}
              <motion.div
                className="bg-zinc-900 rounded-xl p-6 border border-zinc-800"
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, boxShadow: "0 10px 30px -15px rgba(34, 197, 94, 0.2)" }}
              >
                <div className="text-2xl font-bold mb-2" style={{ color: "#22c55e" }}>
                  {t.plans.pandora.title}
                </div>
                <ul className="space-y-2 mb-6">
                  {t.plans.pandora.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className="w-full text-black font-bold py-3 rounded-lg transition-colors"
                  style={{ backgroundColor: "#22c55e" }}
                >
                  {t.plans.pandora.button}
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
                <div className="text-2xl font-bold mb-2">{t.plans.titan.title}</div>
                <ul className="space-y-2 mb-6">
                  {t.plans.titan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className="w-full bg-[#66e0cc] text-black font-bold py-3 rounded-lg hover:bg-[#66e0cc]/90 transition-colors">
                  {t.plans.titan.button}
                </button>
              </motion.div>

              {/* HOO CALLISTO */}
              <motion.div
                className="bg-zinc-900 rounded-xl p-6 border border-[#66e0cc]/30 relative"
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, boxShadow: "0 10px 30px -15px rgba(102, 224, 204, 0.3)" }}
              >
                <div className="absolute top-4 right-4 bg-[#66e0cc] text-black text-xs font-bold px-2 py-1 rounded-full">
                  {t.plans.callisto.popular}
                </div>
                <div className="text-2xl font-bold mb-2">{t.plans.callisto.title}</div>
                <ul className="space-y-2 mb-6">
                  {t.plans.callisto.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className="w-full bg-[#66e0cc] text-black font-bold py-3 rounded-lg hover:bg-[#66e0cc]/90 transition-colors">
                  {t.plans.callisto.button}
                </button>
              </motion.div>
            </div>

            {/* Rewards Program */}
            <motion.div
              className="max-w-3xl mx-auto mt-16"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-center mb-8">{t.rewards.title}</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* HOO SILVER */}
                <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
                  <h4 className="text-xl font-bold mb-3">{t.rewards.silver.title}</h4>
                  <ul className="space-y-2 text-sm">
                    {t.rewards.silver.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>

                {/* HOO GOLD */}
                <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
                  <h4 className="text-xl font-bold mb-3">{t.rewards.gold.title}</h4>
                  <ul className="space-y-2 text-sm">
                    {t.rewards.gold.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>

                {/* HOO BLACK */}
                <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
                  <h4 className="text-xl font-bold mb-3">{t.rewards.black.title}</h4>
                  <ul className="space-y-2 text-sm">
                    {t.rewards.black.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Transparency */}
            <motion.div
              className="max-w-3xl mx-auto mt-16 bg-zinc-900 p-8 rounded-xl border border-zinc-800"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-center mb-6">{t.transparency.title}</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {t.transparency.features.map((feature, index) => (
                  <div key={index} className="bg-zinc-800 p-4 rounded-lg text-center">
                    <p className="text-sm">{feature}</p>
                  </div>
                ))}
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
              {t.cta.title}
            </motion.h2>
            <motion.p
              className="text-gray-400 max-w-2xl mx-auto mb-8"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {t.cta.subtitle}
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
                href="https://app.hoomoon.ai/#/register"
                className="group bg-[#66e0cc] text-black font-bold px-10 py-4 rounded-xl inline-flex items-center hover:bg-[#66e0cc]/90 transition-all duration-300 relative overflow-hidden"
              >
                <span className="relative z-10">{t.cta.button}</span>
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
                <div className="w-8 h-8 flex items-center justify-center mr-2">
                  <span className="text-[#66e0cc]">🌙</span>
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
                  href="https://app.hoomoon.ai"
                  target="_blank"
                  className="text-sm text-gray-400 hover:text-white transition-colors flex items-center"
                >
                  {t.footer.links.website} <ExternalLink size={12} className="ml-1" />
                </Link>
                <Link href="https://app.hoomoon.ai/#/login" className="text-sm text-gray-400 hover:text-white transition-colors">
                  {t.footer.links.terms}
                </Link>
                <Link href="https://app.hoomoon.ai/#/login" className="text-sm text-gray-400 hover:text-white transition-colors">
                  {t.footer.links.privacy}
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
                  {t.footer.location}
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
              <motion.div
                className="text-center text-xs text-gray-500 mt-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                © {new Date().getFullYear()} HOOMOON. {t.footer.copyright}
              </motion.div>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
} 