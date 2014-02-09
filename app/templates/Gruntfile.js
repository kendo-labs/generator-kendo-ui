// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    yeoman: {
      // Configurable paths
      app: 'app',
      dist: 'dist'
    },
    // Watches files for changes and runs tasks based on the changed files
    watch: {
      js: {
        files: ['<%%= yeoman.app %>/scripts/{,*/}*.js'],
        tasks: ['jshint'],
        options: {
          livereload: true
        }
      },
      livereload: {
        options: {
          livereload: '<%%= connect.options.livereload %>'
        },
        files: [
          '<%%= yeoman.app %>/{,*/}*.html',
          '.tmp/styles/{,*/}*.css',
          '<%%= yeoman.app %>/images/{,*/}*'
        ]
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        livereload: 35729,
        // Change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      livereload: {
        options: {
          open: true,
          base: [
            '.tmp',
            '<%%= yeoman.app %>'
          ]
        }
      },
      dist: {
        options: {
          open: true,
          base: '<%%= yeoman.dist %>',
          livereload: false
        }
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%%= yeoman.dist %>/*',
            '!<%%= yeoman.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        '<%%= yeoman.app %>/scripts/{,*/}*.js',
        '!<%%= yeoman.app %>/scripts/vendor/*',
        'test/spec/{,*/}*.js'
      ]
    },

    kendo_lint: {
      options: {
        force: true
      },
      files: [ '<%$= yeoman.app %>/scripts/{,*/}*.js', '<%$= yeoman.app %>/{,*/}*.html' ]
    },

  <% if (includeModernizr) { %>
    // Generates a custom Modernizr build that includes only the tests you
    // reference in your app
    modernizr: {
      devFile: '<%%= yeoman.app %>/bower_components/modernizr/modernizr.js',
      outputFile: '<%%= yeoman.dist %>/scripts/vendor/modernizr.js',
      files: [
        '<%%= yeoman.dist %>/scripts/{,*/}*.js',
        '<%%= yeoman.dist %>/styles/{,*/}*.css',
        '!<%%= yeoman.dist %>/scripts/vendor/*'
      ],
      uglify: true
    }<% } %>
  });

  grunt.registerTask('serve', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('server', function (target) {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run([target ? ('serve:' + target) : 'serve']);
  });

  grunt.registerTask('build', [
    <% if (includeModernizr) { %>
    'modernizr'<% } %>
  ]);

  grunt.registerTask('default', [
    'newer:jshint',
    'newer:kendo_lint',
    'build'
  ]);

};