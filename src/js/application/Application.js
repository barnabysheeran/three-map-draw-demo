/* global APPLICATION_VERSION */

import ApplicationConfiguration from './ApplicationConfiguration.js';
import ApplicationLogger from './ApplicationLogger.js';

import Controller from '../controller/Controller.js';

export default class Application {
	#CONTROLLER;

	#applicationRunTimeMS = 0;

	#LOG_LEVEL = 1;

	// _________________________________________________________________________

	constructor(creationParameters) {
		ApplicationLogger.log(
			'Application ' + APPLICATION_VERSION,
			this.#LOG_LEVEL,
		);

		// Order Important

		// Initialise Application Configuration
		ApplicationConfiguration.initialise(creationParameters);

		// Create Controller
		this.#CONTROLLER = new Controller();

		// Start Application Main Loop
		window.requestAnimationFrame(this.#tick.bind(this));
	}

	// _______________________________________________________________ Main Loop

	#tick(applicationRunTimeMS) {
		// Calculate Application Frame Delta MS
		const FRAME_DELTA_MS = applicationRunTimeMS - this.#applicationRunTimeMS;

		// Store Application Run Time
		this.#applicationRunTimeMS = applicationRunTimeMS;

		// Tick Controller
		this.#CONTROLLER.tick(FRAME_DELTA_MS);

		// Loop
		window.requestAnimationFrame(this.#tick.bind(this));
	}
}
