'use strict';

var mysql = require('mysql');

// https://github.com/felixge/node-mysql#connection-options
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'node'
});

// TODO make it synchronous and check with eg http request and sleep(10)
// large resultsets is another source of potentially blocking behaviour
// Using the callback pattern ensures that our Node.js application won’t block while DB retrieves 10000000 rows
// but when node starts operating on them, eg logging - it will block

// to avoid grabbing whole query result at once, we should use streaming API (same as file reader, with events)
var query = connection.query('SELECT id, content FROM test');
query.on('error',
    function (err) {
        console.log('A database error occured:');
        console.log(err);
    });

query.on('fields',
    function (fields) {
        console.log('Received fields information.');
    });

query.on('result',
    function (result) {
        console.log('Received result:');
        console.log(result);
    });

query.on('end',
    function () {
        console.log('Query execution has finished.');
        connection.end();
    });

// NB the order of the on blocks doesn’t say anything about when (and if) they are executed