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

  return (
    <Sheet open={isSheetOpen} onOpenChange={handleSheetOpenChange}>
      <SheetTrigger className="w-full min-w-[90%]">
        <Card className="min-w-[90%] border-gray-700 bg-gray-800/50 backdrop-blur-sm transition-all duration-300 hover:border-cyan-500/20 hover:bg-gray-700/50 hover:shadow-lg hover:shadow-cyan-500/10">
          <CardContent className="flex justify-between p-0">
            {/* ESQUERDA - Informações do Serviço */}
            <div className="flex flex-1 flex-col gap-3 py-5 pl-5">
              <Badge
                className="w-fit border-0 font-semibold"
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

              <h3 className="text-lg font-bold text-white">
                {booking.service.name}
              </h3>

              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8 ring-2 ring-cyan-500/20">
                  <AvatarImage src={booking.service.bikeShop.imageUrl} />
                </Avatar>
                <div>
                  <p className="text-sm font-medium text-white">
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
            <div className="flex min-w-[80px] flex-col items-center justify-center border-l-2 border-gray-700 bg-gray-900/50 px-6">
              <div className="text-center">
                <p className="text-sm uppercase tracking-wide text-gray-400">
                  {format(booking.date, "MMM", { locale: ptBR })}
                </p>
                <p className="my-1 text-2xl font-bold text-white">
                  {format(booking.date, "dd", { locale: ptBR })}
                </p>
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <Clock className="h-3 w-3" />
                  {format(booking.date, "HH:mm", { locale: ptBR })}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </SheetTrigger>

      <SheetContent className="w-[90%] border-l-gray-700 bg-gradient-to-b from-gray-900 to-gray-800 sm:w-[540px]">
        <SheetHeader className="border-b border-gray-700 pb-4">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-cyan-500/10 p-2">
              <Calendar className="h-5 w-5 text-cyan-400" />
            </div>
            <SheetTitle className="text-left text-white">
              Detalhes da Reserva
            </SheetTitle>
          </div>
        </SheetHeader>

        {/* Mapa e Localização */}
        <div className="relative mt-6 flex h-[160px] w-full items-end overflow-hidden rounded-xl">
          <div className="absolute inset-0 z-10 bg-gradient-to-r from-cyan-500/20 to-purple-500/20" />
          <Image
            alt={`Mapa da bicicletaria ${bikeShop.name}`}
            src="/map.png"
            fill
            className="object-cover"
          />

          <Card className="z-20 mx-4 mb-4 w-full border-gray-600 bg-gray-900/90 backdrop-blur-sm">
            <CardContent className="flex items-center gap-4 p-4">
              <Avatar className="h-12 w-12 ring-2 ring-cyan-500/30">
                <AvatarImage src={bikeShop.imageUrl} />
              </Avatar>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white">
                  {bikeShop.name}
                </h3>
                <div className="mt-1 flex items-center gap-2">
                  <MapPin className="h-3 w-3 text-cyan-400" />
                  <p className="text-xs text-gray-300">{bikeShop.address}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Status e Detalhes */}
        <div className="mt-6 space-y-6">
          <div className="flex items-center justify-between">
            <Badge
              className="border-0 px-3 py-1.5 font-semibold"
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
          <div className="rounded-xl border border-gray-700 bg-gray-800/50 p-4">
            <h4 className="mb-3 flex items-center gap-2 font-semibold text-white">
              <Calendar className="h-4 w-4 text-cyan-400" />
              Resumo do Serviço
            </h4>
            <BookingSummary
              bikeshop={bikeShop}
              service={booking.service}
              selectedDate={booking.date}
            />
          </div>

          {/* Contatos */}
          <div className="rounded-xl border border-gray-700 bg-gray-800/50 p-4">
            <h4 className="mb-3 font-semibold text-white">Contato</h4>
            <div className="space-y-2">
              {bikeShop.phones.map((phone, index) => (
                <PhoneItem key={index} phone={phone} />
              ))}
            </div>
          </div>
        </div>

        {/* Ações */}
        <SheetFooter className="mt-8 border-t border-gray-700 pt-6">
          <div className="flex w-full gap-3">
            <SheetClose asChild>
              <Button
                variant="outline"
                className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                <X className="mr-2 h-4 w-4" />
                Fechar
              </Button>
            </SheetClose>

            {isConfirmed && (
              <Dialog>
                <DialogTrigger className="flex-1">
                  <Button
                    variant="destructive"
                    className="w-full border border-red-500/30 bg-red-500/20 text-red-400 hover:bg-red-500/30"
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
                      <DialogTitle className="text-white">
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
                        className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700"
                      >
                        Manter Reserva
                      </Button>
                    </DialogClose>
                    <DialogClose className="flex-1">
                      <Button
                        variant="destructive"
                        onClick={handleCancelBooking}
                        className="w-full bg-red-500 text-white hover:bg-red-600"
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
      </SheetContent>
    </Sheet>
  )
}

export default BookingItem
