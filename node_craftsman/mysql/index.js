'use strict';

var mysql = require('mysql');

// https://github.com/felixge/node-mysql#connection-options
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: ''
});

// TODO make it synchronous and check with eg http request and sleep(10)
connection.query(
    'SELECT "foo" AS first_field, "bar" AS second_field',
    // This function gets called when Node.js receives the answer to our query from the server - a callback.
    function (err, results, fields) {
        // results is simply an array of objects, with each object representing one row of the result set
        // and each attribute of such an object representing one field of the according row
        // [ { first_field: 'foo', second_field: 'bar' } ]
        // [ array ]
        // [ {object} ]
        // [ { objects_attribute: 'attribute value' } ]
        if (!err) {
            console.log(results);
            console.log(fields);
        } else {
            console.log(err);
        }

        connection.end();
    }
);

