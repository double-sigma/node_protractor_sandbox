'use strict';

module.exports = function () {
    this.Given(/^keyword wrangler is open$/, function (done) {
        // assert(true); // OK
        // expect(true).toEqual(true); // NOK -> jasmine syntax results in TypeError
        // expect(true).to.equal(true); // OK -> chai syntax
        browser.get('http://localhost:8586');
        done();
    });

    this.Then(/^page title should be NaN NaNNaNKeyword Wrangler$/, function (done) {

        var title = browser.getTitle();

        // if callback is not notified here, then step and scenario will NOT fail
        expect(title).to.eventually.equal('NaN NaNNaNKeyword Wrangler').notify(done);

    });

    this.Then(/^page title should be Keyword Wrangler$/, function (done) {

        var title = browser.getTitle();

        expect(title).to.eventually.equal('Keyword Wrangler').notify(done);

    });
};
