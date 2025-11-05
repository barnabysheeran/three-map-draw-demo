import ApplicationLogger from '../../application/ApplicationLogger.js';

import { AmbientLight, DirectionalLight } from 'three';

export default class LightController {
	#AMBIENT_LIGHT;
	#DIRECTIONAL_LIGHT;

	#COLOUR_AMBIENT = 0xffffff;
	#COLOUR_DIRECTIONAL = 0xffffff;

	#LOG_LEVEL = 3;

	// _________________________________________________________________________

	constructor(scene) {
		ApplicationLogger.log(`LightController`, this.#LOG_LEVEL);

		// Create Ambient Light
		this.#AMBIENT_LIGHT = new AmbientLight(this.#COLOUR_AMBIENT, 1.0);
		scene.add(this.#AMBIENT_LIGHT);

		// Create Directional Light
		this.#DIRECTIONAL_LIGHT = new DirectionalLight(
			this.#COLOUR_DIRECTIONAL,
			1.0,
		);
		this.#DIRECTIONAL_LIGHT.position.set(0, 10, 0);
		this.#DIRECTIONAL_LIGHT.target.position.set(0, 0, 0);

		// Enable shadows
		const CAMERA_SIZE = 2;

		this.#DIRECTIONAL_LIGHT.castShadow = true;
		this.#DIRECTIONAL_LIGHT.shadow.mapSize.width = 2048;
		this.#DIRECTIONAL_LIGHT.shadow.mapSize.height = 2048;

		this.#DIRECTIONAL_LIGHT.shadow.camera.left = -CAMERA_SIZE;
		this.#DIRECTIONAL_LIGHT.shadow.camera.right = CAMERA_SIZE;
		this.#DIRECTIONAL_LIGHT.shadow.camera.top = CAMERA_SIZE;
		this.#DIRECTIONAL_LIGHT.shadow.camera.bottom = -CAMERA_SIZE;

		this.#DIRECTIONAL_LIGHT.shadow.camera.near = 0.5;
		this.#DIRECTIONAL_LIGHT.shadow.camera.far = 20;

		scene.add(this.#DIRECTIONAL_LIGHT);
		scene.add(this.#DIRECTIONAL_LIGHT.target);
	}
}
