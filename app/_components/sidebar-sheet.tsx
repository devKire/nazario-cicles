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
    <SheetContent className="flex flex-col overflow-y-auto border-l-slate-700 bg-slate-900 p-0 text-white">
      {/* Header com logo e informações da loja */}
      <div className="bg-slate-800 p-6">
        <SheetHeader className="text-left">
          <div className="flex items-center gap-4">
            <div className="relative h-16 w-16 flex-shrink-0">
              <Image
                alt={shopName}
                src={logoUrl}
                fill
                className="rounded-xl object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <SheetTitle className="truncate text-xl font-bold text-white">
                {shopName}
              </SheetTitle>
              {phone && (
                <p className="truncate text-sm text-slate-300">{phone}</p>
              )}
            </div>
          </div>
        </SheetHeader>
      </div>

      {/* Seção do Usuário */}
      <div className="border-b border-slate-700 bg-slate-800/50 p-6">
        {data?.user ? (
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12 border-2 border-slate-600">
              <AvatarImage src={data.user.image ?? ""} />
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="truncate font-semibold text-white">
                {data.user.name}
              </p>
              <p className="truncate text-sm text-slate-400">
                {data.user.email}
              </p>
            </div>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleLogoutClick}
              className="text-slate-400 hover:text-red-400"
            >
              <LogOutIcon size={18} />
            </Button>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-white">Olá, faça seu login!</h2>
              <p className="text-sm text-slate-400">Acesse sua conta</p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <LogInIcon size={18} className="mr-2" />
                  Entrar
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[95%] max-w-md border-slate-700 bg-slate-900">
                <SignInDialog />
              </DialogContent>
            </Dialog>
          </div>
        )}
      </div>

      {/* Conteúdo rolável */}
      <div className="flex-1 space-y-6 overflow-y-auto p-6">
        {/* Navegação Principal */}
        <div className="space-y-2">
          <h3 className="px-2 text-sm font-semibold uppercase tracking-wider text-slate-400">
            Navegação
          </h3>
          <div className="space-y-1">
            <SheetClose asChild>
              <Button
                className="w-full justify-start gap-3 text-slate-200 hover:bg-slate-800 hover:text-white"
                variant="ghost"
                asChild
              >
                <Link href="/">
                  <HomeIcon size={20} />
                  Início
                </Link>
              </Button>
            </SheetClose>

            <SheetClose asChild>
              <Button
                className="w-full justify-start gap-3 text-slate-200 hover:bg-slate-800 hover:text-white"
                variant="ghost"
                asChild
              >
                <Link href="#services">
                  <Bike size={20} />
                  Serviços
                </Link>
              </Button>
            </SheetClose>

            <SheetClose asChild>
              <Button
                className="w-full justify-start gap-3 text-slate-200 hover:bg-slate-800 hover:text-white"
                variant="ghost"
                asChild
              >
                <Link href="#about">
                  <Users size={20} />
                  Sobre Nós
                </Link>
              </Button>
            </SheetClose>

            <SheetClose asChild>
              <Button
                className="w-full justify-start gap-3 text-slate-200 hover:bg-slate-800 hover:text-white"
                variant="ghost"
                asChild
              >
                <Link href="#gallery">
                  <Images size={20} />
                  Galeria
                </Link>
              </Button>
            </SheetClose>

            {data?.user && (
              <SheetClose asChild>
                <Button
                  className="w-full justify-start gap-3 text-slate-200 hover:bg-slate-800 hover:text-white"
                  variant="ghost"
                  asChild
                >
                  <Link href="/bookings">
                    <CalendarIcon size={20} />
                    Meus Agendamentos
                  </Link>
                </Button>
              </SheetClose>
            )}
          </div>
        </div>

        {/* Informações de Contato */}
        <div className="space-y-4">
          <h3 className="px-2 text-sm font-semibold uppercase tracking-wider text-slate-400">
            Contato
          </h3>

          {address && (
            <div className="flex items-start gap-3 rounded-lg bg-slate-800/50 p-3">
              <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-slate-400" />
              <span className="text-sm text-slate-300">{address}</span>
            </div>
          )}

          {phone && (
            <div className="flex items-center gap-3 rounded-lg bg-slate-800/50 p-3">
              <Phone className="h-4 w-4 flex-shrink-0 text-slate-400" />
              <span className="text-sm text-slate-300">{phone}</span>
            </div>
          )}

          {/* Botão WhatsApp */}
          <SheetClose asChild>
            <Link
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-3 font-semibold text-white transition-all hover:bg-green-700"
            >
              <MessageCircle size={20} />
              Conversar no WhatsApp
              <ExternalLink size={16} className="opacity-70" />
            </Link>
          </SheetClose>
        </div>

        {/* Redes Sociais */}
        {(bikeShop?.instagramUrl || bikeShop?.facebookUrl) && (
          <div className="space-y-4">
            <h3 className="px-2 text-sm font-semibold uppercase tracking-wider text-slate-400">
              Redes Sociais
            </h3>
            <div className="flex gap-3">
              {bikeShop.instagramUrl && (
                <SheetClose asChild>
                  <Link
                    href={bikeShop.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-pink-600 to-purple-600 px-4 py-3 font-semibold text-white transition-all hover:from-pink-700 hover:to-purple-700"
                  >
                    <Instagram size={20} />
                    Instagram
                  </Link>
                </SheetClose>
              )}
              {bikeShop.facebookUrl && (
                <SheetClose asChild>
                  <Link
                    href={bikeShop.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition-all hover:bg-blue-700"
                  >
                    <Facebook size={20} />
                    Facebook
                  </Link>
                </SheetClose>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-slate-700 bg-slate-800/50 p-4">
        <p className="text-center text-xs text-slate-500">
          © {new Date().getFullYear()} {shopName}. Todos os direitos
          reservados.
        </p>
      </div>
    </SheetContent>
  )
}

export default SidebarSheet
