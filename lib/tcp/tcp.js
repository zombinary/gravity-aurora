var util = require("util");
var net = require('net');
var events = require("events");
var log = require('./../debug/logging');
var config = require('../../config.json');

function TCP(ipAddress,port) {
   this.port = port;
   this.ipAddress = ipAddress;
   this.connected = false;
}
// wenn Hello Message gesendet wird dann wird der _start_timeout_timer() gestartet
// _cleanup_timers() aufruf bei disconnect oder  _on_message_received(messageChunk)
//
// this.timeout = 30000; // 30 seconds timeout
/*

* tcp.js
==========================
function _cleanup_timers() {

    const self = this;
    if (self._timerId) {
        clearTimeout(self._timerId);
        this._timerId = null;
    }
}

function _start_timeout_timer() {

    const self = this;
    assert(!self._timerId, "timer already started");
    self._timerId = setTimeout(function () {
        self._timerId =null;
        _fulfill_pending_promises.call(self, new Error("Timeout in waiting for data on socket ( timeout was = " + self.timeout + " ms )"));  // => self._the_callback
    }, self.timeout);

}

TCP_transport.prototype._install_one_time_message_receiver = function (callback) {

    const self = this;
    assert(!self._the_callback, "callback already set");
    assert(_.isFunction(callback));
    self._the_callback = callback;
    _start_timeout_timer.call(self);

};

* clientChannel.js
==========================
ClientTCP_transport.prototype._perform_HEL_ACK_transaction = function (callback) {

    const self = this;
    assert(self._socket);
    assert(_.isFunction(callback));

    let counter = 0;

    self._install_one_time_message_receiver(function on_ACK_response(err, data) {

        assert(counter === 0);
        counter += 1;

        if (err) {
            callback(err);
            self._socket.end();
           //Xx self._socket.removeAllListeners();

        } else {
            self._handle_ACK_response(data, function (inner_err) {
                callback(inner_err);
            });
        }
    });
    self._send_HELLO_request();
};

*/

TCP.prototype.connect = function(callback) {
  if (!this.connected) {
		log.debug(log.getLineNumber(), log.getFileName(), 'connect: ' + this.ipAddress+':'+this.port);
	  	   
	   var self = this;
       self.client = net.connect(self.port, self.ipAddress, function(err) {
       self._socketOpenAt = new Date().getTime();
  		 self.connected = true;
  		 callback(false);
        });
  	   
	   log.debug(log.getLineNumber(), log.getFileName(), 'connect: ' + self.ipAddress+':'+self.port);
	   self.status = "common.status.connected";
   
	   self.client.on('error', function (err) {
		   log.error(log.getLineNumber(), log.getFileName(), 'tcp: '+ err.toString());
		   if(err.code ==='EHOSTUNREACH'){
			   log.debug(log.getLineNumber(), log.getFileName(), 'rechableCount: '+ self.rechableCount);   
		   }   	   
	   });
	   self.client.on('end', function (err) {
		   log.debug(log.getLineNumber(), log.getFileName(), 'tcp: '+ 'end'); 
		   self.status = 'end';
	   });
	   self.client.on('data', function (data) {
		   log.debug(log.getLineNumber(), log.getFileName(), 'received: '+ data.toString('hex')); 
	   });
	   self.client.on('close', function() {
		   log.debug(log.getLineNumber(), log.getFileName(), 'socket close');
		   self.status = "common.status.disconnected";
	   });
	   
	//   callback(false);
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
  }else{
	  callback('not connected');
  }
};

TCP.prototype.disconnect = function(callback) {
   var self = this;
   if (this.connected) {
       this.connected = false;
     	   log.debug(log.getLineNumber(), log.getFileName(), 'disconnect: ' + self.ipAddress);
           //self.disconnect();
    	   //self.client.emit('close', function(){callback(false);});
     	   self.client.end();
 		   callback(false);
     }else{
	   callback('not connected');
   }
};

TCP.prototype.__defineGetter__("isConnected", function () {
    return this.connected;
});

module.exports.createClient = function(ipAddress, port) {
   var tcp_client = new TCP(ipAddress, port);
  return tcp_client;
};