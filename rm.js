// rm.js
// Take a command line id or standard input list of ids and delete (unfollow).

const deleteFollowings = require("./getUserIdByUsername");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

const usernames = [];
const user = [];

rl.on("line", (line) => {
  const user = line.split(" ");
  usernames.push(user[1]);
});

rl.once("close", () => {
  // end of input
});

console.log(usernames);

const args = process.argv.slice(2);

if (args.length === 0) {
  console.log("No username given.");
  console.log("\nsample usage: node id.js <username>");
  return;
}

const username = args[0];

deleteFollowings(usernames)
  .then((success) => console.log(success))
  .catch((error) => console.error("Error:", error));
