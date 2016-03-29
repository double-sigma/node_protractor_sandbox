'use strict';

var request = require('request');

request.get('http://localhost:8080/getUserName?id=1234', function (err, res, body) {
    var result = JSON.parse(body);
    var name = result.value;

    // we start this only after first request finishes
    request.get('http://localhost:8080/getUserStatus?id=1234', function (err, res, body) {
        var result = JSON.parse(body);
        var status = result.value;
        console.log('The status of user', name, 'is', status);
    });
});

