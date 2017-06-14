/* 
required packages
*/
const RapidAPI = require('rapidapi-connect');
const rapid = new RapidAPI("rapidapi-tutorial_5930670fe4b0eaefb644ce16", "99bde403-0d62-4088-b808-6d990e7babde");
var fs = require('fs');
var dotenv = require('dotenv');
var Promise = require('promise');

/*
loading dev environment for API keys
*/
dotenv.load();

/*
global variables
*/
var firstSpace = 0;
var n = 1;
var db = ['1) hello', '2) new phone', '3) who dis'];

/*
.listen for /command
*/
rapid.listen('Slack', 'slashCommand', { 
	'token': process.env.TOKEN,
	'command': process.env.CMD,
	'response': 'processing'
})
	.on('join', () => {

	})
	.on('message', (message) => {
		var channel = message.channel_id;
		// calls printNote to init slackbot to post current todo list in the same channel.


		//Logging to note txt -----------------------------------------------------------------------------------
		parseText(message.text, function(res) {
			console.log(res);
			if(res == 1){
				fs.appendFile('note.txt', n +') ' + message.text.substring(firstSpace+1, len) + '\n', function(err) {
					if (err) throw err;
  					console.log('Saved!');
  					n++;
				});

			} else if(res == 2){
				//remove the line number

				removeLine(channel);
				//.then(sampleFunction());
				//remove line 
				//return new Promise()

			} else if(res == 3){
				printNote(channel);
			}
		});
	})
	.on('error', (error) => {
		console.log(error);
	})
	.on('close', (reason) => {

	});

/*
prints current todo list to the same channel that the slash command was called

variables:
	channel-name: either channel name or channel id
*/
function printNote(channel_name){
	rapid.call('Slack', 'postMessage', { 
		'token': process.env.TOKEN2,
		'channel': channel_name,
		'text': getNoteToPrint(),
		'parse': '',
		'linkNames': '',
		'attachments': '',
		'unfurlLinks': '',
		'unfurlMedia': '',
		'username': 'Rapid Todo List',
		'asUser': '',
		'iconUrl': '',
		'iconEmoji': ':raised_hands:'

	}).on('success', (payload)=>{

	}).on('error', (payload)=>{

	});
}	

/*
reads text file to display the current todo list. 
*/
function getNoteToPrint(){
	var res;
	/*
	fs.readFile('note.txt', 'utf8', function read(err, data) {
		console.log(typeof data);
		res = data;
	});
	console.log(res);
	return 'hello';
	*/

	//var text = fs.readFileSync('note.txt','utf8');
	var text = db.join('\n');
	console.log(text);
	return text;
}

/*
parses the slash command to decide what to do

variables
	payload: includes the message to be parsed.
	cb: callback to return information
*/
function parseText(payload, cb) {
	if(payload != undefined){
		firstSpace = payload.indexOf(' ');
		len = payload.length;
		var message = payload.substring(firstSpace+1, len);
		if(firstSpace == -1) {
			if(payload == 'print'){
				cb(3);
				console.log('printing');
			} if(payload == 'remove'){
				cb(2);
				console.log('removing');
			} else {
				cb('invalid use of command');
			}
		} else {
			/*
			conditions
				1: add
				2: remove
				3: print
			*/
			if(payload.substring(0,firstSpace) == 'add'){
				cb(1);
				console.log('adding')
			} else if(payload.substring(0,firstSpace) == 'remove'){
				cb(2);
				console.log('removing');
			} else if(payload.substring(0,firstSpace) == 'print'){
				cb(3);
				console.log('printing');
			}
		}	
	}
}

function removeLine(channel) {
	/*
	fs.readFileSync('note.txt', 'utf8', function(err, data) {
    	if (err) {
    		console.log(err);
    	}
    	var linesExceptFirst = data.split('\n').slice(2).join('\n');
    	console.log('line ' + linesExceptFirst);
    	fs.writeFileSync('note.txt', linesExceptFirst);
	});
	*/
	db.splice(0, 1);
	printNote(channel);
}