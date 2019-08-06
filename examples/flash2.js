var async = require('async');
var assert = require('assert');
var AURORA = require('./../index');
//var Promise = require('promise');
////promise see also
////https://stackoverflow.com/questions/33289726/combination-of-async-function-await-settimeout
 
const NUMLEDS = 15;
const IP = '10.11.0.101';
const PORT = 80;
const PIN = 0;
const TIMEMS = 50;

var aurora = new AURORA(IP, PORT);
var offset = 0;
const pixelData = new Uint32Array(NUMLEDS);
var blue = new Buffer([0x00,0x00,0x80]);
var white = new Buffer([0x80,0x80,0x80]);
var range = 7;

console.log('Press <ctrl>+C to exit.');

//aurora.setColor(blue, PIN, function(err,resp){
//	if(err){console.log('error: ', err);}
//});
var int = flash(blue,white, range, NUMLEDS);
process.on('SIGINT', function () {
  console.log('close!!!');
  clearInterval(int);
  process.nextTick(function () { process.exit(0); });
});
// =================================================================

function flash(color1, color2, range,leds){
	aurora.setColor(color1, PIN, function(err,resp){
		if(err){console.log('err: ', err);}
	});
	var offset = 0;
	return setInterval(function(){
	if(offset>=leds+range){offset = 0};
	if(offset<range){
		//first write pixel only
		aurora.setPixel(color2, PIN, offset,function(err,resp){
			if(err){console.log('err: ', err);}
		});
	}else if(offset>=leds){
		//delete
		aurora.setPixel(color1, PIN, offset-range,function(err,resp){
			if(err){console.log('err: ', err);}
		});
	}else{
		// move flash
		// delete first pixel
		aurora.setPixel(color1, PIN, offset-range,function(err,resp){
			if(err){console.log('err: ', err);}
			// set new pixel on the end
			aurora.setPixel(color2, PIN, offset-1,function(err,resp){
				if(err){console.log('err: ', err);}
			});
		});	
	}
	offset++
		
	}, TIMEMS);

}

