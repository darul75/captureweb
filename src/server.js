var path = require('path');

/* 
 SERVER
*/

var paths = {};

paths.temp_directory =  path.resolve('temp');

function Server() {

  this.renderer = require('./renderer');

}

Server.prototype.start = function(port) {

  if (!port)
    return;

  var _this = this;
  this.port = port;
  this.prepare_temp_directory();

  this.server = require('http').createServer(function (request, response) {
      if (request.url == '/') {
          if (request.method.toLowerCase() == "post") {
              _this.handler(request, response);

              return;
          }
      }

      _this.errors(['invalid request'], response);
  });

  this.server.listen(this.port);
};

Server.prototype.stop = function() {

  if (!this.server)
    this.server.close();
};

Server.prototype.handler = function (request, response) {
    var _this = this;
    this.json(request, function (errors, message) {
        if (errors) { _this.errors(errors, response); return; }

        _this.validate(message, function (errors) {
            if (errors) { _this.errors(errors, response); return; }

            message.handle = paths.temp_directory + '/' + _this.create_handle(message.mime);            

            _this.render(message, function (err) {
                if (err) { _this.errors(err, response); return; }

                require('fs').exists(message.handle, function (exists) {
                    if (!exists) { _this.errors(['phantomjs failed to render'], response); return; }

                    var stat = require('fs').statSync(message.handle);

                    response.writeHead(200, { 
                      'Content-Type': message.mime, 
                      'Content-Length': stat.size
                    });

                    var readstream = require('fs').createReadStream(message.handle);

                    readstream.on('data', function (data) {
                        response.write(data);
                    });

                    readstream.on('end', function () {
                        require('fs').unlink(message.handle, function (errors) {
                          response.end();
                        });
                    });
                });
            });
        });
    });
};

Server.prototype.render = function(message, next) {
  this.renderer.exec('script1.js', [message.url, message.handle, message.viewportSize], next);
};

Server.prototype.json = function (request, callback) {
    this.recv(request, function (error, data) {
        if (error) {
            callback(error, null);

            return;
        }

        try  {
            var obj = JSON.parse(data);

            callback(null, obj);
        } catch (e) {
            callback([e.toString()], null);
        }
    });
};

Server.prototype.recv = function (request, callback) {
    var buffer = [];

    request.setEncoding('utf8');

    request.on('data', function (data) {
        buffer.push(data);
    });

    request.on('error', function (error) {
        callback(error, null);
    });

    request.on('end', function () {
        callback(null, buffer.join(''));
    });
};

Server.prototype.create_handle = function (mime) {
    var extension = '.jpg';

    switch (mime) {
        case 'application/pdf':
            extension = '.pdf';
            break;

        case 'image/png':
            extension = '.png';
            break;

        case 'image/jpg':
            extension = '.jpg';
            break;

        case 'image/jpeg':
            extension = '.jpg';
            break;

        case 'image/gif':
            extension = '.gif';
            break;
    }

    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);

        return v.toString(16);
    }) + extension;
};

Server.prototype.validate = function (message, callback) {
    if (!message) {
        callback(['message is null']);

        return;
    }

    var errors = [];

    if (!message.url && !message.content) {
        errors.push(['url or content is required']);
    }

    if (message.url && message.content) {
        errors.push(['cannot supply both url and content in the same request']);
    }

    if (!message.mime) {
        errors.push(['mime is required']);
    }

    if (message.mime) {
        switch (message.mime) {
            case 'application/pdf':
                break;

            case 'image/jpeg':
                break;

            case 'image/jpg':
                break;

            case 'image/png':
                break;

            case 'image/gif':
                break;

            default:
                errors.push('output mime is invalid.');

                break;
        }
    }

    if (message.viewportSize && message.viewportSize.width && message.viewportSize.height) {
      message.viewportSize = message.viewportSize.width+'x'+message.viewportSize.height;
    }

    if (errors.length > 0) {
        callback(errors);
    }

    callback(null);
};

Server.prototype.prepare_temp_directory = function () {
  var exists = require('fs').existsSync(paths.temp_directory);

  if (exists) {
      var filenames = require('fs').readdirSync(paths.temp_directory);

      for (var i = 0; i < filenames.length; i++) {
          require('fs').unlinkSync(paths.temp_directory + '/' + filenames[i]);
      }
  } else {
      require('fs').mkdirSync(paths.temp_directory);
  }
  return this;
};

Server.prototype.errors = function (errors, response) {
    response.writeHead(500, { 'Content-Type': 'application/json' });

    response.write(JSON.stringify(errors, null, 4));

    response.end();
};

var server = new Server();
module.exports = server;