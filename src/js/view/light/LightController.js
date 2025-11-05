import ApplicationLogger from '../../application/ApplicationLogger.js';

import { AmbientLight } from 'three';

export default class LightController {
	#AMBIENT_LIGHT;

	#COLOUR_AMBIENT = 0xffffff;

	#LOG_LEVEL = 3;

	// _________________________________________________________________________

	constructor(scene) {
		ApplicationLogger.log(`LightController`, this.#LOG_LEVEL);

		// Create Ambient Light
		this.#AMBIENT_LIGHT = new AmbientLight(this.#COLOUR_AMBIENT, 1.0);
		scene.add(this.#AMBIENT_LIGHT);
	}
}
