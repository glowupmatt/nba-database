import { NextResponse } from "next/server";
import prisma from "@/utils/prismaDb";

export const GET = async (request: Request) => {
  try {
    const players = await prisma.player.findMany({
      include: {
        games: true,
        totalStats: true,
      },
    });
    console.log("SUCCESS", { status: 200 });
    return new NextResponse(JSON.stringify(players), { status: 200 });
  } catch (err) {
    console.log(err, "ROUTE ERROR");
    return new NextResponse(JSON.stringify(err), { status: 500 });
  }
};
