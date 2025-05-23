import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

type Etapas = "nome" | "numero" | "data_confirmation" | "service" | "note";

const conversationState: {
  [phone: string]: {
    etapa: Etapas;
    dados: {
      nome?: string;
      numero?: string;
      data?: string;
      service?: string;
      note?: string;
      slots?: string[];
    };
  };
} = {};

const WHATSAPP_URL = `https://graph.facebook.com/v18.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`;

// Schemas Zod para validação das entradas do usuário

const nomeSchema = z.string().min(2, "Nome muito curto").max(100);
const escolhaHorarioSchema = z
  .string()
  .regex(/^\d+$/, "Deve ser um número")
  .transform((val) => parseInt(val, 10));
const noteSchema = z.string().max(200).optional();

async function getAvailableTimeSlots(daysToCheck = 3) {
  const timeSlots = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
  ];
  const slots: Date[] = [];

  for (let dayOffset = 0; dayOffset < daysToCheck; dayOffset++) {
    const baseDate = new Date();
    baseDate.setHours(0, 0, 0, 0);
    baseDate.setDate(baseDate.getDate() + dayOffset);

    for (const time of timeSlots) {
      const [hour, minute] = time.split(":").map(Number);
      const slotDate = new Date(baseDate);
      slotDate.setHours(hour, minute, 0, 0);

      const existing = await prisma.appointment.findFirst({
        where: { datetime: slotDate, status: { not: "CANCELED" } },
      });

      if (!existing) {
        slots.push(slotDate);
      }
    }
  }
  return slots;
}

async function sendWhatsAppMessage(to: string, message: string) {
  const res = await fetch(WHATSAPP_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to,
      type: "text",
      text: { body: message },
    }),
  });

  if (!res.ok) {
    console.error("Erro ao enviar mensagem:", await res.text());
  }
}

async function sendAvailableSlotsText(to: string, slots: string[]) {
  let message =
    "📅 Escolha um dos horários disponíveis respondendo com o número correspondente:\n\n";

  slots.forEach((slotIso, index) => {
    const date = new Date(slotIso);
    message += `${index + 1}. ${formatDateTimeBR(date)}\n`;
  });

  message += "\nPor favor, responda apenas com o número da opção desejada.";
  await sendWhatsAppMessage(to, message);
}

