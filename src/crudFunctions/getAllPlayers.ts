import axios from "axios";
export const getAllPlayers = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/api/get-player/`);
    const data = await response.data;
    return data;
  } catch (err) {
    console.log(err);
  }
};
