import React from "react"
import { ArrowUpRight, Wrench, Star, Clock, ShieldCheck } from "lucide-react"
import Image from "next/image"
import { BikeService } from "@prisma/client"
import Link from "next/link"

interface ServicesProps {
  popularServices?: (BikeService & {
    bikeShop: {
      id: string
      name: string
      imageUrl: string
      whatsappUrl?: string | null
    }
  })[]
}

const Services = ({ popularServices = [] }: ServicesProps) => {
  // Função para obter o WhatsApp da primeira oficina ou um número padrão
  const getWhatsAppUrl = () => {
    const firstShop = popularServices[0]?.bikeShop
    if (firstShop?.whatsappUrl) {
      return firstShop.whatsappUrl
    }

    // Fallback para um número padrão ou mensagem de erro
    const defaultPhone = "5548999999999" // Substitua pelo número padrão
    const defaultMessage =
      "Olá! Gostaria de falar com um especialista sobre serviços para minha bicicleta."
    return `https://wa.me/${defaultPhone}?text=${encodeURIComponent(defaultMessage)}`
  }

  return (
    <section id="services" className="bg-gradient-to-br py-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-orange-500">
            <Wrench className="h-8 w-8 text-white" />
          </div>
          <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl">
            Nossos{" "}
            <span className="bg-gradient-to-r from-blue-400 to-orange-400 bg-clip-text text-transparent">
              Serviços
            </span>
          </h2>
          <p className="mx-auto max-w-3xl text-xl leading-relaxed text-slate-300">
            Oferecemos uma gama completa de serviços especializados para manter
            sua bicicleta em perfeito estado e maximizar sua experiência de
            pedalada.
          </p>
        </div>

        {/* Services Grid - Layout Melhorado */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {popularServices.map((service) => (
            <div
              key={service.id}
              className="group relative overflow-hidden rounded-3xl border border-slate-600/50 bg-slate-800/50 shadow-lg backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:border-blue-500/50 hover:bg-slate-800/70 hover:shadow-blue-500/20"
            >
              {/* Background Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-orange-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>

              {/* Service Image - DESTAQUE PRINCIPAL */}
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={service.imageUrl}
                  alt={service.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent"></div>

                {/* Rating no canto esquerdo */}
                <div className="absolute left-4 top-4 flex items-center gap-1 rounded-full bg-black/50 px-3 py-1 backdrop-blur-sm">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-semibold text-white">5.0</span>
                </div>
              </div>

              {/* Content */}
              <div className="relative space-y-4 p-6">
                {/* Title */}
                <h3 className="text-xl font-bold text-white transition-colors group-hover:text-blue-400">
                  {service.name}
                </h3>

                {/* Description */}
                <p className="line-clamp-2 text-sm leading-relaxed text-slate-300">
                  {service.description}
                </p>

                {/* Features */}
                <div className="flex items-center gap-4 text-sm text-slate-400">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>1-2 dias</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ShieldCheck className="h-4 w-4" />
                    <span>Garantia</span>
                  </div>
                </div>

                {/* Price and Shop Info */}
                <div className="flex items-center justify-between border-t border-slate-600/50 pt-4">
                  <div className="flex items-center gap-3">
                    <div className="relative h-8 w-8">
                      <Image
                        src={service.bikeShop.imageUrl}
                        alt={service.bikeShop.name}
                        fill
                        className="rounded-full border border-slate-600 object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">
                        {service.bikeShop.name}
                      </p>
                      <p className="text-xs text-slate-400">Oficina</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-400">
                      R$ {service.price.toFixed(2)}
                    </p>
                    <p className="text-xs text-slate-400">a partir de</p>
                  </div>
                </div>

                {/* CTA Button */}
                <Link
                  href={`/bikeshops/${service.bikeShop.id}?service=${service.id}`}
                  className="group/btn flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500/20 to-orange-500/20 px-4 py-3 text-blue-300 transition-all duration-300 hover:from-blue-500/30 hover:to-orange-500/30 hover:text-white hover:shadow-lg"
                >
                  <span className="font-semibold">Agendar Serviço</span>
                  <ArrowUpRight
                    size={16}
                    className="transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5"
                  />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced CTA Section */}
        <div className="mt-20">
          <div className="mx-auto max-w-4xl rounded-3xl border border-slate-600/50 bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-12 shadow-2xl backdrop-blur-sm">
            <div className="text-center">
              <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-orange-500">
                <Wrench className="h-10 w-10 text-white" />
              </div>

              <h3 className="mb-4 text-3xl font-bold text-white">
                Não encontrou o que procura?
              </h3>

              <p className="mb-8 text-lg leading-relaxed text-slate-300">
                Temos soluções personalizadas para todas as suas necessidades.
                Nossa equipe especializada está pronta para ajudar com serviços
                sob medida para sua bicicleta.
              </p>

              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-green-600 to-green-500 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-green-700 hover:to-green-600 hover:shadow-green-500/25"
                >
                  <span>Falar com Especialista</span>
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893c0-3.189-1.248-6.189-3.515-8.464" />
                  </svg>
                </a>
              </div>

              {/* Additional Info */}
              <div className="mt-8 grid grid-cols-1 gap-6 border-t border-slate-600/50 pt-8 sm:grid-cols-3">
                <div className="text-center">
                  <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/20">
                    <Clock className="h-6 w-6 text-blue-400" />
                  </div>
                  <h4 className="font-semibold text-white">
                    Atendimento Rápido
                  </h4>
                  <p className="text-sm text-slate-400">
                    Agendamento em minutos
                  </p>
                </div>

                <div className="text-center">
                  <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-orange-500/20">
                    <ShieldCheck className="h-6 w-6 text-orange-400" />
                  </div>
                  <h4 className="font-semibold text-white">Garantia Total</h4>
                  <p className="text-sm text-slate-400">
                    90 dias em todos os serviços
                  </p>
                </div>

                <div className="text-center">
                  <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-purple-500/20">
                    <Star className="h-6 w-6 text-purple-400" />
                  </div>
                  <h4 className="font-semibold text-white">Avaliação 5★</h4>
                  <p className="text-sm text-slate-400">Clientes satisfeitos</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Services
