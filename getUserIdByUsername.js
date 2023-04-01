// getUserIdByUsername.js

const needle = require("needle");

const BEARER_TOKEN = process.env.BEARER_TOKEN;

async function getUserIdByUsername(username) {
  const headers = {
    Authorization: `Bearer ${BEARER_TOKEN}`,
    "User-Agent": "yo what is userid",
  };

  const response = await needle(
    "get",
    `https://api.twitter.com/2/users/by/username/${username}`,
    { headers }
  );

  if (response.statusCode !== 200) {
    console.error("Error details:", response.body);
    throw new Error(`Request failed with status code ${response.statusCode}`);
  }

  return response.body.data.id;
}

module.exports = getUserIdByUsername;

// Usage:
/*
getUserIdByUsername("jack")
  .then((userId) => console.log("User ID:", userId))
  .catch((error) => console.error("Error:", error));
*/
