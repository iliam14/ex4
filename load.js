/**
 * Created by Ilia and Liad
 */

var miniExpress = require('./miniExpress.js');
var http = require('http');
var port = 8675;
var app = miniExpress();

console.log('mounting at '+__dirname+'\\www');
app.use('/', miniExpress.static(__dirname+'\\www'));
app.listen(port);

var net = require('net');
var MaxClients = 5;
var MaxRequsts = 20;

var req = 'GET /a.html HTTP/1.1 \r\n' +
    'Connection: close \r\n\r\n';

var count = MaxClients * MaxRequsts;


var getRes = function(res) {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('binary');
    res.on('data', function (chunk) {
        console.log('BODY: ' + chunk.length);
    });

    res.on('end', function () {
        console.log('connection ended.');
    });
}



for(var client = 0; client < MaxClients; client++ ){
    for (var reqN = 0 ; reqN < MaxRequsts; reqN++){
        http.request({
            hostname: 'localhost',
            port: port,
            method: 'GET'
        },getRes).end();
        count--;
        console.log('sent new req');
    }


}

function killer()
{
    console.log('killer run ' + count);
    if(count == 0){
        app.close();
        console.log('app killed');
    }
    else
        setTimeout(killer, 2000);

}

setTimeout(killer,2000);
