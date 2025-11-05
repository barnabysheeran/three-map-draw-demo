import { RingGeometry, Mesh } from 'three';

export default class ContentPathPoint {
	#SCENE;
	#RING;

	#MESH_DETAIL = 32;

	#POINT_SIZE_INNER = 0.03;
	#POINT_SIZE_OUTER = 0.04;
	#DISTANCE_ABOVE_GROUND = 0.01;

	// _________________________________________________________________________

	constructor(scene, position, material) {
		// Store
		this.#SCENE = scene;

		// Create Ring
		const RING_GEOMETRY = new RingGeometry(
			this.#POINT_SIZE_INNER,
			this.#POINT_SIZE_OUTER,
			this.#MESH_DETAIL,
		);

		this.#RING = new Mesh(RING_GEOMETRY, material);

		// Rotate to Lay Flat
		this.#RING.rotation.x = -Math.PI / 2;

		// Position
		this.#RING.position.x = position.x;
		this.#RING.position.z = position.z;

		// Position Above Ground
		this.#RING.position.y = this.#DISTANCE_ABOVE_GROUND;

		// Add UserData for Raycasting
		this.#RING.userData.name = 'content-path-point';

		// Add to Scene
		scene.add(this.#RING);
	}

	// __________________________________________________________________ Access

	getPosition() {
		return this.#RING.position;
	}

	// _________________________________________________________________ Dispose

	dispose() {
		// Dispose Ring
		if (this.#RING) {
			this.#SCENE.remove(this.#RING);
			this.#RING.geometry.dispose();
			this.#RING.material.dispose();
			this.#RING = null;
		}
	}
}
