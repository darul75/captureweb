module.exports = function(grunt) {
  'use strict';

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      files: ['src/**/*.js', 'test/**/*.js']
    },
    // UGLIFY TASK
    uglify: {
      task1: {
       options: {
        preserveComments: 'some',
        report: 'min',
        banner: '/** \n* @license <%= pkg.name %> - v<%= pkg.version %>\n' + 
         '* (c) 2013 Julien VALERY https://github.com/darul75/starter-aws\n' +
         '* License: MIT \n**/\n'
        },         
        files: {
          'lib/captureweb.js': ['src/captureweb.js'],
          'lib/server.js': ['src/server.js'],
          'lib/client.js': ['src/client.js'],
          'lib/script1.js': ['src/script1.js'],
          'lib/renderer.js': ['src/renderer.js']
        }
      }
    }
});

  // LOAD PLUGINS
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');  

  // TASK REGISTER
  grunt.registerTask('default', ['jshint', 'uglify:task1']);
};
