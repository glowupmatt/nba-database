import { GameType } from "@/types/playersType";
import axios from "axios";

export const updatePlayerGames = async (playerId: string, body: GameType) => {
  try {
    const response = await axios.put(
      `${process.env.SERVER_URL}api/update-player-games/${playerId}`,
      body
    );
    const data = response;
    return data;
  } catch (err) {
    console.log(err);
  }
};
