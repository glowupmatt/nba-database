const axios = require("axios");
require("dotenv").config();

const getAllPlayers = async () => {
  try {
    const headers = {
      "Content-Type": "application/json",
      DATA_API_KEY: process.env.DATA_API_KEY,
    };

    const response = await axios.get(
      `${process.env.SERVER_URL}api/get-all-players-current-data/`,
      { headers: headers }
    );

    const data = response.data;
    return data;
  } catch (err) {
    console.log(err, "error in getAllPlayers");
  }
};

module.exports = { getAllPlayers };
