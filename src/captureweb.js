/* 
 CAPTURE WEB SCRIPT / SERVER
*/

function CaptureWeb() {

  this.serverPort = 5001;
  this.clientServerPort = 5002;

  this.server = require('./server');

  this.client = require('./client');

  this.renderer = require('./renderer');

  this.options = { 
    debug: true 
  };
  
  this.init();

  // START SERVERS
  this.startServer(this.serverPort);
  this.startClientServer(this.clientServerPort);

  // FIRST TEST
  this.capture({url: 'https://github.com', 
                     mime: 'image/png', 
                     viewportSize: { w: 1280, h: 1024 },
                     userAgent: 'Mozilla/5.0 (iPhone; U; CPU iPhone OS 4_2_1 like Mac OS X; da-dk) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8C148 Safari/6533.18.5',
                     viewportRect: { top: 20, left: 20, w: 400, h:300 }
                    }, function(err, stream) {
    stream.pipe(require('fs').createWriteStream("github.png"));
  });
}

CaptureWeb.prototype.init = function() {
  
  return this;
};

CaptureWeb.prototype.startServer = function(port) {
  this.serverPort = port;
  this.server.start(port);
};

CaptureWeb.prototype.stopServer = function() {
  this.server.stop();
};

CaptureWeb.prototype.startClientServer = function(port) {
  var this_ = this;
  this.clientServerPort = port;
  this.clientServer = require('http').createServer(function(req, res) {

    var mime = 'image/png';

    this_.capture({url: 'https://github.com', 
                     mime: mime, 
                     viewportSize: { w: 1280, h: 1024 } }, function(err, stream) {
       if (err) {          
          res.setHeader('Content-Type', 'text/html');
          res.write(err.toString());
          res.end();
          return;          
        }

        res.writeHead(200, {'Content-Type' : mime});

        stream.pipe(res);                

    });
  }).listen(port);
};

CaptureWeb.prototype.stopClientServer = function() {
  this.clientServer.stop();
};

CaptureWeb.prototype.capture = function(params, next) {

  this.client.render('http://localhost:' + this.serverPort +'/', params, next);

  return this;
};

CaptureWeb.prototype.exec = function(script, args) {

  this.renderer.exec(script, args, function(err) {
    console.log('test');
  });

  return this;
};

var captureweb = new CaptureWeb();
module.exports = captureweb;

