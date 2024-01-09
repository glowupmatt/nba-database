const cheerio = require("cheerio");
const fs = require("fs");

const getJsonDataPerGame = async () => {
  const dataSelectors = [
    { name: "playerName", selector: "td[csk]" },
    { name: "minutesPlayed", selector: "td[data-stat='mp_per_g']" },
    { name: "fieldGoals", selector: "td[data-stat='fg_per_g']" },
    { name: "fieldGoalAttempts", selector: "td[data-stat='ga_per_g']" },
    { name: "fieldGoalPercentage", selector: "td[data-stat='fg_pct']" },
    { name: "threePointers", selector: "td[data-stat='fg3_per_g']" },
    { name: "twoPointers", selector: "td[data-stat='fg2_per_g']" },
    { name: "totalRebounds", selector: "td[data-stat='trb_per_g']" },
    { name: "assists", selector: "td[data-stat='ast_per_g']" },
    { name: "blocks", selector: "td[data-stat='blk_per_g']" },
    { name: "turnovers", selector: "td[data-stat='tov_per_g']" },
    { name: "points", selector: "td[data-stat='pts_per_g']" },
  ];

  let tableData = [];
  const data = (
    await fetch(
      "https://www.basketball-reference.com/leagues/NBA_2024_per_game.html"
    )
  ).text();
  const $ = cheerio.load(await data);
  $("table tbody tr").each((i, row) => {
    let player = {};
    dataSelectors.forEach((dataSelector) => {
      $(row)
        .find(dataSelector.selector)
        .each((j, cell) => {
          const data = $(cell).text().trim();
          if (data) {
            player[dataSelector.name] = data;
          }
        });
    });
    if (Object.keys(player).length !== 0) {
      tableData.push(player);
    }
  });

  tableData = tableData.filter((player) => Object.keys(player).length !== 0);

  const json = JSON.stringify(tableData, null, 2);
  fs.writeFile(`public/playerData/playerDataPerGame.json`, json, (err) => {
    if (err) throw err;
    console.log("The file has been saved!");
  });
  return tableData;
};
getJsonDataPerGame();
module.exports = { getJsonDataPerGame };
