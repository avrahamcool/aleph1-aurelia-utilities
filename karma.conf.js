// Karma configuration
// Generated on Fri Dec 05 2014 16:49:29 GMT-0500 (EST)

module.exports = function(config)
{
	config.set(
	{

		// base path that will be used to resolve all patterns (eg. files, exclude)
		basePath: '',

		// frameworks to use
		// available frameworks: https://npmjs.org/browse/keyword/karma-adapter
		frameworks: ['jspm', 'jasmine', 'jasmine-matchers'],

		jspm:
		{
			// Edit this to your needs
			loadFiles: ['test/setup.js', 'test/unit/**/*.js'],
			serveFiles: ['src/**/*.js', 'test/models/**/*.js'],
			paths:
			{
				'*': '*',
				'github:*': 'jspm_packages/github/*',
				'npm:*': 'jspm_packages/npm/*'
			}
		},

		// list of files / patterns to load in the browser
		files: [],

		// list of files to exclude
		exclude: [],


		// preprocess matching files before serving them to the browser
		// available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
		preprocessors:
		{
			'models/**/*.js': ['babel'],
			'test/**/*.js': ['babel'],
			'src/**/*.js': ['babel', 'coverage']
		},
		'babelPreprocessor':
		{
			options:
			{
				sourceMap: 'inline',
				presets: [
					['env', { loose: true }], 'stage-1'
				],
				plugins: [
					'syntax-flow',
					'transform-decorators-legacy',
					'transform-flow-strip-types'
				]
			}
		},

		// test results reporter to use
		// possible values: 'dots', 'progress'
		// available reporters: https://npmjs.org/browse/keyword/karma-reporter
		reporters: ['progress', 'coverage'],

		// web server port
		port: 9876,

		// enable / disable colors in the output (reporters and logs)
		colors: true,

		// level of logging
		// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel: config.LOG_INFO,

		// enable / disable watching file and executing tests whenever any file changes
		autoWatch: false,

		// start these browsers
		// available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
		browsers: ['ChromeHeadless'],

		// Continuous Integration mode
		// if true, Karma captures browsers, runs the tests and exits
		singleRun: true
	});
};
