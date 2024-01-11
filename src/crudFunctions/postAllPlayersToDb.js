const { getJsonDataTotalForScript } = require("./getJsonTotalStatsForScript");

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

      const response = await fetch("http://localhost:3000/api/all-players", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(playerData),
      });
      const data = await response;
      return data;
    } catch (err) {
      console.log(err, "PAGE ERROR");
    }
  };
  await postPlayerData(players);
};
getAllPlayers();
