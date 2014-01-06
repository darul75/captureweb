/** 
* @license captureweb - v0.0.6
* (c) 2013 Julien VALERY https://github.com/darul75/starter-aws
* License: MIT 
**/
var childProcess=require("child_process"),phantomjs=require("phantomjs"),binPath=phantomjs.path,path=require("path");module.exports.exec=function(a,b,c){var d=[];d.push(a),d=d.concat(b),childProcess.execFile(binPath,d,function(a){return c(a)})};