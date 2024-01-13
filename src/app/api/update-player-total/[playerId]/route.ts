import { NextResponse } from "next/server";
import prisma from "@/utils/prismaDb";
import { TotalStatsType } from "@/types/playersType";
import { noAuth } from "@/utils/hasAuth";

async function createOrUpdateStats(player: any, newStats: any) {
  if (!player?.totalStats[0]) {
    return await prisma.totalStats.create({ data: newStats });
  }
  if (JSON.stringify(player?.totalStats[0]) !== JSON.stringify(newStats)) {
    return await prisma.totalStats.update({
      where: { id: player?.totalStats[0].id },
      data: newStats,
    });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { playerId: string } }
) {
  if (noAuth(request)) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const { playerId } = params;
    const body = await request.json();
    const player = await prisma.player.findUnique({
      where: { id: playerId },
      include: { totalStats: true },
    });

    const newStats: TotalStatsType = {
      ...body,
      totalGamesStarted: body.totalGamesStarted || "0",
      player: { connect: { id: playerId } },
    };

    const totalStats = await createOrUpdateStats(player, newStats);

    return new NextResponse(JSON.stringify(totalStats), { status: 200 });
  } catch (err) {
    console.log(err, "ROUTE ERROR");
    return new NextResponse(JSON.stringify(err), { status: 500 });
  }
}
