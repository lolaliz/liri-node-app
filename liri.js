require("dotenv").config();

var fs = require("fs"); //reads and writes files
var request = require("request");
var keys = require("./keys.js");
var twitter = require("twitter")
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var client = new twitter(keys.twitter);

//grabs user command
var LiriCommand = process.argv[2]
//grabs song or movie title
var [nope, nomore, stillno, ...UserInput] = process.argv

//command logic 
switch (LiriCommand) {
    case "my-tweets":
        getTweets()
        break;
    case "spotify-this-song":
        getSpotifySong()
        break;
    case "movie-this":
        getMovieInfo()
        break;
    case "do-what-it-says":
        getRandomTxt()
        break;
    default:
        console.log("***Please enter a command: my-tweets, spotify-this-song, movie-this, do-what-it-says***");
        break;
}

function getTweets() {
    var params = { screen_name: 'kitlolakat' }
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            var divider = "*********"
            for (var i = 0; i < tweets.length; i++) {
                var tweetDate = tweets[i].created_at;
                console.log("@kitlolakat: " + tweets[i].text + ", " + "Created at: " + tweetDate)
                console.log("======================================================================================")

                //add text to log.txt
                fs.appendFile('log.txt', "@kitlolakat: " + tweets[i].text + ", " + "Created at: " + tweetDate + divider, function (error) {
                    if (error) throw error;
                    //else {console.log ("saved!")}
                });

            }
        }

    });
}


function getSpotifySong(songy) {
    var SongTitle = songy || UserInput
    //console.log(songy)

    if (!SongTitle) {
        SongTitle = "yellow submarine";
    }

    params = SongTitle

    spotify.search({ type: 'track', query: params, limit: 10 }, function (err, data) {
        if (!err) {

            for (let i = 0; i < 10; i++) {

                console.log("ARTIST:  " + data.tracks.items[i].album.artists[0].name);
                console.log("SONG TITLE:  " + data.tracks.items[0].name);
                console.log("ALBUM:  " + data.tracks.items[i].album.name);
                console.log("PREVIEW URL:  " + data.tracks.items[i].preview_url)
                console.log("****************************************************************************");
            }
        } else {
            console.log("error occurred:", err)
        }
    });
}



function getMovieInfo() {

    var MovieTitle = UserInput

    if (!MovieTitle) {
        MovieTitle = "mr nobody"
    }

    request('http://www.omdbapi.com/?t=' + MovieTitle + "&y=&plot=short&apikey=trilogy", function (error, response, body) {


        if (!error && response.statusCode === 200) {
            console.log("MOVIE TITLE:", JSON.parse(body).Title)
            console.log("RELEASE DATE:", JSON.parse(body).Released)
            console.log("IMDB RATING:", JSON.parse(body).Ratings[0].Value)
            console.log("ROTTEN TOMATOES RATING:", JSON.parse(body).Ratings[1].Value)
            console.log("COUNTRY:", JSON.parse(body).Country)
            console.log("LANGUAGES:", JSON.parse(body).Language)
            console.log("PLOT:", JSON.parse(body).Plot)
            console.log("ACTORS:", JSON.parse(body).Actors)

            //
        } else {
            console.log("error:", error)
        }

    })

}

function getRandomTxt() {
    fs.readFile('random.txt', 'utf8', function (error, data) {
        if (error) { return console.log("error") }
  
            var rdmtxt = data.split(',')
            console.log(rdmtxt)
            getSpotifySong(rdmtxt[1])
    })
}

