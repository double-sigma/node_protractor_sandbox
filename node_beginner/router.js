function route (handle, pathname) {
    console.log("About to route a request for " + pathname);

    if (typeof handle[pathname] === 'function') {
        handle[pathname](); //  “Please, handle this pathname”
        // Because we can access our request handler functions from our object just as we would access an element of
        // an associative array, we have this nice fluent handle[pathname](); instead of endless if/else if
    } else {
        console.log("No request handler for " + pathname);
    }
}

exports.route = route;