var http = require("http");
var url = require("url");

// // anonymous function is used by default as first and only parameter of createServer()
// http.createServer(function(request, response) {
//     response.writeHead(200, {"Content-Type": "text/plain"});
//     response.write("Hello World");
//     response.end();
// }).listen(8888);
//
// // it can be assigned to var and var can be passed to createServer()
var onRequest = function(request, response) {
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello World");
    response.end();
}; // NB! must terminate assignment operation, yay @ IDEA
http.createServer(onRequest).listen(8888);

console.log("Server has started");
