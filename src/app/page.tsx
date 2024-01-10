/* eslint-disable @next/next/no-img-element */
import { playerType } from "@/utils/playersType";
import { getAllPlayers } from "@/crudFunctions/getAllPlayers";

// export const revalidate = 86400;

export default async function Home() {
  const players = await getAllPlayers("659e2726df4546fb353a47f4");
  // console.log(players);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <header className="flex flex-col items-center justify-center">
        <h1 className="text-6xl font-bold">Players</h1>
        <p className="text-xl">List of all players</p>
      </header>
      <section className="flex flex-wrap justify-center items-center">
        {players.map((player: playerType) => (
          <div
            key={+player.age}
            className="flex flex-col items-center justify-center m-4"
          >
            <img
              src={player.playerImage}
              alt={player.playerName}
              className="rounded-full"
            />
            <h2 className="text-2xl font-bold">{player.playerName}</h2>
          </div>
        ))}
      </section>
    </main>
  );
}
