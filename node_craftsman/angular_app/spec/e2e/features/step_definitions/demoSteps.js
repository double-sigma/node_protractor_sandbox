/*globals browser, protractor, By */

'use strict';

// screenshot
var fs = require('fs');

// abstract writing screen shot to a file
function writeScreenShot(data, filename) {
    var stream = fs.createWriteStream(filename);
    stream.write(new Buffer(data, 'base64'));
    stream.end();
}
// screenshot

module.exports = function () {
    this.Given(/^keyword wrangler is open$/, function (callback) {
        // assert(true); // OK
        // expect(true).toEqual(true); // NOK -> jasmine syntax results in TypeError
        // expect(true).to.equal(true); // OK -> chai syntax
        browser.navigate('http://localhost:8586');

        callback();
    });

    this.Then(/^page title should be Keyword Wrangler$/, function (done) {

        var title = browser.getTitle();

        console.log(title);
        expect(title).toEqual('NaN NaNNaNKeyword Wrangler');
        console.log(title);

        browser.takeScreenshot().then(function (png) {
            writeScreenShot(png, 'exception.png');
        });

        done();
    });
};
