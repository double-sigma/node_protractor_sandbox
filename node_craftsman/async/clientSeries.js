'use strict';

var request = require('request');
var async = require('async');

var url = 'http://localhost:8080/';

// http://www.sebastianseilund.com/nodejs-async-in-practice
// same result as boomerang, but much more readable code
// series runs request one after another in guaranteed order
// In case that one of the series steps passes a non-null value to its callback as the first parameter,
// the series is immediately stops, and the final callback is triggered with the results that
// have been collected to far, and the err parameter set to the error value passed by the failing step
async.series([

        function (callback) {
            request.get(url + 'getUserName?id=1234',
                function (err, res, body) {
                    // callback is called once request finishes
                    if (err) {
                        callback(err);
                    } else {
                        callback(err, 'Name: ' + JSON.parse(body).value);
                    }
                });
        },

        function (callback) {
            request.get(url + 'getUserStatus?id=1234',
                function (err, res, body) {
                    if (err) {
                        callback(err);
                    } else {
                        callback(err, 'Status: ' + JSON.parse(body).value);
                    }
                });
        },

        function (callback) {
            request.get(url + 'getUserCountry?id=1234',
                function (err, res, body) {
                    if (err) {
                        callback(err);
                    } else {
                        callback(err, 'Country: ' + JSON.parse(body).value);
                    }
                });
        },

        function (callback) {
            request.get('http://localhost:9999/none',
                //request.get(url + 'getUserAge?id=1234',
                function (err, res, body) {
                    if (err) {
                        callback(err);
                    } else {
                        callback(err, 'Age: ' + JSON.parse(body).value);
                    }
                });
        }

    ],

    // callback for async.series()
    function (err, results) {
        for (var i = 0; i < results.length; i++) {
            console.log(results[i]);
        }
    }
);
