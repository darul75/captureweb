var childProcess = require('child_process');
var phantomjs = require('phantomjs');
var binPath = phantomjs.path;
var path = require('path');


/* 
 PHANTOMJS EXEC
*/

module.exports.exec = function(script, args, next) {

  var childArgs = [];

  childArgs.push(script);
  childArgs = childArgs.concat(args);

  childProcess.execFile(binPath, childArgs, function(err, stdout, stderr) {
      return next(err);
  });
};