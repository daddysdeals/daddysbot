var Twitter = require('twitter');

 var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
 });

/**
* Daddyisms
*/
var messages = ["I could give up online shopping but I'm not a quitter! CC @daddysdeals",
"If shopping doesn't make you happy you're in the wrong shop! CC @daddysdeals",
"Save. The best four letter word! CC @daddysdeals",
"Travel is the only thing you buy that makes you richer! CC @daddysdeals"];


function randomMessage(messageArray) {
  var index = Math.floor(Math.random() * messageArray.length);
  return messageArray[index];
}

//console.log(randomMessage(messages));

function tweetTo(username,message,inResponseTo) {

  var opts = {status: "@"+username + " " + message};
  if(inResponseTo != null){
    opts.in_reply_to_status_id = inResponseTo;
  }

  console.log(opts);

  client.post('statuses/update',opts, function(error, tweet, response){
  //if (!error) {
    console.log(tweet);
  //}
});


};

 /**
  * Stream statuses filtered by keyword
  * number of tweets per second depends on topic popularity
  **/
 client.stream('statuses/filter', {track: 'daddysdev'},  function(stream){
   stream.on('data', function(tweet) {
     console.log(tweet);
     var user = tweet.user.screen_name;
     tweetTo(user,randomMessage(messages),tweet.id_str);

   });


   stream.on('error', function(error) {
     console.log(error);
   });
 });
