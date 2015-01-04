# simple-stacktrace

built this from the answers here https://github.com/visionmedia/mocha/issues/545 for the purpose of changing my stack traces from things like this: 

```
1) Router POST /boards Import JSON column #1 has the right # of cards:

    AssertionError: expected 0 to equal 5
    + expected - actual

    +5
    -0

    at Context.<anonymous> (/Users/keyvan/Projects/mib/test/server/router_test.js:274:15)
    at callFn (/Users/keyvan/Projects/mib/node_modules/mocha/lib/runnable.js:223:21)
    at Test.Runnable.run (/Users/keyvan/Projects/mib/node_modules/mocha/lib/runnable.js:216:7)
    at Runner.runTest (/Users/keyvan/Projects/mib/node_modules/mocha/lib/runner.js:373:10)
    at /Users/keyvan/Projects/mib/node_modules/mocha/lib/runner.js:451:12
    at next (/Users/keyvan/Projects/mib/node_modules/mocha/lib/runner.js:298:14)
    at /Users/keyvan/Projects/mib/node_modules/mocha/lib/runner.js:308:7
    at next (/Users/keyvan/Projects/mib/node_modules/mocha/lib/runner.js:246:23)
    at Object._onImmediate (/Users/keyvan/Projects/mib/node_modules/mocha/lib/runner.js:275:5)
    at processImmediate [as _immediateCallback] (timers.js:336:15)
```

to something more like this:

```
1) Router POST /boards Import JSON column #1 has the right # of cards:

    AssertionError: expected 0 to equal 5
    + expected - actual

    +5
    -0

    at Context.<anonymous> (test/server/router_test.js:274:15)
    at processImmediate [as _immediateCallback] (timers.js:336:15)
```

which is easier to read and fits nicely without wrapping or robbing context

# install

`npm install -g simple-stacktrace`

# usage

`mocha -w ./test/ 2>&1 | simple-stacktrace`

## options

These are passed in for you automatically when using the pipe form above. If you wish, you can use the following form.

```
require('simple-stacktrace')({
  root: require('path').resolve(__dirname, '..')
})
```

This may be preferred for additional configuration, although in this case it would be better to expand on the `simple-stacktrace` binary and allow it to accept these options:


`root`: define where the root of your project lives if you want it to be stripped

`node_modules`: a `false` value hides any line that contains the string node_modules/ effectively hiding stack traces that occur outside your module. defaults to `false`
