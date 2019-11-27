console.log("Hey liri executed");

require("dotenv").config();
var keys = require("./keys.js");

var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var axios = require("axios");

console.log(process.argv);

if (process.argv[2] === "concert-this") {
    console.log("Concert-this works");
    var artist = process.argv[3];
    console.log("artist: ", artist);
    //form API call here
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(
        function(response) {
            console.log(response.data[0].venue);
        }
    )
} else if (process.argv[2] === "spotify-this-song") {
    console.log("Spotify works");
} else if (process.argv[2] === "movie-this") {
    console.log("Movie-this works");
} else if (process.argv[2] === "do-what-it-says") {
    console.log("do-what works");
} else {
    console.log("error");
}


