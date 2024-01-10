import prisma from "@/utils/prismaDb";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  try {
    const body = await request.json();

    const players = await prisma.players.create({
      data: {
        player: {
          createMany: {
            data: body.playerData.map(
              (player: {
                playerName: string;
                age: string;
                playerImage: string;
              }) => ({
                playerName: player.playerName,
                age: player.age,
                playerImage: player.playerImage,
              })
            ),
          },
        },
      },
    });
    return new NextResponse(JSON.stringify(players), { status: 200 });
  } catch (err) {
    console.log(err, "ROUTE ERROR");
    return new NextResponse(JSON.stringify(err), { status: 500 });
  }
};
