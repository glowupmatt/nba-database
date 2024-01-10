import axios from "axios";
export const getAllPlayers = async (id: string) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/all-players/${id}`
    );
    const data = await response.data.player;
    console.log(data, "DATA");
    return data;
  } catch (err) {
    console.log(err);
  }
};
