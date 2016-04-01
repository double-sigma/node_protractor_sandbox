'use strict';

var Server = require('./server').Server;

var server = Server(8585);

server.listen(function () {
    console.log('Server started on port ', server.options.port);
});
