const axios = require("axios");
const deleteAllPlayers = async (playerId) => {
  try {
    const response = await axios.delete(
      `${process.env.SERVER_URL}api/all-players/${playerId}`
    );
    const data = await response;
    return data;
  } catch (err) {
    console.log(err);
  }
};
