import { MeshStandardMaterial, BoxGeometry, Mesh } from 'three';

export default class ContentCursor {
	#CURSOR;

	#CURSOR_SIZE = 0.1;
	#DISTANCE_ABOVE_GROUND = 0.1;

	// _________________________________________________________________________

	constructor(scene) {
		// Create Cursor
		const MATERIAL_CURSOR = new MeshStandardMaterial({
			color: 0xff0000,
			transparent: true,
			opacity: 0.8,
		});

		const GEOMETRY_CURSOR = new BoxGeometry(
			this.#CURSOR_SIZE,
			this.#CURSOR_SIZE,
			this.#CURSOR_SIZE,
		);

		this.#CURSOR = new Mesh(GEOMETRY_CURSOR, MATERIAL_CURSOR);

		// Position Above Ground
		this.#CURSOR.position.y =
			this.#CURSOR_SIZE / 2 + this.#DISTANCE_ABOVE_GROUND;

		// Add to Scene
		scene.add(this.#CURSOR);
	}

	// ____________________________________________________________________ Tick

	tick() {
		// Update Cursor
	}
}
