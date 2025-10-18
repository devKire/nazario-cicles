import PhoneItem from "@/app/_components/phone-item"
import ServiceItem from "@/app/_components/service-item"
import SidebarSheet from "@/app/_components/sidebar-sheet"
import { Button } from "@/app/_components/ui/button"
import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet"
import { db } from "@/app/_lib/prisma"
import {
  ChevronLeftIcon,
  MapPinIcon,
  MenuIcon,
  StarIcon,
  Award,
  Phone,
  Sparkles,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

interface BikeShopPageProps {
  params: {
    id: string
  }
}

const BikeShopPage = async ({ params }: BikeShopPageProps) => {
  const bikeshop = await db.bikeShop.findUnique({
    where: {
      id: params.id,
    },
    include: {
      services: true,
      gallery: true,
    },
  })

  if (!bikeshop) {
    return notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br text-white">
      {/* HEADER COM IMAGEM */}
      <div className="relative h-[320px] w-full overflow-hidden">
        {/* Overlay gradiente */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />

        <Image
          alt={bikeshop.name}
          src={
            bikeshop?.gallery.find(
              (media) =>
                media.imageUrl ===
                "https://qmpdo1utase5f4gf.public.blob.vercel-storage.com/IMG-20251017-WA0075.jpg",
            )?.imageUrl || ""
          }
          fill
          className="object-cover"
          priority
        />

        {/* BOTÕES DE NAVEGAÇÃO */}
        <div className="absolute left-4 right-4 top-4 z-20 flex justify-between">
          <Button
            size="icon"
            variant="secondary"
            className="border-slate-700 bg-slate-900/80 text-white shadow-2xl backdrop-blur-sm transition-all hover:scale-110 hover:bg-slate-800/90"
            asChild
          >
            <Link href="/">
              <ChevronLeftIcon className="h-5 w-5" />
            </Link>
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button
                size="icon"
                variant="outline"
                className="border-slate-700 bg-slate-900/80 text-white shadow-2xl backdrop-blur-sm transition-all hover:scale-110 hover:bg-slate-800/90"
              >
                <MenuIcon className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SidebarSheet bikeShop={JSON.parse(JSON.stringify(bikeshop))} />
          </Sheet>
        </div>

        {/* INFORMAÇÕES NA IMAGEM */}
        <div className="absolute bottom-6 left-6 right-6 z-20">
          <div className="flex items-end gap-4">
            <div className="relative">
              <Image
                src={bikeshop.imageUrl}
                width={80}
                height={80}
                alt={`${bikeshop.name} logo`}
                className="rounded-full object-cover ring-2 ring-white/20"
              />
            </div>

            <div className="flex-1">
              <div className="mb-2 flex items-center gap-2">
                <div className="flex items-center gap-1 rounded-full bg-slate-900/80 px-3 py-1 backdrop-blur-sm">
                  <StarIcon className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-semibold text-white">5,0</span>
                  <span className="text-sm text-slate-300">(499)</span>
                </div>
              </div>

              <h1 className="mb-2 text-2xl font-bold text-white drop-shadow-2xl">
                {bikeshop.name}
              </h1>

              <div className="flex items-center gap-2 text-slate-200">
                <MapPinIcon className="h-4 w-4 text-blue-400" />
                <p className="text-sm">{bikeshop.address}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CONTEÚDO PRINCIPAL */}
      <div className="relative z-10 -mt-8 rounded-t-3xl bg-slate-900/95 shadow-2xl backdrop-blur-sm">
        {/* DESCRIÇÃO */}
        <div className="border-b border-slate-700/50 p-6">
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-xl bg-cyan-500/10 p-2">
              <Sparkles className="h-5 w-5 text-cyan-400" />
            </div>
            <h2 className="text-lg font-semibold text-cyan-400">Sobre Nós</h2>
          </div>
          <p className="text-justify text-sm leading-relaxed text-slate-300">
            {bikeshop?.description}
          </p>
        </div>

        {/* SERVIÇOS */}
        <div className="border-b border-slate-700/50 p-6">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-xl bg-purple-500/10 p-2">
              <Award className="h-5 w-5 text-purple-400" />
            </div>
            <h2 className="text-lg font-semibold text-purple-400">
              Nossos Serviços
            </h2>
          </div>
          <div className="space-y-4">
            {bikeshop.services.map((service) => (
              <ServiceItem
                key={service.id}
                bikeshop={JSON.parse(JSON.stringify(bikeshop))}
                service={JSON.parse(JSON.stringify(service))}
              />
            ))}
          </div>
        </div>

        {/* CONTATO */}
        <div className="p-6">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-xl bg-green-500/10 p-2">
              <Phone className="h-5 w-5 text-green-400" />
            </div>
            <h2 className="text-lg font-semibold text-green-400">Contato</h2>
          </div>
          <div className="space-y-3">
            {bikeshop.phones.map((phone) => (
              <PhoneItem key={phone} phone={phone} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BikeShopPage
