# qc-log_api

[![Build Status][travis-svg]][travis-url]
[![Coverage Status][coverage-image]][coverage-url]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url]

[![npm badge][npm-badge-png]][package-url]

This project defines an API for a logging system in JavaScript.  If you have
ever used a logging system, then you are aware of its benefits over using
something that simply prints to the console, standard out, or standard error.
A logging system is configurable and allows one to determine which log
messages are logged, where they are logged, and the format in which they are
logged.

There are several logging systems available for the JavaScript environment and
at the start of a project you may not be ready to spend the time on testing
and choosing a particular logging system.  This is where this logging API
steps in.  It has the minimal API typically used by most logging systems.  By
using this logging API now, it will be easier to upgrade to a full-blown
logging system implementation that closely match this API.

Although this is designed to help enforce a particular logging API, it has a
basic implementation which logs the messages to the `console` using the most
appropriate method.  For example, a WARN level message is logged to
`console.warn`.


## Installation

```sh
npm install --save qc-log_api
```


## Usage

```js
import * as printf from 'printf';

import { Log } from 'qc-log_api';

let LOG = Log.Factory.get('example');

LOG.trace('I am a %s level message', 'TRACE');
LOG.debug('I am a %s level message', 'DEBUG');
LOG.info('I am an %s level message', 'INFO');
LOG.warn('I am a %s level message', 'WARN');
LOG.error('I am an %s level message', 'ERROR');
LOG.fatal('I am a %s level message', 'FATAL');

LOG.trace(printf, 'I am a %s level message', 'TRACE');

let field_length_between = function (field_name, min_len, max_len) {
    return printf('%s must have a length between %d and %d.', field_name, min_len, max_len);
};
LOG.warn(field_length_between, 'Username', 3, 50);
LOG.warn(field_length_between, 'Password', 8, 20);

LOG.logAt(Log.Level.TRACE, '%s must have a length between %d and %d.', 'Password', 8, 20);
LOG.logAt(Log.Level.DEBUG, '%s must have a length between %d and %d.', 'Password', 8, 20);
LOG.logAt(Log.Level.INFO, '%s must have a length between %d and %d.', 'Password', 8, 20);
LOG.logAt(Log.Level.WARN, '%s must have a length between %d and %d.', 'Password', 8, 20);
LOG.logAt(Log.Level.ERROR, '%s must have a length between %d and %d.', 'Password', 8, 20);
LOG.logAt(Log.Level.FATAL, '%s must have a length between %d and %d.', 'Password', 8, 20);
```


[coverage-image]: https://coveralls.io/repos/github/hypersoftllc/qc-log_api/badge.svg?branch=master
[coverage-url]: https://coveralls.io/github/hypersoftllc/qc-log_api?branch=master
[downloads-image]: http://img.shields.io/npm/dm/qc-log_api.svg
[downloads-url]: http://npm-stat.com/charts.html?package=qc-log_api
[license-image]: http://img.shields.io/npm/l/qc-log_api.svg
[license-url]: LICENSE
[package-url]: https://npmjs.org/package/qc-log_api
[npm-badge-png]: https://nodei.co/npm/qc-log_api.png?downloads=true&stars=true
[travis-svg]: https://travis-ci.org/hypersoftllc/qc-log_api.svg?branch=master
[travis-url]: https://travis-ci.org/hypersoftllc/qc-log_api

