var http = require("http");
var url = require("url");

// anonymous function is used by default as first and only parameter of createServer()
http.createServer(function(request, response) {
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello World");
    response.end();
}).listen(8888);
