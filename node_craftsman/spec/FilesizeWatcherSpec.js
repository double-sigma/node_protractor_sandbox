'use strict';
var FilesizeWatcher = require('../src/FilesizeWatcher');
var exec = require('child_process').exec;


describe('FilesizeWatcher', function () {

    var watcher;

    afterEach(function () {
        watcher.stop();
    });

    it('should fire a "grew" event when the file grew in size', function (done) {
        // done is a callback
        // When it is called, it means “now the asynchronous operation I expected to occur did actually occur”
        var path = '/var/tmp/filesizewatcher.test';

        var watcherCallback = function (gain) {
            expect(gain).toBe(5);
            done();
        };
        var execCallback = function () {
            watcher = new FilesizeWatcher(path);
            watcher.on('grew', watcherCallback);
            exec('echo "test" > ' + path, function () { });
        };

        exec('rm -f ' + path + ' ; touch ' + path, execCallback);
    });

    it('should fire a "shrank" event when the file grew in size', function (done) {
        var path = '/var/tmp/filesizewatcher.test';

        var watcherCallback = function (loss) {
            expect(loss).toBe(3);
            done();
        };

        var execCallback = function () {
            watcher = new FilesizeWatcher(path);
            watcher.on('shrank', watcherCallback);
            exec('echo "a" > ' + path, function () { });
        };

        exec('rm -f ' + path + ' ; echo "test" > ' + path, execCallback);
    });

    it('should fire "error" if path does not start with a slash', function (done) {
        var path = 'var/tmp/filesizewatcher.test';
        watcher = new FilesizeWatcher(path);
        watcher.on('error', function (err) {
            expect(err).toBe('Path does not start with a slash');
            done();
        });
    });
});