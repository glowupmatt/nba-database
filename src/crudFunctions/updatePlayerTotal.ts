import axios from "axios";
import { TotalStatsType } from "@/types/playersType";

export const updatePlayerTotal = async (
  playerId: string,
  body: TotalStatsType
) => {
  try {
    const response = await axios.put(
      `${process.env.SERVER_URL}api/update-player-total/${playerId}`,
      body
    );
    const data = response;
    return data;
  } catch (err) {
    console.log(err);
  }
};
