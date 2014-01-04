/** 
* @license starter-aws - v0.0.6
* (c) 2013 Julien VALERY https://github.com/darul75/starter-aws
* License: MIT 
**/
var fs=require("fs"),config=function(){};config.prototype.init=function(a,b){fs.readFile(a,function(a,c){if(a)console.log(a),b(-1);else{var d=JSON.parse(c);for(var e in d)config.prototype[e]=d[e];b(0)}})},module.exports=new config;