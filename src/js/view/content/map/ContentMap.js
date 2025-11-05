import { PlaneGeometry, MeshPhysicalMaterial, Mesh } from 'three';

export default class ContentMap {
	#PLANE;

	#MESH_DETAIL = 100;

	// _________________________________________________________________________

	constructor(scene) {
		// Create Plane
		const MATERIAL_PLANE = new MeshPhysicalMaterial({
			color: 0x666666,
		});

		const PLANE_GEOMETRY = new PlaneGeometry(4, 4, 100, 100);

		this.#PLANE = new Mesh(PLANE_GEOMETRY, MATERIAL_PLANE);

		// Rotate to Ground Flat
		this.#PLANE.rotation.x = -Math.PI / 2;

		// Add UserData for Raycasting
		this.#PLANE.userData.name = 'content-map';

		// Add to Scene
		scene.add(this.#PLANE);
	}
}
