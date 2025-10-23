"use client"

import { ContactInfo } from "@prisma/client"
import { Facebook, Instagram, Mail, Send } from "lucide-react"
import { easeOut, motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useEffect, useRef, useState } from "react"

// Ícone do Behance
const BehanceIcon = () => (
  <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
    <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14h-8.027c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988h-6.466v-14.967h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zm-3.466-8.988h3.584c2.508 0 2.906-3-.312-3h-3.272v3zm3.391 3h-3.391v3.016h3.341c3.055 0 2.868-3.016.05-3.016z" />
  </svg>
)

const WhatsAppIcon = () => (
  <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
  </svg>
)

interface ContactProps {
  contactInfo: ContactInfo | null
}

const Contact = ({ contactInfo }: ContactProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

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

  const socialLinks = [
    {
      name: "Instagram",
      icon: Instagram,
      url: contactInfo?.instagramLink,
      color: "from-pink-500 to-purple-600",
      hoverColor: "from-pink-400 to-purple-500",
    },
    {
      name: "Facebook",
      icon: Facebook,
      url: contactInfo?.facebookLink,
      color: "from-blue-500 to-blue-600",
      hoverColor: "from-blue-400 to-blue-500",
    },
    {
      name: "Behance",
      icon: BehanceIcon,
      url: contactInfo?.behanceLink,
      color: "from-teal-500 to-cyan-600",
      hoverColor: "from-teal-400 to-cyan-500",
    },
  ]

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: easeOut,
      },
    },
  }

  const cardHoverVariants = {
    initial: { y: 0, scale: 1 },
    hover: {
      y: -5,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: easeOut,
      },
    },
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      // Here you would typically handle the form submission
    }, 2000)
  }

  // Função para formatar o link do WhatsApp
  const formatWhatsAppLink = (phone?: string | null) => {
    if (!phone) return "#"
    // Remove caracteres não numéricos
    const cleaned = phone.replace(/\D/g, "")
    return `https://wa.me/${cleaned}`
  }

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-black py-24 text-white"
    >
      {/* Canvas para efeitos futuristas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      {/* Overlay gradiente teal */}
      <div className="z-1 absolute inset-0 bg-gradient-to-br from-teal-900/10 via-black to-cyan-900/10"></div>

      {/* Efeitos de luz */}
      <motion.div
        className="z-1 absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-teal-500 opacity-10 blur-3xl"
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
        className="z-1 absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-cyan-500 opacity-5 blur-3xl"
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

      {/* Gradientes nas bordas */}
      <div className="z-5 absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-black to-transparent"></div>
      <div className="z-5 absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-black to-transparent"></div>
      <div className="z-5 absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black to-transparent"></div>
      <div className="z-5 absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black to-transparent"></div>

      <div className="container relative z-10 mx-auto px-4">
        {/* Header */}
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
            Vamos Trabalhar Juntos?
          </motion.h2>

          <motion.div
            className="mx-auto mt-4 h-px w-72 bg-gradient-to-r from-transparent via-teal-500 to-transparent"
            initial={{ width: 0 }}
            animate={isInView ? { width: 288 } : { width: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          />

          <motion.p
            className="mx-auto mt-6 max-w-2xl text-xl text-gray-300"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Entre em contato e vamos transformar suas ideias em realidade visual
          </motion.p>
        </motion.div>

        <motion.div
          className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Informações de Contato */}
          <motion.div variants={itemVariants}>
            <motion.h3
              className="mb-8 bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-2xl font-semibold text-transparent"
              variants={itemVariants}
            >
              Informações de Contato
            </motion.h3>

            <div className="space-y-8">
              {/* Email - Agora clicável */}
              <motion.a
                href={`mailto:${contactInfo?.email || "#"}`}
                className="group relative block cursor-pointer"
                variants={itemVariants}
                whileHover="hover"
              >
                <motion.div
                  className="absolute -inset-3 rounded-2xl bg-gradient-to-r from-teal-500/10 to-cyan-500/10 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100"
                  variants={cardHoverVariants}
                />
                <div className="relative z-10 flex items-start border border-teal-500/20 bg-gradient-to-br from-gray-900/50 to-black/50 p-6 backdrop-blur-sm transition-all duration-300 group-hover:border-teal-500/40">
                  <motion.div
                    className="mr-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500/20 to-cyan-500/20"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Mail className="h-6 w-6 text-teal-400" />
                  </motion.div>
                  <div>
                    <div className="font-semibold text-white">Email</div>
                    <motion.div
                      className="text-gray-300 transition-colors group-hover:text-teal-400"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      {contactInfo?.email || "Não informado"}
                    </motion.div>
                  </div>
                </div>
              </motion.a>

              {/* WhatsApp - Agora clicável */}
              <motion.a
                href={formatWhatsAppLink(contactInfo?.whatsappLink)}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block cursor-pointer"
                variants={itemVariants}
                whileHover="hover"
              >
                <motion.div
                  className="absolute -inset-3 rounded-2xl bg-gradient-to-r from-teal-500/10 to-cyan-500/10 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100"
                  variants={cardHoverVariants}
                />
                <div className="relative z-10 flex items-start border border-teal-500/20 bg-gradient-to-br from-gray-900/50 to-black/50 p-6 backdrop-blur-sm transition-all duration-300 group-hover:border-teal-500/40">
                  <motion.div
                    className="mr-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500/20 to-cyan-500/20"
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <WhatsAppIcon />
                  </motion.div>
                  <div>
                    <div className="font-semibold text-white">WhatsApp</div>
                    <motion.div
                      className="text-gray-300 transition-colors group-hover:text-cyan-400"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      {contactInfo?.phone ||
                        contactInfo?.whatsappLink ||
                        "Não informado"}
                    </motion.div>
                  </div>
                </div>
              </motion.a>

              {/* Redes Sociais */}
              <motion.div className="pt-6" variants={itemVariants}>
                <div className="mb-6 font-semibold text-white">Siga-nos</div>
                <div className="flex gap-4">
                  {socialLinks.map(
                    (social, index) =>
                      social.url && (
                        <motion.a
                          key={social.name}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`group relative flex h-14 w-14 items-center justify-center rounded-lg bg-gradient-to-r ${social.color} text-white transition-all duration-300 hover:${social.hoverColor} shadow-lg hover:shadow-xl`}
                          title={social.name}
                          variants={itemVariants}
                          whileHover={{
                            scale: 1.1,
                            y: -2,
                            rotate: 5,
                          }}
                          whileTap={{ scale: 0.9 }}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.8 + index * 0.1 }}
                        >
                          <div className="flex h-6 w-6 items-center justify-center">
                            <social.icon />
                          </div>
                          <div className="absolute inset-0 rounded-lg bg-white opacity-0 transition-opacity duration-300 group-hover:opacity-20" />
                        </motion.a>
                      ),
                  )}
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Formulário de Contato */}
          <motion.div variants={itemVariants}>
            <motion.form
              className="space-y-8"
              onSubmit={handleSubmit}
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <div className="grid gap-6 md:grid-cols-2">
                <motion.div variants={itemVariants}>
                  <label
                    htmlFor="name"
                    className="mb-3 block text-sm font-medium text-gray-300"
                  >
                    Nome *
                  </label>
                  <motion.input
                    type="text"
                    id="name"
                    required
                    className="w-full rounded-lg border border-gray-700 bg-gray-800/50 px-4 py-3 text-white backdrop-blur-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Seu nome completo"
                    whileFocus={{ scale: 1.02 }}
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label
                    htmlFor="email"
                    className="mb-3 block text-sm font-medium text-gray-300"
                  >
                    Email *
                  </label>
                  <motion.input
                    type="email"
                    id="email"
                    required
                    className="w-full rounded-lg border border-gray-700 bg-gray-800/50 px-4 py-3 text-white backdrop-blur-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="seu@email.com"
                    whileFocus={{ scale: 1.02 }}
                  />
                </motion.div>
              </div>

              <motion.div variants={itemVariants}>
                <label
                  htmlFor="subject"
                  className="mb-3 block text-sm font-medium text-gray-300"
                >
                  Assunto *
                </label>
                <motion.input
                  type="text"
                  id="subject"
                  required
                  className="w-full rounded-lg border border-gray-700 bg-gray-800/50 px-4 py-3 text-white backdrop-blur-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Assunto da mensagem"
                  whileFocus={{ scale: 1.02 }}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <label
                  htmlFor="message"
                  className="mb-3 block text-sm font-medium text-gray-300"
                >
                  Mensagem *
                </label>
                <motion.textarea
                  id="message"
                  rows={5}
                  required
                  className="w-full rounded-lg border border-gray-700 bg-gray-800/50 px-4 py-3 text-white backdrop-blur-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Descreva seu projeto ou dúvida..."
                  whileFocus={{ scale: 1.02 }}
                />
              </motion.div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="group relative w-full overflow-hidden rounded-lg bg-gradient-to-r from-teal-600 to-cyan-600 px-8 py-4 font-semibold text-white transition-all duration-300 hover:from-teal-500 hover:to-cyan-500 disabled:opacity-70"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                variants={itemVariants}
              >
                <motion.span
                  className="relative z-10 flex items-center justify-center gap-2"
                  animate={isSubmitting ? { opacity: 0.7 } : { opacity: 1 }}
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="h-4 w-4 rounded-full border-2 border-white border-t-transparent"
                      />
                      Enviando...
                    </>
                  ) : (
                    <>
                      Enviar Mensagem
                      <Send className="h-4 w-4" />
                    </>
                  )}
                </motion.span>

                {/* Efeito de brilho no hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-teal-400 to-cyan-400 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100"
                  initial={false}
                />
              </motion.button>
            </motion.form>
          </motion.div>
        </motion.div>

        {/* Elementos decorativos */}
        <motion.div
          className="mt-20 flex justify-center gap-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="h-1 w-20 rounded-full bg-gradient-to-r from-teal-400 to-cyan-400"
              animate={{
                scaleX: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Contact
