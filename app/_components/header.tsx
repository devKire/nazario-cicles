"use client"

import { useState, useEffect } from "react"
import {
  motion,
  AnimatePresence,
  easeOut,
  easeInOut,
  easeIn,
} from "framer-motion"
import Image from "next/image"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [showLogo, setShowLogo] = useState(false)
  const [forceShowLayout, setForceShowLayout] = useState(false)

  const menuItems = [
    { label: "Início", href: "#hero" },
    { label: "Sobre", href: "#about" },
    { label: "Serviços", href: "#services" },
    { label: "Processo", href: "#process" },
    { label: "Portfólio", href: "#portfolio" },
    { label: "Contato", href: "#contact" },
  ]

  // Efeito de scroll para controlar logo e background
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const heroHeight = window.innerHeight

      // Mostrar logo apenas após passar o Hero section
      setShowLogo(scrollY > heroHeight * 0.1)

      // Mudar background após um certo scroll
      setIsScrolled(scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Função para toggle do menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
    // Força mostrar o layout quando o menu é aberto
    if (!isMenuOpen) {
      setForceShowLayout(true)
    } else {
      setForceShowLayout(false)
    }
  }

  // Variantes de animação
  const headerVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: easeOut,
      },
    },
  }

  const logoVariants = {
    hidden: {
      opacity: 0,
      scaleY: 0.05,
      scaleX: 1.4,
      filter: "brightness(500%) blur(2px)",
      transition: {
        duration: 0.2,
        ease: easeIn,
      },
    },
    visible: {
      opacity: 1,
      scaleY: 1,
      scaleX: 1,
      filter: "brightness(100%) blur(0px)",
      transition: {
        duration: 0.3,
        ease: easeOut,
        scaleY: {
          duration: 0.25,
          ease: easeOut,
        },
        scaleX: {
          duration: 0.2,
          ease: easeInOut,
        },
        filter: {
          duration: 0.4,
          ease: easeOut,
        },
      },
    },
  }

  const menuItemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
        ease: easeOut,
      },
    }),
    hover: {
      scale: 1.05,
      color: "#2DD4BF",
      transition: {
        duration: 0.2,
        ease: easeOut,
      },
    },
  }

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: easeInOut,
      },
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: easeInOut,
      },
    },
  }

  const hamburgerVariants = {
    open: {
      rotate: 45,
      y: 6,
      transition: { duration: 0.2 },
    },
    closed: {
      rotate: 0,
      y: 0,
      transition: { duration: 0.2 },
    },
  }

  const hamburgerMiddleVariants = {
    open: {
      opacity: 0,
      transition: { duration: 0.1 },
    },
    closed: {
      opacity: 1,
      transition: { duration: 0.2 },
    },
  }

  const hamburgerBottomVariants = {
    open: {
      rotate: -45,
      y: -6,
      transition: { duration: 0.2 },
    },
    closed: {
      rotate: 0,
      y: 0,
      transition: { duration: 0.2 },
    },
  }

  // Condição para mostrar o layout completo
  const shouldShowFullLayout = isScrolled || showLogo || forceShowLayout

  return (
    <motion.header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        shouldShowFullLayout
          ? "border-b border-teal-500/20 bg-black/90 shadow-2xl shadow-teal-500/10"
          : "bg-transparent"
      }`}
      initial="hidden"
      animate="visible"
      variants={headerVariants}
    >
      <nav className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo - SEMPRE VISÍVEL quando menu está aberto ou condições normais */}
          <motion.div
            className="text-2xl font-bold"
            whileHover={{ scale: shouldShowFullLayout ? 1.05 : 1 }}
            transition={{ duration: 0.2 }}
          >
            <AnimatePresence mode="wait">
              {shouldShowFullLayout ? (
                <motion.div
                  key="logo"
                  variants={logoVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  <Image
                    src="https://h4mwwihke9yjbcdr.public.blob.vercel-storage.com/insertion/insertionlogopng.png"
                    alt="Insertion Studio Logo"
                    width={150}
                    height={50}
                    className="transition-opacity duration-300"
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  className="h-[50px] w-[150px]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </AnimatePresence>
          </motion.div>

          {/* Desktop Menu */}
          <motion.div
            className="hidden items-center space-x-8 md:flex"
            initial="hidden"
            animate="visible"
          >
            {menuItems.map((item, index) => (
              <motion.a
                key={item.label}
                href={item.href}
                className="relative font-medium text-white/90 transition-all duration-200 hover:text-teal-400"
                custom={index}
                variants={menuItemVariants}
                whileHover="hover"
              >
                {item.label}
                <motion.div
                  className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-teal-400 to-cyan-400"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.2 }}
                />
              </motion.a>
            ))}
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            className="relative z-50 p-2 md:hidden"
            onClick={toggleMenu}
            whileTap={{ scale: 0.9 }}
          >
            <div className="flex h-6 w-6 flex-col justify-between">
              <motion.span
                className="h-0.5 w-full bg-white"
                variants={hamburgerVariants}
                animate={isMenuOpen ? "open" : "closed"}
              />
              <motion.span
                className="h-0.5 w-full bg-white"
                variants={hamburgerMiddleVariants}
                animate={isMenuOpen ? "open" : "closed"}
              />
              <motion.span
                className="h-0.5 w-full bg-white"
                variants={hamburgerBottomVariants}
                animate={isMenuOpen ? "open" : "closed"}
              />
            </div>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="overflow-hidden md:hidden"
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <motion.div
                className="mt-4 border-t border-teal-500/20 pb-4 pt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <div className="flex flex-col space-y-3">
                  {menuItems.map((item, index) => (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      className="rounded-lg px-4 py-3 font-medium text-white/90 transition-all duration-200 hover:bg-white/5 hover:text-teal-400"
                      onClick={() => {
                        setIsMenuOpen(false)
                        setForceShowLayout(false)
                      }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{
                        opacity: 1,
                        x: 0,
                        transition: {
                          delay: index * 0.1,
                          duration: 0.3,
                        },
                      }}
                      whileHover={{
                        x: 10,
                        transition: { duration: 0.2 },
                      }}
                    >
                      {item.label}
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Efeito de brilho sutil */}
      <motion.div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-teal-500/50 to-transparent"
        animate={{
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.header>
  )
}

export default Header
