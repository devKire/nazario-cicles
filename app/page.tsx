import { db } from "./_lib/prisma"
import Hero from "./_components/hero"
import Services from "./_components/services"
import Portfolio from "./_components/portfolio"
import Process from "./_components/process"
import About from "./_components/about"
import Contact from "./_components/contact"
import Testimonials from "./_components/testimonials"
import { BlobBackground } from "./_components/ui/blob-background"
import FloatingWhatsAppButton from "./_components/floating-whatsapp-button"

const Home = async () => {
  const landingPage = await db.landingPage.findFirst({
    include: {
      services: true,
      contactInfo: true,
      gallery: true,
    },
  })

  if (!landingPage) {
    return <div>Loading...</div>
  }
  const blobs = [
    {
      id: "blob1",
      gradientColors: ["#0D9488", "#5EEAD4"],
      size: 450,
      blur: 70,
      speed: 12,
      opacity: 0.1,
      zIndex: 1,
      initialPosition: { x: 100, y: 150 }, // y maior → mais para baixo
      pulseScale: 1.2,
      rotationSpeed: 8,
    },
    {
      id: "blob2",
      gradientColors: ["#14B8A6", "#06B6D4"],
      size: 350,
      blur: 60,
      speed: 15,
      opacity: 0.2,
      zIndex: 2,
      initialPosition: { x: 300, y: 180 },
      pulseScale: 1.15,
      rotationSpeed: 12,
    },
    {
      id: "blob3",
      gradientColors: ["#2DD4BF", "#0EA5E9"],
      size: 350,
      blur: 60,
      speed: 15,
      opacity: 0.1,
      zIndex: 3,
      initialPosition: { x: 500, y: 160 },
      pulseScale: 1.15,
      rotationSpeed: 12,
    },
  ]

  return (
    <main className="min-h-screen">
      {/* Blobs de fundo */}
      <div className="pointer-events-none fixed inset-0 z-50">
        <BlobBackground blobs={blobs} />
      </div>

      <Hero landingPage={landingPage} />
      <About landingPage={landingPage} />
      <Portfolio
        gallery={landingPage.gallery}
        contactInfo={landingPage.contactInfo}
      />
      <Services services={landingPage.services} />
      <Process />
      <Testimonials />
      <Contact contactInfo={landingPage.contactInfo} />
      {/* Botão do WhatsApp flutuante */}
      {landingPage.contactInfo && (
        <FloatingWhatsAppButton
          contactInfo={landingPage.contactInfo}
          defaultMessage="Olá! Gostaria de saber mais sobre seus serviços."
        />
      )}
    </main>
  )
}

export default Home
