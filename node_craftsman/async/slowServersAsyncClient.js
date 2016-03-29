'use strict';

var request = require('request');
var async = require('async');

var name, status;

var getUsername = function (callback) {
    request.get('http://localhost:8080/getUserName?id=1234',
        function (err, res, body) {
            var result = JSON.parse(body);
            // callback will be triggered once execution is complete
            callback(err, result.value);
        });
};

var getUserStatus = function (callback) {
    request.get('http://localhost:8080/getUserStatus?id=1234',
        function (err, res, body) {
            var result = JSON.parse(body);
            callback(err, result.value);
        });
};

// array of functions we want to run in parallel
// callback that expects error and results array
// callback will triggered once the slowest parallel operations finishes
async.parallel([getUsername, getUserStatus], function (err, results) {
    console.log('The status of user', results[0], 'is', results[1]);
});

