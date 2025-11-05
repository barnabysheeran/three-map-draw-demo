import ApplicationLogger from '../application/ApplicationLogger.js';

import View from '../view/View.js';

export default class Controller {
	#VIEW;

	#LOG_LEVEL = 1;

	// _________________________________________________________________________

	constructor() {
		ApplicationLogger.log(`Controller`, this.#LOG_LEVEL);

		// Create View
		this.#VIEW = new View();
	}

	// ____________________________________________________________________ Tick

	tick(frameDeltaMS) {
		// Tick View
		this.#VIEW.tick(frameDeltaMS);
	}
}
