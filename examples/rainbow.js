var async = require('async');
var assert = require('assert');
var AURORA = require('./../index');
//var Promise = require('promise');
////promise see also
////https://stackoverflow.com/questions/33289726/combination-of-async-function-await-settimeout
 
const NUM_LEDS = 16;
const IP = '10.11.0.101';
const PORT = 80;
const PIN = 0;
const TIMEMS = 2;

var aurora = new AURORA(IP, PORT);
var offset = 0;
const pixelData = new Uint32Array(NUM_LEDS);

function nextRainbow(){
  for (var i = 0; i < NUM_LEDS; i++) {
    pixelData[i] = colorwheel((offset + i) % 256);
  }
  offset = (offset + 1) % 256;
  return pixelData;
}; 

var pxl = nextRainbow();
var indx = 0;
setInterval(function(){
	if(indx>=NUM_LEDS){indx = 0; pxl = nextRainbow();}
	var buf = new Buffer([0x00,0x00,0x00]);
	
	buf[2] = (pxl[indx] & 0xff0000) >> 16; // b
	buf[1] = (pxl[indx] & 0x00ff00) >> 8; // g
	buf[0] = pxl[indx] & 0x0000ff; // r
		aurora.setPixel(buf, PIN , indx++,function (err, res) {
			if(err){console.log('error: ', err);}
		});
	
}, TIMEMS);


console.log('Press <ctrl>+C to exit.');
process.on('SIGINT', function () {
  console.log('close!!!');
  process.nextTick(function () { process.exit(0); });
});

// rainbow-colors, taken from http://goo.gl/Cs3H0v
function colorwheel(pos) {
  pos = 255 - pos;
  if (pos < 85) { return rgb2Int(255 - pos * 3, 0, pos * 3); }
  else if (pos < 170) { pos -= 85; return rgb2Int(0, pos * 3, 255 - pos * 3); }
  else { pos -= 170; return rgb2Int(pos * 3, 255 - pos * 3, 0); }
}

function rgb2Int(r, g, b) {
  return ((r & 0xff) << 16) + ((g & 0xff) << 8) + (b & 0xff);
}