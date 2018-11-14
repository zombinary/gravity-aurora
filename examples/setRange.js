var async = require('async');
var assert = require('assert');

var aurora_server = require('./../lib/gravity');

var IP = '10.11.0.101';
var PORT = 80;
var TIMEOUT = 500;

var aurora = new aurora_server(IP,PORT);
var pin = 0;

aurora.clearPixel(function(err){
	if(!err){
		var color = new Buffer ([0xff,0x00,0x00]);
		var pin = 0x00;
		aurora.setColor(color, pin, function(err){
			if(!err){
				var color = new Buffer ([0x00,0xff,0x00]);
				var start = 0x03;
				var end = 0x0c;
				var pin = 0x00;
				
				aurora.setRange(color, pin, start, end, function(err){
					if(!err){}else{}
				});
			}else{
				
			}	
		});
	}else{
		
	}
});