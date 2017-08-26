module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json')
    , webpack: {
      run: require('./webpack.config.js')
    }
    , uglify: {
        options: {
          banner: "/*! <%= pkg.name %> <%= grunt.template.today('yyyy-mm-dd') %> <%= pkg.version %>\n" +
              "http://dev.slatebox.com\n" +
              "(c) 2009-2017 Tim Heckel, Slatebox LLC\n" +
              "Slatebox.js may be freely distributed under the MIT license.\n\n" +

              "Raphael 2.1.0 - JavaScript Vector Library\n" +
              "Copyright ? 2008-2012 Dmitry Baranovskiy (http://raphaeljs.com)\n" +
              "Copyright ? 2008-2012 Sencha Labs (http://sencha.com)\n" +
              "Licensed under the MIT (http://raphaeljs.com/license.html) license.\n\n" +

              "Eve 0.3.4 - JavaScript Events Library\n" +
              "Copyright (c) 2008-2011 Dmitry Baranovskiy (http://dmitry.baranovskiy.com/)\n" +
              "Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.\n\n" +

              "emile.js (c) 2009 Thomas Fuchs\n" +
              "Licensed under the terms of the MIT license. */\n\n\n"
        },
        build: {
          src: 'dist/slatebox-<%= pkg.version %>.js',
          dest: 'dist/slatebox-<%= pkg.version %>.min.js'
        }
    }
    , compress: {
      main: {
        options: {
          mode: 'gzip'
        }
        , files: [{src: 'dist/slatebox-<%= pkg.version %>.min.js', dest: 'dist/gzipped/slatebox.min.js.gz'}]
      }
    }
    , rename: {
        moveThis: {
            src: 'dist/gzipped/slatebox.min.js.gz'
            , dest: 'dist/gzipped/slatebox.min.js'
        }
    }
    , copy: {
        main: {
            files: [
              { src: 'dist/slatebox-<%= pkg.version %>.js', dest: '/home/tim/Projects/slateboxdocs/client/lib/slatebox-<%= pkg.version %>.js' }
            ]
        }
    }
    , s3: {
        options: {
          key: 'KEY_HERE',
          secret: 'SECRET_HERE',
          bucket: 'slatebox',
          access: 'public-read'
        }
        , dev: {
          upload: [{
            src: 'dist/gzipped/slatebox.min.js',
            dest: 'slatebox.min.js'
          }]
        }
      }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-rename');
  grunt.loadNpmTasks('grunt-s3');
  grunt.loadNpmTasks('grunt-webpack');

  // Default task(s).
  grunt.registerTask('default', ['webpack:run', 'uglify', 'compress', 'rename']); //, 's3', 'copy'

};