var fs = require('fs');
var crypto = require('crypto');
var pem = fs.readFileSync('server.pem');
var key = pem.toString('ascii');
var hmac = crypto.createHmac('sha1', key);
hmac.update('foo');
// hmac.digest('hex');
// console.log(hmac)
console.log(hmac.digest('hex'))
 