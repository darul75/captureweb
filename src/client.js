var path = require('path');

/* 
 CLIENT
*/

function Client() {

}

Client.prototype.render = function(host, parameter, callback) {

    if (!host)
        return;

    var endpoint = require('url').parse(host);

    var json = JSON.stringify(parameter);

    var options = {
        host: endpoint.hostname,
        port: endpoint.port,
        path: endpoint.path,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(json)
        }
    };

    var request = require('http').request(options, function (response) {
        if (response.statusCode == 500) {
            var buffer = [];

            response.setEncoding('utf8');

            response.on('data', function (data) {
                buffer.push(data);
            });

            response.on('end', function () {
                var json = buffer.join('');

                callback(JSON.parse(json), null);
            });

            return;
        }

        callback(null, response);
    });

    request.on('error', function () {
        callback(['error: cannot talk to phantomas server at ' + host], null);
    });

    request.write(json);

    request.end();    
};

var client = new Client();
module.exports = client;