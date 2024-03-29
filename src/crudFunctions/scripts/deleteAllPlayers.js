const axios = require("axios");
require("dotenv").config();
const deleteAllPlayers = async (playerId) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      DATA_API_KEY: process.env.DATA_API_KEY,
    };
    const response = await axios.delete(
      `${process.env.SERVER_URL}api/all-players-function/${playerId}`,
      { headers: headers }
    );
    const data = await response;
    return data;
  } catch (err) {
    console.log("Error on deleteAllPlayers");
  }
};
deleteAllPlayers("65aa13003751cd10fb95cdc2");
