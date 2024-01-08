export const getAllPlayers = async (id: string) => {
  try {
    const response = await fetch(`http://localhost:3000/api/allPlayers/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};
