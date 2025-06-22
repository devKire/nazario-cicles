import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import crypto from "crypto";

const prisma = new PrismaClient();

type Etapas =
  | "inicio"
  | "nome"
  | "numero"
  | "dia_selection"
  | "horario_selection"
  | "data_confirmation"
  | "service"
  | "note";

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
      dias?: string[];
      horarios?: string[];
      horariosPorDia?: { [dia: string]: string[] };
    };
  };
} = {};

const WHATSAPP_URL = `https://graph.facebook.com/v18.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`;

// ======= SCHEMAS =======
const nomeSchema = z
  .string()
  .min(2, { message: "Nome deve ter no mínimo 2 caracteres." })
  .max(100, { message: "Nome deve ter no máximo 100 caracteres." })
  .regex(/.*[a-zA-ZÀ-ÿ].*/, {
    message: "O nome deve conter pelo menos uma letra.",
  });

const escolhaHorarioSchema = z.string().regex(/^\d+$/).transform(Number);
const noteSchema = z.string().max(200).optional();

// ======= UTILS =======
function generateIdempotencyKey(
  phone: string,
  datetime: string,
  service: string
) {
  return crypto
    .createHash("sha256")
    .update(`${phone}-${datetime}-${service}`)
    .digest("hex");
}

function formatDateTimeBR(date: Date): string {
  return date.toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });
}

function gerarLinkGoogleAgenda({
  title,
  startDate,
  endDate,
  description,
  location,
}: {
  title: string;
  startDate: Date;
  endDate: Date;
  description: string;
  location: string;
}) {
  const formatDate = (date: Date) =>
    date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  const link = new URL("https://calendar.google.com/calendar/render");
  link.searchParams.set("action", "TEMPLATE");
  link.searchParams.set("text", title);
  link.searchParams.set(
    "dates",
    `${formatDate(startDate)}/${formatDate(endDate)}`
  );
  link.searchParams.set("details", description);
  link.searchParams.set("location", location);
  return link.toString();
}

function processarSlots(slotsISO: string[]) {
  const dias: string[] = [];
  const horariosPorDia: { [dia: string]: string[] } = {};

  for (const slotISO of slotsISO) {
    const data = new Date(slotISO);
    const dia = data.toLocaleDateString("pt-BR");
    const horario = data.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });

    if (!dias.includes(dia)) {
      dias.push(dia);
    }

    if (!horariosPorDia[dia]) {
      horariosPorDia[dia] = [];
    }

    horariosPorDia[dia].push(horario);
  }

  return { dias, horariosPorDia };
}

async function sendAvailableDias(to: string, dias: string[]) {
  const message = [
    "📅 Escolha um dos dias disponíveis respondendo com o número correspondente:",
    ...dias.map((dia, idx) => `${idx + 1}. ${dia}`),
    "\nPor favor, responda apenas com o número da opção desejada.",
  ].join("\n");

  await sendWhatsAppMessage(to, message);
}

async function sendAvailableHorarios(to: string, horarios: string[]) {
  const message = [
    "⏰ Escolha um dos horários disponíveis para esse dia respondendo com o número correspondente:",
    ...horarios.map((horario, idx) => `${idx + 1}. ${horario}`),
    "\nPor favor, responda apenas com o número da opção desejada.",
  ].join("\n");

  await sendWhatsAppMessage(to, message);
}

// ======= WHATSAPP SENDERS =======
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

