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

aurora.prototype.setColor = function (color, port, callback){
	var self  = this;
	var buf = new Buffer ([0x07,0x00, cmd.CMD_SETCOLOR,port,color[0],color[1],color[2]]); //CMD_SETCOLOR
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