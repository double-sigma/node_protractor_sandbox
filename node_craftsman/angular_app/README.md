# Sandbox

Example app of angular FE on top of node BE with jasmine, mysql, sqlite3 (for dev & test)

# Installation
* use node 4.4
* setup MySQL locally or in vagrant box
  * if in Vagrant then allow user to access db from network, not only localhost
* `npm install` in root dir
* `../../node_modules/.bin/bower install` in `src/frontend` dir


# Running
* to create db run `./node_modules/.bin/db-migrate up --env dev` where env can be _dev_, _test_ or _production_
* to delete db run `./node_modules/.bin/db-migrate down --env dev`
* to run jasmine tests run `KW_ENV=test ./node_modules/.bin/jasmine-node --verbose --captureExceptions ./spec/ from root dir`
* to run in dev mode run `KW_ENV=dev node src/backend/index.js` from root dir
 * dev mode would have stable local dev db
 * test db is erased and created by tests
 * production is... production. If it works, don't touch it
* to create new db migration run `./node_modules/.bin/db-migrate create populateCategoryTable --env test`
* run `./node_modules/.bin/webdriver-manager update` to install web driver stuff

# To read
* https://npmjs.org/doc/json.html#dependencies
* http://maxogden.com/node-streams
* http://www.sebastianseilund.com/nodejs-async-in-practice