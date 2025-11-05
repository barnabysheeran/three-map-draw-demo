import { BufferGeometry, BufferAttribute, Mesh } from 'three';

export default class ContentWallSurface {
	#SCENE;

	#SURFACE;

	#DISTANCE_ABOVE_GROUND = 0.01;

	// _________________________________________________________________________

	constructor(scene, startPosition, endPosition, height, material) {
		// Store
		this.#SCENE = scene;

		// Calc Height Above Ground
		let HEIGHT_ABOVE_GROUND = height + this.#DISTANCE_ABOVE_GROUND;

		// Create Wall Surface
		const GEOMETRY = new BufferGeometry();

		const VERTICES = new Float32Array([
			startPosition.x,
			this.#DISTANCE_ABOVE_GROUND,
			startPosition.z,
			endPosition.x,
			this.#DISTANCE_ABOVE_GROUND,
			endPosition.z,
			endPosition.x,
			HEIGHT_ABOVE_GROUND,
			endPosition.z,
			startPosition.x,
			HEIGHT_ABOVE_GROUND,
			startPosition.z,
		]);

		GEOMETRY.setAttribute('position', new BufferAttribute(VERTICES, 3));

		GEOMETRY.setIndex([0, 1, 2, 0, 2, 3]);

		GEOMETRY.computeVertexNormals();

		this.#SURFACE = new Mesh(GEOMETRY, material);

		// Add to Scene
		this.#SCENE.add(this.#SURFACE);
	}

	// _________________________________________________________________________

	dispose() {
		if (this.#SURFACE) {
			this.#SCENE.remove(this.#SURFACE);
			this.#SURFACE.geometry.dispose();
		}
	}
}
