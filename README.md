# liri-node-app
LIRI Bot is a command line application using Node.js and several modules installed using NPM.

1. LIRI was created to perform searches: Bands in Town for concerts, and OMDB for movies, Spotify for song tracks

2. The application uses the `axios` package to connect to the various APIs, as well as other modules for various tasks:

   * [Node-Spotify-API](https://www.npmjs.com/package/node-spotify-api)
   * [Axios](https://www.npmjs.com/package/axios)
   * [Bands In Town API](http://www.artists.bandsintown.com/bandsintown-api)
   * [Moment](https://www.npmjs.com/package/moment)
   * [DotEnv](https://www.npmjs.com/package/dotenv)

## The instructions are as follows:

 1. `node liri.js concert-this <artist/band name here>` - This will return:

   * Name of the venue
   * Venue location
   * Date of the Event

 ### Here is the code snipit for this API call:
 <img src="/images/concertThis.PNG">  



2. `node liri.js spotify-this-song '<song name here>'` - This will return:

   * Artist(s)
   * Song Name
   * A preview link of the son
   * The album
   * If no song is provided the default is "The Sign" by Ace of Base.

### Here is the code snipit for this API call:
 <img src="/images/spotifyThis.PNG">  


3. `node liri.js movie-this '<movie name here>'` - This will return:

   * Title.
   * Year of release.
   * IMDB Rating.
   * Rotten Tomatoes Rating.
   * Country where the movie was produced.
   * Language of the movie.
   * Plot of the movie.
   * Actors in the movie.
   * If a movie isn't provided, a default movie, 'Mr. Nobody', will be used.

4. `node liri.js do-what-it-says`
### Here is the code snipit for this command:
 <img src="/images/doWhatItSays.PNG">  


   * LIRI use the commands listed in random.txt and then call one of LIRI's functions.
