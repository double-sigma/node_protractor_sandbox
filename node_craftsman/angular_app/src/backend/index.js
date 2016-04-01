'use strict';

var Percolator = require('Percolator').Percolator;
var dbSession = require('../../src/backend/dbSession.js');

var port = 8585;
var server = Percolator({'port': port, 'autoLink': false});

server.route('/',
    {

        GET: function (req, res) {
            console.log('routing...');
            res.object({'foo': 'bar'}).send();
        }
    }
);

server.route('/api/keywords',
    {

        GET: function (req, res) {
            console.log('routing...');
            dbSession.fetchAll('SELECT id, value, categoryID FROM keyword ORDER BY id', function (err, rows) {
                if (err) {
                    console.log(err);
                    res.status.internalServerError(err);
                } else {
                    console.log('success');
                    res.collection(rows).send();
                }
            });
        }
    }
);

server.listen(function () {
    console.log('Server started on port ', port);
});
