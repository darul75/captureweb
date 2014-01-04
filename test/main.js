// test/main.js
var starter = require('../src/starter-aws');
var assert = require("assert");

describe('service calls', function() {
    describe('with bad application options', function() {
        it('arguments', function(done) {

			starter.initCredentials({
				"accessKeyId": "YOUR_ACCESS_KEY_ID",
				"secretAccessKey": "YOUR_SECRET_ACCESS_KEY",
				"region": "us-west-1",
				"instancesId": "XXXXX",
				"state": "start"
			});

			starter.starter(function(err, geoData) {
				if (err) console.log(err.toString());                              

				assert.equal(err, 'Error: AWS was not able to validate the provided access credentials');               

				done();
			});

		});

		it('file', function(done) {

			starter.initFileCredentials();

			starter.starter(function(err, geoData) {
				if (err) console.log(err.toString());                              

				assert.equal(err, 'Error: AWS was not able to validate the provided access credentials');               

				done();
			});

		});
	});
});