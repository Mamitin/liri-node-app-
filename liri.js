console.log("Hey liri executed");

require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");
console.log(process.argv);


function concertThis() {
    if (process.argv[2] === "concert-this") {
        console.log("Concert-this works");
        var artist = process.argv[3];
        console.log("artist: ", artist);
        //form API call here
        axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(
            function (response) {
                //console.log(response.data);
                console.log(response.data[0].venue.name);
                var venue = response.data[0].venue.name
                console.log(response.data[0].venue.city);
                var city = response.data[0].venue.city
                console.log(response.data[0].datetime);
                var date = response.data[0].datetime
            }
        )
    }

    function spotifyThis() {
        if (process.argv[3] === "undefined") {
            process.argv[3] = "The Sign, Ace of Base";
        }
        //form API call here
        spotify.search({ type: "track", query: process.argv[3], limit: 1 }, function (err, data) {
            if (err) {
                return console.log("Error occurred: " + err);
            }
            //          console.log(data);
            console.log("Artist: " + data.tracks.items[0].artists[0].name);
            console.log("Track: " + data.tracks.items[0].name);
            console.log("URL: " + data.tracks.items[0].preview_url);
            console.log("Album: " + data.tracks.items[0].album.name);
        });
    }

    function movieThis() {
        if (process.argv[2] === "movie-this") {
            console.log("movie-this works");
            var movie = process.argv[3]
            console.log("title: ", movie);
            axios.get("http://www.omdbapi.com/?apikey=trilogy&s=${movie}")
                .then(function (response) {
                    //  console.log(response.data.Search[0].imdbID);
                    var tempImdbID = response.data.Search[0].imdbID;
                    //console.log(tempImdbID);
                    axios.get("http://www.omdbapi.com/?apikey=trilogy&i=${tempImdbID}")
                        .then(function (response2) {
                            console.log("Title: " + response2.data.Title);
                            console.log("Year: " + response2.data.Year);
                            console.log("IMDB Rating: " + response2.data.imdbRating);
                            console.log("Rotten Tomatoes Rating: " + response2.data.Ratings[1].Value)
                            console.log("Country Produced: " + response2.data.Country);
                            console.log("Language: " + response2.data.Language);
                            console.log("Plot: " + response2.data.Plot);
                            console.log("Actors: " + response2.data.Actors);
                        })
                        .catch(function (error) {
                            console.log(error);
                        });

                });
        }
    }

    function doWhatItSays() {
        fs.readFile("random.txt", "utf8", function (err, data) {
            var dataArray = data.split(",");
            process.argv[2] = dataArray[0];
            process.argv[3] = dataArrau[1];
            spotifyThis(process.argv[3]);

        });
    }
