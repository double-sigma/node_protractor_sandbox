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


function start(route, handle) { // DI. Expecting route function and object of url<->function mapping

    // or we can simply name this function and pass its name
    // can't move this into own first level scope, because otherwise we can't pass route
    function onRequest(request, response) { // request and response are returned on each received request
        var postData = "";
        var pathname = url.parse(request.url).pathname;
        console.log("Request for " + pathname + " received");

        // In my opinion, it’s an HTTP servers job to give the application all the data from a requests it needs
        // to do its job. Therefore, I suggest we handle the POST data processing right in the server
        // and pass the final data on to the router and the request handlers
        request.setEncoding("utf8");

        // called when a new chunk of data was received
        request.addListener("data", function(postDataChunk) {
            postData += postDataChunk;
            console.log("Received POST data chunk '"+ postDataChunk + "'.");
        });

        // called when all chunks of data have been received
        request.addListener("end", function() {

            // we pass handle object, pathname that was requested
            // response object, so that routes can use it to response on their own
            // and postData to operate on it
            route(handle, pathname, response, postData);
        });
    }


    http.createServer(onRequest).listen(8888); // on request function receives request, response from createServer
    console.log("Server has started");
}

// Making some code a module means we need to export those parts of its functionality that we want to provide to scripts.
exports.start = start;