import { GameType } from "@/types/playersType";
import axios from "axios";

export const updatePlayerGames = async (playerId: string, body: GameType) => {
  try {
    const response = await axios.put(
      `http://localhost:3000/api/get-player/${playerId}`,
      body
    );
    const data = response;
    return data;
  } catch (err) {
    console.log(err);
  }
};
