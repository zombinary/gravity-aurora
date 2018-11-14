var tcp = require('./tcp/tcp');

function clientChannel(ip, port){
	  this.ip = ip;
	  this.port = port;
	  this.tcp = tcp.createClient(this.ip, this.port);
	  this.timeout = 1000 || config.general.timeout; 
	  this.reconnectTime = 3000 || config.general.reconnectTime;
	  this._socketOpenAt = null;
	  this._socket_close_timer_state = null;
	  this._socketLifeTime = 30000; //30sec.
	  this._clientCreate = new Date().getTime();
	  this._lastRequestId = 0;
	  this._request_data = {};
	  this._requestLifeTime = 600000; // TODO: vermutlich nicht das richtige, aber ich sollte maximal zeit X auf eine Antwort warten
	  
	  //TODO: schauen das in _request_data kein Buffer der TCP daten ist sondern direkt ins object gepumpt wird (schema)
	  
	}

	clientChannel.prototype.makeRequestId = function () {
	    this._lastRequestId += 1;
	    return this._lastRequestId;
	};

	clientChannel.prototype.connect = function(callback) {
		if(!this._socket_close_timer_state){
			return this.tcp.connect(callback);
		}else{callback(null);}
	}
	clientChannel.prototype.disconnect = function(callback) {
	  if(this._socket_close_timer_state){
		  return this.tcp.disconnect(callback);
	  };
	}

	clientChannel.prototype.send = function(data, callback) {
	  var self = this;
	  //console.log('this.tcp.isConnected: '.red.bold, this.tcp.isConnected); 
	  if(this.tcp.isConnected){
	  	//restart Timer
		clearTimeout(this._socket_close_timer_state);
		this._socket_close_timer_state = null; 
		this._socket_close_timer();
		this.tcp.send(data, function(err){
	      if(!err){
	         callback(null);
	      }else{
	        callback(err);
	      }
	      
	    });    
	  }else{
		  this.connect(function(err){
			  self._socket_close_timer();	
			  self.tcp.send(data, callback);
		  });
	  }
	}

	//clientChannel.prototype._send_request_data = function(requestId) {
	//  var self = this;
	//  console.log('this._request_data: '.red.bold, this._request_data);
	//  self.requestId = requestId;
	//
	//  for (var key of Object.keys(self._request_data)) {
//	    var item = self._request_data[key];
//	    console.log('self.requestId: '.green.bold, self.requestId);
//	    console.log('key: '.green.bold, key);
//	    if(self.requestId === key){
	// 
//	      self.tcp.send(item.requestData,item._callback);
//	      delete self._request_data[self.requestId];
//	      break;
//	    }
	//  }
	//  //found
	////  });
	//  return null;
	//};

	clientChannel.prototype._socket_close_timer = function() {
		if(!this._socket_close_timer_state){
		this._socket_close_timer_state = setTimeout(function(self){
	    console.log('TIMEOUT SOCKET CLOSE: ', self.tcp.ipAddress +':'+ self.tcp.port);
	    self.disconnect(function(err){
	      if(err){console.log('ERROR'.red.bold, err);}
	      clearTimeout(self._socket_close_timer_state);
	      self._socket_close_timer_state = null;
	    });
	  },this._socketLifeTime, this)
		};
	};

	module.exports = function(ipAddress, port) {
	  return new clientChannel(ipAddress, port);
	};