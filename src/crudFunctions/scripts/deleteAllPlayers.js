const axios = require("axios");
const deleteAllPlayers = async (playerId) => {
  try {
    const response = await axios.delete(`/api/all-players/${playerId}`);
    const data = await response;
    return data;
  } catch (err) {
    console.log(err);
  }
};
deleteAllPlayers("65a086503ce01907773917b2");
