/* eslint-disable @next/next/no-page-custom-font */
import type { Metadata } from "next"
import { Inter, Montserrat } from "next/font/google"
import "./globals.css"
import { Toaster } from "sonner"
import Footer from "./_components/footer"
import Header from "./_components/header"

// Fontes do Google via next/font
const inter = Inter({ subsets: ["latin"] })
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-heading",
})

export const metadata: Metadata = {
  title: "Insertion 3D Studio",
  description:
    "Insertion 3D Studio é um estúdio de visualização arquitetônica 3D na América do Sul, especializado em transformar projetos arquitetônicos em experiências visuais impactantes.",
  openGraph: {
    title: "Insertion 3D Studio",
    description:
      "Insertion 3D Studio é um estúdio de visualização arquitetônica 3D na América do Sul, especializado em transformar projetos arquitetônicos em experiências visuais impactantes.",
    url: "",
    siteName: "Insertion 3D Studio",
    images: [
      {
        url: "https://qmpdo1utase5f4gf.public.blob.vercel-storage.com/IMG-20251017-WA0068.jpg",
        width: 1200,
        height: 630,
        alt: "Insertion 3D Studio",
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
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <head>
        {/* Fonte extra BBH Sans Bartle */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=BBH+Sans+Bartle&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.className} ${montserrat.variable}`}>
        <div className="flex min-h-screen w-full flex-col overflow-x-hidden">
          <div className="flex-1">{children}</div>
          <Header />
          <Footer />
        </div>
        <Toaster />
      </body>
    </html>
  )
}
