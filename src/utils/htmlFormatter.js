const cheerio = require("cheerio");

const getJson = async () => {
  const dataSelectors = [
    { name: "playerName", selector: "td[csk]" },
    { name: "age", selector: "td[data-stat='age']" },
    { name: "totalGamesPlayed", selector: "td[data-stat='g']" },
    { name: "totalGamesStarted", selector: "td[data-stat='gs']" },
    { name: "minutesPlayed", selector: "td[data-stat='mp']" },
    { name: "fieldGoals", selector: "td[data-stat='fg']" },
    { name: "fieldGoalAttempts", selector: "td[data-stat='fga']" },
    { name: "fieldGoalPercentage", selector: "td[data-stat='fg_pct']" },
    { name: "threePointers", selector: "td[data-stat='fg3']" },
    { name: "twoPointers", selector: "td[data-stat='fg2']" },
    { name: "totalRebounds", selector: "td[data-stat='trb']" },
    { name: "assists", selector: "td[data-stat='ast']" },
    { name: "blocks", selector: "td[data-stat='blk']" },
    { name: "turnovers", selector: "td[data-stat='tov']" },
    { name: "points", selector: "td[data-stat='pts']" },
    { name: "playerImage", selector: "td[data-append-csv]" },
  ];

  let tableData = [
    {
      playerName: "",
      age: "",
      totalGamesPlayed: "",
      totalGamesStarted: "",
      minutesPlayed: "",
      fieldGoals: "",
      fieldGoalAttempts: "",
      fieldGoalPercentage: "",
      threePointers: "",
      twoPointers: "",
      totalRebounds: "",
      assists: "",
      blocks: "",
      turnovers: "",
      points: "",
      playerImage: "",
    },
  ];
  // const data = (
  //   await fetch("http://localhost:3000/htmlData/siteHtml.html")
  // ).text();
  const data = (
    await fetch(
      "https://www.basketball-reference.com/leagues/NBA_2024_totals.html"
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
          if (dataSelector.name === "playerImage") {
            const playerId = $(cell).attr("data-append-csv");
            player[
              dataSelector.name
            ] = `https://www.basketball-reference.com/req/202106291/images/headshots/${playerId}.jpg`;
          }
        });
    });
    if (Object.keys(player).length !== 0) {
      tableData.push(player);
    }
  });
  tableData = tableData.filter((player) => Object.keys(player).length !== 0);

  return tableData;
};

module.exports = { getJson };
