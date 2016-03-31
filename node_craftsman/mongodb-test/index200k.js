'use strict';

var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://127.0.0.1:27017/accounting',
    function (err, connection) {

        var collection = connection.collection('customers');

        var listDocuments = function (callback) {
            collection.find(
                {'v': {'$gt': 5}}
                ,
                {
                    'skip:': 100000,
                    'limit': 15000,
                    'sort': 'v'
                }
            ).each(function (err, document) {
                if (document === null) {
                    callback();
                } else {
                    console.dir(document);
                }
            });
        };

        listDocuments(function () {
            connection.close();
        });
    });
