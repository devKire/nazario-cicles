"use client"

import { useState, useRef } from "react"
import {
  X,
  ZoomIn,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  Play,
  Pause,
} from "lucide-react"
import Image from "next/image"

interface GalleryItem {
  id: string
  imageUrl: string
  caption?: string | null
  type: string
  mediaType?: "IMAGE" | "VIDEO"
}

interface GalleryProps {
  gallery: GalleryItem[]
  whatsappUrl?: string | null
  phones?: string[]
}

const Gallery = ({ gallery, whatsappUrl, phones = [] }: GalleryProps) => {
  const [selectedMedia, setSelectedMedia] = useState<GalleryItem | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  const openLightbox = (media: GalleryItem, index: number) => {
    setSelectedMedia(media)
    setCurrentIndex(index)
    setIsPlaying(true)
  }

  const closeLightbox = () => {
    if (videoRef.current) {
      videoRef.current.pause()
    }
    setSelectedMedia(null)
    setCurrentIndex(0)
    setIsPlaying(false)
  }

  const navigateMedia = (direction: "prev" | "next") => {
    if (!selectedMedia) return

    let newIndex
    if (direction === "next") {
      newIndex = (currentIndex + 1) % gallery.length
    } else {
      newIndex = (currentIndex - 1 + gallery.length) % gallery.length
    }

    setSelectedMedia(gallery[newIndex])
    setCurrentIndex(newIndex)
    setIsPlaying(true)
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

  // Filtrar apenas mídias do tipo GALLERY
  const galleryMedia = gallery.filter(
    (item) => item.type === "GALLERY" || !item.type,
  )

  const handleWhatsapp = () => {
    if (whatsappUrl) {
      window.open(whatsappUrl, "_blank")
    } else if (phones.length > 0) {
      const phone = phones[0].replace(/\D/g, "")
      window.open(`https://wa.me/55${phone}`, "_blank")
    }
  }

  if (galleryMedia.length === 0) {
    return (
      <section
        id="galeria"
        className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20"
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-orange-500">
              <ZoomIn className="h-8 w-8 text-white" />
            </div>
            <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl">
              Nossa{" "}
              <span className="bg-gradient-to-r from-blue-400 to-orange-400 bg-clip-text text-transparent">
                Galeria
              </span>
            </h2>
            <p className="mb-8 text-xl text-slate-300">
              Em breve novas imagens e vídeos do nosso trabalho
            </p>
            <button
              onClick={handleWhatsapp}
              className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-500 to-orange-500 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:from-blue-600 hover:to-orange-600 hover:shadow-xl"
            >
              Fale Conosco
              <ArrowUpRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <>
      <section id="gallery" className="bg-gradient-to-br py-20">
        <div className="mx-auto max-w-7xl px-6">
          {/* Header */}
          <div className="mb-16 text-center">
            <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-orange-500">
              <ZoomIn className="h-8 w-8 text-white" />
            </div>
            <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl">
              Nossa{" "}
              <span className="bg-gradient-to-r from-blue-400 to-orange-400 bg-clip-text text-transparent">
                Galeria
              </span>
            </h2>
            <p className="mx-auto max-w-3xl text-xl leading-relaxed text-slate-300">
              Confira alguns dos nossos trabalhos e o ambiente da nossa oficina
              em fotos e vídeos
            </p>
          </div>

          {/* Gallery Grid - Masonry Layout */}
          <div className="columns-1 gap-6 sm:columns-2 lg:columns-3 xl:columns-4">
            {galleryMedia.map((media, index) => (
              <div
                key={media.id}
                className="group relative mb-6 cursor-pointer break-inside-avoid"
                onClick={() => openLightbox(media, index)}
              >
                <div className="relative overflow-hidden rounded-2xl border border-slate-600/50 bg-slate-800/50 backdrop-blur-sm transition-all duration-300 hover:border-blue-500/30 hover:bg-slate-800/70">
                  {media.mediaType === "VIDEO" ? (
                    // Thumbnail do vídeo
                    <div className="relative aspect-video overflow-hidden">
                      <video
                        src={media.imageUrl}
                        className="h-full w-full object-cover"
                        muted
                        playsInline
                        preload="metadata"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <div className="rounded-full bg-white/20 p-3 backdrop-blur-sm">
                          <Play className="h-6 w-6 fill-white text-white" />
                        </div>
                      </div>
                      <div className="absolute left-3 top-3 rounded-full bg-blue-500 px-2 py-1">
                        <span className="text-xs font-medium text-white">
                          VÍDEO
                        </span>
                      </div>
                    </div>
                  ) : (
                    // Imagem normal
                    <div className="aspect-auto overflow-hidden">
                      <Image
                        src={media.imageUrl}
                        alt={media.caption || "Imagem da galeria"}
                        width={400}
                        height={500}
                        className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                  )}

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/0 to-slate-900/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      {media.caption && (
                        <p className="line-clamp-2 text-sm font-medium text-white">
                          {media.caption}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Zoom/Play Icon */}
                  <div className="absolute right-3 top-3 rounded-full bg-slate-900/80 p-2 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
                    {media.mediaType === "VIDEO" ? (
                      <Play className="h-4 w-4 fill-white text-white" />
                    ) : (
                      <ZoomIn className="h-4 w-4 text-white" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Gallery Stats */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center space-x-6 rounded-2xl border border-slate-600/50 bg-slate-800/50 px-8 py-4 backdrop-blur-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">
                  {galleryMedia.filter((m) => m.mediaType !== "VIDEO").length}
                </div>
                <div className="text-sm text-slate-300">Fotos</div>
              </div>
              <div className="h-8 w-px bg-slate-600"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">
                  {galleryMedia.filter((m) => m.mediaType === "VIDEO").length}
                </div>
                <div className="text-sm text-slate-300">Vídeos</div>
              </div>
              <div className="h-8 w-px bg-slate-600"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">
                  {Math.ceil(galleryMedia.length / 4)}
                </div>
                <div className="text-sm text-slate-300">Páginas</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedMedia && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/95 backdrop-blur-sm"
          onClick={closeLightbox}
        >
          <div
            className="relative mx-auto max-h-[90vh] w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute -top-12 right-0 z-10 rounded-full bg-slate-800/80 p-2 text-white transition-all duration-200 hover:scale-110 hover:bg-slate-700/80"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Navigation Buttons */}
            {galleryMedia.length > 1 && (
              <>
                <button
                  onClick={() => navigateMedia("prev")}
                  className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-slate-800/80 p-3 text-white transition-all duration-200 hover:scale-110 hover:bg-slate-700/80"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={() => navigateMedia("next")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-slate-800/80 p-3 text-white transition-all duration-200 hover:scale-110 hover:bg-slate-700/80"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}

            {/* Media Content */}
            <div className="relative overflow-hidden rounded-2xl bg-slate-800/50">
              {selectedMedia.mediaType === "VIDEO" ? (
                <div className="relative">
                  <video
                    ref={videoRef}
                    src={selectedMedia.imageUrl}
                    className="max-h-[70vh] w-full object-contain"
                    controls
                    autoPlay={isPlaying}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                  />
                  {/* Custom Play/Pause Button */}
                  <button
                    onClick={togglePlayPause}
                    className="absolute bottom-4 left-4 rounded-full bg-slate-800/80 p-3 text-white backdrop-blur-sm transition-all hover:bg-slate-700/80"
                  >
                    {isPlaying ? (
                      <Pause className="h-6 w-6" />
                    ) : (
                      <Play className="h-6 w-6 fill-white" />
                    )}
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-center p-4">
                  <Image
                    src={selectedMedia.imageUrl}
                    alt={selectedMedia.caption || "Imagem ampliada"}
                    width={1200}
                    height={800}
                    className="max-h-[70vh] w-auto rounded-lg object-contain"
                  />
                </div>
              )}

              {/* Caption */}
              {selectedMedia.caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/90 to-transparent p-6">
                  <p className="text-center text-lg font-medium text-white">
                    {selectedMedia.caption}
                    {selectedMedia.mediaType === "VIDEO" && (
                      <span className="ml-2 text-blue-300">• Vídeo</span>
                    )}
                  </p>
                </div>
              )}
            </div>

            {/* Media Counter */}
            {galleryMedia.length > 1 && (
              <div className="mt-4 text-center">
                <span className="rounded-full bg-slate-800/80 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
                  {currentIndex + 1} / {galleryMedia.length}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default Gallery
