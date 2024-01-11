const axios = require("axios");
const deleteAllPlayers = async (playerId) => {
  try {
    const response = await axios.delete(
      `http://localhost:3000/api/all-players/${playerId}`
    );
    const data = await response;
    return data;
  } catch (err) {
    console.log(err);
  }
};
deleteAllPlayers("659e2726df4546fb353a47f4");
