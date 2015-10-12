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
                    'root/assets/css/main.css':
                    'root/assets/css-pro/config.scss'
                }

            } 
        },

        concat: {
            js: {
                src: [
                // modules / helper
                    'root/assets/js-pro/_modules/foreach.js',
                    'root/assets/js-pro/_modules/classlist.js',
                    'root/assets/js-pro/_modules/transition.js',
                    'root/assets/js-pro/_modules/debounce-throttle.js',
                    'root/assets/js-pro/_modules/draggabilly.js',
                    'root/assets/js-pro/_modules/imagesloaded.js',
                    'root/assets/js-pro/_modules/waypoints.js',
                    'root/assets/js-pro/_modules/waypoints-inview.js',
                    'root/assets/js-pro/_modules/iscroll.js',

                    'root/assets/js-pro/main.js',
                    'root/assets/js-pro/images.js',
                    'root/assets/js-pro/videos.js',
                    'root/assets/js-pro/sticky-headlines.js',

                ],
                dest: 'root/assets/js/main.js'
            },
        },

        uglify: {
            js: {
                src: 'root/assets/js/main.js',
                dest: 'root/assets/js/main.js'
            }
        },

        autoprefixer: {
            dist: {
                files: {
                    'root/assets/css/main.css':
                    'root/assets/css/main.css'
                }
            }
        },

        cssmin: {
            my_target: {
                src: 'root/assets/css/main.css',
                dest: 'root/assets/css/main.css'
            }
        },

        watch: {
            options: {
                livereload: true,
            },            
            scripts: {
                files: [
                    'root/assets/js-pro/*.js', 
                    'root/assets/js-pro/_modules/*.js', 
                    'root/assets/js-pro/_modules-custom/*.js'
                ],
                tasks: ['concat'],
                options: {
                  spawn: false,
                }
            },
            scss: {
                files: ['root/assets/css-pro/*.scss'],
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