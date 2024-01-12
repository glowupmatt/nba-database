import { NextResponse } from "next/server";
import prisma from "@/utils/prismaDb";

export const GET = async (
  request: Request,
  { params }: { params: { playerId: string } }
) => {
  try {
    const { playerId } = params;
    const player = await prisma.player.findUnique({
      where: {
        id: playerId,
      },
      include: {
        games: true,
        totalStats: true,
      },
    });
    console.log("SUCCESS", { status: 200 });
    return new NextResponse(JSON.stringify(player), { status: 200 });
  } catch (err) {
    console.log(err, "ROUTE ERROR");
    return new NextResponse(JSON.stringify(err), { status: 500 });
  }
};

export const PUT = async (
  request: Request,
  { params }: { params: { playerId: string } }
) => {
  try {
    const { playerId } = params;
    const body = await request.json();
    const {
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
        id: playerId,
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