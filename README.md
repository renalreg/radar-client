# RADAR Client

This repository contains the web interface for RADAR.

## Build Status

[![Build Status](https://img.shields.io/travis/renalreg/radar-client/master.svg)](https://travis-ci.org/renalreg/radar-client) [![Coveralls](https://img.shields.io/coveralls/renalreg/radar-client.svg)](https://coveralls.io/github/renalreg/radar-client) [![devDependencies Status](https://david-dm.org/renalreg/radar-client/dev-status.svg)](https://david-dm.org/renalreg/radar-client?type=dev)

[![Sauce Test Status](https://saucelabs.com/browser-matrix/radar.svg)](https://saucelabs.com/u/radar)

## Getting Started

Make sure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed (npm is included with Node.js).

Clone the repository:

```sh
git clone https://github.com/renalreg/radar-client.git
cd radar-client
```

Install the dependencies:

```sh
npm install
```

Start the development server:

```sh
npm start
```

The development server is available at [http://localhost:8080/](http://localhost:8080/) or at [http://localhost:8080/webpack-dev-server/](http://localhost:8080/webpack-dev-server/) with live reloading.

## npm scripts

* `start` - start a development server.
* `clean` - removes build output.
* `build` - build the client in the `dist` folder.
* `lint` - lint the source code with [ESLint](http://eslint.org/).
* `test` - run the tests with [Karma](https://karma-runner.github.io/).
* `sauce-labs` - run the tests on supported browsers using [Sauce Labs](https://saucelabs.com/).

## Develop

Run the development server with the `npm start` command.
This will start a development server listening on `localhost` on port `8080`.
If you using a VM you might want to listen on all interfaces with the `--host 0.0.0.0` argument.
You can pass extra arguments to `npm start` using the `--` separator.
For example `npm start -- --host 0.0.0.0`.

ESLint and the tests are automatically run by [Travis CI](https://travis-ci.org/).
Lint errors or test failures will prevent a package being built with `./build.sh`.

### Lint

The JavaScript code can be linted with the ESLint tool.
The coding style is two-spaces for indentation, single-quotes and semi-colons.

Lint the code with:

```sh
npm run lint
```

### Test

The tests are written using the [Jasmine](http://jasmine.github.io/) framework and run using [Karma](https://karma-runner.github.io/).
Test files have the `.test.js` extension and normally named after the file they are testing.

Run the tests with:

```sh
npm test
```

## Deploy

Build a `.tar.gz`:

```sh
./build.sh
```

This will lint the code, run the tests, build the client and create an archive ready for distribution. 

Deploy the `.tar.gz` to servers:

```sh
virtualenv venv
source venv/bin/activate
pip install fabric

fab -H nww.radar.nhs.uk -u root deploy
```

The `--gateway` option is useful for tunneling through another server.
