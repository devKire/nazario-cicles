"use client"

import { LandingPage } from "@prisma/client"
import { easeOut, motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
interface AboutProps {
  landingPage: LandingPage
}

const About = ({ landingPage }: AboutProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  // Variantes de animação
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.8,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: easeOut,
      },
    },
  }

  const imageVariants = {
    hidden: { opacity: 0, x: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: easeOut,
      },
    },
  }

  const statVariants = {
    hidden: { opacity: 0, y: 30 },
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
    <section
      id="about"
      className="relative bg-black px-4 py-12 text-white sm:px-6 sm:py-16 lg:py-20"
    >
      <div className="mx-auto w-full max-w-7xl">
        <motion.div
          ref={ref}
          className="grid items-center gap-6 lg:gap-8 xl:grid-cols-2 xl:gap-12"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Conteúdo Textual - Direita no desktop */}
          <motion.div variants={itemVariants} className="xl:order-1">
            <motion.div className="relative mb-6 flex items-center overflow-hidden overflow-visible sm:mb-8">
              {/* Imagem decorativa - ajustada para mobile */}
              <motion.img
                src="https://h4mwwihke9yjbcdr.public.blob.vercel-storage.com/insertion/elemento.png"
                alt="Insertion 3D Studio"
                className="absolute -left-14 z-0 h-52 w-52"
                animate={{ rotate: -360 }} // Rotação completa anti-horária
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
                whileHover={{ scale: 1.1 }}
              />

              {/* Efeito de anéis orbitais horizontais */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={`ring-${i}`}
                  className="absolute -left-14 z-40 h-52 w-52 rounded-full border border-teal-400/30"
                  style={{
                    borderWidth: "1px",
                  }}
                  animate={{
                    rotateX: i === 0 ? [0, 360] : [0, -360],
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 20 + i * 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              ))}

              <motion.h2 className="font-bbh text-md relative z-10 mb-3 ml-32 bg-gradient-to-r bg-clip-text sm:text-4xl md:text-4xl lg:text-4xl xl:text-4xl">
                Sobre o Insertion 3D Studio
              </motion.h2>
            </motion.div>

            <motion.div
              className="mx-auto mb-4 h-px bg-gradient-to-r from-transparent via-teal-500 to-transparent"
              initial={{ width: 0 }}
              animate={isInView ? { width: "100%" } : { width: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            />

            <motion.p
              className="mb-4 text-sm leading-relaxed text-gray-300 sm:mb-6 sm:text-base md:text-lg lg:text-xl"
              variants={itemVariants}
            >
              Somos um estúdio de visualização arquitetônica 3D desenvolvido na
              América do Sul, especializado em transformar projetos
              arquitetônicos em experiências visuais impactantes.
            </motion.p>

            <motion.p
              className="mb-6 text-sm leading-relaxed text-gray-300 sm:mb-8 sm:text-base md:text-lg lg:text-xl"
              variants={itemVariants}
            >
              Combinamos tecnologia de ponta com criatividade para criar imagens
              fotorrealistas, tours virtuais e animações que elevam a
              apresentação de seus projetos.
            </motion.p>

            {/* Estatísticas */}
            <motion.div
              className="mb-6 grid grid-cols-2 gap-4 sm:mb-8 sm:gap-6"
              variants={containerVariants}
            >
              <motion.div
                className="group cursor-pointer text-center"
                variants={statVariants}
                whileHover={{ scale: 1.05 }}
              >
                <div className="relative">
                  <motion.div
                    className="mb-1 bg-gradient-to-r bg-clip-text text-xl font-bold text-teal-600 sm:mb-2 sm:text-2xl md:text-3xl"
                    animate={{
                      textShadow: [
                        "0 0 0px rgba(0, 255, 255, 0)",
                        "0 0 20px rgba(0, 255, 255, 0.5)",
                        "0 0 0px rgba(0, 255, 255, 0)",
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    1000+
                  </motion.div>
                </div>

                <div className="text-xs text-gray-400 transition-colors duration-300 group-hover:text-teal-600 sm:text-sm md:text-base">
                  Projetos Entregues
                </div>
              </motion.div>

              <motion.div
                className="group cursor-pointer text-center"
                variants={statVariants}
                whileHover={{ scale: 1.05 }}
              >
                <div className="relative">
                  <motion.div
                    className="mb-1 bg-gradient-to-r bg-clip-text text-xl font-bold text-teal-600 sm:mb-2 sm:text-2xl md:text-3xl"
                    animate={{
                      textShadow: [
                        "0 0 0px rgba(0, 255, 255, 0)",
                        "0 0 20px rgba(0, 255, 255, 0.5)",
                        "0 0 0px rgba(0, 255, 255, 0)",
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.5,
                    }}
                  >
                    10+
                  </motion.div>
                </div>

                <div className="text-xs text-gray-400 transition-colors duration-300 group-hover:text-teal-600 sm:text-sm md:text-base">
                  Anos de Experiência
                </div>
              </motion.div>
            </motion.div>

            {/* Elementos decorativos futuristas */}
            <motion.div className="flex gap-3 sm:gap-4" variants={itemVariants}>
              {[...Array(2)].map((_, i) => (
                <motion.div
                  key={i}
                  className="h-1 flex-1 rounded-full bg-gradient-to-r from-teal-600 to-teal-800"
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 + i * 0.2 }}
                />
              ))}
            </motion.div>
          </motion.div>

          {/* Imagem principal - Esquerda no desktop, inferior no mobile */}
          <motion.div className="relative xl:order-2" variants={imageVariants}>
            {/* Efeito de grid holográfico de fundo */}
            <motion.div
              className="absolute inset-0 rounded-lg opacity-20"
              style={{
                backgroundImage: `
        linear-gradient(rgba(20, 184, 166, 0.1) 1px, transparent 1px),
        linear-gradient(90deg, rgba(20, 184, 166, 0.1) 1px, transparent 1px)
      `,
                backgroundSize: "20px 20px",
              }}
              animate={{
                backgroundPosition: ["0px 0px", "20px 20px"],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            {/* Efeito de brilho centralizado com partículas de energia */}
            <motion.div
              className="absolute inset-0 rounded-xl bg-gradient-to-r from-teal-400/10 via-cyan-400/5 to-teal-600/10 blur-xl"
              animate={{
                opacity: [0.2, 0.4, 0.2],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Container da imagem com borda gradiente sutil */}
            <div className="relative overflow-hidden rounded-lg sm:rounded-xl">
              {/* Overlay com gradiente teal minimalista */}
              <div className="absolute inset-0 z-10 bg-gradient-to-br from-teal-900/10 via-transparent to-cyan-900/10"></div>

              {/* Borda luminosa sutil */}
              <motion.div
                className="absolute inset-0 rounded-lg border border-teal-400/30"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  boxShadow: [
                    "0 0 20px rgba(20, 184, 166, 0.3)",
                    "0 0 40px rgba(20, 184, 166, 0.5)",
                    "0 0 20px rgba(20, 184, 166, 0.3)",
                  ],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              <motion.img
                src={landingPage.coverImageUrl}
                alt="Insertion 3D Studio"
                className="relative z-0 w-full rounded-lg object-cover"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Sistema de partículas futuristas */}

            {/* Partículas de energia flutuantes */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`energy-${i}`}
                className="absolute z-20 h-1 w-1 rounded-full bg-gradient-to-r from-teal-400 to-cyan-400"
                style={{
                  left: `${10 + i * 12}%`,
                  top: `${8 + i * 12}%`,
                  filter: "blur(0.5px)",
                }}
                animate={{
                  y: [0, -25, 0],
                  x: [0, Math.sin(i) * 10, 0],
                  opacity: [0, 1, 0],
                  scale: [0.5, 1.2, 0.5],
                }}
                transition={{
                  duration: 4 + i * 0.3,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
              />
            ))}

            {/* Partículas de conexão - linhas de energia */}
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={`connection-${i}`}
                className="absolute z-10 h-px bg-gradient-to-r from-transparent via-teal-400/50 to-transparent"
                style={{
                  width: "30%",
                  left: `${15 + i * 20}%`,
                  top: `${20 + i * 15}%`,
                }}
                animate={{
                  opacity: [0, 0.8, 0],
                  scaleX: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: "easeInOut",
                }}
              />
            ))}

            {/* Partículas orbitais */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={`orbital-${i}`}
                className="absolute z-20 h-2 w-2 rounded-full bg-cyan-400/60"
                style={{
                  left: "50%",
                  top: "50%",
                  x: "-50%",
                  y: "-50%",
                }}
                animate={{
                  rotate: [0, 360],
                  x: [0, Math.cos(i * 120) * 80, 0],
                  y: [0, Math.sin(i * 120) * 80, 0],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 8 + i * 2,
                  repeat: Infinity,
                  delay: i * 1,
                  ease: "linear",
                }}
              />
            ))}

            {/* Efeito de pulso central */}
            <motion.div
              className="absolute inset-0 z-10 rounded-lg border border-teal-400/20"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
