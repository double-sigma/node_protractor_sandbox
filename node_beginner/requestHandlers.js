var querystring = require("querystring");

function start(response, postData) {
    console.log("Request handler 'start' was called");

    var body = '<html>'+
        '<head>'+
        '<meta http-equiv="Content-Type" content="text/html; '+
        'charset=UTF-8" />'+
        '</head>'+
        '<body>'+
        '<form action="/upload" method="post">'+
        '<textarea name="text" rows="20" cols="60"></textarea>'+
        '<input type="submit" value="Submit text" />'+
        '</form>'+
        '</body>'+
        '</html>';

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();


}

function upload(response, postData) {
    console.log("Request handler 'upload' was called");
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("You've sent " + querystring.parse(postData).text);
    response.end();
}

exports.start = start;
exports.upload = upload;

// At this point we need to make a decision: do we hard-code usage of the requestHandlers module into the router,
// or do we want a bit more dependency injection? Although dependency injection, like every other pattern,
// shouldn’t be used only for the sake of using it, in this case it makes sense to loosely couple the router
// and its request handlers, and thus making the router really reusable.
// This means we need to pass the request handlers from our server into our router, but this feels even more wrong,
// which is why we should go the whole way and pass them to the server from our main file,
// and passing it on to the router from there.

// A varying number of items, each mapped to a string (the requested URL)? Well,
// sounds like an associative array would be a perfect fit. In JavaScript it’s actually objects that we
// want to use if we need an associative array!

// TODO handling file uploads (i.e., multipart POST requests) is not simple with Node.js


// Node.js serves our code the POST data in small chunks, callbacks that are called upon certain events.
// These events are data (a new chunk of POST data arrives) and end (all chunks have been received).