import ApplicationLogger from '../../application/ApplicationLogger.js';

import { AmbientLight, SpotLight } from 'three';

export default class LightController {
	#AMBIENT_LIGHT;
	#SPOT_LIGHT;

	#COLOUR_AMBIENT = 0xffffff;
	#COLOUR_SPOT = 0xffffff;

	#LOG_LEVEL = 3;

	// _________________________________________________________________________

	constructor(scene) {
		ApplicationLogger.log(`LightController`, this.#LOG_LEVEL);

		// Create Ambient Light
		this.#AMBIENT_LIGHT = new AmbientLight(this.#COLOUR_AMBIENT, 1.0);
		scene.add(this.#AMBIENT_LIGHT);

		// Add Spotlight facing down
		this.#SPOT_LIGHT = new SpotLight(this.#COLOUR_SPOT, 30.0);
		this.#SPOT_LIGHT.position.set(1, 5, 1);
		this.#SPOT_LIGHT.target.position.set(0, 0, 0);
		this.#SPOT_LIGHT.angle = Math.PI / 6;
		this.#SPOT_LIGHT.penumbra = 0.5;
		this.#SPOT_LIGHT.decay = 2;
		this.#SPOT_LIGHT.distance = 200;

		scene.add(this.#SPOT_LIGHT);
		scene.add(this.#SPOT_LIGHT.target);
	}
}
