/**
 * Created by dell on 2017/9/20.
 */
var fs = require('fs');
var cryptoTool = require('./cryptoUtil.js')
var stdin = process.stdin;
var stdout = process.stdout;

beginCommand()

function beginCommand() {
    console.log('----Welcome to the secretTool!----\n    1.add username\n    2.get password\n    3.show list');
    stdout.write(' \033[33m Enter number:　\033[39m');
    stdin.resume();
    stdin.setEncoding('utf8');
    stdin.on('data', function (data) {
        data = data.replace('\n', '')
        switch (Number(data)) {
            case 1:
                addUserName()
                break
            case 2:
                getPassWord()
                break
            case 3:
                showList()
                break
            default:
                stdin.pause();
                break
        }
    })
}

/**
 * 新增用户
 */
function addUserName() {
    stdout.write(' \033[33m Enter your userName:　\033[39m');
    stdin.resume();
    stdin.setEncoding('utf8');
    stdin.on('data', function (data) {
        data = data.replace('\n', '')
        console.log('data:' + data)
        // beginCommand()
        importKey(function (key) {
            addPassWord(data, key)
        })
    })
}

/**
 * key
 */
function importKey(cb) {
    stdout.write(' \033[33m Enter your key:　\033[39m');
    stdin.resume();
    stdin.setEncoding('utf8');
    stdin.on('data', function (data) {
        data = data.replace('\n', '')
        cb(data)
    })
}

/**
 * 存储密码
 */
function addPassWord(param, key) {
    stdout.write(' \033[33m Enter your passWord:　\033[39m');
    stdin.resume();
    stdin.setEncoding('utf8');
    stdin.on('data', function (data) {
        data = data.replace('\n', '')
        // 秘钥对
        var keyCode = key
        cryptoTool.cipher('des', keyCode, data, function (encrypted) {
            if (encrypted === 'err') {
                console.log('add err')
                stdin.pause();
            } else {
                var userInfo = {
                    'name': param,
                    'password': encrypted
                }
                console.log(userInfo)
                // 写入成功后读取测试
                fs.writeFile('file/userInfo.json', JSON.stringify(userInfo), { 'flag': 'a' }, function (err) {
                    if (err) {
                        throw err;
                    }
                    stdin.pause();
                });
            }
        })
    })
}

/**
 * 获取密码
 */
function getPassWord() {
    stdout.write(' \033[33m Enter your userName:　\033[39m');
    stdin.resume();
    stdin.setEncoding('utf8');
    stdin.on('data', function (userName) {
        userName = userName.replace('\n', '')
        importKey(function (key) {
            console.log('key:' + key)
            // 秘钥对
            var keyCode = key
            fs.readFile('file/userInfo.json', 'utf-8', function (err, data) {
                if (err) {
                    throw err
                }
                var passWord = ''
                data = JSON.parse('[' + data.replace(/}{/g, '},{') + ']')
                data.forEach(function (val, index) {
                    if (val['name'] === userName) {
                        passWord = val['password']
                        cryptoTool.decipher('des', keyCode, passWord, function (txt) {
                            if (txt === 'err') {
                                console.log('err')
                            } else {
                                // 写入成功后读取测试
                                console.log('password:' + txt)
                            }
                        })
                    }
                });
                stdin.pause()
            });
        })
    })
}

/**
 * 获取用户列表
 */
function showList() {
    fs.readFile('file/userInfo.json', 'utf-8', function (err, data) {
        if (err) {
            throw err;
        }
        data = JSON.parse('[' + data.replace(/}{/g, '},{') + ']')
        data.forEach(function (val, index) {
            console.log((index + 1) + '.name:' + val['name'] + ',password:' + val['password'])
        })
    })
}

