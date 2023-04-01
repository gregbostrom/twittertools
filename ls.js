// ls.js
// list the user id's following

const getFollowings = require("./getFollowings");

//const CreativeFriendzUserId = "1356916261922476033";
const gregbostrom = 22338076;

function dumpToConsole(users) {
  let sortedUsers = users.sort((a, b) => a.username < b.username);
  users.sort((a, b) => a.username.localeCompare(b.username));
  for (let i = 0; i < users.length; i++) {
    console.log(users[i].username, users[i].id);
  }
}

async function ls(id) {
  getFollowings(id)
    .then((users) => dumpToConsole(users))
    .catch((error) => console.error("Error:", error));
}

// List who gregbostrom follows (followings)
ls(gregbostrom);
