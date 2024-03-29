import { NextResponse } from "next/server";
import prisma from "@/utils/prismaDb";
import { noAuth } from "@/utils/hasAuth";

export const PUT = async (
  request: Request,
  { params }: { params: { playerId: string } }
) => {
  if (noAuth(request)) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
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
