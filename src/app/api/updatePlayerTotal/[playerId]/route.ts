import { NextResponse } from "next/server";
import prisma from "@/utils/prismaDb";

type PlayerType = {
  id: string;
  playerName: string;
  age: string;
  playerImage: string;
  playersId: string;
  createdAt: Date;
  updatedAt: Date;
  totalStats: {
    id: string;
    totalGamesPlayed: string;
    totalGamesStarted: string;
    minutesPlayed: string;
    fieldGoals: string;
    fieldGoalAttempts: string;
    fieldGoalPercentage: string;
    threePointers: string;
    twoPointers: string;
    totalRebounds: string;
    assists: string;
    blocks: string;
    turnovers: string;
    points: string;
    playerId: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
};
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

    const player: any = await prisma.player.findUnique({
      where: {
        id: playerId,
      },
      include: {
        totalStats: true,
      },
    });
    let totalStatsId;
    if (player && player.totalStats) {
      totalStatsId = player.totalStats[0].id;
    }

    const totalStats = await prisma.totalStats.upsert({
      where: {
        id: totalStatsId,
      },
      update: {
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
      },
      create: {
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
      },
    });
    return new NextResponse(JSON.stringify(totalStats), {
      status: 200,
    });
  } catch (err) {
    console.log(err, "ROUTE ERROR");
    return new NextResponse(JSON.stringify(err), { status: 500 });
  }
};
