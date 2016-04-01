'use strict';

var request = require('request');
var dbSession = require('../../src/backend/dbSession.js');
var resetDatabase = require('../resetDb.js');
var async = require('async');

describe('The API', function () {

    it('should response to a GET request at /api/keywords/', function (done) {

        var expected = {
            // _items contains the actual list of keywords. Percolator doesn't allow to return an array of things directly.
            "_items": [
                {'id': 1, 'value': 'Aubergine', 'categoryID': 1},
                {'id': 2, 'value': 'Onion', 'categoryID': 1},
                {'id': 3, 'value': 'Knife', 'categoryID': 2}
            ]
        };


        async.series(
            [
                function (callback) {
                    resetDatabase(dbSession, callback);
                },

                function (callback) {
                    dbSession.insert(
                        'keyword',
                        {'value': 'Aubergine', 'categoryID': 1},
                        function (err) {
                            callback(err);
                        });
                },

                function (callback) {
                    dbSession.insert(
                        'keyword',
                        {'value': 'Onion', 'categoryID': 1},
                        function (err) {
                            callback(err);
                        });
                },

                function (callback) {
                    dbSession.insert(
                        'keyword',
                        {'value': 'Knife', 'categoryID': 2},
                        function (err) {
                            callback(err);
                        });
                }
            ],

            function (err, results) {
                request.get(
                    {
                        'url': 'http://localhost:8585/api/keywords/',
                        'json': true
                    },
                    function (err, res, body) {
                        expect(res.statusCode).toBe(200);
                        expect(body).toEqual(expected);
                        done();
                    });
            });
    });

});
