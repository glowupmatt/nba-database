import { NextResponse } from "next/server";
import prisma from "@/utils/prismaDb";
import { playerType } from "@/utils/playersType";

export const GET = async (request: Request, { params }: any) => {
  console.log(params, "ID");
  try {
    const { id } = params;
    const players = await prisma.players.findUnique({
      where: {
        id,
      },
      include: {
        player: true,
      },
    });
    return new NextResponse(JSON.stringify(players), { status: 200 });
  } catch (err) {
    console.log(err, "ROUTE ERROR");
    return new NextResponse(JSON.stringify(err), { status: 500 });
  }
};

export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const { id } = params;
    console.log(id, "ID");
    const players = await prisma.players.delete({
      where: {
        id,
      },
      include: {
        player: true,
      },
    });
    return new NextResponse(JSON.stringify(players), { status: 200 });
  } catch (err) {
    console.log(err, "ROUTE ERROR");
    return new NextResponse(JSON.stringify(err), { status: 500 });
  }
};
