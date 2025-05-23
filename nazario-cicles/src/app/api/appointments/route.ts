import { PrismaClient, Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const search = searchParams.get("search") || "";
  const status = searchParams.get("status");

  const where: Prisma.AppointmentWhereInput = {};

  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { phone: { contains: search, mode: "insensitive" } },
    ];
  }

  if (status && status !== "ALL") {
    // validar status para aceitar só valores permitidos
    const validStatus = ["PENDING", "CONFIRMED", "CANCELED"];
    if (validStatus.includes(status)) {
      where.status = status as Prisma.AppointmentWhereInput["status"];
    }
  }

  try {
    const appointments = await prisma.appointment.findMany({
      where,
      orderBy: { datetime: "asc" },
      take: 100, // limitar até 100 resultados, opcional
    });
    return NextResponse.json(appointments);
  } catch (error) {
    console.error("Erro ao buscar agendamentos:", error);
    return new NextResponse("Erro ao buscar agendamentos", { status: 500 });
  }
}
