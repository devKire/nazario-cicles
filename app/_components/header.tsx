"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { MenuIcon, Calendar } from "lucide-react"
import { Sheet, SheetTrigger } from "./ui/sheet"
import SidebarSheet from "./sidebar-sheet"
import Link from "next/link"
import { BikeShop } from "@prisma/client"

interface HeaderProps {
  bikeshop: BikeShop
}

const Header = ({ bikeshop }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const shopName = bikeshop?.name || "Bike Shop"
  const logoUrl = bikeshop?.imageUrl || "/logo.png"

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 10
      setIsScrolled(scrolled)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-slate-900/95 shadow-lg backdrop-blur-md"
          : "bg-transparent backdrop-blur-none"
      }`}
    >
      <Card className="border-0 bg-transparent">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            {/* Logo e Nome */}
            <Link href="/" className="group flex items-center gap-3">
              <div className="relative h-10 w-10">
                <Image
                  alt={shopName}
                  src={logoUrl}
                  fill
                  className="rounded-lg object-cover transition-transform duration-300 group-hover:scale-105"
                  priority
                />
              </div>
              <h1 className="text-xl font-bold tracking-tight text-white">
                {shopName}
              </h1>
            </Link>

            {/* CTA e Menu */}
            <div className="flex items-center gap-2">
              {/* Botão CTA - Agendar */}
              <Button
                className={`hidden items-center gap-2 font-semibold transition-all duration-300 sm:flex ${
                  isScrolled
                    ? "bg-gradient-to-r from-blue-500 to-orange-500 text-white hover:from-blue-600 hover:to-orange-600"
                    : "border-2 border-white bg-transparent text-white hover:bg-white hover:text-black"
                }`}
                asChild
              >
                <Link href={`/bikeshops/${bikeshop.id}`}>
                  <Calendar className="h-4 w-4" />
                  Agendar
                </Link>
              </Button>

              {/* Menu Mobile */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    size="icon"
                    variant="outline"
                    className={`transition-all duration-300 ${
                      isScrolled
                        ? "border-slate-700 bg-slate-800 text-white hover:bg-slate-700"
                        : "border-white bg-transparent text-white hover:bg-white hover:text-black"
                    }`}
                  >
                    <MenuIcon className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SidebarSheet bikeShop={bikeshop} />
              </Sheet>
            </div>
          </div>
        </CardContent>
      </Card>
    </header>
  )
}

export default Header
