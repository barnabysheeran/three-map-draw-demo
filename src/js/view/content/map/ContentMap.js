import { PlaneGeometry, MeshStandardMaterial, Mesh } from 'three';

export default class ContentMap {
	#PLANE;

	// _________________________________________________________________________

	constructor(scene) {
		// Create Plane
		const MATERIAL_PLANE = new MeshStandardMaterial({
			color: 0x00ff00,
		});

		const PLANE_GEOMETRY = new PlaneGeometry(1, 1);

		this.#PLANE = new Mesh(PLANE_GEOMETRY, MATERIAL_PLANE);

		// Rotate to lay flat
		this.#PLANE.rotation.x = -Math.PI / 2;

		// Add
		scene.add(this.#PLANE);
	}
}
