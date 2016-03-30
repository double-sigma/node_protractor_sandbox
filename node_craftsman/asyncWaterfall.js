'use strict';

var request = require('request');
var async = require('async');

var url = 'http://localhost:8080/';

async.waterfall([

        function (callback) {
            request.get(url + 'getSessionId',
                function (err, res, body) {
                    callback(null, JSON.parse(body).value);
                });
        },


        function (sId, callback) {
            request.get(url + 'getUserId?sessionId=' + sId,
                function (err, res, body) {
                    // error argument always passes as the first parameter
                    // callback is passed as the last argument. It follows a list of arguments
                    // for each parameter that is passed by the previous function
                    callback(null, sId, JSON.parse(body).value);
                });
        },

        function (sId, uId, callback) {
            request.get(url + 'getUserName?userId=' + uId,
                function (err, res, body) {
                    callback(null, JSON.parse(body).value, sId);
                });
        }

    ],

    // instead of results, it too expects a list of result values, passed by the last waterfall step
    function (err, name, sId) {
        console.log('Name:', name);
        console.log('SessionID:', sId);
    });
