var net = require('net');
var async = require('async');
var assert = require('assert');
var AURORA = require('./../index');

var IP = '10.11.0.101';
var PORT = 80;

var color = {
	red: new Buffer ([0xff,0x00,0x00]),
	green:  new Buffer ([0x00,0xff,0x00]),
	blue: new Buffer ([0x00,0x00,0xff]),
	white: new Buffer ([0xff,0xff,0xff]),
	off:  new Buffer ([0x00,0x00,0x00])	
};

var argv = process.argv;
var pin = 0;
var opt_color = null;

for(var i=0; i<argv.length; i++){
	if(argv[i]==='-c' || argv[i] === '--color'){
		opt_color = argv[i+1]; 
	}
	if(argv[i]==='-i' || argv[i] === '--ip'){
		IP = argv[i+1];
	}
	if(argv[i]==='-p' || argv[i] === '--port'){
		PORT = argv[i+1];
	}
} 

if(!opt_color){ throw 'use option -c/--color to set a color';}
if(!color[opt_color]){throw 'use option color: ' + Object.keys(color);}

var aurora = new AURORA(IP, PORT);

console.log('set color: ', opt_color);
console.log('device: ', IP + ':' + PORT);
console.log('aurora: ', aurora);

aurora.setColor(color[opt_color], pin, function(err){
 if(!err){
	 // do something here
	 
	 return;
 }else{
 	console.log('err: ', err);
 }
});
