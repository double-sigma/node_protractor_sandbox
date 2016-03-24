function start() {
    console.log("Request handler 'start' was called");
}

function upload() {
    console.log("Request handler 'upload' was called");
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