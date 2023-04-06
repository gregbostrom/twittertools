// unfollowUser.js

const needle = require("needle");

const BEARER_TOKEN = process.env.BEARER_TOKEN;

async function unfollowUser(sourceUserId, targetUserId) {
  const endpointUrl = `https://api.twitter.com/2/users/${sourceUserId}/following/${targetUserId}`;
  const options = {
    headers: {
      "User-Agent": "v2UserUnfollowJS",
      Authorization: `Bearer ${BEARER_TOKEN}`,
    },
  };

  try {
    const response = await needle("delete", endpointUrl, null, options);
    if (response.statusCode === 200) {
      console.log(`Unfollowed user ${targetUserId}`);
    } else {
      throw new Error(`Request failed with status code ${response.statusCode}`);
    }
  } catch (error) {
    console.error(error.message);
  }
}

module.exports = unfollowUser;
