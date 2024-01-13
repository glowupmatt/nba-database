import axios from "axios";
import { TotalStatsType } from "@/types/playersType";

export const updatePlayerTotal = async (
  playerId: string,
  body: TotalStatsType
) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      DATA_API_KEY: process.env.DATA_API_KEY as string,
    };
    const response = await axios.put(
      `${process.env.SERVER_URL}api/update-player-total/${playerId}`,
      body,
      { headers }
    );
    const data = response;
    return data;
  } catch (err) {
    console.log(err);
  }
};
