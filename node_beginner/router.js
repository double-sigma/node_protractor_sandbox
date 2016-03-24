function route (handle, pathname, response, request) {
    console.log("About to route a request for " + pathname);

    if (typeof handle[pathname] === 'function') {
        return handle[pathname](response, request); //  “Please, handle this pathname”
        // Because we can access our request handler functions from our object just as we would access an element of
        // an associative array, we have this nice fluent handle[pathname](); instead of endless if/else if
    } else {
        console.log("No request handler for " + pathname);
        response.writeHead(404, {"Content-Type": "text/plain"});
        response.write("404 Not found");
        response.end();
    }
}

exports.route = route;