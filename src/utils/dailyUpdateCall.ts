import { updatePlayerGames } from "@/crudFunctions/updatePlayerGames";
import { getAllPlayers } from "@/crudFunctions/getAllPlayers";
import { getJsonDataPerGame } from "@/utils/getJsonDataPerGame";
import { GameType, PlayerType, JsonPlayerType } from "@/types/playersType";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
export const dailyUpdateCall = async () => {
  try {
    const players: PlayerType[] = await getAllPlayers();
    const perGameJson: JsonPlayerType[] = await getJsonDataPerGame();

    const playersMap = new Map();
    players.forEach((player: PlayerType) => {
      playersMap.set(player.playerName, player.id);
    });

    perGameJson.forEach(async (player: JsonPlayerType) => {
      const body: GameType = {
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

      if (playersMap.has(player.playerName)) {
        const playerId = playersMap.get(player.playerName);
        if (playerId) {
          await updatePlayerGames(playerId, body);
          await delay(2000);
        }
      }
    });
  } catch (error) {
    console.log("error in dailyUpdateCall");
    console.log(error);
  }
};
