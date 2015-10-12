module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        'gh-pages': {
            options: {
                base: 'root'
            },
            src: ['**']
        },

        sass: {
            dist: {
                options: {                     
                    sourcemap: 'inline'
                },
                files: {
                    'root/_assets/css/main.css':
                    'root/_assets/css-pro/config.scss'
                }

            } 
        },

        concat: {
            js: {
                src: [
                // modules / helper
                    'root/_assets/js-pro/_modules/foreach.js',
                    'root/_assets/js-pro/_modules/classlist.js',
                    'root/_assets/js-pro/_modules/transition.js',
                    'root/_assets/js-pro/_modules/debounce-throttle.js',
                    'root/_assets/js-pro/_modules/draggabilly.js',
                    'root/_assets/js-pro/_modules/imagesloaded.js',
                    'root/_assets/js-pro/_modules/waypoints.js',
                    'root/_assets/js-pro/_modules/waypoints-inview.js',
                    'root/_assets/js-pro/_modules/iscroll.js',

                    'root/_assets/js-pro/main.js',
                    'root/_assets/js-pro/images.js',
                    'root/_assets/js-pro/videos.js',
                    'root/_assets/js-pro/sticky-headlines.js',

                ],
                dest: 'root/_assets/js/main.js'
            },
        },

        uglify: {
            js: {
                src: 'root/_assets/js/main.js',
                dest: 'root/_assets/js/main.js'
            }
        },

        autoprefixer: {
            dist: {
                files: {
                    'root/_assets/css/main.css':
                    'root/_assets/css/main.css'
                }
            }
        },

        cssmin: {
            my_target: {
                src: 'root/_assets/css/main.css',
                dest: 'root/_assets/css/main.css'
            }
        },

        watch: {
            options: {
                livereload: true,
            },            
            scripts: {
                files: [
                    'root/_assets/js-pro/*.js', 
                    'root/_assets/js-pro/_modules/*.js', 
                    'root/_assets/js-pro/_modules-custom/*.js'
                ],
                tasks: ['concat'],
                options: {
                  spawn: false,
                }
            },
            scss: {
                files: ['root/_assets/css-pro/*.scss'],
                tasks: ['sass'],
                options: {
                  spawn: false,
                }
            },
            html: {
                files: ['root/*.html'],
                options: {
                  spawn: false,
                }
            }
        }


    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-css');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-gh-pages');

    grunt.registerTask('default', ['sass', 'concat', 'watch']);
    grunt.registerTask('finish', ['concat', 'uglify', 'sass', 'autoprefixer', 'cssmin']);
    grunt.registerTask('github', ['gh-pages']);



};