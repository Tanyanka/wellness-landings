module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);
    // structur of folders
    // src/js/ *.js
    // src/css/*.css
    // dist/ -> js/*.min.js && css/*.min.css

    grunt.initConfig({
        sass: {
            dist: {
                options: {
                  map: false
                },
                files: [{
                    expand: true,
                    cwd: 'src/scss',
                    src: ['style*.scss'],
                    dest: 'src/css',
                    ext: '.css'
                }]
            }
        },
        postcss: {
            options: {
                map: false,

        processors: [
                    require('autoprefixer')({browsers: ['last 2 version']}),
                    require('cssnano')
                ]
            },
            dist: {
                expand: true,
                flatten: true,
                src: 'src/css/style.css',
                dest: 'dist/css/',
                ext: '.min.css'
            }
        },
        // minification files
        uglify: {
            build: {
                files: [{
                    expand: true,
                    src: 'src/script/*.js',
                    dest: 'dist/js/',
                    ext: '.min.js'
                }]
            }
        },
        watch: {
                // We watch and compile sass files as normal but don't live reload here
            files: ['src/scss/*.scss', 'src/script/*.js', 'index.html'],
            tasks: ['sass', 'postcss', 'uglify']
        }
    });

    // load tasks
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-css');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    // grunt tasks

    grunt.registerTask('default', [ 'sass', 'postcss', 'uglify']);
   // grunt.registerTask('watch', [ 'watch' ]);
   // grunt.registerTask('css', ['postcss']);

};