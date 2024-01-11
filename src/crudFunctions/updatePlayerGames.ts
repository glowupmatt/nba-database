import { PlayerType } from "@/types/playersType";
import { getJsonDataTotal } from "@/utils/getJsonTotalStats";
import { GameType } from "@/types/playersType";
import axios from "axios";

export const updatePlayerGames = async (playerId: string, body: GameType) => {
  try {
    console.log({ body }, "PLAYER ID ON UPDATE PLAYER GAMES");
    const response = await axios.put(
      `http://localhost:3000/api/get-player/${playerId}`,
      body
    );
    const data = response;
    return data;
  } catch (err) {
    console.log("ERROR ON UPDATE PLAYER GAMES");
  } finally {
    console.log("FINALLY ON UPDATE PLAYER GAMES");
  }
};
