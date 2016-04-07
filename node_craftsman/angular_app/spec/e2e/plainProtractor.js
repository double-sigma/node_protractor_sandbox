'use strict';


describe('The API', function () {

    // screenshot
    var fs = require('fs');

// abstract writing screen shot to a file
    function writeScreenShot(data, filename) {
        var stream = fs.createWriteStream(filename);
        stream.write(new Buffer(data, 'base64'));
        stream.end();
    }

// screenshot

    var dbSession = require('../../src/backend/dbSession.js');
    var Server = require('../../src/backend/server.js').Server;
    var resetDatabase = require('../resetDb');
    var server;
    var port = '8586';

    beforeEach(function (done) {
        server = Server(port);
        server.listen(
            function (err) {
                resetDatabase(dbSession,
                    function () {
                        done(err);
                    });
            });
    });

    afterEach(function (done) {
        server.close(
            function () {
                resetDatabase(dbSession,
                    function () {
                        done();
                    });
            });
    });


    it('should open root page and check the title', function () {
        browser.get('http://localhost:8586');

        var title = browser.getTitle();

        //console.log(title);
        expect(title).toEqual('Keyword Wrangler');
        console.log(title);

        browser.takeScreenshot().then(function (png) {
            writeScreenShot(png, 'exception.png');
        });

    });
});