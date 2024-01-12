const { getJsonDataTotalForScript } = require("./getJsonTotalStatsForScript");
const axios = require("axios");

const getAllPlayers = async () => {
  const players = await getJsonDataTotalForScript();
  const postPlayerData = async (players) => {
    try {
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
        `${process.env.SERVER_URL}api/all-players`,
        playerData
      );
      return response.data;
    } catch (err) {
      console.log(err, "PAGE ERROR");
    }
  };
  await postPlayerData(players);
};
getAllPlayers();
