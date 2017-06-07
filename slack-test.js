const RapidAPI = require('rapidapi-connect');
const rapid = new RapidAPI("rapidapi-tutorial_5930670fe4b0eaefb644ce16", "99bde403-0d62-4088-b808-6d990e7babde");
var fs = require('fs');
var firstSpace = 0;
var len = 0;
var db = ['hello', 'I got your message', 'you did it!'];
var n = 1;

rapid.listen('Slack', 'slashCommand', { 
	'token': process.env.TOKEN,
	'command': process.env.CMD,
	'response': db
})
	.on('join', () => {
		 /* YOUR CODE GOES HERE */ 
	})
	.on('message', (message) => {
		console.log(message.text);
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
			} else if(res == 3){
				fs.readFile('note.txt', 'utf8', function read(err, data) {
					console.log(data);
				});
			}
		});
	})
	.on('error', (error) => {
		console.log(error);
	})
	.on('close', (reason) => {
		 /* YOUR CODE GOES HERE */ 
	});

function getNoteToPrint(cb){
	fs.readFile('note.txt', 'utf8', function read(err, data) {
		cb(data);
	});
}

function parseText(payload, cb) {
	firstSpace = payload.indexOf(' ');
	len = payload.length;
	var message = payload.substring(firstSpace+1, len);
	if(firstSpace == -1) {
		if(payload == 'print'){
			cb(3);
			console.log('printing');
		} else {
			cb('invalid use of command');
		}
	} else {
		if(payload.substring(0,firstSpace) == 'add'){
			cb(1);
			//console.log(message);
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