async function sendInteractiveList(
  to: string,
  services: { id: string; title: string }[]
) {
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
            rows: services.map((s) => ({ id: s.id, title: s.title })),
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

async function sendWelcomeMenu(to: string) {
  const message = `👋 Olá! Bem-vindo à nossa assistência.

Escolha uma das opções respondendo com o número:

1️⃣ - Apresentação  
2️⃣ - Informações adicionais  
3️⃣ - Agendar um horário  
4️⃣ - Sair`;

  await sendWhatsAppMessage(to, message);
}

async function sendAvailableSlotsText(to: string, slots: string[]) {
  const message = [
    "📅 Escolha um dos horários disponíveis respondendo com o número correspondente:",
    ...slots.map(
      (slot, idx) => `${idx + 1}. ${formatDateTimeBR(new Date(slot))}`
    ),
    "\nPor favor, responda apenas com o número da opção desejada.",
  ].join("\n");

  await sendWhatsAppMessage(to, message);
}

async function getAvailableTimeSlots() {
  const now = new Date();

  const availabilities = await prisma.availability.findMany({
    where: {
      isBooked: false,
      startDateTime: {
        gte: now,
      },
    },
    orderBy: {
      startDateTime: "asc",
    },
  });

  // Retornar as datas em ISO para fácil uso depois
  return availabilities.map((avail) => avail.startDateTime.toISOString());
}

const servicesMap = {
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

// ======= MAIN HANDLER =======
export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const messages = body.entry?.[0]?.changes?.[0]?.value?.messages;
    if (!messages)
      return NextResponse.json({ message: "Nenhuma mensagem recebida" });

    for (const message of messages) {
      const phone = message.from;
      const text = message.text?.body.trim();

      if (!conversationState[phone]) {
        conversationState[phone] = { etapa: "inicio", dados: {} };
        await sendWelcomeMenu(phone);
        continue;
      }

      const estado = conversationState[phone];

      switch (estado.etapa) {
        case "inicio":
          if (!["1", "2", "3", "4"].includes(text)) {
            await sendWhatsAppMessage(
              phone,
              "Por favor, responda com uma das opções: 1, 2, 3 ou 4."
            );
            break;
          }

          switch (text) {
            case "1":
              await sendWhatsAppMessage(
                phone,
                "Somos a Nazarió Cicles, assistência especializada em manutenção e cuidados com sua bike! 🚴‍♂️"
              );
              await sendWelcomeMenu(phone);
              break;
            case "2":
              await sendWhatsAppMessage(
                phone,
                "🏪 Funcionamos de segunda a sexta, das 9h às 18h.\n📍 Endereço: Rua Hamilton José Silveira Machado, 22\n📞 Contato: (47) 99999-9999"
              );
              await sendWelcomeMenu(phone);
              break;
            case "3":
              estado.etapa = "nome";
              await sendWhatsAppMessage(
                phone,
                "Ótimo! Para agendar, por favor, me informe seu nome:"
              );
              break;
            case "4":
              await sendWhatsAppMessage(
                phone,
                "Até mais! 👋 Se precisar, é só chamar."
              );
              delete conversationState[phone];
              break;
          }
          break;

        case "nome":
          try {
            if (!text || text.trim().length < 2) {
              await sendWhatsAppMessage(
                phone,
                "Por favor, envie um nome válido com pelo menos 2 caracteres."
              );
              break;
            }

            const nome = nomeSchema.parse(text.trim());
            estado.dados.nome = nome;
            estado.dados.numero = phone;

            const slots = await getAvailableTimeSlots();
            if (!slots.length) {
              await sendWhatsAppMessage(
                phone,
                "Desculpe, não há horários disponíveis nos próximos dias."
              );
              delete conversationState[phone];
              break;
            }

            const { dias, horariosPorDia } = processarSlots(slots);
            estado.dados = {
              ...estado.dados,
              dias,
              slots,
              horarios: [],
              horariosPorDia,
            };

            estado.etapa = "dia_selection";
            await sendAvailableDias(phone, dias);
          } catch (err) {
            console.error("Erro ao validar nome:", err);
            await sendWhatsAppMessage(
              phone,
              "Por favor, envie um nome válido (mínimo 2 caracteres e com pelo menos uma letra)."
            );
          }
          break;

        case "dia_selection":
          try {
            const escolha = escolhaHorarioSchema.parse(text);
            const dias = estado.dados.dias!;
            if (escolha < 1 || escolha > dias.length)
              throw new Error("Fora do intervalo");

            const diaEscolhido = dias[escolha - 1];
            estado.dados.data = diaEscolhido;

            const horarios = estado.dados.horariosPorDia?.[diaEscolhido] || [];
            if (!horarios.length) {
              await sendWhatsAppMessage(
                phone,
                "Não há horários disponíveis para esse dia. Por favor, escolha outro."
              );
              await sendAvailableDias(phone, dias);
              break;
            }

            estado.dados.horarios = horarios;
            estado.etapa = "horario_selection";
            await sendAvailableHorarios(phone, horarios);
          } catch {
            await sendWhatsAppMessage(
              phone,
              "Por favor, responda com o número do dia escolhido."
            );
          }
          break;

        case "horario_selection":
          try {
            const escolha = escolhaHorarioSchema.parse(text);
            const horarios = estado.dados.horarios!;
            if (escolha < 1 || escolha > horarios.length)
              throw new Error("Fora do intervalo");

            const horarioEscolhido = horarios[escolha - 1];
            const dataEscolhida = estado.dados.data!;

            const slotISO = estado.dados.slots!.find((slot) => {
              const slotDate = new Date(slot);
              const dia = slotDate.toLocaleDateString("pt-BR");
              const horario = slotDate.toLocaleTimeString("pt-BR", {
                hour: "2-digit",
                minute: "2-digit",
              });
              return dia === dataEscolhida && horario === horarioEscolhido;
            });

            if (!slotISO) {
              await sendWhatsAppMessage(
                phone,
                "Esse horário não está mais disponível. Por favor, escolha outro."
              );
              await sendAvailableHorarios(phone, horarios);
              break;
            }

            estado.dados.data = slotISO;
            estado.etapa = "service";

            await sendInteractiveList(
              phone,
              Object.entries(servicesMap).map(([id, title]) => ({ id, title }))
            );
          } catch {
            await sendWhatsAppMessage(
              phone,
              "Por favor, responda com o número do horário escolhido."
            );
          }
          break;

        case "data_confirmation":
          try {
            const escolha = escolhaHorarioSchema.parse(text);
            const slots = estado.dados.slots!;
            if (escolha < 1 || escolha > slots.length)
              throw new Error("Fora do intervalo");

            const selectedDate = new Date(slots[escolha - 1]);

            const exists = await prisma.appointment.findFirst({
              where: { datetime: selectedDate, status: { not: "CANCELED" } },
            });

            if (exists) {
              await sendWhatsAppMessage(
                phone,
                "Esse horário já foi agendado. Por favor, escolha outro."
              );

              const newSlots = await getAvailableTimeSlots();
              if (!newSlots.length) {
                await sendWhatsAppMessage(
                  phone,
                  "Sem horários disponíveis no momento. Tente novamente depois."
                );
                delete conversationState[phone];
                break;
              }

              estado.dados.slots = newSlots;
              await sendAvailableSlotsText(phone, newSlots);
              break;
            }

            estado.dados.data = selectedDate.toISOString();
            delete estado.dados.slots;
            estado.etapa = "service";

            await sendInteractiveList(
              phone,
              Object.entries(servicesMap).map(([id, title]) => ({ id, title }))
            );
          } catch {
            await sendWhatsAppMessage(
              phone,
              "Por favor, responda com o número do horário escolhido."
            );
          }
          break;

        case "service":
          const selectedId = message.interactive?.list_reply
            ?.id as keyof typeof servicesMap;
          if (!selectedId) {
            await sendWhatsAppMessage(
              phone,
              "Selecione um serviço usando a lista enviada."
            );
            break;
          }

          estado.dados.service = servicesMap[selectedId];
          estado.etapa = "note";
          await sendWhatsAppMessage(
            phone,
            "Alguma observação para o agendamento? Responda 'Não' para nenhuma."
          );
          break;

        case "note":
          try {
            const note =
              text.toLowerCase() === "não" ? "" : noteSchema.parse(text);
            estado.dados.note = note;

            const appointmentDate = new Date(estado.dados.data!);

            const availability = await prisma.availability.findFirst({
              where: { startDateTime: appointmentDate, isBooked: false },
            });

            if (!availability) {
              await sendWhatsAppMessage(
                phone,
                "Desculpe, o horário selecionado já foi reservado. Por favor, reinicie o agendamento."
              );
              delete conversationState[phone];
              break;
            }

            const idempotencyKey = generateIdempotencyKey(
              estado.dados.numero!,
              estado.dados.data!,
              estado.dados.service!
            );

            await prisma.$transaction([
              prisma.appointment.create({
                data: {
                  name: estado.dados.nome!,
                  phone: estado.dados.numero!,
                  datetime: appointmentDate,
                  service: estado.dados.service!,
                  notes: estado.dados.note,
                  idempotencyKey,
                  availabilityId: availability.id,
                },
              }),
              prisma.availability.update({
                where: { id: availability.id },
                data: { isBooked: true },
              }),
            ]);

            await sendWhatsAppMessage(
              phone,
              `✅ Agendamento solicitado com sucesso!
👤 Nome: ${estado.dados.nome}
📞 Telefone: ${estado.dados.numero}
📅 Data e Hora: ${formatDateTimeBR(appointmentDate)}
💼 Serviço: ${estado.dados.service}
📝 Observações: ${estado.dados.note || "Nenhuma"}`
            );

            const link = gerarLinkGoogleAgenda({
              title: "Agendamento na Nazario Cicles",
              startDate: appointmentDate,
              endDate: new Date(appointmentDate.getTime() + 3600000),
              description: `Serviço: ${estado.dados.service}\nObservações: ${
                estado.dados.note || "Nenhuma"
              }`,
              location:
                "Nazario Cicles - Rua Hamilton José Silveira Machado, 22",
            });

            await sendWhatsAppMessage(
              phone,
              `✅ Para não esquecer, adicione na sua agenda: \n${link}`
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

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === process.env.WHATSAPP_VERIFY_TOKEN) {
    console.log("WEBHOOK_VERIFIED");
    return new Response(challenge, { status: 200 });
  }
  console.warn("Webhook verification failed", { mode, token });
  return new Response("Forbidden", { status: 403 });
}
