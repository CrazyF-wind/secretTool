
function command(param) {
    stdin.on('data', function (data) {
        data = data.replace('\n', '')
        switch (param) {
            case "1":
                stdout.write(' \033[33m Enter your userName:　\033[39m');
                stdin.resume();
                stdin.setEncoding('utf8');
                command('2')
                break
            case '2':
                fs.createWriteStream(data + '.txt')
                stdout.write(' \033[33m Enter your passWord:　\033[39m');
                stdin.resume();
                stdin.setEncoding('utf8');
                command('3')
                break
            case '3':
                console.log('3')
                var pem = fs.readFileSync('server.pem');
                var key = pem.toString('ascii');
                var hmac = crypto.createHmac('sha1', key);
                hmac.update('foo');
                hmac.digest('hex');
                break
            case '4':
                console.log('show the list')
                break
        }
    });
}