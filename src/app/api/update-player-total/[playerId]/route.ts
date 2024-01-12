import { NextResponse } from "next/server";
import prisma from "@/utils/prismaDb";

export const PUT = async (
  request: Request,
  { params }: { params: { playerId: string } }
) => {
  try {
    const { playerId } = params;
    const body = await request.json();
    const {
      totalGamesPlayed,
      totalGamesStarted,
      minutesPlayed,
      fieldGoals,
      fieldGoalAttempts,
      fieldGoalPercentage,
      threePointers,
      twoPointers,
      totalRebounds,
      assists,
      blocks,
      turnovers,
      points,
    } = body;
    console.log(body, "BODY");
    const player = await prisma.player.findUnique({
      where: {
        id: playerId,
      },
      include: {
        totalStats: true,
      },
    });

    const newStats = {
      totalGamesPlayed,
      totalGamesStarted: totalGamesStarted || "0",
      minutesPlayed,
      fieldGoals,
      fieldGoalAttempts,
      fieldGoalPercentage,
      threePointers,
      twoPointers,
      totalRebounds,
      assists,
      blocks,
      turnovers,
      points,
      player: {
        connect: {
          id: playerId,
        },
      },
    };
    if (!player?.totalStats[0]) {
      const totalStats = await prisma.totalStats.create({
        data: newStats,
      });
      return new NextResponse(JSON.stringify(totalStats), { status: 200 });
    }
    if (JSON.stringify(player?.totalStats[0]) !== JSON.stringify(newStats)) {
      const totalStats = await prisma.totalStats.update({
        where: {
          id: player?.totalStats[0].id,
        },
        data: newStats,
      });
      return new NextResponse(JSON.stringify(totalStats), { status: 200 });
    }
  } catch (err) {
    console.log(err, "ROUTE ERROR");
    return new NextResponse(JSON.stringify(err), { status: 500 });
  }
};
