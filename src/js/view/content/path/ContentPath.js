import ApplicationDispatcher from '../../../dispatcher/ApplicationDispatcher.js';

export default class ContentPath {
	// _________________________________________________________________________

	constructor() {
		// Application Dispatcher Events
		ApplicationDispatcher.on(
			'content-path-clear',
			this.#onContentPathClear.bind(this),
		);
	}

	// __________________________________________________________________ Events

	#onContentPathClear() {
		// TODO
		console.log('ContentPath: onContentPathClear');
	}
}
