var net = require('net');
var endpoints = [{ip:'127.0.0.1', port: '1313'},
                 {ip:'127.0.0.1', port: '1314'},
                 {ip:'127.0.0.1', port: '1315'},
                 {ip:'127.0.0.1', port: '1316'},
                 {ip:'127.0.0.1', port: '1317'}]


try{
	var server = [];
	const spawn = require('child_process').spawn;
	
	var task = [];
	
	function os_func() {
		
	    this.spawnCommand = function(cmd_line, callback) {
	    	const arr = cmd_line.split(' ');
	    	const cmd = arr[0];
	    	const opt = arr.slice(1);
	    	const child = spawn(cmd, opt);
	    	var ip = '';
	    	var port = '';
	    	for(var i=0; i<arr.length;i++){
	    		if(arr[i].match('-i') || arr[i].match('--ip')){
	    			ip = arr[i+1];
	    		}
	    		if(arr[i].match('-p') || arr[i].match('--port')){
	    			port = arr[i+1];
	    		}
	    	}
	    	
	    	child.stdout.on('data', function (data) {
		    	  console.log('stdout ' + ip +':'+ port +': ' + data.toString());
		    	});
		    
	    	child.stderr.on('data', function (data) {
		    	  console.log('stderr' + ip +':'+ port +': ' + data.toString());
		    	});
	    };
	}
	
	var os = new os_func();
	
//	os.spawnCommand('node '+__dirname + '/aurora_simulate.js -i 127.0.0.1 -p 1313');
//	os.spawnCommand('node '+__dirname + '/aurora_simulate.js -i 127.0.0.1 -p 1314');
//	os.spawnCommand('node '+__dirname + '/aurora_simulate.js -i 127.0.0.1 -p 1315');
	
	/* run simulated devices */
	for(var s=0;s<endpoints.length;s++){
		os.spawnCommand('node '+__dirname + '/aurora_simulate.js -i '+ endpoints[s].ip +' -p '+ endpoints[s].port);
		
	}
		
}catch(e){
	console.log('error: ', e);
}

process.on('uncaughtException', function(err){
	console.log('uncaughtException: ', err);
	for(var l=0; l<server.length; l++){
		console.log('close server: ', server[l].ip + ':'+ server[l].port)
		server[l].socket.close(); 
	}

});
process.on('SIGTEM', function(err){
	console.log('SIGTEM: ', err);
});

