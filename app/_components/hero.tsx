"use client"

import { LandingPage } from "@prisma/client"
import { easeInOut, easeOut, motion } from "framer-motion"
import { useRef, useEffect } from "react"
import Image from "next/image"

interface HeroProps {
  landingPage: LandingPage
}

const Hero = ({ landingPage }: HeroProps) => {
  console.log("Landing Page no Hero:", landingPage)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Efeito para configurar o vídeo
  useEffect(() => {
    const video = videoRef.current
    if (video) {
      video.play().catch((error) => {
        console.log("Autoplay prevented:", error)
        // Fallback para autoplay com interação do usuário
        const handleUserInteraction = () => {
          video.play()
          document.removeEventListener("click", handleUserInteraction)
          document.removeEventListener("touchstart", handleUserInteraction)
        }
        document.addEventListener("click", handleUserInteraction)
        document.addEventListener("touchstart", handleUserInteraction)
      })
    }
  }, [])

  // Partículas para o efeito futurista
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Ajustar canvas para tamanho da tela
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Configuração das partículas
    const particles: Array<{
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      opacity: number
    }> = []

    // Criar partículas
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.2,
      })
    }

    // Animação das partículas
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Desenhar grade arquitetônica sutil
      ctx.strokeStyle = "#008080"
      ctx.globalAlpha = 0.1
      ctx.lineWidth = 0.5

      const gridSize = 50
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      // Atualizar e desenhar partículas
      ctx.globalAlpha = 1
      particles.forEach((particle) => {
        // Atualizar posição
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Rebater nas bordas
        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1

        // Desenhar partícula
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0, 255, 255, ${particle.opacity})`
        ctx.fill()

        // Conexões entre partículas próximas
        particles.forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(0, 128, 128, ${0.2 * (1 - distance / 100)})`
            ctx.lineWidth = 0.5
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.stroke()
          }
        })
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  // Variantes de animação
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: easeOut,
      },
    },
  }

  const floatingVariants = {
    float: {
      y: [-10, 10, -10],
      transition: {
        duration: 7,
        repeat: Infinity,
        ease: easeInOut,
      },
    },
  }

  return (
    <section
      id="hero"
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-black"
    >
      {/* Canvas para efeitos futuristas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 h-full w-full" />

      {/* Vídeo de fundo com autoplay e loop infinito */}
      <div className="absolute inset-0 z-10 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover"
          poster="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R"
        >
          {/* Vídeo de arquitetura moderna - você pode substituir pela URL do seu vídeo */}
          <source
            src="https://h4mwwihke9yjbcdr.public.blob.vercel-storage.com/insertion/herovideo.mp4"
            type="video/mp4"
          />
          {/* Fallback para navegadores que não suportam vídeo */}
          <div className="absolute inset-0 bg-gradient-to-br from-teal-900 via-black to-cyan-900"></div>
        </video>

        {/* Overlay escuro para melhor contraste com o texto */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Overlay gradiente teal */}
      <div className="absolute inset-0 z-20 bg-gradient-to-br from-teal-900/20 via-black/70 to-cyan-900/20"></div>

      {/* Efeitos de luz */}
      <motion.div
        className="absolute left-1/4 top-1/4 z-30 h-64 w-64 rounded-full bg-teal-500 opacity-20 blur-3xl filter"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-1/4 right-1/4 z-30 h-96 w-96 rounded-full bg-cyan-500 opacity-10 blur-3xl filter"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.05, 0.1, 0.05],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Gradientes nas bordas para focar a atenção no centro */}
      <div className="absolute inset-y-0 left-0 z-40 w-1/3 bg-gradient-to-r from-black to-transparent"></div>
      <div className="absolute inset-y-0 right-0 z-40 w-1/3 bg-gradient-to-l from-black to-transparent"></div>
      <div className="absolute inset-x-0 top-0 z-40 h-20 bg-gradient-to-b from-black to-transparent"></div>
      <div className="absolute inset-x-0 bottom-0 z-40 h-20 bg-gradient-to-t from-black to-transparent"></div>

      {/* Conteúdo principal - Container responsivo e centralizado */}
      <motion.div
        className="relative z-50 mx-auto w-full max-w-7xl px-4 text-center sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex min-h-[80vh] w-full flex-col items-center justify-center">
          {/* Texto principal */}
          <motion.div className="mb-8 w-full sm:mb-12" variants={itemVariants}>
            <motion.div
              className="relative mx-auto w-full max-w-4xl px-4"
              variants={floatingVariants}
              animate="float"
            >
              <div className="relative mx-auto w-full">
                <Image
                  src="https://h4mwwihke9yjbcdr.public.blob.vercel-storage.com/insertion/insertionlogopng.png"
                  alt="Insertion Studio"
                  width={600}
                  height={100}
                  className="mx-auto w-full max-w-[280px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[600px]"
                  priority
                />
                {/* Efeito de brilho no logo */}
                <div className="absolute left-1/2 top-1/2 -z-10 h-3/4 w-3/4 -translate-x-1/2 -translate-y-1/2 transform bg-gradient-to-r from-teal-400 to-cyan-400 opacity-30 blur-lg"></div>
              </div>
            </motion.div>
          </motion.div>

          {/* Descrição (comentada) */}
          {/* <motion.div className="mb-8 w-full sm:mb-12" variants={itemVariants}>
            <p className="mx-auto max-w-2xl text-base leading-relaxed tracking-wide text-gray-100 drop-shadow-lg sm:text-lg md:text-xl">
              {landingPage.description}
            </p>
          </motion.div> */}

          {/* Botões - Layout responsivo */}
          <motion.div
            className="flex w-full max-w-md flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-6"
            variants={itemVariants}
          >
            <motion.a
              href="#contact"
              className="group relative w-full overflow-hidden rounded-sm bg-gradient-to-r from-teal-600 to-cyan-600 px-6 py-3 text-base tracking-wide text-white transition-all hover:from-teal-700 hover:to-cyan-700 sm:w-auto sm:px-8 sm:py-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Solicitar Orçamento</span>
              <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-cyan-400 opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-100"></div>
            </motion.a>

            <motion.a
              href="#portfolio"
              className="group relative w-full overflow-hidden rounded-sm border border-teal-400/50 px-6 py-3 text-base tracking-wide text-white transition-all hover:bg-teal-400/10 sm:w-auto sm:px-8 sm:py-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Ver Portfólio</span>
              <div className="absolute inset-0 bg-teal-400 opacity-0 transition-opacity duration-300 group-hover:opacity-10"></div>
            </motion.a>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator futurista */}
      <motion.div
        className="absolute bottom-6 z-50 -translate-x-1/2 sm:bottom-8"
        variants={floatingVariants}
        animate="float"
      >
        <div className="flex flex-col items-center space-y-2">
          <span className="text-xs tracking-widest text-teal-300 drop-shadow-lg sm:text-sm">
            SCROLL
          </span>
          <div className="relative flex h-8 w-5 justify-center sm:h-10 sm:w-6">
            <motion.div
              className="absolute h-3 w-0.5 rounded-full bg-gradient-to-b from-teal-400 to-transparent sm:h-4"
              animate={{
                y: [0, 8, 0],
                opacity: [1, 0.5, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute h-3 w-0.5 rounded-full bg-gradient-to-b from-cyan-400 to-transparent sm:h-4"
              animate={{
                y: [0, 8, 0],
                opacity: [1, 0.3, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
            />
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default Hero
