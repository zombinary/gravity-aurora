var tcp = require('./tcp/tcp');	
var cmd = require('./cmd');	
	
function aurora(ip, port) {
  this.ip = ip;
  this.port = port;
  this.color = null;
  this.brightness = null;
  this.client = tcp.createClient(this.ip, this.port);
  this.isConnected = null;
}

aurora.prototype.clearPixel = function (callback){
	var self  = this;
	var buf = new Buffer ([0x03,0x00, cmd.CMD_CLEARPIXEL]);
	self.client.connect(function(){
		self.client.send(buf, function(){
			self.client.disconnect(callback);
		});	
	});	
};	

aurora.prototype.setColor = function (color, pin, callback){
	var self  = this;
	var buf = new Buffer ([0x07,0x00, cmd.CMD_SETCOLOR,pin,color[0],color[1],color[2]]);
	self.client.connect(function(){
		self.client.send(buf, function(){
			self.client.disconnect(callback);
		});	
	});
};

aurora.prototype.setPixel = function (color, pin , pos, callback){
	var self  = this;
	var lb = pos & 0xff;
	var hb = (pos >> 8) & 0xff;
	
	var buf = new Buffer ([0x08,0x00, cmd.CMD_SETPIXEL, pin, lb, hb, color[0], color[1], color[2]]);
	self.client.connect(function(){
		self.client.send(buf, function(){
			self.client.disconnect(callback);
		});	
	});	
};	

aurora.prototype.setRange = function (color, pin, start, end, callback){
	var self  = this;
	var lbs = start & 0xff;
	var hbs = (start >> 8) & 0xff;
	var lbe = end & 0xff;
	var hbe = (end >> 8) & 0xff;
	
	
	var buf = new Buffer ([0x0a,0x00, cmd.CMD_SETRANGE, pin, lbs, hbs, lbe, hbe, color[0], color[1], color[2]]); //CMD_SETCOLOR
	self.client.connect(function(){
		self.client.send(buf, function(){
			self.client.disconnect(callback);
		});	
	});	
};	

module.exports = function(ipAddress, port) {
	var aurora_server = new aurora(ipAddress, port);
	return aurora_server;
};