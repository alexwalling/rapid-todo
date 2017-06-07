const RapidAPI = require('rapidapi-connect');
const rapid = new RapidAPI("rapidapi-tutorial_5930670fe4b0eaefb644ce16", "99bde403-0d62-4088-b808-6d990e7babde");

rapid.call('Twilio', 'sendSms', { 
	'accountSid': process.env.SID,
	'accountToken': process.env.TTOKEN,
	'from': process.env.PHONE,
	'messagingServiceSid': '',
	'to': 'process.env.MYPHONE',
	'body': 'testing my app',
	'statusCallback': '',
	'applicationSid': '',
	'maxPrice': '',
	'provideFeedback': ''

}).on('success', (payload)=>{
	console.log("success!");
}).on('error', (payload)=>{
	console.log("failed");
	console.log(payload);
});
