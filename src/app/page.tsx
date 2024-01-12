/* eslint-disable @next/next/no-img-element */
// import { PlayerType } from "@/types/playersType";
// import { getAllPlayers } from "@/crudFunctions/getAllPlayers";
// import { dailyUpdateCall } from "@/utils/dailyUpdateCall";

// export const revalidate = 86400;

export default async function Home() {
  // const players: PlayerType[] = await getAllPlayers();
  // await dailyUpdateCall();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <header className="flex flex-col items-center justify-center">
        <h1 className="text-6xl font-bold">Players</h1>
        <p className="text-xl">List of all players</p>
      </header>
      {/* <section className="flex flex-wrap justify-center items-center">
        {players.map((player: PlayerType, index: number) => {
          return (
            <div
              key={player.playerName + index}
              className="flex flex-col items-center justify-center m-4"
            >
              <img
                src={player.playerImage}
                alt={player.playerName}
                className="rounded-full"
              />
              <h2 className="text-2xl font-bold">{player.playerName}</h2>
            </div>
          );
        })}
      </section> */}
    </main>
  );
}
