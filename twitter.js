var Twitter = require('twitter');
 
var client = new Twitter({
  consumer_key: 'SHdlhmSexV0yBgvVQI0qdxK8n',
  consumer_secret: 'o2s9ArLF2lgeO0LsyWQyu68jfTirgk1kWLBrrhx2BuaMBtTVqK',
  access_token_key: "1550180696-6yMtleeOwuiugkWJyk250xIeJxyR4IK4kS5WEB1",
  access_token_secret: "xr15EnnwsYjQCGQCCbah299fJDE3LfxEJ8hE80cV3RJ8M"
});

// https://api.twitter.com/1.1/account/verify_credentials.json
 
var params = {};
client.get('account/verify_credentials.json', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
  }
  console.log(error)
});