import ApplicationLogger from '../application/ApplicationLogger.js';

import View from '../view/View.js';
import UIController from '../ui/UIController.js';

export default class Controller {
	#VIEW;
	#UI_CONTROLLER;

	#LOG_LEVEL = 1;

	// _________________________________________________________________________

	constructor() {
		ApplicationLogger.log(`Controller`, this.#LOG_LEVEL);

		// Create View
		this.#VIEW = new View();

		// Create UI Controller
		this.#UI_CONTROLLER = new UIController();
	}

	// ____________________________________________________________________ Tick

	tick(frameDeltaMS) {
		// Tick View
		this.#VIEW.tick(frameDeltaMS);
	}
}
