import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// UPDATE availability
export async function PUT(req: Request, context: { params: { id: string } }) {
  const { params } = context;

  try {
    const { startDateTime, endDateTime } = await req.json();
    const id = Number(params.id);

    if (!startDateTime || !endDateTime) {
      return NextResponse.json(
        { error: "Campos obrigatórios" },
        { status: 400 }
      );
    }

    const updated = await prisma.availability.update({
      where: { id },
      data: {
        startDateTime: new Date(startDateTime),
        endDateTime: new Date(endDateTime),
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Erro ao atualizar disponibilidade:", error);
    return NextResponse.json(
      { error: "Erro ao atualizar disponibilidade" },
      { status: 500 }
    );
  }
}

// DELETE availability
export async function DELETE(
  req: Request,
  context: { params: { id: string } }
) {
  const { params } = context;

  try {
    const id = Number(params.id);

    await prisma.availability.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Disponibilidade excluída" });
  } catch (error) {
    console.error("Erro ao excluir disponibilidade:", error);
    return NextResponse.json(
      { error: "Erro ao excluir disponibilidade" },
      { status: 500 }
    );
  }
}
