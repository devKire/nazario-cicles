"use client"

import { BikeShop } from "@prisma/client"
import Image from "next/image"
import { Button } from "./ui/button"
import { Star, MapPin, ChevronRight, Sparkles } from "lucide-react"
import Link from "next/link"

interface HeroSectionProps {
  bikeshop: BikeShop
}

const Hero = ({ bikeshop }: HeroSectionProps) => {
  const stats = [
    { number: "15+", label: "Anos Experiência" },
    { number: "5K+", label: "Bikes Reparadas" },
    { number: "98%", label: "Satisfação" },
    { number: "24h", label: "Garantia" },
  ]

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        {bikeshop.coverUrl && (
          <Image
            src="https://images.pexels.com/photos/22811935/pexels-photo-22811935.jpeg"
            alt={`Background ${bikeshop.name}`}
            fill
            className="object-cover"
            priority
            quality={100}
          />
        )}
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40" />
      </div>
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid min-h-screen grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Content Side - Left */}
          <div className="relative space-y-8 py-20">
            {/* Premium Badge */}
            <div className="inline-flex items-center gap-2 rounded-2xl border border-blue-500/30 bg-blue-500/10 px-4 py-3 backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-blue-400" />
              <span className="text-sm font-semibold text-blue-300">
                Oficina Premium • Especialistas Certificados
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-6">
              <h1 className="text-4xl font-bold leading-tight text-white md:text-6xl lg:text-7xl">
                <span className="bg-gradient-to-r from-blue-400 via-orange-400 to-blue-400 bg-clip-text text-transparent">
                  {bikeshop.name}
                </span>
                <span className="mt-4 block text-3xl text-slate-300 md:text-4xl lg:text-5xl">
                  Sua bike em boas mãos
                </span>
              </h1>

              {/* Rating & Location */}
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2 rounded-2xl bg-slate-800/50 px-4 py-2 backdrop-blur-sm">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <span className="font-semibold text-white">5,0</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <MapPin className="h-5 w-5" />
                  <span className="text-lg">{bikeshop.address}</span>
                </div>
              </div>

              {/* Description */}
              <p className="max-w-2xl text-xl leading-relaxed text-slate-300 md:text-2xl">
                Tecnologia de ponta e expertise para entregar o melhor serviço
                de manutenção e reparo para sua bicicleta.
                <span className="mt-2 block font-semibold text-blue-400">
                  Qualidade garantida, performance comprovada.
                </span>
              </p>
            </div>

            {/* Interactive Stats */}
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-800/30 p-4 backdrop-blur-sm transition-all duration-500 hover:border-blue-500/30 hover:bg-slate-800/50"
                >
                  <div className="relative z-10">
                    <div className="mb-1 text-2xl font-bold text-white md:text-3xl">
                      {stat.number}
                    </div>
                    <div className="text-xs text-slate-400 md:text-sm">
                      {stat.label}
                    </div>
                  </div>
                  <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-blue-500/10 transition-all duration-500 group-hover:scale-150"></div>
                </div>
              ))}
            </div>

            {/* CTA Section */}
            <div className="flex flex-col items-center justify-center pt-4 sm:flex-row">
              <Button
                asChild
                className="group relative rounded-2xl bg-gradient-to-r from-blue-500 to-orange-500 px-16 py-6 text-lg font-bold text-white shadow-2xl transition-all duration-300 hover:scale-105 hover:from-blue-600 hover:to-orange-600 hover:shadow-blue-500/25"
              >
                <Link
                  href={`/bikeshops/${bikeshop.id}`}
                  className="flex items-center gap-2"
                >
                  Agendar Serviço
                  <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 transform">
        <div className="flex flex-col items-center space-y-3 text-slate-400">
          <span className="text-sm font-medium">Explore nossos serviços</span>
          <div className="flex h-12 w-8 justify-center rounded-full border-2 border-slate-600/50">
            <div className="mt-2 h-3 w-1 animate-bounce rounded-full bg-blue-400"></div>
          </div>
        </div>
      </div>

      {/* Mobile Image */}
      <div className="relative lg:hidden">
        <div className="relative h-80 w-full overflow-hidden">
          <Image
            alt={bikeshop.name}
            fill
            className="object-cover"
            src={bikeshop.imageUrl}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }
        @keyframes float-delayed {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-30px) rotate(-180deg);
          }
        }
        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 10s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float-slow 12s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}

export default Hero
