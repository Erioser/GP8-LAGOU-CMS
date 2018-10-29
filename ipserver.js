
// 获取用户ip地址
const http = require('http')

http.createServer((req, res) => {

    console.log(getClientIp(req))

    res.end('ok')
}).listen(1234)

function getClientIp(req) {
    return req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;
};