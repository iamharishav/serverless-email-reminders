'use strict';

var AWS = require("aws-sdk");
AWS.config.update({region: "eu-west-1"});
var ses = new AWS.SES();
var fs = require("fs");

module.exports.sendRemainderDaily = (event, context, callback) => {
	try { 
	  	var emailHTML = fs.readFileSync("./dailyReminder.html", "utf-8");
  		var toAndFromAddress = "administrator@domain.com";
	  	var params = {
						  	Destination: {
						  		ToAddresses: [toAndFromAddress]
						  	},
						  	Message: {
						  		Body: {
						  			Html: {
						  				Charset: "utf-8",
						  				Data: emailHTML
						  			},
						  			Text: {
						  				Charset: "utf-8",
						  				Data: "A daily reminder email from SES"
						  			}
						  		},
						  		Subject: {
						  			Charset: "utf-8",
						  			Data: "A daily reminder email from SES"
						  		}
						  	},
						  	ReplyToAddresses: [toAndFromAddress],
						  	Source: toAndFromAddress
						};
	
		ses.sendEmail(params, function(err, data){
			if(err){
				console.log(err);
			}else{
				console.log("Daily email reminder has been sent.")
				callback(null, data);
			}
		});

	} catch (err){
		console.log(err);
	}
};

module.exports.sendReminderWeekend = (event, context, callback) => {
	try { 
	  	var emailHTML = fs.readFileSync("./weeklyReminder.html", "utf-8");
	  	var toAndFromAddress = "administrator@domain.com";
	  	var params = {
						  	Destination: {
						  		ToAddresses: [toAndFromAddress]
						  	},
						  	Message: {
						  		Body: {
						  			Html: {
						  				Charset: "utf-8",
						  				Data: emailHTML
						  			},
						  			Text: {
						  				Charset: "utf-8",
						  				Data: "A weekly reminder email from SES"
						  			}
						  		},
						  		Subject: {
						  			Charset: "utf-8",
						  			Data: "A weekly reminder email from SES"
						  		}
						  	},
						  	ReplyToAddresses: [toAndFromAddress],
						  	Source: toAndFromAddress
						};
		
		ses.sendEmail(params, function(err, data){
			if(err){
				console.log(err);
			}else{
				console.log("Weekly email reminder has been sent.")
				callback(null, data);
			}
		});
	} catch (err){
		console.log(err);
	}
};
