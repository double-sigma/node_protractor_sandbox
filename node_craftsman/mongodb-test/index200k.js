'use strict';

var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://127.0.0.1:27017/accounting',
    function (err, connection) {

        var collection = connection.collection('customers');

        var listDocuments = function (callback) {
            // The stream object returned by collection.find().stream() implements the stream.Readable
            // interface. See the more at http://nodejs.org/api/stream.html#stream_class_stream_readable
            var stream = collection.find({'v': {'$gt': 5}},
                {
                    'skip:': 100000,
                    'limit': 15000,
                    'sort': 'v'
                }
            ).stream();
            stream.on('data', function (document) {
                console.dir(document);
            });
            stream.on('close', function () {
                callback();
            });
        };

        listDocuments(function () {
            connection.close();
        });
    });
