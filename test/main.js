// test/main.js
var captureweb = require('../src/captureweb');
var assert = require("assert");

describe('service calls', function() {
    describe('default render when start', function() {
        it('arguments', function(done) {        	
        			  
		    captureweb.capture({url: 'https://github.com', 
		                     mime: 'image/png', 
		                     viewportSize: { width: 1280, height: 1024 } }, function(err, stream) {
		       if (err) {          
		       	  console.log(err);		          
		          return;          
		        }		        

		        var data = '';		        

		        stream.on('data', function(d){ 
		        	data += d; 
		        });

				stream.on('end', function(){
					console.log('ok stream is here');
					assert.equal(1, 1);
					done();
				});		        		        
		                   
		    });	        

	        this.timeout(19000);
        });
    });
});
		