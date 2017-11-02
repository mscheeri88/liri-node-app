var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require("request");
var fs = require("fs");
var command = process.argv[2]; //command for entering commands
var arg2 = process.argv[3];

function liri(command, arg2) {

	switch (command) {
		case "my-tweets":
			var client = new Twitter({ //new instance of Twitter called client
				consumer_key: 'M5nfqgLahHFhA4idz676nCXlN',
				consumer_secret: 'MoWxdZzjHP26Xl6InApPTjgFIFIcXizhfuOuMASdqHw3sBpZK5',
				access_token_key: '81716094-a2rougLIJwsxxYBhOZYRaOJ7uaiMqMQho4yLJCOtO',
				access_token_secret: 'avCb4FWZtn1AQD42Tzt2PeX83OIKVb646AgN7AqMfObsO',
			});
			var params = {
				screen_name: 'youngcurrency'
			};
			client.get('statuses/user_timeline', function(error, tweets, response) {
				if (error) throw error;
				for (var i = 0; i < 5; i++) {
					console.log("Tweet " + i + ": " + tweets[i].text); // The favorites. 
				};
			});
			break;
			//--------------------------------------------//
		case "spotify-this-song":
			var spotify = new Spotify({ //spotify is a class containing functions and variables.  Then creat an instance with 'spotify' lowercase and I want to use that code for that instance
				id: '8b9b268d5fe843f487eeed2ae7033669',
				secret: 'dce4b6b88d2e4c5bbb8c8993bec66a56'
			});
			spotify.search({
				type: 'track',
				query: arg2
			}, function(err, data) {
				if (err) {
					return console.log('Error occurred: ' + err);
				}
				console.log(data.tracks.items[0].album.artists[0].name);
				console.log(data.tracks.items[0].album.artists[0].href);
				console.log(data.tracks.items[0].name);
			});
			break;
			//-------------------------------------------------//
		case "movie-this":
			// Then run a request to the OMDB API with the movie specified
			request("http://www.omdbapi.com/?t=" + arg2 + "&apikey=40e9cece", function(error, response, body) {
				// If the request is successful (i.e. if the response status code is 200)
				if (!error && response.statusCode === 200) {
					// Parse the body of the site and recover just the imdbRating
					// (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
					console.log("Title: " + arg2);
					console.log("Released: " + JSON.parse(body).Released);
					console.log("imdb Rating: " + JSON.parse(body).imdbRating);
					console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
					console.log("Country: " + JSON.parse(body).Country);
					console.log("Plot: " + JSON.parse(body).Plot);
					console.log("Actors: " + JSON.parse(body).Actors);
					//console.log( JSON.parse(body) );   
				}
			});
			break;
			//------------------------------------------------//
		case "do-what-it-says":
			// This block of code will read from the "random.txt" file.
			// It's important to include the "utf8" parameter or the code will provide stream data (garbage)
			// The code will store the contents of the reading inside the variable "data"
			fs.readFile("random.txt", "utf8", function(error, data) {
				// If the code experiences any errors it will log the error to the console.
				if (error) {
					return console.log(error);
				}
				console.log("$ node liri.js " + data);
        
        		liri();
				// Then split it by commas (to make it more readable)
				//var dataArr = data.split(",");
				// We will then re-display the content as an array for later use.
				//console.log(dataArr);
			});
	}
}
liri(command, arg2);