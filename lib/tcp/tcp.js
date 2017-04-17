var util = require("util");
var net = require('net');
var events = require("events");
var log = require('./../debug/logging');
var config = require('../../config.json');

function TCP(ipAddress,port) {
   this.port = port||config.light.port;
   this.ipAddress = ipAddress;
   this.connected = false;
   this.reconnectTime = 3000 || config.general.reconnectTime;
   this.rechableCount = null || config.general.rechableCount;
   events.EventEmitter.call(this);
}
//util.inherits(TCP, events.EventEmitter);

TCP.prototype.connect = function(callback) {
   if (!this.connected) {
  	   var self = this;
       //options = options||{};
       //self.options = options;
       //self.options.keepalive = options.keepalive||15;
       
  	   log.debug(log.getLineNumber(), log.getFileName(), 'connect: ' + this.ipAddress+':'+this.port);
        self.client = net.connect(self.port, self.ipAddress, function(err) {
    	   self.connected = true;
    	   log.debug(log.getLineNumber(), log.getFileName(), 'connect: ' + self.ipAddress+':'+self.port);
    	   self.status = "common.status.connected";
 //   	   callback(false);
       
       self.client.on('error', function (err) {
    	   log.error(log.getLineNumber(), log.getFileName(), 'tcp: '+ err.toString());
    	   if(err.code ==='EHOSTUNREACH'){
    		   --self.rechableCount;
    		   log.debug(log.getLineNumber(), log.getFileName(), 'rechableCount: '+ self.rechableCount);   
    	   }
//    	   callback(err);
        	   
       });
       self.client.on('end', function (err) {
    	   log.debug(log.getLineNumber(), log.getFileName(), 'tcp: '+ 'end'); 
    	   self.status = 'end';
    	   self.connected = false;
       });
       self.client.on('data', function (data) {
    	   log.debug(log.getLineNumber(), log.getFileName(), 'received: '+ data.toString('hex')); 
    	 });
       self.client.on('close', function() {
    	   log.debug(log.getLineNumber(), log.getFileName(), 'socket close');
    	   self.status = "common.status.disconnected";
    	   self.connected = false;
    	   //self.client.destroy();
    	   //console.log(self.rechableCount);
           //if(self.rechableCount){
           //     setTimeout(self.connect(function(){
           //    	return;
           //     }),config.reconnectTime);
           // }else {
           //  //log.error(log.getLineNumber(), log.getFileName(), 'start reconnectInterval: ' + self.ipAddress);
           //   //self.rechableCount = config.general.rechableCount;
           //  //Todo: setInterval config.reconnectInervalTime
           //}
       });
       callback(false);
        });
       
   }else{
	   callback('error: is connected');
   }
};

TCP.prototype.send = function(data, callback) {

  var self = this;
  if (self.connected) {
  	log.debug(log.getLineNumber(), log.getFileName(), 'send: ' + data.toString('hex'));
  	self.client.write(data, function(err){
  		callback(err);
  	});
  }
  return;
};

TCP.prototype.disconnect = function(callback) {
   var self = this;
   if (this.connected) {
       this.connected = false;
       try {
    	   log.debug(log.getLineNumber(), log.getFileName(), 'disconnect: ' + self.ipAddress);
           //self.disconnect();
    	   //self.client.emit('close', function(){callback(false);});
    	   callback(false);
       } catch(err) {
    	   callback(err);
       }
   }
   return;
};

TCP.prototype.isConnected = function() {
    return this.connected;
};

module.exports.createClient = function(ipAddress, port) {
   var tcp_client = new TCP(ipAddress, port);
  return tcp_client;
};
