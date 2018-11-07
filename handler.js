'use strict';
const axios = require('axios');
const Twitter = require('twitter');

const tw = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

module.exports.bot = async () => {
  try {
    const jokeResponse = await axios({
      url: 'https://icanhazdadjoke.com/',
      headers: {
        'Accept': 'application/json',
        'User-Agent': '@TheMonkeyJoker1'
      }
    });
    console.log("Tweeting!" + JSON.stringify(jokeResponse.data));
    await tw.post('statuses/update', {
      status: jokeResponse.data.joke
    }).then((tweet) => {
      console.log(tweet);
    }).catch((error) => {
        console.log(error);
        throw error;
    }); 
  } catch (err) {
    console.log('Error:' + err.message);
  }
}; 