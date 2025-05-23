import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Função para enviar WhatsApp message (exemplo)
async function sendWhatsAppMessage(to: string, message: string) {
  const url = `https://graph.facebook.com/v18.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`;
  console.log(
    "WHATSAPP_PHONE_NUMBER_ID =",
    process.env.WHATSAPP_PHONE_NUMBER_ID
  );

  const body = {
    messaging_product: "whatsapp",
    to,
    type: "text",
    text: { body: message },
  };

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Erro ao enviar mensagem:", errorText);
    throw new Error(`WhatsApp API Error: ${errorText}`);
  }
}

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> } // params é Promise agora
) {
  try {
    const params = await context.params; // await aqui!
    const id = params.id;

    const { status } = await req.json();

    if (!["PENDING", "CONFIRMED", "CANCELED"].includes(status)) {
      return new NextResponse("Status inválido", { status: 400 });
    }

    const appointment = await prisma.appointment.update({
      where: { id },
      data: { status },
    });

    // Enviar mensagem automática se for confirmado ou cancelado
    if (status === "CONFIRMED") {
      const msg = `✅ Olá ${appointment.name}, seu agendamento para ${new Date(
        appointment.datetime
      ).toLocaleString()} foi confirmado!`;
      await sendWhatsAppMessage(appointment.phone, msg);
    } else if (status === "CANCELED") {
      const msg = `❌ Olá ${appointment.name}, seu agendamento para ${new Date(
        appointment.datetime
      ).toLocaleString("pt-BR", {
        timeZone: "America/Sao_Paulo",
      })} foi cancelado. Se precisar, entre em contato conosco.`;
      await sendWhatsAppMessage(appointment.phone, msg);
    }
    console.log("Enviando mensagem para:", appointment.phone);

    return NextResponse.json(appointment);
  } catch (error) {
    console.error("Erro ao atualizar status:", error);
    return new NextResponse("Erro interno", { status: 500 });
  }
}
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    // Excluir no banco de dados
    await prisma.appointment.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Agendamento excluído com sucesso" });
  } catch (error) {
    console.error("Erro ao excluir agendamento:", error);
    return new NextResponse("Erro interno", { status: 500 });
  }
}
