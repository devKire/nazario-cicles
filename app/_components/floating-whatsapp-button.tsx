"use client"

import { ContactInfo } from "@prisma/client"
import { BadgeCheck } from "lucide-react"
import Link from "next/link"
import React, { useState } from "react"

interface FloatingWhatsAppProps {
  contactInfo: ContactInfo
  defaultMessage?: string
}

const WhatsAppIcon = () => (
  <svg width="30" height="30" fill="currentColor" viewBox="0 0 24 24">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
  </svg>
)

const FloatingWhatsAppButton = ({
  contactInfo, // Mudei o prop para contactInfo
  defaultMessage = "Olá! Gostaria de conversar sobre um projeto incrível.",
}: FloatingWhatsAppProps) => {
  // eslint-disable-next-line no-unused-vars
  const [isHovered, setIsHovered] = useState(false)

  // Agora usamos diretamente o whatsappLink do ContactInfo
  const whatsappLink = contactInfo.whatsappLink

  if (!whatsappLink) return null

  const finalWhatsAppLink = whatsappLink.includes("?text=")
    ? whatsappLink
    : `${whatsappLink}?text=${encodeURIComponent(defaultMessage)}`

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      <Link
        href={finalWhatsAppLink}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 via-teal-500 to-cyan-500 text-white shadow-2xl transition-all duration-500 hover:scale-110 hover:shadow-[0_0_40px_rgba(59,130,246,0.6)]"
        aria-label="Fale comigo no WhatsApp"
        title="Clique para conversar no WhatsApp"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Background animado */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-teal-500 via-teal-500 to-cyan-500 opacity-100 transition-all duration-500 group-hover:from-teal-600 group-hover:via-teal-600 group-hover:to-cyan-600" />

        {/* Efeito de brilho */}
        <div className="absolute inset-0 rounded-full bg-white/10 opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-100" />

        {/* Ícone com animação */}
        <div className="relative z-10 transform transition-transform duration-300 group-hover:scale-110">
          <WhatsAppIcon />
        </div>

        {/* Tooltip moderno */}
        <div className="absolute -top-16 right-0 hidden flex-col items-end group-hover:flex">
          <div className="rounded-lg border border-slate-700/50 bg-slate-900/95 px-4 py-3 text-sm font-medium text-white shadow-2xl backdrop-blur-sm">
            <div className="flex items-center gap-2 whitespace-nowrap">
              <BadgeCheck className="h-5 w-5 animate-pulse text-cyan-400" />
              Vamos conversar!
            </div>
          </div>
          {/* Seta do tooltip */}
          <div className="-mt-1 mr-4 h-2 w-2 rotate-45 border-b border-r border-slate-700/50 bg-slate-900/95" />
        </div>

        {/* Efeito de pulso contínuo sutil */}
        <div className="absolute -inset-2 animate-ping rounded-full border-2 border-teal-400/30" />
      </Link>

      {/* Efeito de partículas flutuantes */}
      <div className="pointer-events-none absolute -inset-6">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className={`animate-float absolute h-1 w-1 rounded-full bg-gradient-to-r from-teal-400 to-teal-400 opacity-70`}
            style={{
              top: `${20 + i * 20}%`,
              left: `${20 + i * 15}%`,
              animationDelay: `${i * 0.7}s`,
              animationDuration: `${3 + i * 0.5}s`,
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default FloatingWhatsAppButton
