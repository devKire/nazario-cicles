import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "sonner"
import Footer from "./_components/footer"
import AuthProvider from "./_providers/auth"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Nazario Cicles - Oficina Especializada em Bicicletas",
  description:
    "Oficina especializada em manutenção e reparo de bicicletas. Trabalhamos com excelência para oferecer o melhor serviço para sua bike, utilizando equipamentos de última geração. Atendemos todos os tipos de bicicletas: mountain bike, speed, urbana e infantil. Qualidade e garantia em todos os serviços.",
  openGraph: {
    title: "Nazario Cicles - Oficina Especializada em Bicicletas",
    description:
      "Oficina especializada em manutenção e reparo de bicicletas. Trabalhamos com excelência para oferecer o melhor serviço para sua bike, utilizando equipamentos de última geração.",
    url: "https://nazario-cicles.vercel.app", // Altere para o URL real do seu site
    siteName: "Nazario Cicles",
    images: [
      {
        url: "https://qmpdo1utase5f4gf.public.blob.vercel-storage.com/IMG-20251017-WA0068.jpg",
        width: 1200,
        height: 630,
        alt: "Nazario Cicles - Oficina Especializada em Bicicletas",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  icons: {
    icon: "https://qmpdo1utase5f4gf.public.blob.vercel-storage.com/IMG-20251017-WA0068.jpg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <AuthProvider>
          <div className="flex h-full flex-col">
            <div className="flex-1">{children}</div>
            <Footer />
          </div>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  )
}
