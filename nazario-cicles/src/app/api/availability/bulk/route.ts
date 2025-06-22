import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function addMinutes(time: string, minutes: number): string {
  const [h, m] = time.split(":").map(Number);
  const date = new Date(0, 0, 0, h, m + minutes);
  return date.toTimeString().slice(0, 5);
}

export async function POST(req: Request) {
  try {
    const { date, startOfDay, endOfDay, duration } = await req.json();

    let current = startOfDay;
    const slots = [];

    while (current < endOfDay) {
      const next = addMinutes(current, duration);
      if (next > endOfDay) break;

      // Montar as datas completas para salvar no DB
      const startDateTime = new Date(`${date}T${current}:00.000Z`);
      const endDateTime = new Date(`${date}T${next}:00.000Z`);

      slots.push({ startDateTime, endDateTime });
      current = next;
    }

    const created = await prisma.$transaction(
      slots.map((slot) =>
        prisma.availability.create({
          data: {
            startDateTime: slot.startDateTime,
            endDateTime: slot.endDateTime,
            isBooked: false,
          },
        })
      )
    );

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar múltiplos horários:", error);
    return NextResponse.json(
      { error: "Erro ao criar múltiplos horários" },
      { status: 500 }
    );
  }
}
