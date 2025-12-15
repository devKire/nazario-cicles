const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

async function seedDatabase() {
  try {
    // Criar a oficina
    const bikeShop = await prisma.bikeShop.create({
      data: {
        name: "Nazario Cicle's",
        address:
          "R. Hamilton José Silveira Machado, 22 - Adhemar Garcia, Joinville - SC, 89230-709",
        imageUrl:
          "https://otycnlvsqpjeaeywtzix.supabase.co/storage/v1/object/public/nazariocicles/IMG-20251017-WA0068.jpg",
        coverUrl:
          "https://otycnlvsqpjeaeywtzix.supabase.co/storage/v1/object/public/nazariocicles/IMG-20251017-WA0019.jpg",
        phones: ["(47) 97331-387"],
        instagramUrl: "https://www.instagram.com/nazariocicles",
        facebookUrl: "https://www.facebook.com/vanderson.nazario.5",
        whatsappUrl: "https://wa.me/554797331387",
        description:
          "Oficina especializada em manutenção e reparo de bicicletas. Trabalhamos com excelência para oferecer o melhor serviço para sua bike, utilizando equipamentos de última geração. Atendemos todos os tipos de bicicletas: mountain bike, speed, urbana e infantil. Qualidade e garantia em todos os serviços.",
      },
    })

    // Serviços
    const services = [
      {
        name: "Manutenção Completa",
        description:
          "Revisão geral da sua bike com check-up de todos os componentes, ajustes e lubrificação.",
        price: 120.0,
        imageUrl:
          "https://otycnlvsqpjeaeywtzix.supabase.co/storage/v1/object/public/nazariocicles/IMG-20251017-WA0021.jpg",
      },
      {
        name: "Regulagem Profissional",
        description:
          "Ajustes finos de suspensão, freios e câmbio para máximo desempenho.",
        price: 80.0,
        imageUrl:
          "https://otycnlvsqpjeaeywtzix.supabase.co/storage/v1/object/public/nazariocicles/IMG-20251017-WA0040.jpg",
      },
      {
        name: "Upgrade de Componentes",
        description:
          "Modernize sua bike com peças de alta qualidade e tecnologia avançada.",
        price: 200.0,
        imageUrl:
          "https://otycnlvsqpjeaeywtzix.supabase.co/storage/v1/object/public/nazariocicles/IMG-20251017-WA0055.jpg",
      },
      {
        name: "Reparo de Emergência",
        description:
          "Serviço rápido para resolver problemas urgentes com agilidade e precisão.",
        price: 60.0,
        imageUrl:
          "https://otycnlvsqpjeaeywtzix.supabase.co/storage/v1/object/public/nazariocicles/IMG-20251017-WA0061.jpg",
      },
      {
        name: "Manutenção Preventiva",
        description:
          "Programa de revisões periódicas para manter sua bike sempre pronta.",
        price: 90.0,
        imageUrl:
          "https://otycnlvsqpjeaeywtzix.supabase.co/storage/v1/object/public/nazariocicles/IMG-20251017-WA0022.jpg",
      },
      {
        name: "Consultoria Especializada",
        description:
          "Orientação técnica para escolha de peças e melhorias personalizadas.",
        price: 50.0,
        imageUrl:
          "https://otycnlvsqpjeaeywtzix.supabase.co/storage/v1/object/public/nazariocicles/IMG-20251017-WA0015.jpg",
      },
      {
        name: "Lavagem e Limpeza Profunda",
        description:
          "Higienização completa da bike com produtos específicos que preservam os componentes.",
        price: 45.0,
        imageUrl:
          "https://otycnlvsqpjeaeywtzix.supabase.co/storage/v1/object/public/nazariocicles/IMG-20251017-WA0039.jpg",
      },
      {
        name: "Troca de Câmaras e Pneus",
        description:
          "Substituição de pneus e câmaras para melhor desempenho e segurança.",
        price: 35.0,
        imageUrl:
          "https://otycnlvsqpjeaeywtzix.supabase.co/storage/v1/object/public/nazariocicles/IMG-20251017-WA0064.jpg",
      },
    ]

    for (const service of services) {
      await prisma.bikeService.create({
        data: {
          ...service,
          bikeShop: { connect: { id: bikeShop.id } },
        },
      })
    }

    const galleryImages = [
      {
        imageUrl:
          "https://otycnlvsqpjeaeywtzix.supabase.co/storage/v1/object/public/nazariocicles/IMG-20251017-WA0065.jpg",
        caption: "Serviço de manutenção profissional",
        type: "FEATURED",
        mediaType: "IMAGE",
      },
      {
        imageUrl:
          "https://otycnlvsqpjeaeywtzix.supabase.co/storage/v1/object/public/nazariocicles/IMG-20251017-WA0063.jpg",
        caption: "Regulagem de componentes",
        type: "GALLERY",
        mediaType: "IMAGE",
      },
      {
        imageUrl:
          "https://otycnlvsqpjeaeywtzix.supabase.co/storage/v1/object/public/nazariocicles/IMG-20251017-WA0059.jpg",
        caption: "Manutenção preventiva",
        type: "GALLERY",
        mediaType: "IMAGE",
      },
      {
        imageUrl:
          "https://otycnlvsqpjeaeywtzix.supabase.co/storage/v1/object/public/nazariocicles/IMG-20251017-WA0060.jpg",
        caption: "Área de trabalho",
        type: "GALLERY",
        mediaType: "IMAGE",
      },
      {
        imageUrl:
          "https://otycnlvsqpjeaeywtzix.supabase.co/storage/v1/object/public/nazariocicles/IMG-20251017-WA0061.jpg",
        caption: "Ferramentas profissionais",
        type: "GALLERY",
        mediaType: "IMAGE",
      },
      {
        imageUrl:
          "https://otycnlvsqpjeaeywtzix.supabase.co/storage/v1/object/public/nazariocicles/IMG-20251017-WA0062.jpg",
        caption: "Detalhe do serviço",
        type: "GALLERY",
        mediaType: "IMAGE",
      },
      {
        imageUrl:
          "https://otycnlvsqpjeaeywtzix.supabase.co/storage/v1/object/public/nazariocicles/VID-20251017-WA0007.mp4",
        caption: "Vídeo demonstrativo dos serviços",
        type: "GALLERY",
        mediaType: "VIDEO",
      },
      {
        imageUrl:
          "https://otycnlvsqpjeaeywtzix.supabase.co/storage/v1/object/public/nazariocicles/IMG-20251017-WA0058.jpg",
        caption: "Bicicleta em revisão",
        type: "GALLERY",
        mediaType: "IMAGE",
      },
      {
        imageUrl:
          "https://otycnlvsqpjeaeywtzix.supabase.co/storage/v1/object/public/nazariocicles/IMG-20251017-WA0054.jpg",
        caption: "Componentes e peças",
        type: "GALLERY",
        mediaType: "IMAGE",
      },
      {
        imageUrl:
          "https://otycnlvsqpjeaeywtzix.supabase.co/storage/v1/object/public/nazariocicles/IMG-20251017-WA0055.jpg",
        caption: "Manutenção especializada",
        type: "GALLERY",
        mediaType: "IMAGE",
      },
      {
        imageUrl:
          "https://otycnlvsqpjeaeywtzix.supabase.co/storage/v1/object/public/nazariocicles/IMG-20251017-WA0056.jpg",
        caption: "Detalhe técnico",
        type: "GALLERY",
        mediaType: "IMAGE",
      },
      {
        imageUrl:
          "https://otycnlvsqpjeaeywtzix.supabase.co/storage/v1/object/public/nazariocicles/IMG-20251017-WA0057.jpg",
        caption: "Serviço em andamento",
        type: "GALLERY",
        mediaType: "IMAGE",
      },
      {
        imageUrl:
          "https://otycnlvsqpjeaeywtzix.supabase.co/storage/v1/object/public/nazariocicles/IMG-20251017-WA0052.jpg",
        caption: "Organização da oficina",
        type: "GALLERY",
        mediaType: "IMAGE",
      },
      {
        imageUrl:
          "https://otycnlvsqpjeaeywtzix.supabase.co/storage/v1/object/public/nazariocicles/IMG-20251017-WA0053.jpg",
        caption: "Ferramentas em uso",
        type: "GALLERY",
        mediaType: "IMAGE",
      },
      {
        imageUrl:
          "https://otycnlvsqpjeaeywtzix.supabase.co/storage/v1/object/public/nazariocicles/IMG-20251017-WA0049.jpg",
        caption: "Manutenção de transmissão",
        type: "GALLERY",
        mediaType: "IMAGE",
      },
      {
        imageUrl:
          "https://otycnlvsqpjeaeywtzix.supabase.co/storage/v1/object/public/nazariocicles/IMG-20251017-WA0050.jpg",
        caption: "Serviço de limpeza",
        type: "GALLERY",
        mediaType: "IMAGE",
      },
      {
        imageUrl:
          "https://otycnlvsqpjeaeywtzix.supabase.co/storage/v1/object/public/nazariocicles/IMG-20251017-WA0051.jpg",
        caption: "Ajustes finos",
        type: "GALLERY",
        mediaType: "IMAGE",
      },
      {
        imageUrl:
          "https://otycnlvsqpjeaeywtzix.supabase.co/storage/v1/object/public/nazariocicles/IMG-20251017-WA0045.jpg",
        caption: "Oficina completa",
        type: "GALLERY",
        mediaType: "IMAGE",
      },
      {
        imageUrl:
          "https://otycnlvsqpjeaeywtzix.supabase.co/storage/v1/object/public/nazariocicles/IMG-20251017-WA0046.jpg",
        caption: "Equipamentos profissionais",
        type: "GALLERY",
        mediaType: "IMAGE",
      },
      {
        imageUrl:
          "https://otycnlvsqpjeaeywtzix.supabase.co/storage/v1/object/public/nazariocicles/IMG-20251017-WA0047.jpg",
        caption: "Detalhe do trabalho",
        type: "GALLERY",
        mediaType: "IMAGE",
      },
      {
        imageUrl:
          "https://otycnlvsqpjeaeywtzix.supabase.co/storage/v1/object/public/nazariocicles/IMG-20251017-WA0044.jpg",
        caption: "Organização do espaço",
        type: "GALLERY",
        mediaType: "IMAGE",
      },
      {
        imageUrl:
          "https://otycnlvsqpjeaeywtzix.supabase.co/storage/v1/object/public/nazariocicles/IMG-20251017-WA0040.jpg",
        caption: "Serviço especializado",
        type: "GALLERY",
        mediaType: "IMAGE",
      },
      {
        imageUrl:
          "https://otycnlvsqpjeaeywtzix.supabase.co/storage/v1/object/public/nazariocicles/IMG-20251017-WA0041.jpg",
        caption: "Manutenção preventiva",
        type: "GALLERY",
        mediaType: "IMAGE",
      },
      {
        imageUrl:
          "https://otycnlvsqpjeaeywtzix.supabase.co/storage/v1/object/public/nazariocicles/IMG-20251017-WA0042.jpg",
        caption: "Regulagem de componentes",
        type: "GALLERY",
        mediaType: "IMAGE",
      },
      {
        imageUrl:
          "https://otycnlvsqpjeaeywtzix.supabase.co/storage/v1/object/public/nazariocicles/IMG-20251017-WA0043.jpg",
        caption: "Detalhe técnico",
        type: "GALLERY",
        mediaType: "IMAGE",
      },
      {
        imageUrl:
          "https://otycnlvsqpjeaeywtzix.supabase.co/storage/v1/object/public/nazariocicles/IMG-20251017-WA0039.jpg",
        caption: "Bicicleta em manutenção",
        type: "GALLERY",
        mediaType: "IMAGE",
      },
      {
        imageUrl:
          "https://otycnlvsqpjeaeywtzix.supabase.co/storage/v1/object/public/nazariocicles/IMG-20251017-WA0037.jpg",
        caption: "Ferramentas em ação",
        type: "GALLERY",
        mediaType: "IMAGE",
      },
      {
        imageUrl:
          "https://otycnlvsqpjeaeywtzix.supabase.co/storage/v1/object/public/nazariocicles/IMG-20251017-WA0038.jpg",
        caption: "Serviço profissional",
        type: "GALLERY",
        mediaType: "IMAGE",
      },
      {
        imageUrl:
          "https://otycnlvsqpjeaeywtzix.supabase.co/storage/v1/object/public/nazariocicles/VID-20251017-WA0006.mp4",
        caption: "Processo de manutenção em vídeo",
        type: "GALLERY",
        mediaType: "VIDEO",
      },
      {
        imageUrl:
          "https://otycnlvsqpjeaeywtzix.supabase.co/storage/v1/object/public/nazariocicles/VID-20251017-WA0005.mp4",
        caption: "Demonstração de serviços",
        type: "GALLERY",
        mediaType: "VIDEO",
      },
      {
        imageUrl:
          "https://otycnlvsqpjeaeywtzix.supabase.co/storage/v1/object/public/nazariocicles/IMG-20251017-WA0031.jpg",
        caption: "Oficina organizada",
        type: "GALLERY",
        mediaType: "IMAGE",
      },
      {
        imageUrl:
          "https://otycnlvsqpjeaeywtzix.supabase.co/storage/v1/object/public/nazariocicles/IMG-20251017-WA0032.jpg",
        caption: "Trabalho em detalhe",
        type: "GALLERY",
        mediaType: "IMAGE",
      },
      {
        imageUrl:
          "https://otycnlvsqpjeaeywtzix.supabase.co/storage/v1/object/public/nazariocicles/IMG-20251017-WA0033.jpg",
        caption: "Manutenção completa",
        type: "GALLERY",
        mediaType: "IMAGE",
      },
      {
        imageUrl:
          "https://otycnlvsqpjeaeywtzix.supabase.co/storage/v1/object/public/nazariocicles/IMG-20251017-WA0034.jpg",
        caption: "Serviço de qualidade",
        type: "GALLERY",
        mediaType: "IMAGE",
      },
      {
        imageUrl:
          "https://otycnlvsqpjeaeywtzix.supabase.co/storage/v1/object/public/nazariocicles/IMG-20251017-WA0035.jpg",
        caption: "Equipamentos profissionais",
        type: "GALLERY",
        mediaType: "IMAGE",
      },
      {
        imageUrl:
          "https://otycnlvsqpjeaeywtzix.supabase.co/storage/v1/object/public/nazariocicles/IMG-20251017-WA0036.jpg",
        caption: "Detalhe do serviço",
        type: "GALLERY",
        mediaType: "IMAGE",
      },
      {
        imageUrl:
          "https://otycnlvsqpjeaeywtzix.supabase.co/storage/v1/object/public/nazariocicles/IMG-20251017-WA0027.jpg",
        caption: "Regulagem precisa",
        type: "GALLERY",
        mediaType: "IMAGE",
      },
      {
        imageUrl:
          "https://otycnlvsqpjeaeywtzix.supabase.co/storage/v1/object/public/nazariocicles/IMG-20251017-WA0028.jpg",
        caption: "Manutenção especializada",
        type: "GALLERY",
        mediaType: "IMAGE",
      },
      {
        imageUrl:
          "https://otycnlvsqpjeaeywtzix.supabase.co/storage/v1/object/public/nazariocicles/IMG-20251017-WA0029.jpg",
        caption: "Serviço em andamento",
        type: "GALLERY",
        mediaType: "IMAGE",
      },
      {
        imageUrl:
          "https://otycnlvsqpjeaeywtzix.supabase.co/storage/v1/object/public/nazariocicles/IMG-20251017-WA0030.jpg",
        caption: "Detalhe técnico",
        type: "GALLERY",
        mediaType: "IMAGE",
      },
      {
        imageUrl:
          "https://otycnlvsqpjeaeywtzix.supabase.co/storage/v1/object/public/nazariocicles/VID-20251017-WA0004.mp4",
        caption: "Vídeo dos serviços",
        type: "GALLERY",
        mediaType: "VIDEO",
      },
      {
        imageUrl:
          "https://otycnlvsqpjeaeywtzix.supabase.co/storage/v1/object/public/nazariocicles/IMG-20251017-WA0026.jpg",
        caption: "Organização do trabalho",
        type: "GALLERY",
        mediaType: "IMAGE",
      },
      {
        imageUrl:
          "https://otycnlvsqpjeaeywtzix.supabase.co/storage/v1/object/public/nazariocicles/VID-20251017-WA0003.mp4",
        caption: "Processo de manutenção",
        type: "GALLERY",
        mediaType: "VIDEO",
      },
      {
        imageUrl:
          "https://otycnlvsqpjeaeywtzix.supabase.co/storage/v1/object/public/nazariocicles/IMG-20251017-WA0023.jpg",
        caption: "Ferramentas profissionais",
        type: "GALLERY",
        mediaType: "IMAGE",
      },
      {
        imageUrl:
          "https://otycnlvsqpjeaeywtzix.supabase.co/storage/v1/object/public/nazariocicles/IMG-20251017-WA0024.jpg",
        caption: "Serviço detalhado",
        type: "GALLERY",
        mediaType: "IMAGE",
      },
      {
        imageUrl:
          "https://otycnlvsqpjeaeywtzix.supabase.co/storage/v1/object/public/nazariocicles/IMG-20251017-WA0025.jpg",
        caption: "Manutenção completa",
        type: "GALLERY",
        mediaType: "IMAGE",
      },
      {
        imageUrl:
          "https://otycnlvsqpjeaeywtzix.supabase.co/storage/v1/object/public/nazariocicles/IMG-20251017-WA0018.jpg",
        caption: "Oficina equipada",
        type: "GALLERY",
        mediaType: "IMAGE",
      },
      {
        imageUrl:
          "https://otycnlvsqpjeaeywtzix.supabase.co/storage/v1/object/public/nazariocicles/IMG-20251017-WA0019.jpg",
        caption: "Trabalho profissional",
        type: "GALLERY",
        mediaType: "IMAGE",
      },
      {
        imageUrl:
          "https://otycnlvsqpjeaeywtzix.supabase.co/storage/v1/object/public/nazariocicles/IMG-20251017-WA0020.jpg",
        caption: "Serviço especializado",
        type: "GALLERY",
        mediaType: "IMAGE",
      },
      {
        imageUrl:
          "https://otycnlvsqpjeaeywtzix.supabase.co/storage/v1/object/public/nazariocicles/IMG-20251017-WA0021.jpg",
        caption: "Detalhe do trabalho",
        type: "GALLERY",
        mediaType: "IMAGE",
      },
      {
        imageUrl:
          "https://otycnlvsqpjeaeywtzix.supabase.co/storage/v1/object/public/nazariocicles/IMG-20251017-WA0022.jpg",
        caption: "Manutenção preventiva",
        type: "GALLERY",
        mediaType: "IMAGE",
      },
      {
        imageUrl:
          "https://otycnlvsqpjeaeywtzix.supabase.co/storage/v1/object/public/nazariocicles/IMG-20251017-WA0016.jpg",
        caption: "Regulagem de componentes",
        type: "GALLERY",
        mediaType: "IMAGE",
      },
      {
        imageUrl:
          "https://otycnlvsqpjeaeywtzix.supabase.co/storage/v1/object/public/nazariocicles/IMG-20251017-WA0017.jpg",
        caption: "Serviço em andamento",
        type: "GALLERY",
        mediaType: "IMAGE",
      },
      {
        imageUrl:
          "https://otycnlvsqpjeaeywtzix.supabase.co/storage/v1/object/public/nazariocicles/IMG-20251017-WA0015.jpg",
        caption: "Ferramentas em uso",
        type: "GALLERY",
        mediaType: "IMAGE",
      },
      {
        imageUrl:
          "https://otycnlvsqpjeaeywtzix.supabase.co/storage/v1/object/public/nazariocicles/IMG-20251017-WA0014.jpg",
        caption: "Detalhe técnico",
        type: "GALLERY",
        mediaType: "IMAGE",
      },
      {
        imageUrl:
          "https://otycnlvsqpjeaeywtzix.supabase.co/storage/v1/object/public/nazariocicles/IMG-20251018-WA0001.jpg",
        caption: "Serviço completo",
        type: "GALLERY",
        mediaType: "IMAGE",
      },
      {
        imageUrl:
          "https://otycnlvsqpjeaeywtzix.supabase.co/storage/v1/object/public/nazariocicles/IMG-20251017-WA0073.jpg",
        caption: "Oficina organizada",
        type: "GALLERY",
        mediaType: "IMAGE",
      },
      {
        imageUrl:
          "https://otycnlvsqpjeaeywtzix.supabase.co/storage/v1/object/public/nazariocicles/IMG-20251017-WA0072.jpg",
        caption: "Oficina organizada",
        type: "GALLERY",
        mediaType: "IMAGE",
      },
      {
        imageUrl:
          "https://otycnlvsqpjeaeywtzix.supabase.co/storage/v1/object/public/nazariocicles/IMG-20251017-WA0074.jpg",
        caption: "Manutenção profissional",
        type: "GALLERY",
        mediaType: "IMAGE",
      },
      {
        imageUrl:
          "https://otycnlvsqpjeaeywtzix.supabase.co/storage/v1/object/public/nazariocicles/IMG-20251017-WA0075.jpg",
        caption: "Equipamentos em uso",
        type: "GALLERY",
        mediaType: "IMAGE",
      },
      {
        imageUrl:
          "https://otycnlvsqpjeaeywtzix.supabase.co/storage/v1/object/public/nazariocicles/IMG-20251017-WA0076.jpg",
        caption: "Serviço detalhado",
        type: "GALLERY",
        mediaType: "IMAGE",
      },
      {
        imageUrl:
          "https://otycnlvsqpjeaeywtzix.supabase.co/storage/v1/object/public/nazariocicles/IMG-20251017-WA0077.jpg",
        caption: "Trabalho preciso",
        type: "GALLERY",
        mediaType: "IMAGE",
      },
      {
        imageUrl:
          "https://otycnlvsqpjeaeywtzix.supabase.co/storage/v1/object/public/nazariocicles/IMG-20251017-WA0078.jpg",
        caption: "Manutenção completa",
        type: "GALLERY",
        mediaType: "IMAGE",
      },
      {
        imageUrl:
          "https://otycnlvsqpjeaeywtzix.supabase.co/storage/v1/object/public/nazariocicles/IMG-20251017-WA0070.jpg",
        caption: "Regulagem de freios",
        type: "GALLERY",
        mediaType: "IMAGE",
      },
      {
        imageUrl:
          "https://otycnlvsqpjeaeywtzix.supabase.co/storage/v1/object/public/nazariocicles/IMG-20251017-WA0071.jpg",
        caption: "Serviço especializado",
        type: "GALLERY",
        mediaType: "IMAGE",
      },
      {
        imageUrl:
          "https://otycnlvsqpjeaeywtzix.supabase.co/storage/v1/object/public/nazariocicles/IMG-20251017-WA0067.jpg",
        caption: "Ferramentas profissionais",
        type: "GALLERY",
        mediaType: "IMAGE",
      },
      {
        imageUrl:
          "https://otycnlvsqpjeaeywtzix.supabase.co/storage/v1/object/public/nazariocicles/IMG-20251017-WA0069.jpg",
        caption: "Serviço de qualidade",
        type: "GALLERY",
        mediaType: "IMAGE",
      },
      {
        imageUrl:
          "https://otycnlvsqpjeaeywtzix.supabase.co/storage/v1/object/public/nazariocicles/IMG-20251017-WA0064.jpg",
        caption: "Oficina completa",
        type: "GALLERY",
        mediaType: "IMAGE",
      },
    ]

    for (const image of galleryImages) {
      await prisma.gallery.create({
        data: {
          ...image,
          bikeShop: { connect: { id: bikeShop.id } },
        },
      })
    }

    console.log("✅ Oficina única criada com sucesso!")
    console.log(`🏪 Oficina: ${bikeShop.name}`)
    console.log(`📍 Endereço: ${bikeShop.address}`)
    console.log(`🛠️ ${services.length} serviços criados.`)
    console.log(`🖼️ ${galleryImages.length} imagens da galeria criadas.`)

    await prisma.$disconnect()
  } catch (error) {
    console.error("❌ Erro ao criar a oficina de bicicleta:", error)
  }
}

seedDatabase()
