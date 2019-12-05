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
        if (data.tracks.items[0].preview_url === null) {
            console.log("URL: No preview available.")
        } else {
            console.log("URL: " + data.tracks.items[0].preview_url);
        }
        console.log("Album: " + data.tracks.items[0].album.name);
        console.log("-----------------------------------------------------------------------")
    });
}



function movieThis(liriData) {
    if (liriData === undefined) {
        liriData = "Mr. Nobody";
        //console.log(liriData);
    }

    var queryUrl = "https://www.omdbapi.com/?t=" + liriData + "&y=&plot=short&apikey=trilogy"
    axios.get(queryUrl)
        .then(function (response) {
            //console.log(response.data);
            console.log("--------------------------------------------------------------------");
            console.log("Title: " + response.data.Title);
            console.log("Year: " + response.data.Year);
            console.log("IMDB Rating: " + response.data.imdbRating);
            console.log("Country Produced: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
            if (response.data.Ratings[1].Source === undefined) {
                console.log("Rotten Tomatoes: N/A");
            } else {
                console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
            }
            console.log("--------------------------------------------------------------------");
        })

        .catch(function (error) {
            console.log(error.message);
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
        concertThis(liriData);
        break;
    case "spotify-this-song":
        spotifyThis(liriData);
        break;
    case "movie-this":
        movieThis(liriData);
        break;
    case "do-what-it-says":
        doWhatItSays();
        break;
}
