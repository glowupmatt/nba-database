const axios = require("axios");
const { getAllPlayers } = require("../getAllPlayers");

async function getEachPlayer() {
  try {
    const players = await getAllPlayers();
    return players;
  } catch (err) {
    console.log(err, "error in getEachPlayer");
  }
}
