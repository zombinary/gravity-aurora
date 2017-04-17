
gravity-aurora V0.0.3
============ 
  This Package use the aurora API to communicate with aurora server.
  gravity-aurora handle the communication to the server and makes
  the controlling of ws2812 pixel easier. 
  Use the module in your controller applicaion on Host side to
  create light effect for ws2812 pixel.

example
---------------------
```sh
var aurora_server = require('gravity-aurora');
var IP = '10.11.0.101';
var PORT = 80;

var color = new Buffer ([0xff,0x00,0x00]);

aurora.setColor(color, pin, function(err){
 if(!err){
 	// do something here
 	return;
 }else{
 	console.log('err: ', err);
 }
});
```

API
---------------------

**clearPixel**
Set all bytes of the internal 
pixel buffer from the aurora device to null;

param callback [in] callback function with err;

```sh
 aurora.clearPixel(callback);
```


**setColor**
Set the color of all pixel on pin.

param color    [in] Buffer with RGB value as HEX blue = [0x00,0x00,0xff]
param pin 	   [in] hardware pin from atmega
param callback [in] callback function with err;

```sh
 aurora.setColor(color, pin, callback);
```

**setPixel**
Set the color of an specific pixel

param color    [in] Buffer with RGB value as HEX blue = [0x00,0x00,0xff]
param pin 	   [in] hardware pin from atmega
param pos 	   [in] pixel position
param callback [in] callback function with err;

```sh
 aurora.setPixel(color, pin, pos, callback);
```

**setRange**
Set the color of an specific range of pixel

param color    [in] Buffer with RGB value as HEX blue = [0x00,0x00,0xff]
param pin 	   [in] hardware pin from atmega
param start	   [in] first pixel of range
param end 	   [in] last pixel of range
param callback [in] callback function with err;

```sh
 aurora.setRange(color, pin, pos, callback);
```
	
server for atmega328
---------------------

 * [aurora](https://github.com/zombinary/aurora)

getting started
---------------------

	* $ npm install
	* $ npm test



see Also:
---------------------

**Sphere** browser based GUI for the aurora server on atmel MCU's.
  The aplication sphere.js runs with nodejs and use the aurora API to
  controll pixel on ws2812 stripes.
  
 * [sphere](https://github.com/zombinary/sphere)