function formatDateTimeBR(date: Date): string {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

async function sendServiceOptions(to: string) {
  const services = [
    { id: "revisao_geral", title: "Revisão Geral" },
    { id: "ajuste_freios", title: "Ajuste de Freios" },
    { id: "ajuste_marchas", title: "Ajuste de Marchas" },
    { id: "troca_pneus", title: "Troca de Pneus" },
    { id: "troca_camera", title: "Troca de Câmera" },
    { id: "lubrificacao_corrente", title: "Lubrificação da Corrente" },
    { id: "limpeza_completa", title: "Limpeza Completa" },
    { id: "alinhamento_rodas", title: "Alinhamento de Rodas" },
    { id: "outro", title: "Outro" },
  ];

  const messagePayload = {
    messaging_product: "whatsapp",
    to,
    type: "interactive",
    interactive: {
      type: "list",
      header: { type: "text", text: "🛠️ Escolha o tipo de serviço" },
      body: { text: "Selecione o serviço de manutenção que deseja agendar:" },
      footer: { text: "Escolha uma opção da lista." },
      action: {
        button: "Ver serviços",
        sections: [
          {
            title: "Tipos de serviço",
            rows: services.map((service) => ({
              id: service.id,
              title: service.title,
              description: "",
            })),
          },
        ],
      },
    },
  };

  const res = await fetch(WHATSAPP_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(messagePayload),
  });

  if (!res.ok) {
    console.error("Erro ao enviar lista de serviços:", await res.text());
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const messages = body.entry?.[0]?.changes?.[0]?.value?.messages;
    if (!messages)
      return NextResponse.json({ message: "Nenhuma mensagem recebida" });

    for (const message of messages) {
      const phone = message.from;

      if (!conversationState[phone]) {
        conversationState[phone] = { etapa: "nome", dados: {} };
        await sendWhatsAppMessage(
          phone,
          "👋 Olá! Para agendar, preciso do seu nome."
        );
        continue;
      }

      const estado = conversationState[phone];

      switch (estado.etapa) {
        case "nome":
          try {
            estado.dados.nome = nomeSchema.parse(message.text.body.trim());
            estado.dados.numero = phone;

            const slots = await getAvailableTimeSlots();
            if (slots.length === 0) {
              await sendWhatsAppMessage(
                phone,
                "Desculpe, não há horários disponíveis nos próximos dias."
              );
              delete conversationState[phone];
              break;
            }

            estado.dados.slots = slots.map((slot) => slot.toISOString());
            await sendAvailableSlotsText(phone, estado.dados.slots);
            estado.etapa = "data_confirmation";
          } catch (error) {
            console.error("Erro ao validar nome:", error);
            await sendWhatsAppMessage(
              phone,
              "Por favor, envie um nome válido (mínimo 2 caracteres)."
            );
          }
          break;

        case "data_confirmation":
          try {
            const escolha = escolhaHorarioSchema.parse(
              message.text.body.trim()
            );
            const slots = estado.dados.slots!;
            if (escolha < 1 || escolha > slots.length) {
              throw new Error("Escolha fora do intervalo");
            }

            const selectedDate = new Date(slots[escolha - 1]);

            const existing = await prisma.appointment.findFirst({
              where: { datetime: selectedDate, status: { not: "CANCELED" } },
            });

            if (existing) {
              await sendWhatsAppMessage(
                phone,
                "Esse horário já foi agendado. Por favor, escolha outro."
              );
              // Atualizar lista e reenvia
              const newSlots = await getAvailableTimeSlots();
              if (newSlots.length === 0) {
                await sendWhatsAppMessage(
                  phone,
                  "Sem horários disponíveis no momento. Tente novamente depois."
                );
                delete conversationState[phone];
                break;
              }
              estado.dados.slots = newSlots.map((s) => s.toISOString());
              await sendAvailableSlotsText(phone, estado.dados.slots);
              break;
            }

            estado.dados.data = selectedDate.toISOString();
            delete estado.dados.slots;
            estado.etapa = "service";

            await sendServiceOptions(phone);
          } catch {
            await sendWhatsAppMessage(
              phone,
              "Por favor, responda com o número do horário escolhido."
            );
          }
          break;

        case "service":
          if (!message.interactive?.list_reply?.id) {
            await sendWhatsAppMessage(
              phone,
              "Selecione um serviço usando a lista enviada."
            );
            break;
          }

          const servicesMap: { [key: string]: string } = {
            revisao_geral: "Revisão Geral",
            ajuste_freios: "Ajuste de Freios",
            ajuste_marchas: "Ajuste de Marchas",
            troca_pneus: "Troca de Pneus",
            troca_camera: "Troca de Câmera",
            lubrificacao_corrente: "Lubrificação da Corrente",
            limpeza_completa: "Limpeza Completa",
            alinhamento_rodas: "Alinhamento de Rodas",
            outro: "Outro",
          };

          const selectedService =
            servicesMap[message.interactive.list_reply.id];
          if (!selectedService) {
            await sendWhatsAppMessage(
              phone,
              "Serviço inválido. Por favor, escolha novamente."
            );
            break;
          }

          estado.dados.service = selectedService;
          estado.etapa = "note";

          await sendWhatsAppMessage(
            phone,
            "Alguma observação para o agendamento? Responda 'Não' para nenhuma."
          );
          break;

        case "note":
          try {
            const noteRaw = message.text.body.trim();
            estado.dados.note =
              noteRaw.toLowerCase() === "não" ? "" : noteSchema.parse(noteRaw);

            // Grava no banco
            const appointment = await prisma.appointment.create({
              data: {
                name: estado.dados.nome!,
                phone: estado.dados.numero!,
                datetime: new Date(estado.dados.data!),
                service: estado.dados.service!,
                notes: estado.dados.note,
              },
            });
            console.log("Agendamento criado:", appointment);

            await sendWhatsAppMessage(
              phone,
              `✅ Agendamento solicitado com sucesso!\n\n` +
                `👤 Nome: ${estado.dados.nome}\n` +
                `📞 Telefone: ${estado.dados.numero}\n` +
                `📅 Data e Hora: ${formatDateTimeBR(
                  new Date(estado.dados.data!)
                )}\n` +
                `💼 Serviço: ${estado.dados.service}\n` +
                `📝 Observações: ${estado.dados.note || "Nenhuma"}\n\n` +
                `Você receberá uma confirmação em breve!`
            );

            delete conversationState[phone];
          } catch {
            await sendWhatsAppMessage(
              phone,
              "Observação inválida. Por favor, envie uma observação menor que 200 caracteres ou 'Não'."
            );
          }
          break;
      }
    }

    return NextResponse.json({ message: "EVENT_RECEIVED" });
  } catch (err) {
    console.error("Erro ao processar webhook:", err);
    return new Response("Erro interno", { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
