const { getJsonDataTotalForScript } = require("./getJsonTotalStatsForScript");
const axios = require("axios");
require("dotenv").config();

const getAllPlayers = async () => {
  const players = await getJsonDataTotalForScript();
  const postPlayerData = async (players) => {
    try {
      const headers = {
        "Content-Type": "application/json",
        DATA_API_KEY: process.env.DATA_API_KEY,
      };
      const playerData = players
        .filter((player) => player.playerName !== undefined)
        .map((player) => ({
          playerName: player.playerName,
          age: player.age,
          playerImage: player.playerImage,
          totalStats: [],
          games: [],
        }));

      const response = await axios.post(
        `${process.env.SERVER_URL}api/all-players-function`,
        playerData,
        { headers: headers }
      );
      return response.data;
    } catch (err) {
      console.log("PAGE ERROR");
    }
  };
  await postPlayerData(players);
};
getAllPlayers();
