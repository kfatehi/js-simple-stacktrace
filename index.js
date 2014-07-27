/* Make stack traces shorter and more relevant
 * by cutting full path to app and reducing height */
module.exports = function (options) {
  var doctor = require('./doctor')(options);
  console.oldError = global.SimpleStacktraceReloaderFix || console.error;
  console.error = function (args) {
    if (typeof arguments.stack !== 'undefined') {
      console.oldError.call(console, arguments.stack);
    } else {
      if (typeof arguments[4] !== 'undefined') {
        trace = doctor(arguments[4])
        arguments[4] = trace;
      }
      console.oldError.apply(console, arguments);
    }
  }
  global.SimpleStacktraceReloaderFix = console.oldError;
}
