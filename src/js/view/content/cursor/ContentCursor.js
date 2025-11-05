import { MeshPhysicalMaterial, BoxGeometry, Mesh } from 'three';

export default class ContentCursor {
	#MATERIAL_CURSOR;
	#CURSOR;

	#MESH_DETAIL = 10;

	#CURSOR_SIZE = 0.1;
	#DISTANCE_ABOVE_GROUND = 0.11;

	// _________________________________________________________________________

	constructor(scene) {
		// Create Cursor
		this.#MATERIAL_CURSOR = new MeshPhysicalMaterial({
			color: 0xff0000,
			transparent: false,
		});

		const GEOMETRY_CURSOR = new BoxGeometry(
			this.#CURSOR_SIZE,
			this.#CURSOR_SIZE,
			this.#CURSOR_SIZE,
			this.#MESH_DETAIL,
			this.#MESH_DETAIL,
			this.#MESH_DETAIL,
		);

		this.#CURSOR = new Mesh(GEOMETRY_CURSOR, this.#MATERIAL_CURSOR);

		// Cast Shadow
		this.#CURSOR.castShadow = true;

		// Position Above Ground
		this.#CURSOR.position.y = this.#DISTANCE_ABOVE_GROUND;

		// Add UserData for Raycasting
		this.#CURSOR.userData.name = 'content-cursor';

		// Add to Scene
		scene.add(this.#CURSOR);
	}

	// ____________________________________________________________________ Tick

	tick(isOverMap, mapIntersectionPoint) {
		// Opacity
		if (isOverMap) {
			this.#MATERIAL_CURSOR.opacity = 1.0;
		} else {
			this.#MATERIAL_CURSOR.opacity = 0.1;
		}

		// Update Cursor
		if (isOverMap && mapIntersectionPoint) {
			// Position at Intersection Point
			this.#CURSOR.position.copy(mapIntersectionPoint);

			// Raise Above Ground
			this.#CURSOR.position.y += this.#DISTANCE_ABOVE_GROUND;
		}
	}
}
