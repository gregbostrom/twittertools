// getFollowings.js
// Given a twitter userid, return an array of who the user is following (followings).

const needle = require("needle");

const bearerToken = process.env.BEARER_TOKEN;

async function getFollowings(userId) {
  const url = `https://api.twitter.com/2/users/${userId}/following`;
  let users = [];
  let params = {
    max_results: 1000,
    "user.fields": "created_at",
  };

  const options = {
    headers: {
      "User-Agent": "v2FollowingJS",
      Authorization: `Bearer ${bearerToken}`,
    },
  };

  let hasNextPage = true;
  let nextToken = null;
  console.log("Retrieving users this user is following...");
  while (hasNextPage) {
    let resp = await getPage(url, params, options, nextToken);
    if (
      resp &&
      resp.meta &&
      resp.meta.result_count &&
      resp.meta.result_count > 0
    ) {
      if (resp.data) {
        users.push.apply(users, resp.data);
      }
      if (resp.meta.next_token) {
        nextToken = resp.meta.next_token;
      } else {
        hasNextPage = false;
      }
    } else {
      hasNextPage = false;
    }
  }

  /*
  const uidx = users[0].id;
  console.log(`Got ${users.length} users.`);
  console.log(uidx, users[0].username);
  */
  return users;
}

const getPage = async (url, params, options, nextToken) => {
  if (nextToken) {
    params.pagination_token = nextToken;
  }

  try {
    const resp = await needle("get", url, params, options);

    if (resp.statusCode != 200) {
      console.log(`${resp.statusCode} ${resp.statusMessage}:\n${resp.body}`);
      return;
    }
    return resp.body;
  } catch (err) {
    throw new Error(`Request failed: ${err}`);
  }
};

module.exports = getFollowings;
