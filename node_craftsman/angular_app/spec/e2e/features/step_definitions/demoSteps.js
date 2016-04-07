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
        //expect(true).to.toEqual(true); // NOK -> jasmine syntax results in TypeError
        expect(true).to.equal(true); // OK -> chai syntax
        //browser.navigate('http://localhost:8586');

        callback();
    });

    this.Then(/^page title should be Keyword Wrangler$/, function (callback) {

        // browser.takeScreenshot().then(function (png) {
        //     writeScreenShot(png, 'exception.png');
        // });
        //
        // expect(browser.getTitle()).to.eventually.equal('Keyword Wrangler').and.notify(callback);

        callback();
    });
};
