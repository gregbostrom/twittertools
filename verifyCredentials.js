// verfiyCredentials.js

const crypto = require("crypto");
const OAuth1 = require("oauth-1.0a");
const request = require("request-promise");

const apiKey = process.env.API_KEY;
const apiSecretKey = process.env.API_SECRET_KEY;
const accessToken = process.env.ACCESS_TOKEN;
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

const oauth = OAuth1({
  consumer: { key: apiKey, secret: apiSecretKey },
  signature_method: "HMAC-SHA1",
  hash_function(base_string, key) {
    return crypto.createHmac("sha1", key).update(base_string).digest("base64");
  },
});

const verifyCredentials = async () => {
  const request_data = {
    url: "https://api.twitter.com/1.1/account/verify_credentials.json",
    method: "GET",
  };

  const options = {
    url: request_data.url,
    method: request_data.method,
    headers: oauth.toHeader(
      oauth.authorize(request_data, {
        key: accessToken,
        secret: accessTokenSecret,
      })
    ),
  };

  try {
    const response = await request(options);
    console.log("Credentials are valid");
    console.log(response);
  } catch (error) {
    console.error("Error verifying credentials:", error);
  }
};

verifyCredentials();
