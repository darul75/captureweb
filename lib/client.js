/** 
* @license captureweb - v0.0.4
* (c) 2013 Julien VALERY https://github.com/darul75/starter-aws
* License: MIT 
**/
function Client(){}var path=require("path");Client.prototype.render=function(a,b,c){if(a){var d=require("url").parse(a),e=JSON.stringify(b),f={host:d.hostname,port:d.port,path:d.path,method:"POST",headers:{"Content-Type":"application/json","Content-Length":Buffer.byteLength(e)}},g=require("http").request(f,function(a){if(500==a.statusCode){var b=[];return a.setEncoding("utf8"),a.on("data",function(a){b.push(a)}),a.on("end",function(){var a=b.join("");c(JSON.parse(a),null)}),void 0}c(null,a)});g.on("error",function(){c(["error: cannot talk to phantomas server at "+a],null)}),g.write(e),g.end()}};var client=new Client;module.exports=client;