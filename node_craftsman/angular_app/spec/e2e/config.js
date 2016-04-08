'use strict';

exports.config = {
    framework: 'jasmine2',
    specs: ['plainProtractor.js'],

    baseUrl: 'http://localhost:8586',

    directConnect: true,

    capabilities: {
        'browserName': 'chrome',
        'chromeOptions': {
            'args': ['show-fps-counter=true']
        }
    },
    onPrepare: function () {
        // browser.ignoreSynchronization = true;
        // var jasmineReporters = require('jasmine-reporters');
        // jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
        //     consolidateAll: true,
        //     savePath: 'test_results/junit',
        //     filePrefix: 'xmloutput'
        // }));

    },


    allScriptsTimeout: 5000,

    jasmineNodeOpts: {
        showTiming: true,
        showColors: true,
        isVerbose: false,
        includeStackTrace: false,
        defaultTimeoutInterval: 10000
    }
};
