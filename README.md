glutils
=====
[![Build Status](https://travis-ci.org/ogt/glutils.png)](https://travis-ci.org/ogt/glutils)

## Synopsis
Utilities to help someone code the way Greg Little (dglittle) does.
Based on https://github.com/dglittle/gl519

## Description
This utility library is compiled over the years by Greg Little to support his - minimum dependencies - maximum code lifetime - rely on the language vs the libraries -  unique coding style.
It consists of five distinct sections

- glutils-js - These are functions that should/could have been part of the javascript language itself. Most of them enable a functional programming style - others are just fixes for well known deficiencies of javascript:
`has`, `identity`, `each`, `map`, `filter`, `reduce`, `some`, `every`, `rename`, `min`, `max`, `find`, `range`, 
`size`, `deepEquals`, `keys`, `values`, `merge`, `clone`, `deepClone`, `pairs`, `object`, `pick`, `omit`, `setAdd`,
`makeSet`, `inSet`, `setSub`, `bagAdd`, `lerp`, `lerpCap`, `time`, `trim`, `lines`, `sum`, `sample`, `shuffle`,
`randomInt`, `randomString`, `sort`, `sortDesc`, `toArray`, `ensure`

- glutils-browser : Common helper functions for the browser.
`escapeUnicodeChar`, `escapeString`, `escapeRegExp`, `escapeUrl`, `unescapeUrl`, `escapeXml`, `unescapeXml`,
`getUrlParams`, `splitHorz`, `splitVert`, `dialog`

- glutils-json : This set of utilities make it straightforward to persist whole javascript structures (including pointers, cycles) to a file.
`decycle`, `recycle`, `json`, `unJson`

- glutils-node : Common helper functions for node
`serveOnExpress`, `read`, `write`, `print`, `exit`, `md5`

- glutils_promises : Simple but powerful fibers-based "real" promises
`run`, `yield`, `p`, `parallel`, `consume`, `wget`

Here is an example of using the promises:

```
    var _ = require('glutils')
    _.run(function () {
        ...
        var user = _.p(db.users.findone({ username : username}, _.p()))
        console.log(user)
        ...
    }
```
## Installation
```
npm install glutils
```

## Changes
Here are my changes from the original gl519 repo

- pushed the tests in a test subfolder
- change test output into TAP (prepended OK, NOT OK, or # before each line of output)
- disable print() test and exit() tests - they were relying on human observation
- added npm test script - that tests using tap
- express serve the file statically at route /glutil instead of /gl519
- added MIT License file as specified in original package.json by dglittle
- added travis integration
