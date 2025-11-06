import {
	PlaneGeometry,
	MeshPhysicalMaterial,
	Mesh,
	TextureLoader,
} from 'three';

export default class ContentMap {
	#PLANE;

	#MESH_DETAIL = 100;

	#textureLoader = new TextureLoader();

	// _________________________________________________________________________

	constructor(scene) {
		// Create Plane
		const MATERIAL_PLANE = new MeshPhysicalMaterial({
			color: 0x666666,
		});

		const PLANE_GEOMETRY = new PlaneGeometry(
			4,
			4,
			this.#MESH_DETAIL,
			this.#MESH_DETAIL,
		);

		this.#PLANE = new Mesh(PLANE_GEOMETRY, MATERIAL_PLANE);

		// Rotate to Ground Flat
		this.#PLANE.rotation.x = -Math.PI / 2;

		// Receive Shadows
		this.#PLANE.receiveShadow = true;

		// Add UserData for Raycasting
		this.#PLANE.userData.name = 'content-map';

		// Add to Scene
		scene.add(this.#PLANE);
	}

	// __________________________________________________________________ Events

	loadMapTexture(lat, lon, zoom) {
		// TODO Hard-Coded Map Provider URL

		const { x, y } = this.#latLonToTile(lat, lon, zoom);

		const url = `https://tile.openstreetmap.org/${zoom}/${x}/${y}.png`;

		this.#textureLoader.load(url, (texture) => {
			this.#PLANE.material.map = texture;
			this.#PLANE.material.needsUpdate = true;
		});
	}

	// ___________________________________________________________________ Utils

	#latLonToTile(lat, lon, zoom) {
		const x = Math.floor(((lon + 180) / 360) * Math.pow(2, zoom));

		const y = Math.floor(
			((1 -
				Math.log(
					Math.tan((lat * Math.PI) / 180) + 1 / Math.cos((lat * Math.PI) / 180),
				) /
					Math.PI) /
				2) *
				Math.pow(2, zoom),
		);

		return { x, y };
	}
}
