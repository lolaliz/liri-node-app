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
//grabs song or movie title
var UserInput = process.argv[3]

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

    function getSpotifySong (){
        var SongTitle = UserInput

        if(!SongTitle){
            SongTitle = "ironic";
        }
    
        params = SongTitle
        spotify.search({ type: 'track', query: params, limit: 10 }, function(err, data) {
            if (err) {
              return console.log('Error occurred: ' + err);
            } else {

                for (let i = 0; i < 10; i++) {
                
                console.log( "ARTIST:  " + data.tracks.items[i].album.artists[0].name);
                console.log("SONG TITLE:  " + data.tracks.items[0].name);
                console.log("ALBUM:  " + data.tracks.items[i].album.name);
                console.log("PREVIEW URL:  " + data.tracks.items[i].preview_url)
                console.log("****************************************************************************");
                }
          }
    });



    }
