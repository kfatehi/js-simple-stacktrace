module.exports = function(insaneOptions) {
  var options = insaneOptions || {};
  options.height = parseInt(options.height) || 6;
  options.node_modules = !!options.node_modules;
  return function (chunk) {
    var trace = chunk.split('\n')
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
    return trace;
  }
}
