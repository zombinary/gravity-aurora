var net = require('net');

var IP = '127.0.0.1';
var PORT = '1313';

var argv = process.argv;
var pin = 0;
var opt_color = null;

for(var i=0; i<argv.length; i++){
	if(argv[i]==='-i' || argv[i] === '--ip'){
		IP = argv[i+1];
	}
	if(argv[i]==='-p' || argv[i] === '--port'){
		PORT = argv[i+1];
	}
} 

var server = net.createServer(function(socket) {
	//socket.pipe(socket);
	
	socket.on('data', function(data) {
		var buf = null;
		console.log('data: ' + data.toString('hex'));
		if(data.toString('hex') === '090013000003ff0000'){
			buf = new Buffer([0x05,0x00,0x13,0x03,0x00]);
		}else if(data.toString('hex') === '07001503ff0000'){
		   buf = new Buffer([0x05,0x00,0x15,0x03,0x00]);
		}
		if(buf){
			socket.write(buf);
		}else{
			socket.write(data);
		}
	});

	socket.on('error', function(err) {
		console.log('error: ' + err);
	});
//	socket.on('end', function(err) {
//		  console.log('disconnected from client');
//		  process.exit();
//	});
});

console.log('aurora simulate: \n');
console.log('\t ip: ', PORT);
console.log('\t port: ', IP );

server.listen(PORT, IP);
server.close();
