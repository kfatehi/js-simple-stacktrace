/* Make stack traces shorter and more relevant
 * by cutting full path to app and reducing height */
module.exports = function (insaneOptions) {
  var options = insaneOptions || {};
  options.height = parseInt(options.height) || 6;
  options.node_modules = !!options.node_modules;
  var appRoot = require('path').resolve(__dirname, '..')+'/';
  console.oldError = global.SimpleStacktraceReloaderFix || console.error;
  console.error = function (args) {
    if (typeof arguments.stack !== 'undefined') {
      console.oldError.call(console, arguments.stack);
    } else {
      if (typeof arguments[4] !== 'undefined') {
        var traceToShow = arguments[4].split('\n')
        if (options.node_modules === false) {
          newTrace = [];
          for (var i = 0, l = traceToShow.length; i < l; i ++) {
            var line = traceToShow[i];
            if (! line.match('node_modules/')) {
              newTrace.push(line);
            }
          }
          traceToShow = newTrace;
        }
        arguments[4] = traceToShow
        .slice(0, options.height)
        .join('\n')
        .replace(RegExp(appRoot, 'g'), '');
      }
      console.oldError.apply(console, arguments);
    }
  }
  global.SimpleStacktraceReloaderFix = console.oldError;
}
