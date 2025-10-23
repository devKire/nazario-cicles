"use client"

import { easeOut, motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Instagram, Facebook } from "lucide-react"
import Image from "next/image"

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

const Footer = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const socialLinks = [
    {
      name: "Instagram",
      icon: Instagram,
      url: "#",
      color: "from-pink-500 to-purple-600",
      hoverColor: "from-pink-400 to-purple-500",
    },
    {
      name: "Facebook",
      icon: Facebook,
      url: "#",
      color: "from-blue-500 to-blue-600",
      hoverColor: "from-blue-400 to-blue-500",
    },
    {
      name: "Behance",
      icon: BehanceIcon,
      url: "#",
      color: "from-teal-500 to-cyan-600",
      hoverColor: "from-teal-400 to-cyan-500",
    },
    {
      name: "WhatsApp",
      icon: WhatsAppIcon,
      url: "#",
      color: "from-green-500 to-green-600",
      hoverColor: "from-green-400 to-green-500",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.6,
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

  return (
    <footer className="bg-black py-16 text-white">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          className="text-center"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Logo */}
          <motion.div
            className="mb-6 flex justify-center"
            variants={itemVariants}
          >
            <motion.div
              className="relative h-16 w-48 sm:h-20 sm:w-56"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Image
                src="https://h4mwwihke9yjbcdr.public.blob.vercel-storage.com/insertion/insertionlogopng.png"
                alt="Insertion 3D Studio"
                fill
                className="object-contain"
                priority
              />
            </motion.div>
          </motion.div>

          {/* Descrição */}
          <motion.p
            className="mx-auto mb-8 max-w-2xl text-lg text-gray-400 md:text-xl"
            variants={itemVariants}
          >
            Transformando ideias em realidade com visualização arquitetônica 3D
            de alta qualidade
          </motion.p>

          {/* Redes Sociais */}
          <motion.div
            className="mb-8 flex flex-wrap justify-center gap-4"
            variants={containerVariants}
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.name}
                href={social.url}
                className={`group relative bg-gradient-to-r ${social.color} hover:${social.hoverColor} flex h-12 w-12 items-center justify-center rounded-2xl text-white transition-all duration-300 sm:h-14 sm:w-14`}
                title={social.name}
                variants={itemVariants}
                whileHover={{
                  scale: 1.1,
                  y: -2,
                }}
                whileTap={{ scale: 0.9 }}
                custom={index}
              >
                <social.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                <div className="absolute inset-0 rounded-2xl bg-white opacity-0 transition-opacity duration-300 group-hover:opacity-20" />
              </motion.a>
            ))}
          </motion.div>

          {/* Linha divisória */}
          <motion.div
            className="mx-auto mb-6 h-px bg-gradient-to-r from-transparent via-teal-500/50 to-transparent"
            initial={{ width: 0 }}
            animate={isInView ? { width: "200px" } : { width: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          />

          {/* Copyright */}
          <motion.div variants={itemVariants}>
            <p className="text-sm text-gray-400 sm:text-base">
              © {new Date().getFullYear()} Insertion 3D Studio. Todos os
              direitos reservados.
            </p>
          </motion.div>

          {/* Elementos decorativos */}
          <motion.div
            className="mt-8 flex justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="h-1 w-8 rounded-full bg-gradient-to-r from-teal-400 to-cyan-400 sm:w-12"
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
        </motion.div>
      </div>

      {/* Efeito de brilho no fundo */}
      <motion.div
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-teal-500/30 to-transparent"
        animate={{
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </footer>
  )
}

export default Footer
