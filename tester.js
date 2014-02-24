/**
 * Created by Ilia and Liad
 */
var net = require('net');
var miniExpress = require("./miniExpress");

var app  = miniExpress();
app.use('/static',miniExpress.static(__dirname + '/static'));
app.get('/nice',miniExpress.static(__dirname));

app.use('/cook',miniExpress.cookieParser());

app.use('/cook',function(req,res) {
    res.set('Content-Type','text/plain');
    console.log("on secound function");
//    console.log(req.cookies);
//    console.log("name is");
//    console.log(req.cookies.name);
    var data = "the cookie name should be value and is " + req.cookies.name;
    res.set('Content-Length',data.length.toString());
    res.send(200,data);
});


app.use('/jsonjson',miniExpress.json());

app.use('/jsonjson',function(req,res) {
    res.set('Content-Type','text/plain');
//    console.log("on secound function");
//    console.log(req.cookies);
//    console.log("name is");
//    console.log(req.cookies.name);
    var data = "the json is object count should be 1 and is " + req.body.count;
    res.set('Content-Length',data.length.toString());
    res.send(200,data);
});


app.use('/uncor',miniExpress.urlencoded());


app.use('/uncor',function(req,res) {
    res.set('Content-Type','text/plain');
//    console.log("on secound function");
//    console.log(req.cookies);
//    console.log("name is");
//    console.log(req.cookies.name);
    var data = "the  urlencoded is object name should be param and is " + req.body.name;
    res.set('Content-Length',data.length.toString());
    res.send(200,data);
});


app.listen(8870);



var test1 = net.connect(8870, 'localhost', function()
{

    setTimeout(function()
    {
        console.log('first test read a single textfile:\n');
        console.log('get a simple textfile:\n');
        test1.write('GET /nice/hi.txt?order=desc&shoe[color]=blue&shoe[type]=converse+white HTTP/1.1\r\n'+'Connection: keep-alive\r\n'+'Content-Type: text/html \r\n'+
            'Content-Length: 0\r\n' +'Host: localhost' + '\r\n\r\n');
    },100);

});

test1.on('data', function(data)
{
    console.log('first answer should be how are you');
    console.log(data.toString());
});


var test2 = net.connect(8870, 'localhost', function()
{

    setTimeout(function()
    {
        console.log('secound test test read a single textfile from a not allowed place:\n');
        console.log('get a simple textfile:\n');
        test2.write('GET /nice12/hi.txt HTTP/1.1\r\n'+'Connection: keep-alive\r\n'+'Content-Type: text/html \r\n'+'Content-Length: 0\r\n\r\n');
    },120);

});

test2.on('data', function(data)
{
    console.log('second answer should be file not found');
    console.log(data.toString());
});

var test3 = net.connect(8870, 'localhost', function()
{

    setTimeout(function()
    {
        console.log('third test test read a single textfile after a bed request:\n');
        console.log('get a simple textfile:\n');
        test3.write('GET /nice/hi.txt HTTP/1.1\r\n'+'Connection: keep-alive\r\n'+'Content-Type: text/html \r\n'+'Content-Length: 0\r\n\r\n');
    },140);

});

test3.on('data', function(data)
{
    console.log('third answer should be hi how are you');
    console.log(data.toString());
});

var test4 = net.connect(8870, 'localhost', function()
{

    setTimeout(function()
    {
        console.log('forth test test send a bad request(unparseable):\n');
        test4.write('dsfsdfs \r\n'+'Content-Length: 0\r\n\r\n');
    },160);

});

test4.on('data', function(data)
{
    console.log('four answer should be 500 server error');
    console.log(data.toString());
});

var test5 = net.connect(8870, 'localhost', function()
{

    setTimeout(function()
    {
        console.log('fifth test test send a bed request(unparseable):\n');
        test5.write('GET /../../hi.txt HTTP/1.1\r\n'+'Connection: keep-alive\r\n'+'Content-Type: text/html \r\n'+'Content-Length: 0\r\n\r\n');
    },180);

});

test5.on('data', function(data)
{
    console.log('answer should be 500 server error');
    console.log(data.toString());
});

