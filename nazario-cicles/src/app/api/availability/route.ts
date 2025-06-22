import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const url = new URL(request.url);
  const dateParam = url.searchParams.get("date");

  let availabilities;

  if (dateParam) {
    // Cria intervalo para filtrar entre início e fim do dia (UTC)
    const start = new Date(dateParam + "T00:00:00.000Z");
    const end = new Date(dateParam + "T23:59:59.999Z");

    availabilities = await prisma.availability.findMany({
      where: {
        startDateTime: {
          gte: start,
          lte: end,
        },
      },
      orderBy: { startDateTime: "asc" },
    });
  } else {
    availabilities = await prisma.availability.findMany({
      orderBy: { startDateTime: "asc" },
    });
  }

  return NextResponse.json(availabilities);
}

export async function POST(req: Request) {
  const { date, startTime, endTime } = await req.json();

  if (!date || !startTime || !endTime) {
    return NextResponse.json({ error: "Campos obrigatórios" }, { status: 400 });
  }

  // Combina data e hora para criar Date completos
  const startDateTime = new Date(`${date}T${startTime}:00.000Z`);
  const endDateTime = new Date(`${date}T${endTime}:00.000Z`);

  const availability = await prisma.availability.create({
    data: {
      startDateTime,
      endDateTime,
      isBooked: false,
    },
  });

  return NextResponse.json(availability);
}
