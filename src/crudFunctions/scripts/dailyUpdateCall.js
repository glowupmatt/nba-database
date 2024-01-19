const { updatePlayerGames } = require("../updatePlayerGames");
const { getAllPlayers } = require("../getAllPlayers");
const { updatePlayerTotal } = require("../updatePlayerTotal");
const { getJsonDataPerGame } = require("./getJsonDataPerGame");
const { getJsonDataTotalForScript } = require("./getJsonTotalStatsForScript");

async function dailyUpdateCall() {
  try {
    const players = await getAllPlayers();
    const perGameJson = await getJsonDataPerGame();
    const filteredPlayersJson = perGameJson.filter(
      (player) => player.playerName !== undefined && player.playerName !== "0"
    );
    const totalJson = await getJsonDataTotalForScript();
    const filteredTotalJson = totalJson.filter(
      (player) => player.playerName !== undefined && player.playerName !== "0"
    );
    const playersMap = new Map();
    players.forEach((player) => {
      playersMap.set(player.playerName, player.id);
    });
    for (const player of filteredPlayersJson) {
      await delayAndUpdate(player, playersMap, "games");
    }
    for (const player of filteredTotalJson) {
      await delayAndUpdate(player, playersMap, "total");
    }
  } catch (error) {
    console.log("error in dailyUpdateCall");
    console.log(error);
  } finally {
    console.log("UPDATED ALL PLAYERS");
  }
}

const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function delayAndUpdate(player, playersMap, updateType) {
  if (playersMap.has(player.playerName)) {
    const playerId = playersMap.get(player.playerName);
    if (playerId) {
      await updatePlayerStats(playerId, player, updateType);
    }
  }
}

async function updatePlayerStats(playerId, player, updateType) {
  const body = {
    totalGamesPlayed: player.totalGamesPlayed,
    team: player.team,
    totalGamesStarted: player.totalGamesStarted,
    minutesPlayed: player.minutesPlayed,
    fieldGoals: player.fieldGoals,
    fieldGoalAttempts: player.fieldGoalAttempts,
    fieldGoalPercentage: player.fieldGoalPercentage,
    threePointers: player.threePointers,
    twoPointers: player.twoPointers,
    totalRebounds: player.totalRebounds,
    assists: player.assists,
    blocks: player.blocks,
    turnovers: player.turnovers,
    points: player.points,
    freeThrows: player.freeThrows,
    freeThrowAttempts: player.freeThrowAttempts,
    steals: player.steals,
  };
  if (updateType === "games") {
    await updatePlayerGames(playerId, body);
    console.log(playerId, "updated games");
  } else if (updateType === "total") {
    await updatePlayerTotal(playerId, body);
    console.log(playerId, "updated total");
  }
}

dailyUpdateCall();

module.exports = { dailyUpdateCall };
