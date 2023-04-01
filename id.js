// id.js
// List the userid given a username

const getUserIdByUsername = require("./getUserIdByUsername");

const args = process.argv.slice(2);

if (args.length === 0) {
  console.log("No username given.");
  console.log("\nsample usage: node id.js <username>");
  return;
}

const username = args[0];

getUserIdByUsername(username)
  .then((userId) => console.log(username, userId))
  .catch((error) => console.error("Error:", error));
