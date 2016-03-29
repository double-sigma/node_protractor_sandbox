'use strict';

var fs = require('fs');

var FilesizeWatcher = function (path) {

    var self = this;

    self.callbacks = {};

    // without the nextTick callback happens in same event-loop as the object construction
    // object constructor performs a path check and triggeres an error callback
    // but this method will always be used as initialisation first and callback attachment later
    // for this we need to move triggering of error callback to next event-loop
    // we put error callback function as a callback for nextTick. Once tick happens - triggering is called
    if (/^\//.test(path) === false) {
        process.nextTick(function () {
            self.callbacks['error']('Path does not start with a slash');
        });
        process.exit();
    }

    fs.stat(path, function (err, stats) {
        self.lastfilesize = stats.size;
    });

    self.interval = setInterval(function () {
        fs.stat(path, function (err, stats) {

            if ( stats === undefined ) {
                self.callbacks['error']('File size undefined. File does not exist?');
                process.exit();
            }

            if (stats.size > self.lastfilesize) {
                self.callbacks['grew'](stats.size - self.lastfilesize);
                self.lastfilesize = stats.size;
            }

            if (stats.size < self.lastfilesize) {
                self.callbacks['shrank'](self.lastfilesize - stats.size);
                self.lastfilesize = stats.size;
            }
        }, 1000);
    });
};

FilesizeWatcher.prototype.on = function (eventType, callback) {
    this.callbacks[eventType] = callback;
};

FilesizeWatcher.prototype.stop = function () {
    clearInterval(this.interval);
};

module.exports = FilesizeWatcher;