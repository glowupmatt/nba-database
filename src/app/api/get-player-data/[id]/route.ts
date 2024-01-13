import { NextResponse } from "next/server";
import prisma from "@/utils/prismaDb";

export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const { id } = params;
    const player = await prisma.player.findUnique({
      where: {
        id,
      },
      include: {
        games: true,
        totalStats: true,
      },
    });
    return new NextResponse(JSON.stringify(player), { status: 200 });
  } catch (err) {
    console.log(err, "ROUTE ERROR");
    return new NextResponse(JSON.stringify(err), { status: 500 });
  }
};
