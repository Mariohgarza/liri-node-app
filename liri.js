require("dotenv").config();
var fs = require("fs");
var request = require("request");
var env = require("./.env");
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var Twitter = require('twitter');
var client = new Twitter(keys.twitter);






//////////  thoughts
var result = {};//for the json object  that comes back from the api
var instruction = process.argv[2]; // (my-tweets, movie-this , etc)
//var spotify = new Spotify(keys.spotify);  //Bring in the spotify and twitter keys
//var twitter = new Twitter(keys.twitter);
 

switch(instruction){
	case "my-tweets": //do stuff
	 // use twitter.consumer_key etc to build ajax call
	 //make ajax call
	 //get 20 tweets
	 //set variable result to response of ajax call 
// var params = {screen_name: 'billyBA1000'};
client.get('statuses/user_timeline', function(error, tweets, response) {
      if (!error) {
          for (var i=0; i<tweets.length; i++)
          {
              console.log(tweets[i].text);
          }      
      } else { console.log(error);}
    });

console.log(instruction);

	break;
	case 'movie-this' : //do stuff
			if (process.argv[3]) {
				var movieName = "";
				for (var i = 3; i < process.argv.length; i++) {
			 	 if (i > 2 && i < process.argv.length) {
			 	   movieName = movieName + " " + process.argv[i];
			 	 }
			 	 else {
			  	  movieName += process.argv[i];
			 	 }
			  }
			}
			else {
				movieName = "predator";
			}
			console.log(movieName);
			var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
			request(queryUrl, function(error, response, body) {
				if (!error && response.statusCode === 200) {
				var movie = JSON.parse(body);
				console.log(movie);
				console.log("title: " + movie.Title);
				console.log("Year: " + movie.Year);
				console.log("Rating: " + movie.Rated);
				console.log("RottenTomatoes: " + movie.Ratings[1].Value);
				console.log("Language: " + movie.Language);
				console.log("Actors: " + movie.Actors);
				console.log("Plot: " + movie.Plot);

				// console.log(body.);
				// result = body;
  				}	
  			});

	//make ajax call
	//read argv[3] or more for movie title search
	//set variable result to response of ajax call 
	break;
	case 'spotify-this-song' : //do stuff
	//read argv[3] or more for song title search
	// 

var songName = process.argv[3];
		if(!songName){
			songName = "Ace of Base";
		}
		params = songName;
		spotify.search({ type: "track", query: params }, function(err, data) {
			if(!err){
				var songInfo = data.tracks.items;
				for (var i = 0; i < 2; i++) {
					if (songInfo[i] != undefined) {
						var spotifyResults =
						"Artist: " + songInfo[i].artists[0].name + "\n" +
						"Song: " + songInfo[i].name + "\n" +
						"Album the song is from: " + songInfo[i].album.name + "\n" +
						"Preview Url: " + songInfo[i].preview_url + "\n" + 
						"--" + i + " --" + "\n";
						console.log(spotifyResults);
						
					}
				}
			}	else {
				console.log("Error :"+ err);
				return;
			}
		});

	break;
	case 'do-what-it-says': //do stuff
	//read argv[3] or more for what you tell it to do
	  fs.readFile("random.txt", "utf8", function(error, data) {
       console.log(data.indexOf("spotify"));
       // SPOTIFY//
      if (data.indexOf("spotify") > -1){

      		var test = data.substring(data.indexOf(',')+1, data.length);
      		console.log(test);
      		var songName = test;
		if(!songName){
			songName = "Ace of Base";
		}
		params = songName;
		spotify.search({ type: "track", query: params }, function(err, data) {
			if(!err){
				var songInfo = data.tracks.items;
				for (var i = 0; i < 2; i++) {
					if (songInfo[i] != undefined) {
						var spotifyResults =
						"Artist: " + songInfo[i].artists[0].name + "\n" +
						"Song: " + songInfo[i].name + "\n" +
						"Album the song is from: " + songInfo[i].album.name + "\n" +
						"Preview Url: " + songInfo[i].preview_url + "\n" + 
						"--" + i + " --" + "\n";
						console.log(spotifyResults);
						
					}
				}
			}	else {
				console.log("Error :"+ err);
				return;
			}
		});
	

      		// 
      		// 
      		// TWITTER//
      }else  if (data.indexOf("twitter")> -1){
      	client.get('statuses/user_timeline', function(error, tweets, response) {
      if (!error) {
          for (var i=0; i<tweets.length; i++)
          {
              console.log(tweets[i].text);
          }      
      } else { console.log(error);}
    });


      		// MOVIES//
      }else  if (data.indexOf("movie-this")> -1){

      	var test = data.substring(data.indexOf(',')+1, data.length);


      		if (test) {
				var movieName = test;
		
			}
			else {
				movieName = "predator";
			}
		
			var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
			request(queryUrl, function(error, response, body) {
				if (!error && response.statusCode === 200) {
				var movie = JSON.parse(body);
				console.log(movie);
				console.log("title: " + movie.Title);
				console.log("Year: " + movie.Year);
				console.log("Rating: " + movie.Rated);
				console.log("RottenTomatoes: " + movie.Ratings[1].Value);
				console.log("Language: " + movie.Language);
				console.log("Actors: " + movie.Actors);
				console.log("Plot: " + movie.Plot);

				// console.log(body.);
				// result = body;
  				}	
  			});


      } 
    });

	// break;
	// case default : //dafault choice or try again
	// break;



// console.log(result);

}
