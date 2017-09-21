/**
 * Created by dell on 2017/9/20.
 */
var fs = require('fs');
var cryptoTool = require('./cryptoUtil.js')
var stdin = process.stdin;
var stdout = process.stdout;

console.log('----Welcome to the secretTool!----\n    1.add username\n    2.get password\n    3.userList');
stdout.write(' \033[33m Enter your command:　\033[39m');
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

/**
 * 新增用户
 */
function addUserName() {
    stdout.write(' \033[33m Enter your userName:　\033[39m');
    stdin.resume();
    stdin.setEncoding('utf8');
    stdin.on('data', function (data) {
        data = data.replace('\n', '')
        fs.createWriteStream('file/' + data + '.txt')
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
    stdin.setEncoding('utf8');
    stdin.on('data', function (data) {
        data = data.replace('\n', '')
        // 秘钥对
        var keyCode = key
        cryptoTool.cipher('des', keyCode, data, function (encrypted) {
            // 写入成功后读取测试
            fs.writeFile('file/' + param + '.txt', encrypted, function (err) {
                if (err) {
                    throw err;
                }
                stdin.pause();
            });
        })
    })
}

/**
 * 获取密码
 */
function getPassWord() {
    stdout.write(' \033[33m Enter your userName:　\033[39m');
    // stdin.resume();
    stdin.setEncoding('utf8');
    stdin.on('data', function (data) {
        data = data.replace('\n', '')
        stdin.pause()
        importKey(function (key) {
            // 秘钥对
            var keyCode = key
            fs.readFile('file/' + data + '.txt', 'utf-8', function (err, data) {
                if (err) {
                    throw err;
                }
                cryptoTool.decipher('des', keyCode, data, function (txt) {
                    if (txt === 'err') {
                        console.log('err')
                    } else {
                        // 写入成功后读取测试
                        console.log(txt)
                    }
                })
            });
        })
    })
}

/**
 * 获取用户列表
 */
function showList() {

}

