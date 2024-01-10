const { getJsonDataTotal } = require("../utils/getJsonTotalStats.js");

const getAllPlayers = async () => {
  const players = await getJsonDataTotal();
  const postPlayerData = async (players) => {
    try {
      const playerData = players.map((player) => ({
        playerName: player.playerName,
        age: player.age,
        playerImage: player.playerImage,
      }));
      const response = await fetch("http://localhost:3000/api/allPlayers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          playerData,
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
    } catch (err) {
      console.log(err, "PAGE ERROR");
    }
  };
  await postPlayerData(players);
};
getAllPlayers();
