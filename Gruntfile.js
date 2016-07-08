module.exports = function(grunt) {
    var path = require('path');

    grunt.initConfig({
        staticPath: path.resolve() + '/app',
        outputPath: path.resolve() + '/public',
        jshint: {
            files: ['Gruntfile.js', 'app/assets/js/*.js'],
            options: {
                esnext: true,
                browser: true,
                curly: true,
                undef: true,
                predef: [ 'alert','define', 'module', 'require', 'it', 'expect', 'describe', 'jasmine', 'console', 'class' ],
                quotmark: true, // Enforce double quotes
            },
        },
        watch: {
            files: ['<%= jshint.files %>', 'app/assets/sass/*.scss','app/assets/js/*.js' ],
            tasks: ['jshint','sassWatch']
        },
        sass: {
            dev: {
                options: {
                    style: 'expanded'
                },
                files: [ {
                    expand: true,
                    cwd: '<%=staticPath%>/assets/sass',
                    src: [ '*.scss' ],
                    dest: '<%=outputPath%>/css',
                    ext: '.css'
                } ]
            }
        },
        copy: {
            main: {
                files: [{
                    expand: true,
                    cwd: '<%=staticPath%>/assets',
                    src: ['**'],
                    dest: '<%=outputPath%>/',
                }]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-copy');

    // grunt
    grunt.registerTask( 'sassWatch', [ 'sass' ] );

    // grunt ci
    grunt.registerTask('default', [ 'sass:dev', 'copy']);
    grunt.registerTask('ci', [ 'sass:dev', 'copy']);

};
