module.exports = function(grunt) {

    // Load NPM Tasks
    // https://github.com/shootaroo/jit-grunt
    require('jit-grunt')(grunt, {

    });

    grunt.initConfig({

        pkg: grunt.file.readJSON( 'package.json' ),

        config: {
            src: './src',
            dist: '.'
        },

        watch: {
            files: '<%= config.src %>/scss/**/*.scss',
            tasks: ['sass','autoprefixer','cssUrlEmbed']
        },
        browserSync: {
            dev: {
                bsFiles: {
                    src : [
                        '.tmp/*.css',
                        '<%= config.src %>/*.html',
                        '<%= config.src %>/js/*.js'
                    ]
                },
                options: {
                    watchTask: true,
                    server: ['<%= config.src %>/','./']
                }
            }
        },

        inline: {
            dist: {
                options:{
                    uglify: true,
                    cssmin: true
                },
                src: '<%= config.src %>/index.html',
                dest: '<%= config.dist %>/index.html'

            }
        },

        sass: {
            options: {
                sourceMap: false
            },
            dist: {
                files: {
                    '.tmp/main.css': '<%= config.src %>/scss/screen.scss'
                }
            }
        },

        cssUrlEmbed: {
            encodeDirectly: {
                options: {
                    baseDir: 'src/scss'
                },
                files: {
                    '.tmp/main.css': ['.tmp/main.css']
                }
            }
        },

        autoprefixer: {
            options: {
                // Task-specific options go here.
            },
            dist: {
                // Target-specific file lists and/or options go here.
                src: '.tmp/main.css'
            }
        }
    });

    grunt.registerTask('default', ['browserSync', 'watch']);
    grunt.registerTask('build', ['sass','cssUrlEmbed','autoprefixer','inline']);
}
