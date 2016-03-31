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
            // n is a string, so > and < do not apply to it
            // we can use regexp instead
            // WHERE n like '#1%'
            collection.find(
                {
                    'n': /^#1/
                }
                ,
                {

                    // skip first two, show next and sort by v
                    // seems sort is done first, then two are skipped then five from the remainng top are shown
                    'limit': 5,
                    'skip': 2,
                    'sort': 'v'
                }
            ).toArray(function (err, documents) {
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


        listDocuments(function() {connection.close()});


    });
