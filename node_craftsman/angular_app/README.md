# Sandbox

Example app of angular FE on top of node BE with jasmine, mysql, sqlite3 (for dev & test)

# Installation
* use node 5.5
* setup MySQL locally or in vagrant box
  * if in Vagrant then allow user to access db from network, not only localhost
* `npm install` in root dir
* `../../node_modules/.bin/bower install` in `src/frontend` dir


# Running
* to delete db run `./node_modules/.bin/db-migrate down --env dev`
* to run `npm run` startDevServer or startTestServer or startProdMode
 * dev mode would have stable local dev db
 * test db is erased and created by tests
 * production is... production. If it works, don't touch it
* to create new db migration run `./node_modules/.bin/db-migrate create populateCategoryTable --env test`
* run `npm run installChromeDriver` to install web driver stuff

# To read
* https://npmjs.org/doc/json.html#dependencies
* http://maxogden.com/node-streams
* http://www.sebastianseilund.com/nodejs-async-in-practice