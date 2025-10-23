const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

const main = async () => {
  await prisma.$transaction(
    async (tx: any) => {
      // Limpar dados existentes
      await tx.contactInfo.deleteMany()
      await tx.gallery.deleteMany()
      await tx.service.deleteMany()
      await tx.landingPage.deleteMany()

      console.log("🧹 Dados existentes limpos.")

      // Landing Page principal
      const landingPage = await tx.landingPage.create({
        data: {
          name: "Insertion 3D Studio",
          description:
            "Insertion 3D Studio é um estúdio especializado em visualização arquitetônica e criação de conteúdo 3D para o setor imobiliário. Oferecemos serviços de alta qualidade para ajudar incorporadoras, arquitetos e designers a apresentar seus projetos de forma impactante e realista.",
          avatarImageUrl:
            "https://h4mwwihke9yjbcdr.public.blob.vercel-storage.com/insertion/insertionlogopng.png",
          coverImageUrl:
            "https://h4mwwihke9yjbcdr.public.blob.vercel-storage.com/insertion/insertion.jpg",
        },
      })

      // Contatos
      await tx.contactInfo.create({
        data: {
          email: "contato@insertion3dstudio.com",
          phone: "(47) 9137-8628",
          whatsappLink: "https://wa.me/554791378628",
          instagramLink:
            "https://www.instagram.com/insertion3d?igsh=MXRveXNtNzl2azUzNQ%3D%3D",
          facebookLink: "https://www.facebook.com/Insertion3d",
          behanceLink: "https://www.behance.net/insertion",
          landingpageId: landingPage.id,
        },
      })

      // Serviços com imagens do Pexels
      const services = [
        {
          name: "Imagens para Lançamentos Imobiliários",
          description:
            "Criação de imagens 3D realistas para lançamentos de empreendimentos, mostrando ambientes internos e externos com alto nível de detalhe.",
          imageUrl:
            "https://images.pexels.com/photos/28729467/pexels-photo-28729467.jpeg",
          landingPageId: landingPage.id,
        },
        {
          name: "Materiais para Divulgação",
          description:
            "Desenvolvimento de conteúdo para redes sociais e campanhas de marketing com identidade visual consistente.",
          imageUrl:
            "https://images.pexels.com/photos/269077/pexels-photo-269077.jpeg",
          landingPageId: landingPage.id,
        },
        {
          name: "Design de Fachada",
          description:
            "Projeto e visualização 3D de fachadas arquitetônicas residenciais e comerciais, com foco em estética e realismo.",
          imageUrl:
            "https://images.pexels.com/photos/323775/pexels-photo-323775.jpeg",
          landingPageId: landingPage.id,
        },
        {
          name: "Tour Virtual 360°",
          description:
            "Criação de experiências imersivas e interativas para apresentações de empreendimentos imobiliários.",
          imageUrl:
            "https://images.pexels.com/photos/7031402/pexels-photo-7031402.jpeg",
          landingPageId: landingPage.id,
        },
        {
          name: "Visualização Arquitetônica",
          description:
            "Renderizações de alta fidelidade para interiores, exteriores e paisagismo.",
          imageUrl:
            "https://images.pexels.com/photos/1571459/pexels-photo-1571459.jpeg",
          landingPageId: landingPage.id,
        },
        {
          name: "Animação Arquitetônica",
          description:
            "Animações 3D que destacam cada detalhe do projeto, ideais para apresentações e campanhas.",
          imageUrl:
            "https://images.pexels.com/photos/28456458/pexels-photo-28456458.jpeg",
          landingPageId: landingPage.id,
        },
        {
          name: "Maquetes Eletrônicas",
          description:
            "Modelos tridimensionais precisos e detalhados para aprovação e apresentação de projetos.",
          imageUrl:
            "https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg",
          landingPageId: landingPage.id,
        },
        {
          name: "Consultoria em Visualização",
          description:
            "Aconselhamento técnico e criativo sobre estratégias de visualização e apresentação de projetos.",
          imageUrl:
            "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg",
          landingPageId: landingPage.id,
        },
      ]

      for (const service of services) {
        await tx.service.create({ data: service })
      }

      // Galeria com imagens do Pexels
      const galleryImages = [
        {
          imageUrl:
            "https://images.pexels.com/photos/323772/pexels-photo-323772.jpeg",
          caption: "Renderização de projeto residencial moderno",
          type: "FEATURED",
          mediaType: "IMAGE",
          landingPageId: landingPage.id,
        },
        {
          imageUrl:
            "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg",
          caption: "Visualização de fachada comercial contemporânea",
          type: "GALLERY",
          mediaType: "IMAGE",
          landingPageId: landingPage.id,
        },
        {
          imageUrl:
            "https://images.pexels.com/photos/813692/pexels-photo-813692.jpeg",
          caption: "Interior sofisticado com iluminação realista",
          type: "GALLERY",
          mediaType: "IMAGE",
          landingPageId: landingPage.id,
        },
        {
          imageUrl:
            "https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg",
          caption: "Sala de estar renderizada em alta definição",
          type: "GALLERY",
          mediaType: "IMAGE",
          landingPageId: landingPage.id,
        },
        {
          imageUrl:
            "https://h4mwwihke9yjbcdr.public.blob.vercel-storage.com/insertion/video1.mp4",
          caption: "Vídeo de tour virtual por apartamento moderno",
          type: "GALLERY",
          mediaType: "VIDEO",
          landingPageId: landingPage.id,
        },
        {
          imageUrl:
            "https://images.pexels.com/photos/6585765/pexels-photo-6585765.jpeg",
          caption: "Projeto de interiores com textura realista",
          type: "GALLERY",
          mediaType: "IMAGE",
          landingPageId: landingPage.id,
        },
        {
          imageUrl:
            "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg",
          caption: "Visualização de fachada comercial contemporânea",
          type: "GALLERY",
          mediaType: "IMAGE",
          landingPageId: landingPage.id,
        },
        {
          imageUrl:
            "https://images.pexels.com/photos/813692/pexels-photo-813692.jpeg",
          caption: "Interior sofisticado com iluminação realista",
          type: "GALLERY",
          mediaType: "IMAGE",
          landingPageId: landingPage.id,
        },
        {
          imageUrl:
            "https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg",
          caption: "Sala de estar renderizada em alta definição",
          type: "GALLERY",
          mediaType: "IMAGE",
          landingPageId: landingPage.id,
        },
        {
          imageUrl:
            "https://h4mwwihke9yjbcdr.public.blob.vercel-storage.com/insertion/video2.mp4",
          caption: "Animação arquitetônica de empreendimento residencial",
          type: "GALLERY",
          mediaType: "VIDEO",
          landingPageId: landingPage.id,
        },
        {
          imageUrl:
            "https://images.pexels.com/photos/276583/pexels-photo-276583.jpeg",
          caption: "Renderização noturna com iluminação cênica",
          type: "GALLERY",
          mediaType: "IMAGE",
          landingPageId: landingPage.id,
        },
        {
          imageUrl:
            "https://images.pexels.com/photos/276583/pexels-photo-276583.jpeg",
          caption: "Renderização noturna com iluminação cênica",
          type: "GALLERY",
          mediaType: "IMAGE",
          landingPageId: landingPage.id,
        },
        {
          imageUrl:
            "https://images.pexels.com/photos/382297/pexels-photo-382297.jpeg",
          caption: "Detalhes de modelagem arquitetônica em 3D",
          type: "GALLERY",
          mediaType: "IMAGE",
          landingPageId: landingPage.id,
        },
        {
          imageUrl:
            "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg",
          caption: "Fachada moderna com integração paisagística",
          type: "FEATURED",
          mediaType: "IMAGE",
          landingPageId: landingPage.id,
        },
        {
          imageUrl:
            "https://h4mwwihke9yjbcdr.public.blob.vercel-storage.com/insertion/video1.mp4",
          caption: "Vídeo de apresentação de design de fachada",
          type: "GALLERY",
          mediaType: "VIDEO",
          landingPageId: landingPage.id,
        },
        {
          imageUrl:
            "https://images.pexels.com/photos/382297/pexels-photo-382297.jpeg",
          caption: "Detalhes de modelagem arquitetônica em 3D",
          type: "GALLERY",
          mediaType: "IMAGE",
          landingPageId: landingPage.id,
        },
        {
          imageUrl:
            "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg",
          caption: "Fachada moderna com integração paisagística",
          type: "FEATURED",
          mediaType: "IMAGE",
          landingPageId: landingPage.id,
        },
        {
          imageUrl:
            "https://images.pexels.com/photos/382297/pexels-photo-382297.jpeg",
          caption: "Detalhes de modelagem arquitetônica em 3D",
          type: "GALLERY",
          mediaType: "IMAGE",
          landingPageId: landingPage.id,
        },
        {
          imageUrl:
            "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg",
          caption: "Fachada moderna com integração paisagística",
          type: "FEATURED",
          mediaType: "IMAGE",
          landingPageId: landingPage.id,
        },
        {
          imageUrl:
            "https://images.pexels.com/photos/382297/pexels-photo-382297.jpeg",
          caption: "Detalhes de modelagem arquitetônica em 3D",
          type: "GALLERY",
          mediaType: "IMAGE",
          landingPageId: landingPage.id,
        },
        {
          imageUrl:
            "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg",
          caption: "Fachada moderna com integração paisagística",
          type: "FEATURED",
          mediaType: "IMAGE",
          landingPageId: landingPage.id,
        },
      ]

      for (const image of galleryImages) {
        await tx.gallery.create({ data: image })
      }

      console.log("✅ Insertion 3D Studio - dados criados com sucesso!")
    },
    { timeout: 20000 },
  )

  console.log("📱 Seed de dados concluído com sucesso! 🎉")
}

main()
  .catch((e) => {
    console.error("Erro ao executar o seed:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
