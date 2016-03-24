var exec = require("child_process").exec;

function start() {
    console.log("Request handler 'start' was called");

    var content = "empty";
    exec("find /Users/ssergejev", function (error, stdout, stderr) {
        content = stdout;
    });
    // The problem is that exec(), in order to work non-blocking, makes use of a callback function
    // And herein lies the root of our problem: our own code is executed synchronous,
    // which means that immediately after calling exec(), Node.js continues to execute return content;
    // At this point, content is still “empty”, due to the fact that the callback function passed to exec()
    // has not yet been called - because exec() operates asynchronous
    return content;
}

function upload() {
    console.log("Request handler 'upload' was called");
    return "Hello Upload";
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