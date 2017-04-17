var async = require('async');
var assert = require('assert');

var aurora_server = require('./../lib/gravity');

var IP = '10.11.0.101';
var PORT = 80;
var TIMEOUT = 500;

var aurora = new aurora_server(IP,PORT);
var pin = 0;

describe('test aurora', function() {
	describe('CLEARPIXEL', function() {
		it('CMD_CLEARPIXEL', function(done){
			aurora.clearPixel(function(err){
				if(err){
					assert(err);
				}else{
					
				}
				setTimeout(function(){done();}, TIMEOUT);
			});
		});
	});
	describe('CMD_SETCOLOR', function() {
		describe('RED', function() {
			it('CMD_SETCOLOR', function(done){
				var color = new Buffer ([0xff,0x00,0x00]);
				var pin = 0x00;
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
				var pin = 0x00;
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
				var pin = 0x00;
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
	describe('CLEARPIXEL', function() {
		it('CMD_CLEARPIXEL', function(done){
			aurora.clearPixel(function(err){
				if(err){
					assert(err);
				}else{
					
				}
				setTimeout(function(){done();}, TIMEOUT);
			});
		});
	});
	describe('CMD_SETPIXEL', function() {
		describe('RED - pxl 3', function() {
			it('CMD_SETPIXEL', function(done){
				var color = new Buffer ([0xff,0x00,0x00]);
				var pos = 0x03;
				var pin = 0x00;
				
				aurora.setPixel(color, pin, pos, function(err){
					if(err){
						assert(err);
					}else{
						
					}
					setTimeout(function(){done();}, TIMEOUT);
				});
			});
		});
		describe('GREEN - pxl 4', function() {
			it('CMD_SETPIXEL', function(done){
				var color = new Buffer ([0x00,0xff,0x00]);
				var pos = 0x04;
				var pin = 0x00;
				
				aurora.setPixel(color, pin, pos, function(err){
					if(err){
						assert(err);
					}else{
						
					}
					setTimeout(function(){done();}, TIMEOUT);
				});
			});
		});
		describe('BLUE - pxl 5', function() {
			it('CMD_SETPIXEL', function(done){
				var color = new Buffer ([0x00,0x00,0xff]);
				var pos = 0x05;
				var pin = 0x00;
				
				aurora.setPixel(color, pin, pos, function(err){
					if(err){
						assert(err);
					}else{
						
					}
					setTimeout(function(){done();}, TIMEOUT);
				});
			});
		});
	});
	describe('CLEARPIXEL', function() {
		it('CMD_CLEARPIXEL', function(done){
			aurora.clearPixel(function(err){
				if(err){
					assert(err);
				}else{
					
				}
				setTimeout(function(){done();}, TIMEOUT);
			});
		});
	});
	describe('CMD_SETRANGE', function() {
		describe('RED - pxl 3 -12', function() {
			it('CMD_SETRANGE', function(done){
				var color = new Buffer ([0xff,0x00,0x00]);
				var start = 0x03;
				var end = 0x0c;
				var pin = 0x00;
				
				aurora.setRange(color, pin, start, end, function(err){
					if(err){
						assert(err);
					}else{
						
					}
					setTimeout(function(){done();}, TIMEOUT);
				});
			});
		});
		describe('GREEN - pxl 3 -12', function() {
			it('CMD_SETRANGE', function(done){
				var color = new Buffer ([0x00,0xff,0x00]);
				var start = 0x03;
				var end = 0x0c;
				var pin = 0x00;
				
				aurora.setRange(color, pin, start, end, function(err){
					if(err){
						assert(err);
					}else{
						
					}
					setTimeout(function(){done();}, TIMEOUT);
				});
			});
		});
		describe('BLUE - pxl 3 -12', function() {
			it('CMD_SETRANGE', function(done){
				var color = new Buffer ([0x00,0x00,0xff]);
				var start = 0x03;
				var end = 0x0c;
				var pin = 0x00;
				
				aurora.setRange(color, pin, start, end, function(err){
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
