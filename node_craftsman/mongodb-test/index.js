'use strict';

var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://127.0.0.1:27017/accounting',

    function (err, connection) {
        var collection = connection.collection('customers2');

        var listDocuments = function (callback) {
            // comma separates AND parameters
            // $or or
            // $lt less than
            // $gt greater than
            // $lte less than equal
            // $gte greater than equal
            // $ne not equal
            // WHERE v > 3 AND (n == #5 OR n == #10)
            collection.find(
                {
                    'v': {'$gt': 3},
                    '$or': [
                        {'n': '#5'}, {'n': '#10'}
                    ]
                }).toArray(function (err, documents) {
                console.dir(documents);
                callback();
            });
        };

        var doInsert = function (i) {
            if (i < 20) {
                var value = Math.floor(Math.random() * 10);
                collection.insert(
                    {'n': '#' + i, 'v': value}, function (err, count) {
                        doInsert(i + 1);
                    });
            } else {
                console.log();
                console.log('Inserted', i, 'documents:');
                listDocuments(function () {
                    doUpdateAndDelete();
                });
            }
        };


        var doUpdateAndDelete = function () {
            collection.update(
                {'v': {'$gt': 5}}, // all whose "v > 5"
                {'$set': {'valuable': true}},
                {'multi': true},
                function (err, count) {
                    console.log();
                    console.log('Updated', count, 'documents:');
                    listDocuments(function () {
                        // remove doesn’t need a multi parameter in order to work on all matched documents
                        // it does so by default
                        collection.remove({}, function () {
                            connection.close();
                        });
                    });

                });
        };

        // insert 20 records
        // update those whose v > 5
        // list documents
        // delete all documents
        doInsert(0);


    });
