const deleteAllPlayers = async (playerId) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/allPlayers/${playerId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data, "JS FILE");
    return data;
  } catch (err) {
    console.log(err);
  }
};
deleteAllPlayers("659e17cfa231231baf22b0d8");
