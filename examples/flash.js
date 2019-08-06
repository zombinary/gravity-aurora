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
const TIMEMS = 100;

var aurora = new AURORA(IP, PORT);
var offset = 0;
const pixelData = new Uint32Array(NUMLEDS);
//var blue = new Buffer([0x00,0x00,0x80]);
//var white = new Buffer([0x00,0x00,0x00]);


console.log('Press <ctrl>+C to exit.');

//aurora.setColor(blue, PIN, function(err,resp){
//	if(err){console.log('error: ', err);}
//});
var int = flash(0x000080,0x008000, 3, NUMLEDS);

process.on('SIGINT', function () {
  console.log('close!!!');
  clearInterval(int);
  process.nextTick(function () { process.exit(0); });
});
// =================================================================

function flash(color1, color2, range, leds){
	var arr = [];
	for(var i=0; i<leds+(2*range); i++){
		if(i<range){ 
			arr[i] = color2;
		}else{
			arr[i] = color1;	
		}
		
	}
	console.log('arr: ', JSON.stringify(arr));
	
	aurora.setColor(color1, PIN, function(err,resp){
		if(err){console.log('error: ', err);}
	});
	
	return setInterval(function(){
		arr = rotate(arr);
		console.log('arr: ', JSON.stringify(arr));
		writeflash(arr, range);
		
	}, 1000);

}

function writeflash(arr,range){
	var tasks = [];
	
	for(var i=range;i<arr.length-range; i++){
		tasks.push(function(p,r){
			var pxl = new Buffer([0x00,0x00,0x00]);
		    pxl[2] = p & 0xff; 
			pxl[1] = p >> 8 & 0xff;
			pxl[0] = p >> 16 & 0xff;
			
			return new Promise (function(reject, resolve){
				console.log('pxl: ', pxl);
				aurora.setPixel(pxl, PIN, r, function(err,resp){
					if(err){console.log('error: ', err);}
				});		
			});
		});
	}
	
	var t = 0;
	setInterval(function(){
		tasks[t](arr[t+range],t);
		t++;
		if(t>=tasks.length-1){clearInterval(this);}
	}, 2);
};

// flash
function rotate(arr){
	var newarr = [];
	newarr[0] = arr[arr.length-1];
	for(var x=0, y=1;x<arr.length-1;x++,y++){
		newarr[y]= arr[x];
	}
	return newarr;
};

// rainbow-colors, taken from http://goo.gl/Cs3H0v
//function colorwheel(pos) {
//  pos = 255 - pos;
//  if (pos < 85) { return rgb2Int(255 - pos * 3, 0, pos * 3); }
//  else if (pos < 170) { pos -= 85; return rgb2Int(0, pos * 3, 255 - pos * 3); }
//  else { pos -= 170; return rgb2Int(pos * 3, 255 - pos * 3, 0); }
//}

//function rgb2Int(r, g, b) {
//  return ((r & 0xff) << 16) + ((g & 0xff) << 8) + (b & 0xff);
//}