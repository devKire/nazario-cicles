"use client"

import { Prisma } from "@prisma/client"
import { Avatar, AvatarImage } from "./ui/avatar"
import { Badge } from "./ui/badge"
import { Card, CardContent } from "./ui/card"
import { format, isFuture } from "date-fns"
import { ptBR } from "date-fns/locale"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"
import Image from "next/image"
import PhoneItem from "./phone-item"
import { Button } from "./ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { DialogClose } from "@radix-ui/react-dialog"
import { deleteBooking } from "../_actions/delete-booking"
import { toast } from "sonner"
import { useState } from "react"
import BookingSummary from "./booking-summary"
import {
  Calendar,
  Clock,
  MapPin,
  X,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react"

interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: {
        include: {
          bikeShop: true
        }
      }
    }
  }>
}

const BookingItem = ({ booking }: BookingItemProps) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const {
    service: { bikeShop },
  } = booking
  const isConfirmed = isFuture(booking.date)

  const handleCancelBooking = async () => {
    try {
      await deleteBooking(booking.id)
      setIsSheetOpen(false)
      toast.success("Reserva cancelada com sucesso!")
    } catch (error) {
      console.error(error)
      toast.error("Erro ao cancelar reserva. Tente novamente.")
    }
  }

  const handleSheetOpenChange = (isOpen: boolean) => {
    setIsSheetOpen(isOpen)
  }

  const handleOpenGoogleMaps = () => {
    // Cria a URL do Google Maps com o endereço da bikeshop
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(bikeShop.address)}`
    window.open(mapsUrl, "_blank")
  }

  return (
    <Sheet open={isSheetOpen} onOpenChange={handleSheetOpenChange}>
      <SheetTrigger className="w-full min-w-0">
        <Card className="w-full border-gray-700 bg-gray-800/50 backdrop-blur-sm transition-all duration-300 hover:border-cyan-500/20 hover:bg-gray-700/50 hover:shadow-lg hover:shadow-cyan-500/10">
          <CardContent className="flex justify-between p-0">
            {/* ESQUERDA - Informações do Serviço */}
            <div className="xs:py-5 xs:pl-5 flex flex-1 flex-col gap-2 py-4 pl-4">
              <Badge
                className="xs:text-sm w-fit border-0 text-xs font-semibold"
                variant={isConfirmed ? "default" : "secondary"}
              >
                {isConfirmed ? (
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    Confirmado
                  </div>
                ) : (
                  <div className="flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" />
                    Finalizado
                  </div>
                )}
              </Badge>

              <h3 className="xs:text-base text-sm font-bold text-white sm:text-lg">
                {booking.service.name}
              </h3>

              <div className="xs:gap-3 flex items-center gap-2">
                <Avatar className="xs:h-8 xs:w-8 h-6 w-6 ring-2 ring-cyan-500/20">
                  <AvatarImage src={booking.service.bikeShop.imageUrl} />
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="xs:text-sm truncate text-xs font-medium text-white">
                    {booking.service.bikeShop.name}
                  </p>
                  <p className="text-xs text-gray-400">
                    {format(booking.date, "dd 'de' MMMM 'às' HH:mm", {
                      locale: ptBR,
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* DIREITA - Data */}
            <div className="xs:min-w-[80px] xs:px-4 flex min-w-[70px] flex-col items-center justify-center border-l-2 border-gray-700 bg-gray-900/50 px-3 sm:px-6">
              <div className="text-center">
                <p className="xs:text-sm text-xs uppercase tracking-wide text-gray-400">
                  {format(booking.date, "MMM", { locale: ptBR })}
                </p>
                <p className="xs:text-2xl my-1 text-xl font-bold text-white">
                  {format(booking.date, "dd", { locale: ptBR })}
                </p>
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <Clock className="xs:h-3 xs:w-3 h-2 w-2" />
                  {format(booking.date, "HH:mm", { locale: ptBR })}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </SheetTrigger>

      <SheetContent
        className="w-full border-l-gray-700 bg-gradient-to-b from-gray-900 to-gray-800 p-0 sm:max-w-md"
        side="right"
      >
        <div className="flex h-full flex-col">
          {/* Header fixo */}
          <SheetHeader className="flex-shrink-0 border-b border-gray-700 px-4 py-4 sm:px-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-cyan-500/10 p-2">
                <Calendar className="h-5 w-5 text-cyan-400" />
              </div>
              <SheetTitle className="text-left text-sm text-white sm:text-base">
                Detalhes da Reserva
              </SheetTitle>
            </div>
          </SheetHeader>

          {/* Conteúdo rolável */}
          <div className="flex-1 overflow-y-auto">
            <div className="space-y-6 py-4 sm:space-y-6 sm:py-6">
              {/* Mapa e Localização */}
              <section className="px-4 sm:px-6">
                <button
                  onClick={handleOpenGoogleMaps}
                  className="xs:h-[160px] relative flex h-[140px] w-full items-end overflow-hidden rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-cyan-500/20 active:scale-[0.99]"
                >
                  <div className="absolute inset-0 z-10 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 transition-all duration-300 hover:from-cyan-500/30 hover:to-purple-500/30" />
                  <Image
                    alt={`Mapa da bicicletaria ${bikeShop.name}`}
                    src="/map.png"
                    fill
                    className="object-cover"
                  />

                  <Card className="xs:mx-4 xs:mb-4 z-20 mx-2 mb-3 w-full border-gray-600 bg-gray-900/90 backdrop-blur-sm transition-all duration-300 hover:border-cyan-500/50 hover:bg-gray-900/95">
                    <CardContent className="xs:gap-4 xs:p-4 flex items-center gap-3 p-3">
                      <Avatar className="xs:h-12 xs:w-12 h-8 w-8 ring-2 ring-cyan-500/30">
                        <AvatarImage src={bikeShop.imageUrl} />
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <h3 className="xs:text-lg truncate text-sm font-bold text-white">
                          {bikeShop.name}
                        </h3>
                        <div className="mt-1 flex items-center gap-2">
                          <MapPin className="h-3 w-3 text-cyan-400" />
                          <p className="truncate text-xs text-gray-300">
                            {bikeShop.address}
                          </p>
                        </div>
                        <div className="mt-2 flex items-center gap-1 text-xs text-cyan-400">
                          <MapPin className="h-3 w-3" />
                          <span className="font-medium">
                            Abrir no Google Maps
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </button>
              </section>

              {/* Status e Detalhes */}
              <div className="space-y-6 px-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <Badge
                    className="xs:text-sm border-0 px-3 py-1.5 text-xs font-semibold"
                    variant={isConfirmed ? "default" : "secondary"}
                  >
                    {isConfirmed ? (
                      <div className="flex items-center gap-2">
                        <Clock className="h-3 w-3" />
                        Agendamento Confirmado
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-3 w-3" />
                        Serviço Concluído
                      </div>
                    )}
                  </Badge>
                </div>

                {/* Resumo do Agendamento */}
                <section>
                  <div className="rounded-xl border border-gray-700 bg-gray-800/50 p-4">
                    <h4 className="xs:text-base mb-3 flex items-center gap-2 text-sm font-semibold text-white">
                      <Calendar className="h-4 w-4 text-cyan-400" />
                      Resumo do Serviço
                    </h4>
                    <BookingSummary
                      bikeshop={bikeShop}
                      service={booking.service}
                      selectedDate={booking.date}
                    />
                  </div>
                </section>

                {/* Contatos */}
                <section>
                  <div className="rounded-xl border border-gray-700 bg-gray-800/50 p-4">
                    <h4 className="xs:text-base mb-3 text-sm font-semibold text-white">
                      Contato
                    </h4>
                    <div className="space-y-2">
                      {bikeShop.phones.map((phone, index) => (
                        <PhoneItem key={index} phone={phone} />
                      ))}
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>

          {/* Footer fixo */}
          <SheetFooter className="flex-shrink-0 border-t border-gray-700 bg-gray-900/80 p-4 backdrop-blur-sm sm:p-6">
            <div className="flex w-full gap-3">
              <SheetClose asChild>
                <Button
                  variant="outline"
                  className="xs:text-sm flex-1 border-gray-600 text-xs text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  <X className="xs:h-4 xs:w-4 mr-2 h-3 w-3" />
                  Fechar
                </Button>
              </SheetClose>

              {isConfirmed && (
                <Dialog>
                  <DialogTrigger className="flex-1">
                    <Button
                      variant="destructive"
                      className="xs:text-sm w-full border border-red-500/30 bg-red-500/20 text-xs text-red-400 hover:bg-red-500/30"
                    >
                      Cancelar Reserva
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="w-[90%] border-gray-700 bg-gray-900 sm:max-w-md">
                    <DialogHeader>
                      <div className="mb-4 flex items-center gap-3">
                        <div className="rounded-lg bg-red-500/10 p-2">
                          <AlertTriangle className="h-5 w-5 text-red-400" />
                        </div>
                        <DialogTitle className="text-sm text-white sm:text-base">
                          Cancelar Reserva?
                        </DialogTitle>
                      </div>
                      <DialogDescription className="text-sm leading-relaxed text-gray-400">
                        Ao cancelar, você perderá sua reserva e não poderá
                        recuperá-la. Esta ação é irreversível.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="mt-6 flex flex-row gap-3">
                      <DialogClose asChild>
                        <Button
                          variant="outline"
                          className="xs:text-sm flex-1 border-gray-600 text-xs text-gray-300 hover:bg-gray-700"
                        >
                          Manter Reserva
                        </Button>
                      </DialogClose>
                      <DialogClose className="flex-1">
                        <Button
                          variant="destructive"
                          onClick={handleCancelBooking}
                          className="xs:text-sm w-full bg-red-500 text-xs text-white hover:bg-red-600"
                        >
                          Confirmar Cancelamento
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default BookingItem
