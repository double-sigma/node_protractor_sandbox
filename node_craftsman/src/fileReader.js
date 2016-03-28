'use strict';

var fs = require('fs');


var stream = fs.createReadStream('/Users/ssergejev/Downloads/drawingforitarchitects-sample.pdf');
// stream is an Event Emitter
// where's node api to see what kind of event can be emitted by given function?


// handler for error event
stream.on('error', function (er) {
    console.log('Error ecnountered ' + er);
});

// listens only until first event, then listener is removed
// stream.once('open', function(data) {
//     console.log('Open event emitted ' + data);
// });


// named callback
var onDataEventListener = function(data) {
    console.log('I have received a chunk of data: ' + data);
};

// listents for data event
stream.on('data', onDataEventListener);

// remove listener
stream.removeListener('data', onDataEventListener);

// stream.removeAllListeners('data');

// listens to end event
stream.on('end', function () {
    console.log('End of file');
});