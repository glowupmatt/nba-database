const axios = require("axios");
require("dotenv").config();
const deleteAllPlayers = async (playerId) => {
  try {
    const response = await axios.delete(
      `${process.env.SERVER_URL}api/all-players-function/${playerId}`
    );
    const data = await response;
    return data;
  } catch (err) {
    console.log("Error on deleteAllPlayers");
  }
};
deleteAllPlayers("65a1967174a0033007113b6a");
