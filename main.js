// main.js
const getFollowings = require("./getFollowings");
const getLatestTweetTime = require("./getLatestTweetTime");

//const CreativeFriendzUserId = "1356916261922476033";
const gregbostrom = 22338076;

async function main() {
  let users = [];
  // First get a list of users that we are following
  console.log("getFollowings");
  try {
    users = await getFollowings(gregbostrom);
  } catch (error) {
    console.error("Unable to fetch followers: ", error);
    return;
  }

  console.log("getLatestTweetTime");
  for (let i = 0; i < users.length; i++) {
    try {
      // Reusing created_at as the latestTweetTime
      users[i].created_at = await getLatestTweetTime(users[i].id);
    } catch (error) {
      console.error("getLatestTweetTime error: ", error);
      return;
    }
  }

  console.log("Sort by latestTweetTime");
  let sortedUsers = users.sort(
    (a, b) => new Date(a.created_at) - new Date(b.created_at)
  );

  // Dump the results
  console.log("----------");
  for (let i = 0; i < sortedUsers.length; i++) {
    console.log(
      sortedUsers[i].created_at,
      sortedUsers[i].username,
      sortedUsers[i].id
    );
  }
  console.log("----------");
}

main();
