import { updatePlayerGames } from "@/crudFunctions/updatePlayerGames";
import { getAllPlayers } from "@/crudFunctions/getAllPlayers";
import { getJsonDataPerGame } from "@/utils/getJsonDataPerGame";
import { getJsonDataTotal } from "@/utils/getJsonTotalStats";
import { updatePlayerTotal } from "@/crudFunctions/updatePlayerTotal";
import {
  GameType,
  PlayerType,
  JsonPlayerType,
  TotalStatsType,
  BodyType,
} from "@/types/playersType";

export async function dailyUpdateCall() {
  try {
    const players: PlayerType[] = await getAllPlayers();
    const perGameJson: JsonPlayerType[] = await getJsonDataPerGame();
    const filteredPlayersJson = perGameJson.filter(
      (player) => player.playerName !== undefined && player.playerName !== "0"
    );
    const totalJson: JsonPlayerType[] = await getJsonDataTotal();
    const filteredTotalJson = totalJson.filter(
      (player) => player.playerName !== undefined && player.playerName !== "0"
    );
    const playersMap = new Map();
    players.forEach((player: PlayerType) => {
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

const pause = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function delayAndUpdate(
  player: JsonPlayerType,
  playersMap: Map<string, string>,
  updateType: "games" | "total"
) {
  // await pause(3);
  if (playersMap.has(player.playerName)) {
    const playerId = playersMap.get(player.playerName);
    if (playerId) {
      await updatePlayerStats(playerId, player, updateType);
    }
  }
}

async function updatePlayerStats(
  playerId: string,
  player: JsonPlayerType,
  updateType: "games" | "total"
) {
  const body: BodyType = {
    totalGamesPlayed: player.totalGamesPlayed,
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
  };
  if (updateType === "games") {
    await updatePlayerGames(playerId, body);
    console.log("updated games");
  } else if (updateType === "total") {
    await updatePlayerTotal(playerId, body as TotalStatsType);
    console.log("updated total");
  }
}
