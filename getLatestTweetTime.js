// getLatestTweetTime.js
// Get latest tweet time by user ID

const needle = require("needle");

const BEARER_TOKEN = process.env.BEARER_TOKEN;

const headers = {
  Authorization: `Bearer ${BEARER_TOKEN}`,
  "User-Agent": "getLatestTweet",
};

async function getLatestTweetTime(userId) {
  // max_results must be within [5, 100], but we only need the first.
  const url = `https://api.twitter.com/2/users/${userId}/tweets?max_results=5&tweet.fields=created_at`;
  try {
    const response = await needle("get", url, { headers });
    if (response.statusCode !== 200) {
      console.error("Error details:", response.body);
      throw new Error(
        `Get tweet failed with status code ${response.statusCode}`
      );
    }
    // Latest tweet is the first one
    const latestTweet = response.body.data[0];
    return latestTweet.created_at;
  } catch (error) {
    //console.log("error: ", error);
    // throw new Error("Error:", error.message);
    return 0;
  }
}

module.exports = getLatestTweetTime;
