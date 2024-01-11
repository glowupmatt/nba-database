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
    return new NextResponse(JSON.stringify(players), { status: 200 });
  } catch (err) {
    console.log(err, "ROUTE ERROR");
    return new NextResponse(JSON.stringify(err), { status: 500 });
  }
};

export const PUT = async (request: Request) => {
  try {
    const body = await request.json();
    const {
      id,
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
    const player = await prisma.player.update({
      where: {
        id,
      },
      data: {
        games: {
          create: {
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
        },
      },
    });
    return new NextResponse(JSON.stringify(player), { status: 200 });
  } catch (err) {
    console.log(err, "ROUTE ERROR");
    return new NextResponse(JSON.stringify(err), { status: 500 });
  }
};
