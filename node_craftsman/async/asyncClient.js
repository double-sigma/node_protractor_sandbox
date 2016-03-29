'use strict';

var request = require('request');
var name, status;

request.get('http://localhost:8080/getUserName?id=1234', function (err, res, body) {
    var result = JSON.parse(body);
    name = result.value;
});

request.get('http://localhost:8080/getUserStatus?id=1234', function (err, res, body) {
    var result = JSON.parse(body);
    status = result.value;
});

// this will result in The status of user undefined is undefined because
// console.log will run in same even-loop as requests
console.log('The status of user', name, 'is', status);
