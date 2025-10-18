"use client"

import { BikeShop, BikeService, Booking } from "@prisma/client"
import Image from "next/image"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet"
import { Calendar } from "./ui/calendar"
import { ptBR } from "date-fns/locale"
import { useEffect, useMemo, useState } from "react"
import { isPast, isToday, set } from "date-fns"
import { createBooking } from "../_actions/create-booking"
import { useSession } from "next-auth/react"
import { toast } from "sonner"
import { getBookings } from "../_actions/get-bookings"
import { Dialog, DialogContent } from "./ui/dialog"
import SignInDialog from "./sign-in-dialog"
import BookingSummary from "./booking-summary"
import { useRouter } from "next/navigation"
import { Clock, Calendar as CalendarIcon, CheckCircle2 } from "lucide-react"

interface ServiceItemProps {
  service: BikeService
  bikeshop: Pick<BikeShop, "name">
}

const TIME_LIST = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
]

interface GetTimeListProps {
  bookings: Booking[]
  selectedDay: Date
}

const getTimeList = ({ bookings, selectedDay }: GetTimeListProps) => {
  return TIME_LIST.filter((time) => {
    const hour = Number(time.split(":")[0])
    const minutes = Number(time.split(":")[1])

    const timeIsOnThePast = isPast(set(new Date(), { hours: hour, minutes }))
    if (timeIsOnThePast && isToday(selectedDay)) {
      return false
    }

    const hasBookingOnCurrentTime = bookings.some(
      (booking) =>
        booking.date.getHours() === hour &&
        booking.date.getMinutes() === minutes,
    )
    if (hasBookingOnCurrentTime) {
      return false
    }
    return true
  })
}

