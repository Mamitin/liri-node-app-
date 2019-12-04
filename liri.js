//console.log("Hey liri executed");

require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");
var liriCommand = process.argv[2];
var liriData = process.argv[3];
//console.log(process.argv);




function concertThis() {
    if (liriData === "undefined") {
        console.log("You must enter artist name!");
        return;
    }
    //form API call here
    axios.get("https://rest.bandsintown.com/artists/" + liriData + "/events?app_id=codingbootcamp")
        .then(function (response) {
            //console.log(response.data);
            if (response.data[0] != undefined) {
                console.log("-----------------------------------------------------------------------")
                console.log("Venue Name: " + response.data[0].venue.name);
                console.log("Venue City: " + response.data[0].venue.city);
                console.log("Date of Event: " + moment(response.data[0].datetime).format("MM/DD/YYYY"));
                console.log("-----------------------------------------------------------------------")
            } else {
                console.log("No events found");
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}

function spotifyThis() {
    if (liriData === "undefined") {
        liriData = "The Sign, Ace of Base";
        console.log(liriData);
    }
    //form API call here
    spotify.search({ type: "track", query: liriData, limit: 1 }, function (err, data) {
        if (err) {
            return console.log("Error occurred: " + err);
        }
        //console.log(data);
        console.log("-----------------------------------------------------------------------")
        console.log("Artist: " + data.tracks.items[0].artists[0].name);
        console.log("Track: " + data.tracks.items[0].name);
        console.log("URL: " + data.tracks.items[0].preview_url);
        console.log("Album: " + data.tracks.items[0].album.name);
        console.log("-----------------------------------------------------------------------")
    });
}

function movieThis() {
    if (typeof liriData === "movie-this") {
        liriData = "Mr. Nobody";
        console.log(liriData);
    }
    //form API call here
    axios.get("http://www.omdbapi.com/?apikey=trilogy&s=${movie}")
        .then(function (response) {
            //  console.log(response.data.Search[0].imdbID);
            var tempImdbID = response.data.Search[0].imdbID;
            //console.log(tempImdbID);
            axios.get("http://www.omdbapi.com/?apikey=trilogy&i=${tempImdbID}")
                .then(function (response2) {
                    console.log("-----------------------------------------------------------------------")
                    console.log("Title: " + response2.data.Title);
                    console.log("Year: " + response2.data.Year);
                    console.log("IMDB Rating: " + response2.data.imdbRating);
                    console.log("Rotten Tomatoes Rating: " + response2.data.Ratings[1].Value)
                    console.log("Country Produced: " + response2.data.Country);
                    console.log("Language: " + response2.data.Language);
                    console.log("Plot: " + response2.data.Plot);
                    console.log("Actors: " + response2.data.Actors);
                    console.log("-----------------------------------------------------------------------")
                })
                .catch(function (error) {
                    console.log(error);
                });

        })
        .catch(function (error) {
            console.log(error);
        });
}

function doWhatItSays() {
    fs.readFile("random.txt", "utf-8", function (err, data) {
        console.log(data)
         var dataArray = data.split(",");
          liriCommand = dataArray[0];
        // // console.log(dataArray[0]);
          liriData = dataArray[1];
        // // console.log(dataArray[1]);
        //console.log(err);
        // console.log(dataArray);
        spotifyThis(liriData);
    });
}

switch (liriCommand) {
    case "concert-this":
        concertThis();
        break;
    case "spotify-this-song":
        spotifyThis();
        break;
    case "movie-this":
        movieThis();
        break;
    case "do-what-it-says":
        doWhatItSays();
        break;
}
