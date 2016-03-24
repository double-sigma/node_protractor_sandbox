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
// var onRequest = function(request, response) {
//     response.writeHead(200, {"Content-Type": "text/plain"});
//     response.write("Hello World");
//     response.end();
// }; // NB! must terminate assignment operation, yay @ IDEA
// http.createServer(server).listen(8888);


function start(route) { // DI for routing

    // or we can simply name this function and pass its name
    // can't move this into own first level scope, because otherwise we can't pass route
    function onRequest(request, response) { // request and response are returned on each received request
        var pathname = url.parse(request.url).pathname;
        console.log("Request for " + pathname + " received");

        route(pathname);

        response.writeHead(200, {"Content-Type": "text/plain"});
        response.write("Hello World");
        response.end();
    }


    http.createServer(onRequest).listen(8888); // on request function receives request, response from createServer
    console.log("Server has started");
}

// Making some code a module means we need to export those parts of its functionality that we want to provide to scripts.
exports.start = start;