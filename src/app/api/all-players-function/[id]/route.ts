import { NextResponse } from "next/server";
import prisma from "@/utils/prismaDb";
import { noAuth } from "@/utils/hasAuth";

export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  if (noAuth(request)) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
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
  if (noAuth(request)) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
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
