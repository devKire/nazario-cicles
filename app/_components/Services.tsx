"use client"

import { Service } from "@prisma/client"
import { backOut, easeOut, motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import Image from "next/image"
import { SwipeCards, CardData } from "./ui/swipe-cards"
import { Lightbulb } from "lucide-react"

interface ServicesProps {
  services: Service[]
}

const Services = ({ services }: ServicesProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [cardsKey, setCardsKey] = useState(0) // Key para forçar reinício dos cards
  const [showResetMessage, setShowResetMessage] = useState(false)

  // Converter serviços para o formato dos swipe cards
  const swipeCardsData: CardData[] = services.map((service, index) => ({
    id: index,
    url: service.imageUrl || "/default-service-image.jpg",
    name: service.name,
    bio: service.description,
    location: "Serviço Profissional",
    age: index + 1, // Usando age como número do serviço
    interests: ["3D", "Arquitetura", "Design"], // Interesses padrão ou personalizáveis
  }))

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        duration: 0.8,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: easeOut,
      },
    },
  }

  const cardHoverVariants = {
    initial: { y: 0, scale: 1 },
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: easeOut,
      },
    },
  }

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.5,
        ease: backOut,
      },
    },
  }

  const imageVariants = {
    hidden: { opacity: 0, scale: 1.1 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: easeOut,
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.4,
        ease: easeOut,
      },
    },
  }

  // Ícones futuristas para cada serviço
  const serviceIcons = ["🚀", "🎨", "🏗️", "👁️", "🔄", "📱", "💎", "🌟"]

  // Handler para quando um card é swiped
  const handleSwipe = (id: number, direction: "left" | "right") => {
    console.log(`Card ${id} swiped ${direction}`)
    // Aqui você pode adicionar lógica adicional quando um card é swiped
  }

  // Handler para quando todos os cards acabam
  const handleAllCardsSwiped = () => {
    setShowResetMessage(true)

    // Reiniciar os cards após 2 segundos
    setTimeout(() => {
      setCardsKey((prev) => prev + 1) // Muda a key para forçar reinício
      setShowResetMessage(false)
    }, 2000)
  }

  // Componente SwipeCards modificado para detectar quando acabam os cards
  const CustomSwipeCards = ({
    data,
    onSwipe,
  }: {
    data: CardData[]
    // eslint-disable-next-line no-unused-vars
    onSwipe?: (id: number, direction: "left" | "right") => void
  }) => {
    const [remainingCards, setRemainingCards] = useState(data.length)

    const handleCardSwipe = (id: number, direction: "left" | "right") => {
      setRemainingCards((prev) => prev - 1)
      onSwipe?.(id, direction)

      // Se era o último card, chama o handler
      if (remainingCards === 1) {
        handleAllCardsSwiped()
      }
    }

    return (
      <SwipeCards
        key={cardsKey} // Key muda quando queremos reiniciar
        data={data}
        onSwipe={handleCardSwipe}
        className="h-[500px]"
      />
    )
  }

  return (
    <section
      id="services"
      className="overflow-hidden bg-black py-24 text-white"
    >
      <div className="container mx-auto px-4">
        {/* Header com efeito futurista */}
        <motion.div
          ref={ref}
          className="mb-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
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
            Nossos Servicos
          </motion.h2>

          <motion.div
            className="mx-auto mt-4 h-px w-72 bg-gradient-to-r from-transparent via-teal-500 to-transparent"
            initial={{ width: 0 }}
            animate={isInView ? { width: 200 } : { width: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          />

          <motion.p
            className="mx-auto mt-6 max-w-2xl text-xl text-gray-300"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Soluções completas em visualização arquitetônica 3D para transformar
            seus projetos em experiências visuais imersivas
          </motion.p>
        </motion.div>

        {/* Swipe Cards Container */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col items-center justify-center"
        >
          {/* Versão Mobile - Swipe Cards */}
          <div className="block w-full md:hidden">
            <CustomSwipeCards data={swipeCardsData} onSwipe={handleSwipe} />

            {/* Mensagem de reinício */}
            {showResetMessage &&
              (() => {
                console.log("🔄 Reiniciando animação...")
                return null
              })()}
          </div>

          {/* Versão Desktop - Grid de Cards */}
          <div className="hidden w-full gap-6 px-4 md:grid md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                className="group relative h-full"
                variants={itemVariants}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Efeito de brilho no fundo */}
                <motion.div
                  className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-teal-500/20 to-cyan-500/20 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100"
                  variants={cardHoverVariants}
                />

                {/* Card principal */}
                <motion.div
                  className="relative z-10 h-full overflow-hidden rounded-xl border border-teal-500/30 bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm"
                  variants={cardHoverVariants}
                  initial="initial"
                  whileHover="hover"
                >
                  {/* Container da imagem */}
                  <motion.div
                    className="relative h-48 w-full overflow-hidden"
                    variants={imageVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                  >
                    {service.imageUrl ? (
                      <Image
                        src={service.imageUrl}
                        alt={service.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-teal-500/10 to-cyan-500/10">
                        <span className="text-4xl">
                          {serviceIcons[index] || "✨"}
                        </span>
                      </div>
                    )}

                    {/* Overlay gradiente na imagem */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Número do serviço sobre a imagem */}
                    <div className="absolute left-4 top-4">
                      <motion.div
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-teal-500 to-cyan-400 text-sm font-bold text-black"
                        variants={iconVariants}
                      >
                        {index + 1}
                      </motion.div>
                    </div>

                    {/* Ícone flutuante no hover */}
                    <motion.div
                      className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 backdrop-blur-sm"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={
                        hoveredCard === index
                          ? { scale: 1, opacity: 1 }
                          : { scale: 0, opacity: 0 }
                      }
                      transition={{ duration: 0.3 }}
                    >
                      <span className="text-lg">
                        {serviceIcons[index] || "✨"}
                      </span>
                    </motion.div>
                  </motion.div>

                  {/* Conteúdo do serviço */}
                  <div className="p-6">
                    <motion.h3
                      className="mb-3 text-xl font-semibold text-white"
                      whileHover={{ color: "#2DD4BF" }}
                      transition={{ duration: 0.2 }}
                    >
                      {service.name}
                    </motion.h3>

                    <motion.p
                      className="leading-relaxed text-gray-300"
                      whileHover={{ color: "#E5E5E5" }}
                      transition={{ duration: 0.2 }}
                    >
                      {service.description}
                    </motion.p>
                  </div>

                  {/* Linha decorativa inferior */}
                  <motion.div
                    className="absolute bottom-0 left-1/2 h-1 w-0 -translate-x-1/2 bg-gradient-to-r from-teal-400 to-cyan-400 transition-all duration-500 group-hover:w-3/4"
                    initial={false}
                  />

                  {/* Efeito de borda luminosa no hover */}
                  <motion.div
                    className="absolute inset-0 rounded-xl border-2 border-transparent bg-gradient-to-r from-teal-500 to-cyan-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                      WebkitMask:
                        "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                      maskComposite: "subtract",
                      WebkitMaskComposite: "subtract",
                      padding: "2px",
                    }}
                  />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Instruções para Mobile */}
        <motion.div
          className="mt-8 text-center md:hidden"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p className="text-sm text-gray-400">
            Arraste para os lados para navegar entre os serviços
          </p>
          <p className="mt-2 text-xs text-gray-500">
            Os cards reiniciam automaticamente quando acabam
          </p>
        </motion.div>

        {/* CTA Secundário - Mais direto */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2">
            <Lightbulb className="h-4 w-4 text-cyan-400" />
            <span className="text-sm font-medium text-cyan-300">
              Precisa de ajuda especializada?
            </span>
          </div>

          <p className="mx-auto mb-6 max-w-md text-gray-400">
            Vamos conversar sobre suas ideias e encontrar a melhor solução
          </p>

          <motion.a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-teal-600 to-cyan-600 px-8 py-3 font-semibold text-white shadow-lg transition-all hover:from-teal-500 hover:to-cyan-500 hover:shadow-cyan-500/25"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Falar com Especialista</span>
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

export default Services
