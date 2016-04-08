'use strict';

var dbSession = require('../../../../src/backend/dbSession.js');
var Server = require('../../../../src/backend/server.js').Server;
var resetDatabase = require('../../../resetDb');

var server;
var port = '8586';

var myHooks = function () {
    this.Before(function (scenario, done) {
        // Just like inside step definitions, "this" is set to a World instance.
        // It's actually the same instance the current scenario step definitions
        // will receive.

        // Let's say we have a bunch of "maintenance" methods available on our World
        // instance, we can fire some to prepare the application for the next
        // scenario:

        server = Server(port);
        server.listen(
            function () {
                resetDatabase(dbSession, done);
            });
    });


    this.After(function (scenario, done) {
        server.close(
            function () {
                resetDatabase(dbSession,
                    function () {
                        done();
                    });
            });
    });

};

module.exports = myHooks;