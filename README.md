glutils
=====
[![Build Status](https://travis-ci.org/ogt/glutils.png)](https://travis-ci.org/ogt/glutils)

## Synopsis
Utilities to help someone code the way Greg Little (dglittle) does.
Based on https://github.com/dglittle/gl519

## Description
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
