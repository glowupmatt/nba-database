import { NextResponse } from "next/server";
import prisma from "@/utils/prismaDb";
import { noAuth } from "@/utils/hasAuth";

export const GET = async (request: Request) => {
  if (noAuth(request)) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
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
