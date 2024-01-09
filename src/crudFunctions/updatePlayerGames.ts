import { playerType } from "@/utils/playersType";

export const updatePlayerGames = async (playerId: string, body: playerType) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/getPlayer/${playerId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};
