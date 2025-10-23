"use client"

import { easeOut, motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState, useCallback } from "react" // ✅ useCallback adicionado
import {
  Square,
  Lightbulb,
  Palette,
  Camera,
  Rocket,
  ArrowRight,
  CheckCircle,
  Users,
  Award,
  Clock,
} from "lucide-react"
import { ExpandingCards } from "./ui/expanding-cards"

const Process = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" }) // ✅ Margin para carregar antes
  const [activeCard, setActiveCard] = useState(0)

  // ✅ useCallback para evitar re-renders desnecessários
  const handleCardChange = useCallback((index: number) => {
    setActiveCard(index)
  }, [])

  const processSteps = [
    {
      id: "1",
      title: "Briefing & Planejamento",
      subtitle: "Entendemos você e suas necessidades",
      description:
        "Entendemos suas necessidades, objetivos do projeto e definimos o escopo para criar a base perfeita.",
      icon: <Users className="h-5 w-5 text-blue-400" />,
      backgroundUrl:
        "https://images.pexels.com/photos/3184295/pexels-photo-3184295.jpeg?auto=compress&cs=tinysrgb&w=800", // ✅ Imagem otimizada
      features: [
        "Análise de necessidades",
        "Definição de escopo",
        "Planejamento estratégico",
      ],
      cta: "Agendar briefing",
      color: "from-blue-500 to-cyan-500",
      duration: "1-2 dias",
    },
    {
      id: "2",
      title: "Modelagem 3D",
      subtitle: "Visualize seu projeto antes da obra",
      description:
        "Criamos o modelo tridimensional fiel ao projeto arquitetônico com precisão milimétrica.",
      icon: <Square className="h-5 w-5 text-purple-400" />,
      backgroundUrl:
        "https://images.pexels.com/photos/3183176/pexels-photo-3183176.jpeg?auto=compress&cs=tinysrgb&w=800",
      features: [
        "Modelagem precisa",
        "Visualização 360°",
        "Ajustes em tempo real",
      ],
      cta: "Ver exemplos",
      color: "from-purple-500 to-pink-500",
      duration: "3-5 dias",
    },
    {
      id: "3",
      title: "Texturização & Iluminação",
      subtitle: "Sinta a atmosfera real do espaço",
      description:
        "Aplicamos materiais realistas e configuração de iluminação profissional que transformam o conceito em realidade.",
      icon: <Palette className="h-5 w-5 text-amber-400" />,
      backgroundUrl:
        "https://images.pexels.com/photos/3184305/pexels-photo-3184305.jpeg?auto=compress&cs=tinysrgb&w=800",
      features: [
        "Materiais realistas",
        "Iluminação natural",
        "Efeitos especiais",
      ],
      cta: "Explorar materiais",
      color: "from-amber-500 to-orange-500",
      duration: "2-4 dias",
    },
    {
      id: "4",
      title: "Renderização & Pós-produção",
      subtitle: "Resultados fotorealistas que impressionam",
      description:
        "Processamento das imagens e ajustes finos para máximo realismo que superam expectativas.",
      icon: <Camera className="h-5 w-5 text-emerald-400" />,
      backgroundUrl:
        "https://images.pexels.com/photos/3184307/pexels-photo-3184307.jpeg?auto=compress&cs=tinysrgb&w=800",
      features: [
        "Render 4K/8K",
        "Pós-produção avançada",
        "Revisões detalhadas",
      ],
      cta: "Ver renders",
      color: "from-emerald-500 to-teal-500",
      duration: "2-3 dias",
    },
    {
      id: "5",
      title: "Entrega & Acompanhamento",
      subtitle: "Projeto perfeito com garantia total",
      description:
        "Enviamos os arquivos finais e realizamos os ajustes necessários com suporte contínuo.",
      icon: <Rocket className="h-5 w-5 text-rose-400" />,
      backgroundUrl:
        "https://images.pexels.com/photos/3184309/pexels-photo-3184309.jpeg?auto=compress&cs=tinysrgb&w=800",
      features: [
        "Entrega completa",
        "Suporte 30 dias",
        "Garantia de satisfação",
      ],
      cta: "Garantir entrega",
      color: "from-rose-500 to-red-500",
      duration: "1 dia",
    },
  ]

  const headerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6, // ✅ Reduzido
        ease: easeOut,
      },
    },
  }

  const statsVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: easeOut,
      },
    },
  }

  return (
    <section id="process" className="overflow-hidden bg-black py-20 text-white">
      <div className="container mx-auto px-4">
        {/* Header Impactante */}
        <motion.div
          className="mb-16 text-center"
          variants={headerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.h2
            className="font-bbh relative z-10 mb-3 bg-gradient-to-r from-teal-400 via-cyan-600 to-teal-800 bg-clip-text text-2xl font-bold tracking-wide text-transparent sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl"
            animate={{
              backgroundPosition: ["0%", "100%", "0%"],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              backgroundSize: "200% 100%",
            }}
          >
            Do Conceito a Realidade
          </motion.h2>

          <motion.div
            className="mx-auto h-px w-48 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"
            initial={{ width: 0 }}
            animate={isInView ? { width: 192 } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }} // ✅ Reduzido
          />

          <motion.p
            className="mx-auto mt-8 max-w-3xl text-xl leading-relaxed text-gray-300"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }} // ✅ Reduzido
          >
            Cada etapa do nosso processo é cuidadosamente planejada para
            transformar sua visão em
            <span className="bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text font-semibold text-transparent">
              {" "}
              resultados tangíveis
            </span>{" "}
            com precisão, criatividade e atenção aos detalhes.
          </motion.p>
        </motion.div>

        {/* Expanding Cards - Processo Visual */}
        <motion.div
          ref={ref}
          className="mb-20 flex min-h-[500px] items-center justify-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <ExpandingCards
            items={processSteps}
            onCardChange={handleCardChange}
            className="h-[500px]" // ✅ Reduzido
          />
        </motion.div>

        {/* Detalhes do Passo Ativo */}
        <motion.div
          className="mx-auto mb-16 max-w-6xl rounded-2xl bg-gradient-to-br from-gray-900/50 to-black/50 p-6 backdrop-blur-xl" // ✅ padding reduzido
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.4 }} // ✅ Reduzido
        >
          <div className="grid gap-6 md:grid-cols-2">
            {/* Informações do Passo */}
            <div>
              <div className="mb-4 flex items-center gap-4">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r ${processSteps[activeCard].color} shadow-lg`}
                >
                  {processSteps[activeCard].icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">
                    {processSteps[activeCard].title}
                  </h3>
                  <p className="text-cyan-300">
                    {processSteps[activeCard].subtitle}
                  </p>
                </div>
              </div>

              <p className="mb-4 leading-relaxed text-gray-300">
                {processSteps[activeCard].description}
              </p>

              <div className="mb-4 flex items-center gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{processSteps[activeCard].duration}</span>
                </div>
                <div className="h-4 w-px bg-gray-600" />
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>Garantia de qualidade</span>
                </div>
              </div>

              <motion.a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500 to-teal-500 px-5 py-2.5 font-semibold text-white shadow-lg"
                whileHover={{ scale: 1.02 }} // ✅ Reduzido
                whileTap={{ scale: 0.98 }}
              >
                <span>{processSteps[activeCard].cta}</span>
                <ArrowRight className="h-4 w-4" />
              </motion.a>
            </div>

            {/* Features do Passo */}
            <div>
              <h4 className="mb-3 text-lg font-semibold text-white">
                O que inclui:
              </h4>
              <div className="space-y-2">
                {processSteps[activeCard].features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 rounded-lg bg-gray-800/50 p-3 backdrop-blur-sm"
                  >
                    <div
                      className={`flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r ${processSteps[activeCard].color}`}
                    >
                      <CheckCircle className="h-3 w-3 text-white" />
                    </div>
                    <span className="text-gray-200">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Estatísticas e Garantias - Simplificado */}
        <motion.div
          className="grid gap-4 md:grid-cols-3"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                duration: 0.4,
              },
            },
          }}
        >
          {[
            {
              icon: Award,
              value: "100%",
              label: "Clientes Satisfeitos",
              color: "from-green-500 to-emerald-500",
            },
            {
              icon: Clock,
              value: "10-15",
              label: "Dias em Média",
              color: "from-blue-500 to-cyan-500",
            },
            {
              icon: CheckCircle,
              value: "30",
              label: "Dias de Garantia",
              color: "from-purple-500 to-pink-500",
            },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              className="rounded-xl bg-gradient-to-br from-gray-900/50 to-black/50 p-4 backdrop-blur-xl"
              variants={statsVariants}
            >
              <div
                className={`mb-2 inline-flex rounded-lg bg-gradient-to-r ${stat.color} p-2`}
              >
                <stat.icon className="h-5 w-5 text-white" />
              </div>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action Final Simplificado */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-cyan-500/10 px-3 py-1">
            <Lightbulb className="h-4 w-4 text-cyan-400" />
            <span className="text-sm font-medium text-cyan-300">
              Pronto para começar?
            </span>
          </div>

          <h3 className="mb-3 text-xl font-bold text-white">
            Vamos criar algo extraordinário juntos
          </h3>

          <p className="mb-6 text-gray-400">Agende uma consultoria gratuita</p>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <motion.a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500 to-teal-500 px-6 py-3 font-semibold text-white shadow-lg"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Iniciar Meu Projeto</span>
              <Rocket className="h-4 w-4" />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Process
