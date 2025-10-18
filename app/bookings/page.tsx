import { getServerSession } from "next-auth"
import Header from "../_components/header"
import { authOptions } from "../_lib/auth"
import { notFound } from "next/navigation"
import BookingItem from "../_components/booking-item"
import { getConfirmedBookings } from "../_data/get-confirmed-bookings"
import { getConcludedBookings } from "../_data/get-concluded-bookings"
import { db } from "../_lib/prisma"
import { Calendar, Clock, History } from "lucide-react"

const Bookings = async () => {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return notFound()
  }

  // Buscar a bikeshop
  const bikeshop = await db.bikeShop.findFirst({
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

  if (!bikeshop) {
    return notFound()
  }

  const confirmedBookings = await getConfirmedBookings()
  const concludedBookings = await getConcludedBookings()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Header bikeshop={bikeshop} />

      {/* Conteúdo Principal */}
      <div className="p-6">
        {/* Header da Página */}
        <div className="mb-8">
          <div className="mb-3 flex items-center gap-3">
            <div className="rounded-xl bg-blue-500/10 p-2">
              <Calendar className="h-6 w-6 text-blue-400" />
            </div>
            <h1 className="text-2xl font-bold text-white">Meus Agendamentos</h1>
          </div>
          <p className="text-sm text-gray-400">
            Gerencie e acompanhe seus agendamentos de serviço
          </p>
        </div>

        {/* Estado Vazio */}
        {confirmedBookings.length === 0 && concludedBookings.length === 0 && (
          <div className="py-12 text-center">
            <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gray-800">
              <Calendar className="h-10 w-10 text-gray-500" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-300">
              Nenhum agendamento
            </h3>
            <p className="mx-auto max-w-sm text-sm text-gray-500">
              Você ainda não possui agendamentos. Agende seu primeiro serviço
              para começar.
            </p>
          </div>
        )}

        {/* Agendamentos Confirmados */}
        {confirmedBookings.length > 0 && (
          <div className="mb-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-lg bg-green-500/10 p-2">
                <Clock className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-green-400">
                  Confirmados
                </h2>
                <p className="text-sm text-gray-400">
                  {confirmedBookings.length} agendamento(s) em andamento
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {confirmedBookings.map((booking) => (
                <BookingItem
                  key={booking.id}
                  booking={JSON.parse(JSON.stringify(booking))}
                />
              ))}
            </div>
          </div>
        )}

        {/* Agendamentos Finalizados */}
        {concludedBookings.length > 0 && (
          <div>
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-lg bg-purple-500/10 p-2">
                <History className="h-5 w-5 text-purple-400" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-purple-400">
                  Histórico
                </h2>
                <p className="text-sm text-gray-400">
                  {concludedBookings.length} serviço(s) concluído(s)
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {concludedBookings.map((booking) => (
                <BookingItem
                  key={booking.id}
                  booking={JSON.parse(JSON.stringify(booking))}
                />
              ))}
            </div>
          </div>
        )}

        {/* Estatísticas Rápidas */}
        {(confirmedBookings.length > 0 || concludedBookings.length > 0) && (
          <div className="mt-8 rounded-xl border border-gray-700/50 bg-gray-800/50 p-4">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="rounded-lg bg-gray-700/30 p-3">
                <div className="text-2xl font-bold text-green-400">
                  {confirmedBookings.length}
                </div>
                <div className="mt-1 text-xs text-gray-400">Em Andamento</div>
              </div>
              <div className="rounded-lg bg-gray-700/30 p-3">
                <div className="text-2xl font-bold text-purple-400">
                  {concludedBookings.length}
                </div>
                <div className="mt-1 text-xs text-gray-400">Concluídos</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Bookings
