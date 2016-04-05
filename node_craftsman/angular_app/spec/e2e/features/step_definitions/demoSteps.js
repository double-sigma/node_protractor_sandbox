'use strict';

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var expect = require('chai').expect;
var assert = chai.assert;

module.exports = function () {
    this.Given(/^google is open$/, function (callback) {
        // assert(true); // OK
        // expect(true).to.toEqual(true); // NOK -> jasmine syntax results in TypeError
        // expect(true).to.equal(true); chai syntax
        callback();
    });

    this.Then(/^gmail link is present$/, function (callback) {

        callback();
    });
};
