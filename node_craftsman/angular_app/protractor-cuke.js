'use strict';

exports.config = {

    specs: [
        'spec/e2e/features/*.feature'
    ],

    exclude: [],

    framework: 'custom',
    frameworkPath: 'node_modules/protractor-cucumber-framework',

    cucumberOpts: {
        require: 'spec/e2e/features/step_definitions/**/*js',
        format: 'summary'
    },

    allScriptsTimeout: 5000,


    baseUrl: 'http://localhost:8586',

    directConnect: true,

    capabilities: {
        'browserName': 'chrome'
    },

    // CucumberJS and Jasmine are mutually exclusive; you won't be able to use Jasmine's expects in Cucumber steps.
    // What you have to do instead is load a separate expectation module. I would suggest Chai with
    // the chai-as-promised plugin. (chai-as-promised simplifies the process of writing expectations
    // around promises. Protractor overrides the expect() function in Jasmine to do this for you behind the scenes)
    // http://stackoverflow.com/questions/30740824/how-to-use-jasmine-and-cucumberjs-with-protractor
    onPrepare: function () {
        //browser.ignoreSynchronization = true;

        var chai = require('chai');
        var chaiAsPromised = require('chai-as-promised');
        chai.use(chaiAsPromised);
        global.expect = chai.expect;
        global.should = chai.should;

    }


};
