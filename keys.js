

// #twitter keys!
// Consumer Key (API Key)	Rf8ivIG8HzBIO8vUEgGI5gehA;
// Consumer Secret (API Secret)	XumYdMCKC1totvphF32RT56gNih9Vsclzpwaq3sucX9YwDI3PL

console.log('this is loaded');


exports.twitter = {
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
};

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};