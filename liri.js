require("dotenv").config();

var fs = require("fs"); //reads and writes files
//var request = require("request");
var keys = require("./keys.js");
var twitter = require ("twitter")
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var client = new twitter(keys.twitter);

//grabs user command
var LiriCommand = process.argv[2]

//command logic 
switch (LiriCommand){
    case "my-tweets":
        getTweets()
        break;
    case "spotify-this-song":
        getSpotifySong ()
        break;
    case "movie-this":
        getMovieInfo ()
        break;
    case "do-what-it-says":
        getRandomTxt ()
        break;
    default:
        console.log("***Please enter a command: my-tweets, spotify-this-song, movie-this, do-what-it-says***");
      break;
    }

    function getTweets (){
       var params = {screen_name: 'kitlolakat'}
       client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            for(var i = 0; i<tweets.length; i++){
                var tweetDate = tweets[i].created_at;
                console.log("@kitlolakat: " + tweets[i].text + ", " + "Created at: " + tweetDate)
                console.log("======================================================================================")
            }
         
        }
      });
    }



