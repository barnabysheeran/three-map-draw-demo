import { MeshStandardMaterial, BoxGeometry, Mesh } from 'three';

import ApplicationLogger from '../../application/ApplicationLogger.js';

export default class ContentController {
	#SCENE;

	// #DEMO_CUBE; // Removed, no longer used

	#LOG_LEVEL = 3;

	// _________________________________________________________________________

	constructor(scene) {
		ApplicationLogger.log(`ContentController`, this.#LOG_LEVEL);

		// Store Scene
		this.#SCENE = scene;

		// Create Demo Cube
		const MATERIAL_DEMO = new MeshStandardMaterial({
			color: 0xff0000,
			wireframe: true,
		});

		const GEOMETRY_DEMO = new BoxGeometry(1, 1, 1);

		// Create 100 cubes with random position and rotation
		for (let i = 0; i < 100; i++) {
			const cube = new Mesh(GEOMETRY_DEMO, MATERIAL_DEMO);
			cube.position.set(
				Math.random() * 20 - 10,
				Math.random() * 20 - 10,
				Math.random() * 20 - 10,
			);
			cube.rotation.set(
				Math.random() * Math.PI * 2,
				Math.random() * Math.PI * 2,
				Math.random() * Math.PI * 2,
			);
			this.#SCENE.add(cube);
		}
	}
}
