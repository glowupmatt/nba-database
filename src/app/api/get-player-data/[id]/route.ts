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
