import Header from "./_components/header"
import Image from "next/image"
import { db } from "./_lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "./_lib/auth"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { getConfirmedBookings } from "./_data/get-confirmed-bookings"
import About from "./_components/About"
import Services from "./_components/Services"
import { Star, Calendar, Bike, Shield, Clock, MapPin } from "lucide-react"
import Hero from "./_components/hero"
import Link from "next/link"
import Gallery from "./_components/gallery"

const Home = async () => {
  const session = await getServerSession(authOptions)

  // Buscar informações da bike shop
  const bikeShop = await db.bikeShop.findFirst({
    include: {
      services: {
        include: {
          bikeShop: {
            select: {
              id: true,
              name: true,
              imageUrl: true,
              coverUrl: true,
              address: true,
              phones: true,
              instagramUrl: true,
              facebookUrl: true,
              whatsappUrl: true,
            },
          },
        },
      },
      gallery: true,
    },
  })

  // Buscar serviços populares
  const popularServices = await db.bikeService.findMany({
    orderBy: {
      price: "desc",
    },
    include: {
      bikeShop: true,
    },
    take: 6,
  })

  const confirmedBookings = await getConfirmedBookings()

  const features = [
    {
      icon: <Shield className="h-5 w-5" />,
      text: "Garantia em todos os serviços",
    },
    { icon: <Clock className="h-5 w-5" />, text: "Entrega rápida e segura" },
    { icon: <Star className="h-5 w-5" />, text: "Atendimento especializado" },
    { icon: <Bike className="h-5 w-5" />, text: "Peças originais" },
  ]

  return (
    <div className="r min-h-screen">
      {/* Header */}
      {bikeShop && <Header bikeshop={bikeShop} />}

      {/* Section com Agendamento - Só mostra se usuário estiver logado E tiver agendamentos */}

      {/* Main Section - Só mostra se usuário estiver logado */}
      {session?.user && (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {confirmedBookings.length > 0 && (
            <section className="mb-16 overflow-hidden rounded-3xl bg-gradient-to-br from-blue-900/30 via-slate-800 to-purple-900/30 shadow-2xl">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Text Content */}
                <div className="p-8 lg:p-12">
                  <div className="inline-flex items-center space-x-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 backdrop-blur-sm">
                    <Calendar className="h-4 w-4 text-blue-400" />
                    <span className="text-sm font-medium text-blue-300">
                      Próximo Agendamento
                    </span>
                  </div>

                  <div className="mt-8 space-y-6">
                    <h1 className="text-4xl font-bold leading-tight text-white md:text-5xl">
                      Seu serviço está{" "}
                      <span className="bg-gradient-to-r from-blue-400 to-orange-400 bg-clip-text text-transparent">
                        agendado!
                      </span>
                    </h1>

                    {/* Booking Info */}
                    <div className="space-y-4 rounded-2xl border border-blue-500/20 bg-blue-500/10 p-6 backdrop-blur-sm">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-xl font-bold text-white">
                            {confirmedBookings[0].service.name}
                          </h3>
                          <p className="text-blue-300">
                            {format(
                              new Date(confirmedBookings[0].date),
                              "dd 'de' MMMM 'às' HH:mm",
                              {
                                locale: ptBR,
                              },
                            )}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-orange-400">
                            R${" "}
                            {Number(confirmedBookings[0].service.price).toFixed(
                              2,
                            )}
                          </p>
                          <p className="text-sm text-slate-400">Confirmado</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 text-slate-300">
                        <MapPin className="h-4 w-4" />
                        <span className="text-sm">{bikeShop?.address}</span>
                      </div>
                    </div>

                    <p className="text-lg leading-relaxed text-slate-300">
                      Estamos preparados para receber sua bike. Chegue no
                      horário agendado e traga seus documentos.
                    </p>

                    {/* Action Buttons */}
                    <div className="flex gap-4">
                      <Link
                        href="/bookings"
                        className="rounded-xl bg-blue-500/20 px-6 py-3 text-blue-300 transition-all duration-200 hover:bg-blue-500/30 hover:text-blue-200"
                      >
                        Ver Detalhes do Agendamento
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Booking Visual */}
                <div className="relative bg-gradient-to-br from-blue-500/10 to-purple-500/10">
                  <div className="flex h-full items-center justify-center p-8">
                    <div className="text-center">
                      <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-orange-500">
                        <Calendar className="h-10 w-10 text-white" />
                      </div>
                      <h3 className="mb-2 text-xl font-bold text-white">
                        Agendamento Confirmado
                      </h3>
                      <p className="text-slate-300">
                        Sua bike será atendida por especialistas
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}
          <section className="mb-16 overflow-hidden rounded-3xl bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Text Content */}
              <div className="p-8 lg:p-12">
                <div className="inline-flex items-center space-x-2 rounded-full border border-orange-500/20 bg-orange-500/10 px-4 py-2 backdrop-blur-sm">
                  <div className="h-2 w-2 animate-pulse rounded-full bg-orange-400"></div>
                  <span className="text-sm font-medium text-orange-300">
                    {format(new Date(), "EEEE, dd 'de' MMMM", { locale: ptBR })}
                  </span>
                </div>

                <div className="mt-8 space-y-6">
                  <h1 className="text-4xl font-bold leading-tight text-white md:text-6xl">
                    Olá,{" "}
                    <span className="bg-gradient-to-r from-blue-400 to-orange-400 bg-clip-text text-transparent">
                      {session.user.name?.split(" ")[0]}
                    </span>
                    !
                  </h1>
                  <p className="text-xl leading-relaxed text-slate-300">
                    Sua bike merece o melhor cuidado. Agende serviços
                    especializados com profissionais certificados.
                  </p>

                  {/* Features Grid */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-3 text-slate-300"
                      >
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/20">
                          {feature.icon}
                        </div>
                        <span className="text-sm font-medium">
                          {feature.text}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-3 gap-6 border-t border-slate-600/50 pt-6">
                    <div className="text-center">
                      <div className="mb-1 text-2xl font-bold text-white">
                        {popularServices.length}+
                      </div>
                      <div className="text-sm text-slate-400">Serviços</div>
                    </div>
                    <div className="text-center">
                      <div className="mb-1 text-2xl font-bold text-white">
                        {confirmedBookings.length}
                      </div>
                      <div className="text-sm text-slate-400">Agendamentos</div>
                    </div>
                    <div className="text-center">
                      <div className="mb-1 text-2xl font-bold text-white">
                        100%
                      </div>
                      <div className="text-sm text-slate-400">Garantia</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Banner Image */}
              <div className="relative">
                <div className="relative h-80 w-full lg:h-full">
                  <Image
                    alt="Agende os melhores serviços para sua bike"
                    src="https://qmpdo1utase5f4gf.public.blob.vercel-storage.com/IMG-20251017-WA0072.jpg"
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-l from-slate-900/80 to-slate-900/20 lg:bg-gradient-to-r lg:from-transparent lg:to-slate-900/80"></div>

                  {/* Floating Card */}
                  <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-slate-600/50 bg-slate-800/80 p-6 backdrop-blur-sm lg:bottom-auto lg:top-6">
                    <div className="flex items-center space-x-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-orange-500">
                        <Bike className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-white">
                          Serviço Premium
                        </h3>
                        <p className="text-sm text-slate-300">
                          Qualidade garantida
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* Estas seções são mostradas para todos os usuários (logados e não logados) */}
      {bikeShop && (
        <>
          <Hero bikeshop={bikeShop} />
          <Services popularServices={bikeShop.services} />
          <About bikeShop={bikeShop} />
          <Gallery gallery={bikeShop.gallery} />
        </>
      )}
    </div>
  )
}

export default Home
