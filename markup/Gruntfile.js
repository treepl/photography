module.exports = function (grunt) {

  require('load-grunt-tasks')(grunt);

  var PathConfig = require('./grunt-settings.js');

  // tasks
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    config: PathConfig,

    //clean files
    clean: {
      options: {
        force: true
      },
      temp: {
        src: ["<%= config.cssDir %>**/*.map", "<%= config.imgDir %>", "<%= config.cssMainFileDir %><%= config.cssMainFileName %>.css.map", "./jpgtmp.jpg"]
      }
    },

    // autoprefixer
    // autoprefixer: {
    //   options: {
    //     browsers: ['last 4 version', 'Android 4', 'ie 8', 'ie 9']
    //   },

    //   multiple_files: {
    //     options: {
    //         map: true
    //     },
    //     expand: true,
    //     flatten: true,
    //     src: ['<%= config.cssDir %>*.css', '<%= config.cssMainFileDir %><%= config.cssMainFileName %>.css']
    //   },

    //   dist: {
    //     src: ['<%= config.cssDir %>*.css',
    //           '<%= config.cssMainFileDir %><%= config.cssMainFileName %>.css',
    //           '!<%= config.cssDir %>materialize.css',
    //           '!<%= config.cssDir %>materialize.min.css',
    //           '!<%= config.cssDir %>ie.css',
    //           '!<%= config.cssDir %>ie8.css'
    //           ]
    //   },
    // },



    postcss: {
      dev: {
        options: {
          map: true,
          processors: [
            require('autoprefixer')({
              overrideBrowserslist: ['last 4 versions', 'Android >= 4']
            })
          ]
        },
        src: ['<%= config.cssDir %>*.css',
          '<%= config.cssMainFileDir %>*.css',
          '!<%= config.cssDir %>materialize.css',
          '!<%= config.cssDir %>materialize.min.css',
          '!<%= config.cssDir %>ie.css',
          '!<%= config.cssDir %>ie8.css'
        ]
      },
      dist: {
        options: {
          map: false,
          processors: [
            require('autoprefixer')({
              overrideBrowserslist: ['last 4 versions', 'Android >= 4']
            })
          ]
        },
        src: ['<%= config.cssDir %>*.css',
          '<%= config.cssMainFileDir %><%= config.cssMainFileName %>.css',
          '!<%= config.cssDir %>materialize.css',
          '!<%= config.cssDir %>materialize.min.css',
          '!<%= config.cssDir %>ie.css',
          '!<%= config.cssDir %>ie8.css'
        ]
      }
    },

    //sass
    sass: {
      options: {
        implementation: require('sass'),
        loadPaths: ['.']
      },
      dev: {
        options: {
          sourceMap: true,
          style: 'expanded'
        },
        files: [{
            expand: true,
            cwd: '<%= config.sassDir %>',
            src: ['<%= config.srcDir %>**/*.scss', '!<%= config.sassMainFileName %>.scss'],
            dest: '<%= config.cssDir %>',
            ext: '.css'
          },
          {
            src: '<%= config.sassDir %><%= config.sassMainFileName %>.scss',
            dest: '<%= config.cssMainFileDir %><%= config.cssMainFileName %>.css'
          }
        ]
      },
      dist: {
        options: {
          sourceMap: false,
          style: 'expanded'
        },
        files: [{
            expand: true,
            cwd: '<%= config.sassDir %>',
            src: ['<%= config.srcDir %>**/*.scss', '!<%= config.sassMainFileName %>.scss'],
            dest: '<%= config.cssDir %>',
            ext: '.css'
          },
          {
            src: '<%= config.sassDir %><%= config.sassMainFileName %>.scss',
            dest: '<%= config.cssMainFileDir %><%= config.cssMainFileName %>.css'
          }
        ]
      },
      min: {
        options: {
          sourceMap: false,
          style: 'compressed'
        },
        files: [{
            expand: true,
            cwd: '<%= config.sassDir %>',
            src: ['<%= config.srcDir %>**/*.scss', '!<%= config.sassMainFileName %>.scss'],
            dest: '<%= config.cssDir %>',
            ext: '.min.css'
          },
          {
            src: '<%= config.sassDir %><%= config.sassMainFileName %>.scss',
            dest: '<%= config.cssMainFileDir %><%= config.cssMainFileName %>.min.css'
          }
        ]
      }
    },

    //Html build
    includereplace: {
      dev: {
        options: {
          // Task-specific options go here.
        },
        files: [{
            src: '*.html',
            dest: 'dist/',
            expand: true,
            cwd: '<%= config.srcDir %>/'
          },
          {
            src: '**/*.js',
            dest: 'dist/',
            expand: true,
            cwd: '<%= config.srcDir %>/'
          }
        ]
      }
    },
    //watcher project
    watch: {
      options: {
        debounceDelay: 1,
        // livereload: true,
      },
      images: {
        files: ['<%= config.imgSourceDir %>**/*.*'],
        tasks: [ /*'img:jpg', 'newer:imgopt', 'newer:svgmin'*/ 'newer:copy:images', ],
        options: {
          spawn: false
        }
      },
      svgSprites: {
        files: ['<%= config.imgSourceDir %>svg-icons/*.*'],
        tasks: ['svgstore', 'svg2string'],
        options: {
          spawn: false
        }
      },
      css: {
        files: ['<%= config.sassDir %>**/*.scss'],
        tasks: ['sass:dev', 'postcss:dev'],
        options: {
          spawn: false,
        }
      },
      html: {
        files: ['<%= config.srcDir %>**/*.html'],
        tasks: ['includereplace:dev'],
        options: {
          spawn: false,
        }
      },
      js: {
        files: ['<%= config.srcDir %>**/*.js'],
        tasks: ['includereplace:dev'],
        options: {
          spawn: false,
        }
      }

    },

    copy: {
      images: {
        expand: true,
        cwd: '<%= config.imgSourceDir %>',
        src: '**',
        dest: '<%= config.imgDir %>',
        //flatten: true,
        filter: 'isFile',
      }
    },

    // raster image optimizing (sharp; see the imgopt task at the bottom of this file)
    imgopt: {
      options: {
        // lower this if you want smaller files at the cost of visible quality
        jpegQuality: 92
      },
      all: {
        files: [{
          expand: true,
          cwd: '<%= config.imgSourceDir %>',
          src: ['**/*.{jpg,jpeg,png}'],
          dest: '<%= config.imgDir %>'
        }]
      }
    },

    svgmin: {
      options: {
        plugins: [{
          removeViewBox: false
        }, {
          removeUselessStrokeAndFill: false
        }]
      },
      dist: {
        files: [{
          expand: true,
          src: ['**/*.svg'],
          cwd: '<%= config.imgSourceDir %>',
          dest: '<%= config.imgDir %>'
        }]
      }
    },

    svgstore: {
      options: {
        prefix: 'icon-', // This will prefix each ID
        svg: { // will add and overide the the default xmlns="http://www.w3.org/2000/svg" attribute to the resulting SVG
          viewBox: '0 0 100 100',
          xmlns: 'http://www.w3.org/2000/svg'
        },
        cleanup: ['fill']
      },
      your_target: {
        files: {
          '<%= config.imgDir %>svg-sprites/sprite.svg': ['<%= config.imgDir %>svg-icons/*.svg'],
        },
      },
    },

    svg2string: {
      elements: {
        options: {
          template: '(window.SVG_SPRITES = window.SVG_SPRITES || {})["[%= filename %]"] = [%= content %];',
          wrapLines: false
        },
        files: {
          '<%= config.jsDir %>svg-sprites.js': [
            // '<%= config.imgDir %>sprite.svg',
            '<%= config.imgDir %>svg-sprites/sprite.svg'
          ]
        }
      }
    },

    //Keep multiple browsers & devices in sync when building websites.
    browserSync: {
      dev: {
        bsFiles: {
          src: ['dist/*.html', '<%= config.cssDir %>*.css', '*.css']
        },
        options: {
          server: {
            baseDir: "dist/",
            index: "index.html",
            directory: true
          },
          watchTask: true
        }
      }
    },

    notify: {
      options: {
        enabled: true,
        max_js_hint_notifications: 5,
        title: "WP project"
      },
      watch: {
        options: {
          title: 'Task Complete', // optional
          message: 'SASS finished running', //required
        }
      },
    },

    //copy files
    // copy: {
    //   dist: {
    //     files: [
    //       {
    //         expand: true,
    //         dot: true,
    //         cwd: './',
    //         src: [
    //           '**',

    //           '!scss/**',
    //           '!**/**/.svn/**',
    //           '!css/**',
    //         ],
    //         dest: '<%= config.distDir %>'
    //       }
    //     ]
    //   },
    // },

    csscomb: {
      all: {
        expand: true,
        src: ['<%= config.cssDir %>*.css',
          '<%= config.cssMainFileDir %><%= config.cssMainFileName %>.css',
          '!<%= config.cssDir %>materialize.css',
          '!<%= config.cssDir %>ie.css',
          '!<%= config.cssDir %>ie8.css'
        ],
        ext: '.css'
      },
      dist: {
        expand: true,
        files: {
          '<%= config.cssMainFileDir %><%= config.cssMainFileName %>.css': '<%= config.cssMainFileDir %><%= config.cssMainFileName %>.css'
        },
      }
    },

    cmq: {
      options: {
        log: false
      },
      all: {
        files: [{
          expand: true,
          src: ['**/*.css', '!materialize.css'],
          cwd: '<%= config.cssDir %>',
          dest: '<%= config.cssDir %>'
        }]
      },
      dist: {
        files: {
          '<%= config.cssMainFileDir %><%= config.cssMainFileName %>.css': '<%= config.cssMainFileDir %><%= config.cssMainFileName %>.css'
        },
      }
    }

  });

  // Raster image optimizing with sharp.
  // Replaces grunt-contrib-imagemin: the whole imagemin-*-bin family is abandoned and
  // pulls a permanently vulnerable binary-downloader chain (bin-wrapper/decompress/got).
  grunt.registerMultiTask('imgopt', 'Optimize raster images with sharp', function () {
    var done = this.async();
    var fs = require('fs');
    var path = require('path');
    var sharp = require('sharp');
    var options = this.options({
      jpegQuality: 92,
      pngCompressionLevel: 9
    });

    var originalBytes = 0;
    var optimizedBytes = 0;
    var count = 0;

    function prettyBytes(bytes) {
      return bytes > 1024 * 1024 ?
        (bytes / 1024 / 1024).toFixed(1) + ' MB' :
        Math.round(bytes / 1024) + ' kB';
    }

    Promise.all(this.files.map(function (f) {
      var src = f.src[0];

      if (!src || !grunt.file.exists(src)) {
        return Promise.resolve();
      }

      var pipeline = sharp(src);

      if (path.extname(src).toLowerCase() === '.png') {
        pipeline = pipeline.png({
          compressionLevel: options.pngCompressionLevel,
          palette: true
        });
      } else {
        pipeline = pipeline.jpeg({
          quality: options.jpegQuality,
          mozjpeg: true
        });
      }

      return pipeline.toBuffer().then(function (buf) {
        var originalSize = fs.statSync(src).size;

        grunt.file.mkdir(path.dirname(f.dest));

        // never let "optimizing" make a file bigger
        if (buf.length < originalSize) {
          fs.writeFileSync(f.dest, buf);
          optimizedBytes += buf.length;
        } else {
          grunt.file.copy(src, f.dest);
          optimizedBytes += originalSize;
        }

        originalBytes += originalSize;
        count++;
      });
    })).then(function () {
      var saved = originalBytes - optimizedBytes;
      var percent = originalBytes > 0 ? (saved / originalBytes) * 100 : 0;

      grunt.log.writeln('Optimized ' + count + ' images (saved ' +
        prettyBytes(saved) + ' - ' + percent.toFixed(1) + '%)');
      done();
    }).catch(function (err) {
      grunt.fatal(err);
    });
  });

  // run task
  //dev
  grunt.loadNpmTasks('grunt-include-replace');
  //watch
  grunt.registerTask('w', ['watch']);
  //browser sync
  grunt.registerTask('bs', ['browserSync']);

  //watch + browser sync
  grunt.registerTask('dev', ['browserSync', 'watch']);

  //create svg sprite
  grunt.registerTask('svgsprite', ['svgmin', 'svgstore', 'svg2string']);

  grunt.registerTask('default', ['dev']);

  //finally
  //css beautiful
  grunt.registerTask('cssbeauty', ['sass:min', //'cmq:dist',
    'postcss:dist', 'csscomb:dist'
  ]);
  //img minify
  grunt.registerTask('imgmin', ['imgopt', 'svgmin']);

  //final build
  grunt.registerTask('dist', ['clean:temp', 'imgmin', 'cssbeauty']);

};
