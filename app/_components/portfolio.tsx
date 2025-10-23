"use client"

import { useState, useRef } from "react"
import { ContactInfo, Gallery } from "@prisma/client"
import Image from "next/image"
import {
  X,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  Play,
  Pause,
} from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence, easeOut, easeIn } from "framer-motion"
import { useInView } from "framer-motion"

interface PortfolioProps {
  gallery: Gallery[]
  contactInfo: ContactInfo | null
}

const Portfolio = ({ gallery, contactInfo }: PortfolioProps) => {
  const [selectedPhoto, setSelectedPhoto] = useState<Gallery | null>(null)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set())
  const [videoThumbnails] = useState<Map<string, string>>(new Map())
  const [isLightboxImageLoading, setIsLightboxImageLoading] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const videoRef = useRef<HTMLVideoElement>(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  // Filtrar apenas mídias do tipo GALLERY
  const allPhotos = gallery.filter(
    (item) => item.type === "GALLERY" || !item.type,
  )

  const openLightbox = (photo: Gallery, index: number) => {
    setSelectedPhoto(photo)
    setLightboxIndex(index)
    setIsPlaying(true)
    // Resetar estado de loading quando abrir nova imagem
    if (photo.mediaType !== "VIDEO") {
      setIsLightboxImageLoading(true)
    }
  }

  const closeLightbox = () => {
    if (videoRef.current) {
      videoRef.current.pause()
    }
    setSelectedPhoto(null)
    setLightboxIndex(0)
    setIsPlaying(false)
    setIsLightboxImageLoading(false)
  }

  const navigateLightbox = (direction: "prev" | "next") => {
    if (!selectedPhoto) return

    let newIndex
    if (direction === "next") {
      newIndex = (lightboxIndex + 1) % allPhotos.length
    } else {
      newIndex = (lightboxIndex - 1 + allPhotos.length) % allPhotos.length
    }

    const nextPhoto = allPhotos[newIndex]
    setSelectedPhoto(nextPhoto)
    setLightboxIndex(newIndex)
    setIsPlaying(true)

    // Ativar loading para imagens (não vídeos)
    if (nextPhoto.mediaType !== "VIDEO") {
      setIsLightboxImageLoading(true)
    }
  }

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleLightboxImageLoad = () => {
    setIsLightboxImageLoading(false)
  }

  const headerVariants = {
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

  const handleImageLoad = (imageUrl: string) => {
    setLoadedImages((prev) => new Set(prev).add(imageUrl))
  }

  // Variantes de animação
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

  const lightboxVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: easeOut,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.2,
        ease: easeIn,
      },
    },
  }

  // Componente do Spinner de Loading
  const LoadingSpinner = () => (
    <div className="absolute inset-0 flex items-center justify-center bg-black/50">
      <div className="relative">
        <div className="border-teal-00 h-12 w-12 animate-spin rounded-full border-4 border-solid border-t-transparent"></div>
      </div>
    </div>
  )

  if (allPhotos.length === 0) {
    return (
      <section id="portfolio" className="bg-black px-6 py-16 text-white">
        <div className="mx-auto max-w-7xl">
          <motion.div
            className="mb-16 text-center"
            variants={headerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.h2
              className="mb-4 bg-gradient-to-r bg-clip-text text-4xl font-bold tracking-wide text-teal-600 md:text-5xl"
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
              Portfólio
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
              Em breve você poderá ver nosso trabalho aqui
            </motion.p>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center text-neutral-400"
          >
            Galeria em construção...
          </motion.p>
        </div>
      </section>
    )
  }

  return (
    <section
      id="portfolio"
      ref={ref}
      className="relative overflow-hidden bg-black py-24 text-white"
    >
      <div className="w-full">
        {/* Cabeçalho */}
        <motion.div
          className="mb-20 text-center"
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
            Portfolio
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
            Explore nosso trabalho através das diferentes categorias
          </motion.p>
        </motion.div>

        {/* Galeria com efeito Blur - Mantendo layout Masonry */}
        <motion.div
          className="columns-2 gap-2 [column-fill:_balance] sm:columns-3 md:columns-4 lg:columns-5"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {allPhotos.map((photo, index) => (
            <motion.div
              key={photo.id}
              variants={itemVariants}
              onClick={() => openLightbox(photo, index)}
              className="group relative mb-2 cursor-pointer break-inside-avoid overflow-hidden rounded-lg"
              animate={{
                filter:
                  hoveredIndex !== null && hoveredIndex !== index
                    ? "blur(5px)"
                    : "blur(0px)",
                opacity:
                  hoveredIndex !== null && hoveredIndex !== index ? 0.8 : 1,
                scale: hoveredIndex === index ? 1.05 : 1,
                zIndex: hoveredIndex === index ? 10 : 1,
              }}
              transition={{
                duration: 0.4,
                ease: [0.43, 0.13, 0.23, 0.96],
                scale: { duration: 0.3 },
                opacity: { duration: 0.25 },
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              whileHover={{
                scale: hoveredIndex === index ? 1.05 : 1.02,
                transition: { duration: 0.2 },
              }}
            >
              {/* Efeito de brilho no hover */}
              <motion.div
                className="absolute -inset-2 z-0 rounded-2xl bg-gradient-to-r from-teal-500/20 to-cyan-500/20 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100"
                initial={false}
                animate={{
                  opacity: hoveredIndex === index ? 1 : 0,
                }}
              />

              {/* Card principal */}
              <div className="relative z-10 w-full overflow-hidden rounded-lg bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm">
                {photo.mediaType === "VIDEO" ? (
                  <div className="relative">
                    <video
                      src={photo.imageUrl}
                      muted
                      playsInline
                      preload="metadata"
                      poster={videoThumbnails.get(photo.imageUrl)}
                      className="h-auto w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      onMouseEnter={(e) => {
                        const video = e.target as HTMLVideoElement
                        video.play().catch(() => {})
                      }}
                      onMouseLeave={(e) => {
                        const video = e.target as HTMLVideoElement
                        video.pause()
                        video.currentTime = 0
                      }}
                    />
                    {/* Overlay de vídeo */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
                      <div className="rounded-full bg-white/20 p-3 backdrop-blur-sm">
                        <Play className="h-6 w-6 fill-white text-white" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <Image
                    src={photo.imageUrl}
                    alt={photo.caption || "Foto do portfólio"}
                    width={400}
                    height={600}
                    loading="lazy"
                    className="h-auto w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    onLoad={() => handleImageLoad(photo.imageUrl)}
                    style={{
                      opacity: loadedImages.has(photo.imageUrl) ? 1 : 0,
                      transition: "opacity 0.3s ease",
                    }}
                  />
                )}

                {/* Overlay de informações */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100">
                  {photo.caption && (
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <p className="text-sm font-medium">{photo.caption}</p>
                      {photo.mediaType === "VIDEO" && (
                        <span className="mt-1 text-xs text-cyan-300">
                          • Vídeo
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Indicador de loading */}
                {!loadedImages.has(photo.imageUrl) &&
                  photo.mediaType !== "VIDEO" && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-800/50">
                      <div className="h-8 w-8 animate-spin rounded-full border-2 border-teal-500 border-t-transparent"></div>
                    </div>
                  )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedPhoto && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeLightbox}
            >
              <motion.div
                variants={lightboxVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="relative mx-4 max-h-full max-w-4xl"
                onClick={(e) => e.stopPropagation()}
              >
                <motion.button
                  className="absolute right-4 top-4 z-10 rounded-full bg-black/50 p-2 text-white backdrop-blur-sm transition-all hover:bg-black/70"
                  onClick={closeLightbox}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="h-6 w-6" />
                </motion.button>

                {allPhotos.length > 1 && (
                  <>
                    <motion.button
                      className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white backdrop-blur-sm transition-all hover:bg-black/70"
                      onClick={() => navigateLightbox("prev")}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ChevronLeft className="h-8 w-8" />
                    </motion.button>
                    <motion.button
                      className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white backdrop-blur-sm transition-all hover:bg-black/70"
                      onClick={() => navigateLightbox("next")}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ChevronRight className="h-8 w-8" />
                    </motion.button>
                  </>
                )}

                <div className="relative flex items-center justify-center bg-black">
                  {selectedPhoto.mediaType === "VIDEO" ? (
                    <>
                      <video
                        ref={videoRef}
                        src={selectedPhoto.imageUrl}
                        className="max-h-[80vh] w-full object-contain"
                        controls={!isPlaying}
                        autoPlay={isPlaying}
                        onPlay={() => setIsPlaying(true)}
                        onPause={() => setIsPlaying(false)}
                        onEnded={() => setIsPlaying(false)}
                        playsInline
                        controlsList="nodownload"
                        preload="metadata"
                      />

                      {/* Overlay de controles personalizados */}
                      {!isPlaying && (
                        <motion.div
                          className="absolute inset-0 flex items-center justify-center bg-black/20"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.2 }}
                        >
                          <motion.button
                            onClick={togglePlayPause}
                            className="rounded-full bg-white/20 p-4 text-white backdrop-blur-sm transition-all hover:scale-110"
                            aria-label="Reproduzir vídeo"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Play className="h-8 w-8 fill-white" />
                          </motion.button>
                        </motion.div>
                      )}

                      {/* Botão de play/pause flutuante */}
                      {isPlaying && (
                        <motion.button
                          onClick={togglePlayPause}
                          className="absolute bottom-4 left-4 z-20 rounded-full bg-black/50 p-3 text-white backdrop-blur-sm transition-all hover:bg-black/70"
                          aria-label="Pausar vídeo"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Pause className="h-6 w-6" />
                        </motion.button>
                      )}
                    </>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="relative"
                    >
                      {/* Spinner de loading para imagens */}
                      {isLightboxImageLoading && <LoadingSpinner />}

                      <Image
                        src={selectedPhoto.imageUrl}
                        alt={selectedPhoto.caption || "Foto ampliada"}
                        width={1200}
                        height={800}
                        className="max-h-[80vh] w-auto object-contain"
                        loading="eager"
                        onLoad={handleLightboxImageLoad}
                        onLoadingComplete={handleLightboxImageLoad}
                        style={{
                          opacity: isLightboxImageLoading ? 0 : 1,
                          transition: "opacity 0.3s ease",
                        }}
                      />
                    </motion.div>
                  )}
                </div>

                {selectedPhoto.caption && (
                  <motion.div
                    className="mt-4 text-center text-white"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    <p className="text-lg">{selectedPhoto.caption}</p>
                    {selectedPhoto.mediaType === "VIDEO" && (
                      <span className="mt-1 text-sm text-cyan-300">
                        • Vídeo
                      </span>
                    )}
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* CTA final */}
      {contactInfo?.whatsappLink && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-24 flex justify-center"
        >
          <Link
            href={contactInfo.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="relative flex items-center justify-center rounded-lg bg-gradient-to-r from-teal-600 to-cyan-600 px-12 py-4 text-lg font-semibold text-white shadow-xl transition-all hover:from-teal-500 hover:to-cyan-500 hover:shadow-2xl"
          >
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center"
            >
              Entre em contato
              <ArrowUpRight className="ml-2 h-5 w-5" />
            </motion.span>
          </Link>
        </motion.div>
      )}
    </section>
  )
}

export default Portfolio