const ServiceItem = ({ service, bikeshop }: ServiceItemProps) => {
  const { data } = useSession()
  const router = useRouter()
  const [signInDialogIsOpen, setSignInDialogIsOpen] = useState(false)
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState<string | undefined>(
    undefined,
  )
  const [dayBookings, setDayBookings] = useState<Booking[]>([])
  const [bookingSheetIsOpen, setBookingSheetIsOpen] = useState(false)

  useEffect(() => {
    const fetch = async () => {
      if (!selectedDay) return
      const bookings = await getBookings({
        date: selectedDay,
        serviceId: service.id,
      })
      setDayBookings(bookings)
    }
    fetch()
  }, [selectedDay, service.id])

  const selectedDate = useMemo(() => {
    if (!selectedDay || !selectedTime) return
    return set(selectedDay, {
      hours: Number(selectedTime?.split(":")[0]),
      minutes: Number(selectedTime?.split(":")[1]),
    })
  }, [selectedDay, selectedTime])

  const handleBookingClick = () => {
    if (data?.user) {
      return setBookingSheetIsOpen(true)
    }
    return setSignInDialogIsOpen(true)
  }

  const handleBookingSheetOpenChange = () => {
    setSelectedDay(undefined)
    setSelectedTime(undefined)
    setDayBookings([])
    setBookingSheetIsOpen(false)
  }

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDay(date)
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
  }

  const handleCreateBooking = async () => {
    try {
      if (!selectedDate) return
      await createBooking({
        serviceId: service.id,
        date: selectedDate,
      })
      handleBookingSheetOpenChange()
      toast.success("🎉 Agendamento criado com sucesso!", {
        action: {
          label: "Ver agendamentos",
          onClick: () => router.push("/bookings"),
        },
        style: {
          background: "#10b981",
          color: "white",
          border: "none",
        },
      })
    } catch (error) {
      console.error(error)
      toast.error("❌ Erro ao criar agendamento!", {
        style: {
          background: "#ef4444",
          color: "white",
          border: "none",
        },
      })
    }
  }

  const timeList = useMemo(() => {
    if (!selectedDay) return []
    return getTimeList({
      bookings: dayBookings,
      selectedDay,
    })
  }, [dayBookings, selectedDay])

  return (
    <>
      <Card className="group border-gray-700/50 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm transition-all duration-300 hover:border-blue-500/20 hover:from-gray-800/70 hover:to-gray-900/70 hover:shadow-2xl">
        <CardContent className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
          {/* IMAGEM COM EFEITO - Responsiva */}
          <div className="relative mx-auto h-24 w-24 min-w-24 sm:h-28 sm:w-28 sm:min-w-28">
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 transition-all duration-300 group-hover:from-blue-500/30 group-hover:to-purple-500/30" />
            <Image
              alt={service.name}
              src={service.imageUrl}
              fill
              className="rounded-xl object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 96px, 112px"
            />
          </div>

          {/* CONTEÚDO */}
          <div className="flex-1 space-y-3">
            <div className="text-center sm:text-left">
              <h3 className="text-sm font-bold text-white transition-colors duration-200 group-hover:text-blue-400 sm:text-base">
                {service.name}
              </h3>
              <p className="mt-1 line-clamp-2 text-xs text-gray-400 sm:text-sm">
                {service.description}
              </p>
            </div>

            {/* PREÇO E BOTÃO */}
            <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
              <div className="flex flex-col items-center sm:items-start">
                <span className="text-xs text-gray-500">A partir de</span>
                <p className="bg-gradient-to-r from-blue-400 to-orange-400 bg-clip-text text-lg font-bold text-transparent sm:text-xl">
                  {Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(Number(service.price))}
                </p>
              </div>

              <Sheet
                open={bookingSheetIsOpen}
                onOpenChange={handleBookingSheetOpenChange}
              >
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleBookingClick}
                  className="group/btn w-full bg-gradient-to-r from-blue-600 to-orange-600 font-semibold text-white shadow-lg transition-all duration-200 hover:from-blue-700 hover:to-orange-700 hover:shadow-blue-500/25 sm:w-auto"
                >
                  <CalendarIcon className="mr-2 h-4 w-4 transition-transform group-hover/btn:scale-110" />
                  Agendar
                </Button>

                <SheetContent className="border-l border-gray-700/50 bg-gradient-to-b from-gray-900 to-gray-800 px-0 sm:max-w-md">
                  <SheetHeader className="border-b border-gray-700/50 px-4 pb-4 sm:px-6">
                    <div className="flex items-center gap-2">
                      <div className="rounded-lg bg-blue-500/10 p-2">
                        <CalendarIcon className="h-5 w-5 text-blue-400" />
                      </div>
                      <SheetTitle className="text-sm text-white sm:text-base">
                        Fazer Agendamento
                      </SheetTitle>
                    </div>
                  </SheetHeader>

                  <div className="border-b border-gray-700/50 py-4 sm:py-6">
                    <div className="mb-3 px-4 sm:mb-4 sm:px-6">
                      <div className="flex items-center gap-2 text-sm font-medium text-blue-400">
                        <Clock className="h-4 w-4" />
                        Selecione a data
                      </div>
                    </div>
                    <Calendar
                      mode="single"
                      locale={ptBR}
                      selected={selectedDay}
                      onSelect={handleDateSelect}
                      fromDate={new Date()}
                      className="px-4 sm:px-6"
                      styles={{
                        head_cell: {
                          width: "100%",
                          textTransform: "capitalize",
                          color: "#9CA3AF",
                          fontSize: "0.75rem",
                        },
                        cell: {
                          width: "100%",
                        },
                        button: {
                          width: "100%",
                          color: "#E5E7EB",
                          borderRadius: "6px",
                          transition: "all 0.2s",
                          fontSize: "0.875rem",
                        },
                        day: {
                          borderRadius: "6px",
                        },
                        nav_button_previous: {
                          width: "28px",
                          height: "28px",
                          color: "#9CA3AF",
                        },
                        nav_button_next: {
                          width: "28px",
                          height: "28px",
                          color: "#9CA3AF",
                        },
                        caption: {
                          textTransform: "capitalize",
                          color: "#E5E7EB",
                          fontSize: "0.9rem",
                          fontWeight: "600",
                        },
                        caption_label: {
                          color: "#E5E7EB",
                        },
                      }}
                    />
                  </div>

                  {selectedDay && (
                    <div className="border-b border-gray-700/50 py-4 sm:py-6">
                      <div className="mb-3 px-4 sm:mb-4 sm:px-6">
                        <div className="flex items-center gap-2 text-sm font-medium text-purple-400">
                          <Clock className="h-4 w-4" />
                          Horários disponíveis
                        </div>
                      </div>
                      <div className="flex gap-2 overflow-x-auto px-4 pb-2 sm:px-6 [&::-webkit-scrollbar]:hidden">
                        {timeList.length > 0 ? (
                          timeList.map((time) => (
                            <Button
                              key={time}
                              variant={
                                selectedTime === time ? "default" : "outline"
                              }
                              size="sm"
                              className={`min-w-[70px] rounded-full font-medium transition-all duration-200 ${
                                selectedTime === time
                                  ? "border-purple-500 bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                                  : "border-gray-600 bg-gray-800 text-gray-300 hover:border-purple-400/50 hover:bg-gray-700"
                              }`}
                              onClick={() => handleTimeSelect(time)}
                            >
                              {selectedTime === time && (
                                <CheckCircle2 className="mr-1 h-3 w-3" />
                              )}
                              {time}
                            </Button>
                          ))
                        ) : (
                          <div className="w-full py-3 text-center">
                            <p className="text-xs text-gray-400 sm:text-sm">
                              Não há horários disponíveis para este dia.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {selectedDate && (
                    <div className="p-4 sm:p-6">
                      <BookingSummary
                        bikeshop={bikeshop}
                        service={service}
                        selectedDate={selectedDate}
                      />
                    </div>
                  )}

                  <SheetFooter className="mt-4 px-4 sm:mt-5 sm:px-6">
                    <Button
                      onClick={handleCreateBooking}
                      disabled={!selectedDay || !selectedTime}
                      className="w-full rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:from-green-700 hover:to-emerald-700 hover:shadow-green-500/25 disabled:cursor-not-allowed disabled:opacity-50 sm:text-base"
                    >
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      Confirmar Agendamento
                    </Button>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog
        open={signInDialogIsOpen}
        onOpenChange={(open) => setSignInDialogIsOpen(open)}
      >
        <DialogContent className="w-[95%] max-w-md border-gray-700/50 bg-gradient-to-br from-gray-900 to-gray-800 p-4 sm:p-6">
          <SignInDialog />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default ServiceItem
