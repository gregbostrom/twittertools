// deleteFollowings.js
// Delete (unfollow) a list of followings.

const needle = require("needle");
const OAuth = require("oauth-1.0a");
const crypto = require("crypto");

// Your Twitter API credentials
const apiKey = process.env.API_KEY;
const apiSecretKey = process.env.API_SECRET_KEY;
const accessToken = process.env.ACCESS_TOKEN;
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

// Set up the OAuth 1.0a instance
const oauth = OAuth({
  consumer: { key: apiKey, secret: apiSecretKey },
  signature_method: "HMAC-SHA1",
  hash_function(base_string, key) {
    return crypto.createHmac("sha1", key).update(base_string).digest("base64");
  },
});

async function deleteFollowings(followings) {
  for (let i = 0; i < followers.length; i++) {
    let following = followings[i];

    const request_data = {
      url: "https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=${following}&count=5",
      method: "GET",
    };

    const headers = oauth.toHeader(
      oauth.authorize(request_data, {
        key: accessToken,
        secret: accessTokenSecret,
      })
    );

    needle(request_data1.method, request_data1.url, null, { headers: headers1 })
      .then((response) => {
        console.log("rm following:", response.body);
      })
      .catch((error) => console.error("Error:", error));
  }
}
