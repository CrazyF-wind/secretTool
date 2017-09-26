var fs = require('fs');
var cryptoTool = require('./cryptoUtil.js')
// 引入readline模块
var readline = require('readline');
var rl = readline.createInterface(process.stdin, process.stdout);

console.log('----Welcome to the secretTool!----\n    1.add username\n    2.get password\n    3.show list');
console.log('Usage:[cmd] [options]')
console.log('   \033[33m get help info:help -a\033[39m')
rl.setPrompt('secretTool> ');
rl.prompt();

rl.on('line', function (line) {
    let command = line.substring(0, line.indexOf(' '))
    let options = line.substring(line.indexOf(' '), line.length)
    let userName, passWord
    switch (command.trim()) {
        case 'add':
            userName = line.substring(line.indexOf(' '), line.lastIndexOf(' '))
            passWord = line.substring(line.lastIndexOf(' '), line.length)
            addUserName(userName, passWord)
            break
        case 'get':
            userName = line.substring(line.indexOf(' '), line.length)
            getPassWord(userName)
            break
        case 'show':
            showList()
            break;
        case 'help':
            help()
            break
        case 'close':
            rl.close();
            break
        default:
            console.log('没有找到命令！');
            break
    }
    rl.prompt();
});

rl.on('close', function () {
    console.log('bye bye!');
    process.exit(0);
});

/**
 * 新增用户,存储密码
 */
function addUserName(name, password) {
    // 秘钥对
    var keyCode = 'key'
    cryptoTool.cipher('des', keyCode, password, function (encrypted) {
        if (encrypted === 'err') {
            console.log('add err')
        } else {
            var userInfo = {
                'name': name,
                'password': encrypted
            }
            // 写入成功后读取测试
            // 追加参数 { 'flag': 'a' }
            fs.writeFile('file/userInfo.json', JSON.stringify(userInfo), { 'flag': 'a' }, function (err) {
                if (err) {
                    throw err;
                }
            });
        }
    })
}

/**
 * 获取密码
 */
function getPassWord(userName) {
    // 秘钥对
    var keyCode = 'key'
    fs.readFile('file/userInfo.json', 'utf-8', function (err, data) {
        if (err) {
            throw err
        }
        var passWord = ''
        data = JSON.parse('[' + data.replace(/}{/g, '},{') + ']')
        data.forEach(function (val) {
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
    });
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

/**
 * 获取帮助
 */
function help() {
    console.log('   add user command:add Tom 123456')
    console.log('   get userInfo command:get Tom')
    console.log('   show list command:show -a')
    console.log('   close:close -a')
}
