import React from "react"
import { Users, Award, Clock, Heart, Target, Zap, MapPin } from "lucide-react"

interface Gallery {
  id: string
  imageUrl: string
  caption?: string | null
  type: string
}

interface BikeShop {
  id: string
  name: string
  description: string
  imageUrl: string
  coverUrl: string
  address: string
  phones: string[]
  instagramUrl?: string | null
  facebookUrl?: string | null
  whatsappUrl?: string | null
  createdAt: Date
  updatedAt: Date
  gallery: Gallery[]
  services?: any[]
}

interface AboutProps {
  bikeShop: BikeShop | null
}

const About = ({ bikeShop }: AboutProps) => {
  if (!bikeShop) {
    return null
  }

  const calculateStats = () => {
    const yearsOfExperience = Math.floor(
      (new Date().getTime() - bikeShop.createdAt.getTime()) /
        (365 * 24 * 60 * 60 * 1000),
    )

    const estimatedRepairs = yearsOfExperience * 300
    const customerSatisfaction = "98%"
    const serviceWarranty = "24h"

    return [
      {
        number: `${yearsOfExperience}+`,
        label: "Anos de Experiência",
        icon: <Clock className="h-6 w-6" />,
      },
      {
        number: `${estimatedRepairs}+`,
        label: "Bikes Reparadas",
        icon: <Award className="h-6 w-6" />,
      },
      {
        number: customerSatisfaction,
        label: "Clientes Satisfeitos",
        icon: <Heart className="h-6 w-6" />,
      },
      {
        number: serviceWarranty,
        label: "Garantia de Serviço",
        icon: <Zap className="h-6 w-6" />,
      },
    ]
  }

  const stats = calculateStats()

  const values = [
    {
      icon: <Target className="h-8 w-8" />,
      title: "Excelência",
      description:
        "Buscamos sempre a perfeição em cada serviço realizado, garantindo qualidade superior.",
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Paixão",
      description:
        "Somos apaixonados por ciclismo e essa paixão se reflete em tudo que fazemos.",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Confiança",
      description:
        "Construímos relacionamentos duradouros baseados na confiança e transparência.",
    },
  ]

  const featuredImage =
    bikeShop.gallery.find(
      (img) =>
        img.imageUrl ===
        "https://qmpdo1utase5f4gf.public.blob.vercel-storage.com/IMG-20251017-WA0023.jpg",
    ) || bikeShop.gallery[0]

  return (
    <section id="about" className="bg-gradient-to-br py-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-orange-500">
            <Users className="h-8 w-8 text-white" />
          </div>
          <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl">
            Sobre a{" "}
            <span className="bg-gradient-to-r from-blue-400 to-orange-400 bg-clip-text text-transparent">
              {bikeShop.name}
            </span>
          </h2>
          <p className="mx-auto max-w-3xl text-xl leading-relaxed text-slate-300">
            {bikeShop.description}
          </p>
        </div>

        {/* Story Section */}
        <div className="mb-20 grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="space-y-6">
            <div className="inline-flex items-center space-x-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 backdrop-blur-sm">
              <span className="text-sm font-medium text-blue-300">
                Nossa História
              </span>
            </div>
            <h3 className="text-3xl font-bold text-white">
              Tradição e Qualidade em{" "}
              <span className="bg-gradient-to-r from-blue-400 to-orange-400 bg-clip-text text-transparent">
                Cada Serviço
              </span>
            </h3>
            <div className="space-y-4 leading-relaxed text-slate-300">
              <p>
                A {bikeShop.name} nasceu da paixão pelo ciclismo e da vontade de
                oferecer serviços de qualidade para ciclistas de todos os
                níveis.
              </p>
              <p>
                Localizada em {bikeShop.address}, temos orgulho em fazer parte
                da comunidade ciclística há{" "}
                {Math.floor(
                  (new Date().getTime() - bikeShop.createdAt.getTime()) /
                    (365 * 24 * 60 * 60 * 1000),
                )}{" "}
                anos.
              </p>
              <p>
                Oferecemos uma gama completa de serviços especializados, desde
                manutenção básica até reparos complexos, sempre com atendimento
                personalizado e técnicos qualificados.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10 overflow-hidden rounded-3xl shadow-2xl">
              <img
                src={
                  featuredImage?.imageUrl ||
                  bikeShop.imageUrl ||
                  "/default-bike-shop.jpg"
                }
                alt={`Oficina ${bikeShop.name}`}
                className="h-80 w-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
            </div>
            <div className="absolute -bottom-4 -right-4 -z-10 h-full w-full rounded-3xl bg-gradient-to-br from-blue-500/20 to-orange-500/20"></div>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-20 grid grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="rounded-2xl border border-slate-600/50 bg-slate-800/50 p-6 text-center backdrop-blur-sm transition-all duration-300 hover:border-blue-500/30 hover:bg-slate-800/70"
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-orange-500">
                <div className="text-white">{stat.icon}</div>
              </div>
              <div className="mb-2 text-2xl font-bold text-white md:text-3xl">
                {stat.number}
              </div>
              <div className="text-sm font-medium text-slate-300">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Values */}
        <div className="mb-20">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 rounded-full border border-orange-500/20 bg-orange-500/10 px-4 py-2 backdrop-blur-sm">
              <span className="text-sm font-medium text-orange-300">
                Nossos Valores
              </span>
            </div>
            <h3 className="mt-4 text-3xl font-bold text-white">
              O Que Nos{" "}
              <span className="bg-gradient-to-r from-blue-400 to-orange-400 bg-clip-text text-transparent">
                Move
              </span>
            </h3>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {values.map((value, index) => (
              <div
                key={index}
                className="rounded-2xl border border-slate-600/50 bg-slate-800/50 p-8 backdrop-blur-sm transition-all duration-300 hover:border-blue-500/30 hover:bg-slate-800/70"
              >
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-orange-500">
                  <div className="text-white">{value.icon}</div>
                </div>
                <h4 className="mb-4 text-center text-xl font-bold text-white">
                  {value.title}
                </h4>
                <p className="text-center leading-relaxed text-slate-300">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="mx-auto max-w-2xl rounded-3xl border border-slate-600/50 bg-slate-800/50 p-8 shadow-2xl backdrop-blur-sm">
            <div className="mb-6 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-orange-500">
                <MapPin className="h-8 w-8 text-white" />
              </div>
            </div>
            <h3 className="mb-4 text-2xl font-bold text-white">
              Venha nos Conhecer!
            </h3>
            <p className="mb-6 text-slate-300">
              Visite nossa loja e conheça nossa equipe pessoalmente
            </p>
            <div className="mb-6 space-y-3">
              <div className="flex items-center justify-center space-x-2 text-slate-300">
                <MapPin className="h-4 w-4" />
                <span className="font-medium">{bikeShop.address}</span>
              </div>
              {bikeShop.phones.map((phone, index) => (
                <p key={index} className="text-slate-300">
                  {phone}
                </p>
              ))}
            </div>
            <button className="rounded-2xl bg-gradient-to-r from-blue-500 to-orange-500 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:from-blue-600 hover:to-orange-600 hover:shadow-xl">
              Como Chegar
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
