var PATH = {};
PATH.IMAGES = 'images/';
PATH.SPRITE = 'img/';
PATH.CSS = 'css/';
PATH.STYLUS = 'stylus/';

path = require('path');
module.exports = function(grunt) {
    'use strict';
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        tinypng: {
            options: {
                apiKey: "JvqVzSycoSkKk35DwiFVfUeRTMVXLBaw",
                checkSigs: true,
                sigFile: 'file_sigs.json',
                summarize: true,
                showProgress: true,
                stopOnImageError: true
            },
            sprite: {
                expand: true,
                src: ['*.png'],
                cwd: PATH.IMAGES
            },
            ii: {
                expand: true,
                src: [PATH.SPRITE + '**/*.png', '!*.min.png'],
                dest: PATH.SPRITE,
                ext: '.min.png'
            }
        },
        stylus: {
            compile: {
                files: [{
                    cwd: PATH.STYLUS,
                    src: '**/*.styl',
                    dest: PATH.CSS,
                    expand: true,
                    ext: '.css'
                }]
            }
        },
        watch: {
            stylus: {
                files: [PATH.STYLUS + '**/*.styl'],
                tasks: ['newer:stylus:compile']
            }
        }
    });

    grunt.loadNpmTasks('grunt-tinypng');
    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-newer');

    // Default task(s).
    grunt.registerTask('tiny', 'tinypng');
    grunt.registerTask('default', 'watch:stylus');
};