var test6 = net.connect(8870, 'localhost', function()
{

    setTimeout(function()
    {
        console.log('sixth test test send a bed request(unparseable):\n');
        test6.write('GET /nice/hi.txt HTTP/2.0\r\n'+'Connection: keep-alive\r\n'+'Content-Type: text/html \r\n'+'Content-Length: 0\r\n\r\n');
    },190);

});

test6.on('data', function(data)
{
    console.log('sixth answer should be 500 server error');
    console.log(data.toString());
});


var test7 = net.connect(8870, 'localhost', function()
{

    setTimeout(function()
    {
        console.log('seven test send a request for not autrozie text:\n');
        test7.write('GET /nice/../hi.txt HTTP/2.0\r\n'+'Connection: keep-alive\r\n'+'Content-Type: text/html \r\n'+'Content-Length: 0\r\n\r\n');
    },200);

});

test7.on('data', function(data)
{
    console.log('answer should be 500 server error');
    console.log(data.toString());
});

var test8 = net.connect(8870, 'localhost', function()
{

    setTimeout(function()
    {
        console.log('eight test check cookies\n');
        test8.write('GET /nicecook HTTP/2.0\r\n'+'Connection: keep-alive\r\n'+'Content-Type: text/html \r\n'+'Cookie: name=value; \r\n'+'Content-Length: 0\r\n\r\n');
    },200);

});

test8.on('data', function(data)
{
    console.log('answer should be the cookies');
    console.log(data.toString());
});

var test8 = net.connect(8870, 'localhost', function()
{

    setTimeout(function()
    {
        console.log('eight test check cookies \n');
        test8.write('GET /cook/hi.txt HTTP/1.1\r\n'+'Connection: keep-alive\r\n'+'Content-Type: text/html \r\n'+'Cookie: name=value; \r\n'+
            'Content-Length: 0\r\n' +'Host: localhost' + '\r\n\r\n');
      //  test8.write('GET /cook HTTP/1.1\r\n'+'Connection: keep-alive\r\n'+'Content-Type: text/html \r\n'+'Cookie: name=value; \r\n'+'Content-Length: 0\r\n\r\n');
    },220);

});

test8.on('data', function(data)
{
    console.log('eight answer shold be the cookices\n');
    console.log(data.toString());
});

var test9 = net.connect(8870, 'localhost', function()
{

    setTimeout(function()
    {
        console.log('nine test check json \n');
        test9.write('GET /jsonjson/hi.txt HTTP/1.1\r\n'+'Connection: keep-alive\r\n'+'Content-Type: text/html \r\n'+
            'Content-Length: 0\r\n' +'Host: localhost' + '\r\n\r\n' + jsonBody);
        //  test8.write('GET /cook HTTP/1.1\r\n'+'Connection: keep-alive\r\n'+'Content-Type: text/html \r\n'+'Cookie: name=value; \r\n'+'Content-Length: 0\r\n\r\n');
    },230);

});

test9.on('data', function(data)
{
    console.log('nide answer shold be the json object\n');
    console.log(data.toString());
});


var test10 = net.connect(8870, 'localhost', function()
{

    setTimeout(function()
    {
        console.log('ten test check uncorlated \n');
        test10.write('GET /uncor/hi.txt HTTP/1.1\r\n'+'Connection: keep-alive\r\n'+'Content-Type: application/x-www-form-urlencoded \r\n'+
            'Content-Length: ' + uncorloadedBody.length.toString() + '\r\n' +'Host: localhost' + '\r\n\r\n' + uncorloadedBody);
        //  test8.write('GET /cook HTTP/1.1\r\n'+'Connection: keep-alive\r\n'+'Content-Type: text/html \r\n'+'Cookie: name=value; \r\n'+'Content-Length: 0\r\n\r\n');
    },240);

});

test10.on('data', function(data)
{
    console.log('ten answer shold be the uncorlated object\n');
    console.log(data.toString());
});


setTimeout(function()
{
    app.close();
},5000);


var jsonBody = '{"result":true,"count":1}';

var uncorloadedBody = 'name=param&name223432=param2&';







