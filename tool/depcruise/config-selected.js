export default {
	options: {
		doNotFollow: ['node_modules'],

		reporterOptions: {
			dot: {
				filters: {
					includeOnly: {
						path: '^src/js',
					},

					exclude: {
						path: [
							'src/js/application/ApplicationLogger.js',
							'src/js/application/ApplicationConfiguration.js',

							'src/js/dispatcher/ApplicationDispatcher.js',
							'src/js/dispatcher/ApplicationDispatcherEvent.js',
						],
					},
				},
			},
		},
	},
};
