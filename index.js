/* Make stack traces shorter and more relevant
 * by cutting full path to app and reducing height */
module.exports = function (insaneOptions) {
  var options = insaneOptions || {};
  options.height = parseInt(options.height) || 6;
  options.node_modules = !!options.node_modules;
  console.oldError = global.SimpleStacktraceReloaderFix || console.error;
  console.error = function (args) {
    if (typeof arguments.stack !== 'undefined') {
      console.oldError.call(console, arguments.stack);
    } else {
      if (typeof arguments[4] !== 'undefined') {
        var trace = arguments[4].split('\n')

        if (options.node_modules === false) {
          newTrace = [];
          for (var i = 0, l = trace.length; i < l; i ++) {
            var line = trace[i];

            if (! line.match('node_modules/')) {
              newTrace.push(line);
            }
          }
          trace = newTrace;
        }

        trace = trace.slice(0, options.height).join('\n');

        trace = trace.replace(RegExp(options.root, 'g'), '');

        arguments[4] = trace;
      }
      console.oldError.apply(console, arguments);
    }
  }
  global.SimpleStacktraceReloaderFix = console.oldError;
}
