"use client"

import { Button } from "./ui/button"
import {
  CalendarIcon,
  HomeIcon,
  LogInIcon,
  LogOutIcon,
  Phone,
  MapPin,
  Instagram,
  Facebook,
  MessageCircle,
  Bike,
  Images,
  Users,
  ExternalLink,
} from "lucide-react"
import { SheetClose, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet"
import Link from "next/link"
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog"
import { signOut, useSession } from "next-auth/react"
import { Avatar, AvatarImage } from "./ui/avatar"
import SignInDialog from "./sign-in-dialog"
import Image from "next/image"

interface BikeShop {
  id: string
  name: string
  imageUrl: string
  address: string
  phones: string[]
  instagramUrl?: string | null
  facebookUrl?: string | null
  whatsappUrl?: string | null
}

interface SidebarSheetProps {
  bikeShop: BikeShop | null
}

const SidebarSheet = ({ bikeShop }: SidebarSheetProps) => {
  const { data } = useSession()
  const handleLogoutClick = () => signOut()

  const shopName = bikeShop?.name || "Bike Shop"
  const logoUrl = bikeShop?.imageUrl || "/logo.png"
  const phone = bikeShop?.phones?.[0] || null
  const address = bikeShop?.address || null

  // Função para formatar URL do WhatsApp
  const getWhatsAppUrl = () => {
    if (!bikeShop?.whatsappUrl) return "#"
    const url = bikeShop.whatsappUrl
    return url.startsWith("http")
      ? url
      : `https://wa.me/${url.replace(/\D/g, "")}`
  }

  return (
    <SheetContent className="flex flex-col overflow-y-auto border-l-slate-700 bg-slate-900 p-0 text-white sm:max-w-md">
      {/* Header com logo e informações da loja */}
      <div className="bg-slate-800 p-4 sm:p-6">
        <SheetHeader className="text-left">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="relative h-12 w-12 flex-shrink-0 sm:h-16 sm:w-16">
              <Image
                alt={shopName}
                src={logoUrl}
                fill
                className="rounded-xl object-cover"
                sizes="(max-width: 640px) 48px, 64px"
              />
            </div>
            <div className="min-w-0 flex-1">
              <SheetTitle className="truncate text-lg font-bold text-white sm:text-xl">
                {shopName}
              </SheetTitle>
              {phone && (
                <p className="truncate text-xs text-slate-300 sm:text-sm">
                  {phone}
                </p>
              )}
            </div>
          </div>
        </SheetHeader>
      </div>

      {/* Seção do Usuário */}
      <div className="border-b border-slate-700 bg-slate-800/50 p-4 sm:p-6">
        {data?.user ? (
          <div className="flex items-center gap-3 sm:gap-4">
            <Avatar className="h-10 w-10 border-2 border-slate-600 sm:h-12 sm:w-12">
              <AvatarImage src={data.user.image ?? ""} />
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-white sm:text-base">
                {data.user.name}
              </p>
              <p className="truncate text-xs text-slate-400 sm:text-sm">
                {data.user.email}
              </p>
            </div>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleLogoutClick}
              className="h-9 w-9 p-0 text-slate-400 hover:text-red-400 sm:h-auto sm:w-auto sm:px-3"
            >
              <LogOutIcon className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="sr-only sm:not-sr-only sm:ml-2">Sair</span>
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-center sm:text-left">
              <h2 className="text-sm font-semibold text-white sm:text-base">
                Olá, faça seu login!
              </h2>
              <p className="text-xs text-slate-400 sm:text-sm">
                Acesse sua conta
              </p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  size="sm"
                  className="w-full bg-blue-600 text-xs hover:bg-blue-700 sm:w-auto sm:text-sm"
                >
                  <LogInIcon className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                  Entrar
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[95%] max-w-md border-slate-700 bg-slate-900 p-4 sm:p-6">
                <SignInDialog />
              </DialogContent>
            </Dialog>
          </div>
        )}
      </div>

      {/* Conteúdo rolável */}
      <div className="flex-1 space-y-4 overflow-y-auto p-4 sm:space-y-6 sm:p-6">
        {/* Navegação Principal */}
        <div className="space-y-2">
          <h3 className="px-2 text-xs font-semibold uppercase tracking-wider text-slate-400 sm:text-sm">
            Navegação
          </h3>
          <div className="space-y-1">
            <SheetClose asChild>
              <Button
                className="w-full justify-start gap-3 text-slate-200 hover:bg-slate-800 hover:text-white"
                variant="ghost"
                size="sm"
                asChild
              >
                <Link href="/">
                  <HomeIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="text-sm sm:text-base">Início</span>
                </Link>
              </Button>
            </SheetClose>

            <SheetClose asChild>
              <Button
                className="w-full justify-start gap-3 text-slate-200 hover:bg-slate-800 hover:text-white"
                variant="ghost"
                size="sm"
                asChild
              >
                <Link href="#services">
                  <Bike className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="text-sm sm:text-base">Serviços</span>
                </Link>
              </Button>
            </SheetClose>

            <SheetClose asChild>
              <Button
                className="w-full justify-start gap-3 text-slate-200 hover:bg-slate-800 hover:text-white"
                variant="ghost"
                size="sm"
                asChild
              >
                <Link href="#about">
                  <Users className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="text-sm sm:text-base">Sobre Nós</span>
                </Link>
              </Button>
            </SheetClose>

            <SheetClose asChild>
              <Button
                className="w-full justify-start gap-3 text-slate-200 hover:bg-slate-800 hover:text-white"
                variant="ghost"
                size="sm"
                asChild
              >
                <Link href="#gallery">
                  <Images className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="text-sm sm:text-base">Galeria</span>
                </Link>
              </Button>
            </SheetClose>

            {data?.user && (
              <SheetClose asChild>
                <Button
                  className="w-full justify-start gap-3 text-slate-200 hover:bg-slate-800 hover:text-white"
                  variant="ghost"
                  size="sm"
                  asChild
                >
                  <Link href="/bookings">
                    <CalendarIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="text-sm sm:text-base">
                      Meus Agendamentos
                    </span>
                  </Link>
                </Button>
              </SheetClose>
            )}
          </div>
        </div>

        {/* Informações de Contato */}
        <div className="space-y-3 sm:space-y-4">
          <h3 className="px-2 text-xs font-semibold uppercase tracking-wider text-slate-400 sm:text-sm">
            Contato
          </h3>

          {address && (
            <div className="flex items-start gap-2 rounded-lg bg-slate-800/50 p-2 sm:gap-3 sm:p-3">
              <MapPin className="mt-0.5 h-3 w-3 flex-shrink-0 text-slate-400 sm:h-4 sm:w-4" />
              <span className="text-xs text-slate-300 sm:text-sm">
                {address}
              </span>
            </div>
          )}

          {phone && (
            <div className="flex items-center gap-2 rounded-lg bg-slate-800/50 p-2 sm:gap-3 sm:p-3">
              <Phone className="h-3 w-3 flex-shrink-0 text-slate-400 sm:h-4 sm:w-4" />
              <span className="text-xs text-slate-300 sm:text-sm">{phone}</span>
            </div>
          )}

          {/* Botão WhatsApp */}
          <SheetClose asChild>
            <Link
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-lg bg-green-600 px-3 py-2 text-xs font-semibold text-white transition-all hover:bg-green-700 sm:px-4 sm:py-3 sm:text-sm"
            >
              <MessageCircle className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>Conversar no WhatsApp</span>
              <ExternalLink className="h-3 w-3 opacity-70 sm:h-4 sm:w-4" />
            </Link>
          </SheetClose>
        </div>

        {/* Redes Sociais */}
        {(bikeShop?.instagramUrl || bikeShop?.facebookUrl) && (
          <div className="space-y-3 sm:space-y-4">
            <h3 className="px-2 text-xs font-semibold uppercase tracking-wider text-slate-400 sm:text-sm">
              Redes Sociais
            </h3>
            <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
              {bikeShop.instagramUrl && (
                <SheetClose asChild>
                  <Link
                    href={bikeShop.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-pink-600 to-purple-600 px-3 py-2 text-xs font-semibold text-white transition-all hover:from-pink-700 hover:to-purple-700 sm:px-4 sm:py-3 sm:text-sm"
                  >
                    <Instagram className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span>Instagram</span>
                  </Link>
                </SheetClose>
              )}
              {bikeShop.facebookUrl && (
                <SheetClose asChild>
                  <Link
                    href={bikeShop.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white transition-all hover:bg-blue-700 sm:px-4 sm:py-3 sm:text-sm"
                  >
                    <Facebook className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span>Facebook</span>
                  </Link>
                </SheetClose>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-slate-700 bg-slate-800/50 p-3 sm:p-4">
        <p className="text-center text-xs text-slate-500">
          © {new Date().getFullYear()} {shopName}. Todos os direitos
          reservados.
        </p>
      </div>
    </SheetContent>
  )
}

export default SidebarSheet
