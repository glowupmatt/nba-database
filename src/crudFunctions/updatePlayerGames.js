const axios = require("axios");
require("dotenv").config();

const updatePlayerGames = async (playerId, body) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      DATA_API_KEY: process.env.DATA_API_KEY,
    };

    const response = await axios.put(
      `${process.env.SERVER_URL}api/update-player-games/${playerId}`,
      body,
      { headers: headers }
    );
    const data = response;
    return data;
  } catch (err) {
    console.log(err);
  }
};

module.exports = { updatePlayerGames };
