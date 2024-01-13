import { noAuth } from "@/utils/hasAuth";
import prisma from "@/utils/prismaDb";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  if (noAuth(request)) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  try {
    const body = await request.json();
    const players = await prisma.players.create({
      data: {
        player: {
          createMany: {
            data: body.map(
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
    console.log("SUCCESS", { status: 200 });
    return new NextResponse(JSON.stringify(players), { status: 200 });
  } catch (err) {
    console.log(err, "ROUTE ERROR");
    return new NextResponse(JSON.stringify(err), { status: 500 });
  }
};
