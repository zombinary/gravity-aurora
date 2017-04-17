var aurora = require('./lib/gravity');

module.exports = function(ipAddress, port){
	return new aurora(ipAddress, port);
}
