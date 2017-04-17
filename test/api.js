var async = require('async');
var assert = require('assert');

var aurora_server = require('./../lib/gravity');

var IP = '10.11.0.101';
var PORT = 80;
var TIMEOUT = 500;

var aurora = new aurora_server(IP,PORT);
var pin = 0;

describe('test aurora', function() {
// CMD_SETCOLOR
//
// set color of all pixel
//
//	 	byte	| description
//	 	-------------------------------------------------
//			0	|	length low byte first	
//			1	|	length
//			2	|	CMD_SETPIXEL
//			3	|	port
//			4	|	color value red
//			5	|	color value green
//			6	|	color value blue
			
	describe('CMD_SETCOLOR', function() {
		describe('RED', function() {
			it('CMD_SETCOLOR', function(done){
				var color = new Buffer ([0xff,0x00,0x00]);
				aurora.setColor(color, pin, function(err){
					if(err){
						assert(err);
					}else{
						
					}
					setTimeout(function(){done();}, TIMEOUT);
				});
			});
		});
		describe('GREEN', function() {
			it('CMD_SETCOLOR', function(done){
				var color = new Buffer ([0x00,0xff,0x00]);
				aurora.setColor(color, pin, function(err){
					if(err){
						assert(err);
					}else{
						
					}
					setTimeout(function(){done();}, TIMEOUT);
				});
			});
		});
		describe('BLUE', function() {
			it('CMD_SETCOLOR', function(done){
				var color = new Buffer ([0x00,0x00,0xff]);
				aurora.setColor(color, pin, function(err){
					if(err){
						assert(err);
					}else{
						
					}
					setTimeout(function(){done();}, TIMEOUT);
				});
			});
		});
	});
});
