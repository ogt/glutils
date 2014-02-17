glutils
=====

Utilities to help someone program like Greg Little @dglittle

Based on the dglittle/gl519

Here are my changes

- pushed the tests in a test subfolder
- change test output into TAP (prepended OK, NOT OK, or # before each line of output)
- disable print() test and exit() tests - they were relying on human observation
- added npm test script - that tests using tap
- express serve the file statically at route /glutil instead of /gl519
- added MIT License file as specified in original package.json by dglittle
- added travis integration
