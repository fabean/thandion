module.exports = function(grunt){
	grunt.initConfig({
		watch:{
			sass:{
				files: 'style.scss',
				tasks: ['sass']
			},
			babel:{
				files: 'script-es6.js',
				tasks: ['babel']
			},
			jade: {
				files: 'index.jade',
				tasks: ['jade']
			}
		},
		sass:{
			dist:{
				options:{
					style: 'expanded'
				},
				files:{
					'style.css': 'style.scss'
				}
			}
		},
		babel:{
			dist:{
				files:{
					'script.js': 'script-es6.js'
				}
			}
		},
		jade:{
			compile:{
				files:{
					'index.html': 'index.jade'
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-jade');
	grunt.loadNpmTasks('grunt-babel');

	grunt.registerTask('default', ['watch']);
}