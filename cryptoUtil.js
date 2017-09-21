/**
 * 加解密算法
 */
var crypto = require('crypto')
    , fs = require('fs');

//加密
exports.cipher = function (algorithm, key, buf, cb) {
    try {
        var decrypted = "";
        var decipher = crypto.createDecipher(algorithm, key);
        decrypted += decipher.update(encrypted, 'hex', 'binary');
        decrypted += decipher.final('binary');
        cb(decrypted);
    } catch (err) {
        cb('err')
    }
}

//解密
exports.decipher = function (algorithm, key, encrypted, cb) {
    try {
        var decrypted = "";
        var decipher = crypto.createDecipher(algorithm, key);
        decrypted += decipher.update(encrypted, 'hex', 'binary');
        decrypted += decipher.final('binary');
        cb(decrypted);
    } catch (err) {
        cb('err')
    }

}