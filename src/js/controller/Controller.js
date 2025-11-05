import ApplicationLogger from '../application/ApplicationLogger.js';

export default class Controller {
	#LOG_LEVEL = 1;

	// _________________________________________________________________________

	constructor() {
		ApplicationLogger.log(`Controller`, this.#LOG_LEVEL);
	}

	// ____________________________________________________________________ Tick

	tick(frameDeltaMS) {}
}
