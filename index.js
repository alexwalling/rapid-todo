/* 
required packages
*/
const RapidAPI = require('rapidapi-connect');
const rapid = new RapidAPI("default-application_5947e9b9e4b023d4b55e2d4b", "d2494848-1781-4a42-b9d3-c378074cc993");
var dotenv = require('dotenv');
//import { ajax } from 'jquery';

const mongoose = require('mongoose');

/*
Connection to DB
*/
mongoose.connect('mongodb://admin:dway1994@ds123312.mlab.com:23312/rapid-todo');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){

});
var noteSchema = mongoose.Schema({
	name: String,
	content: String,
	isDone: false
});
var Note = mongoose.model('Note', noteSchema);

/*
loading dev environment for API keys
*/
dotenv.load();

/*
global variables
*/
var firstSpace = 0;
var ids = [];

/*
.listen for /command
*/
rapid.listen('Slack', 'slashCommand', { 
	'token': process.env.TOKEN,
	'command': process.env.CMD,
})
.on('join', () => {

})
.on('message', (message) => {
	var channel = message.channel_id;
	parseText(message.text, function(res) {
		if(res == 1){
			addToDatabase(message.text.substring(firstSpace+1, len)).then(res => printNote(channel));
		} else if(res == 2){
			//remove the line number
			console.log(ids);
			number = parseInt(message.text.substring(firstSpace+1, len));
			number -= 1;
			markAsDone(number).then(res => printNote(channel));
			
			

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

function markAsDone(number){
	return new Promise((resolve, reject) => {
		Note.findByIdAndUpdate(ids[number], {isDone:true}, function(err, result){
		    if(err){
		        console.log(err);
		    }
		    console.log("RESULT: " + result);
		});
		resolve('sucess');
	});
}

function addToDatabase(text){
	return new Promise((resolve, reject) => {
		var Note1 = new Note ({
			name: 'note4',
			content: text,
			isDone: false
		});
		Note1.save(function(err) {if(err) console.log('error on save')});
		resolve('sucess');
	});
}

/*
prints current todo list to the same channel that the slash command was called

variables:
	channel-name: either channel name or channel id
*/
function printNote(channel_name){
	getNoteToPrint().then((data) => {
		rapid.call('Slack', 'postMessage', { 
			'token': process.env.TOKEN2,
			'channel': channel_name,
			'text': data,
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
	});	
}	

/*
  Reads text file to display the current todo list. 
*/
function getNoteToPrint(){
	var res;

	var ret = '';
	return new Promise((resolve, reject) => {
		Note.find({}).exec(function(err, result) {
			if(!err){
				for(var key in result) {
					ids.push(result[key]._id);
					number = parseInt(key) + 1;
					if(result[key].isDone){
						ret += '~';
					}
					ret += number + ') ';
	    			ret += result[key].content;
	    			if(result[key].isDone){
		    			ret += '~';
	    			}
	    			ret += '\n';
				}
				resolve(ret);
			} else {
				reject('does not work');
			};
		});
	});
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
			} if(payload == 'remove'){
				cb(2);
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
			} else if(payload.substring(0,firstSpace) == 'remove'){
				cb(2);
			} else if(payload.substring(0,firstSpace) == 'print'){
				cb(3);
			}
		}	
	}
}

function removeLine(channel, number) {
	printNote(channel);
}