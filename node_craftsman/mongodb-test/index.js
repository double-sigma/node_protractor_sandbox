'use strict';

var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://127.0.0.1:27017/accounting',

    function (err, connection) {

        var collection = connection.collection('customers');

        // MongoDB updates only the first match for a given filter
        // even if it matches every document
        // multir true is needed to update all matching documents
        collection.update({}, {'$set': {'age': 24}}, {'multi': true},
            function (err, count) {
                console.log('Updated', count, 'documents');
                collection.find().toArray(
                    function (err, documents) {
                        console.dir(documents);
                        connection.close();
                    });
            });
    });
