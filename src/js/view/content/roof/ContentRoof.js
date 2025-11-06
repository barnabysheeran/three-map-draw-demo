import { MeshPhysicalMaterial, Shape, ShapeGeometry, Mesh } from 'three';

export default class ContentRoof {
	#SCENE;

	#ROOF_MATERIAL;
	#ROOF;

	// TODO Centralise, Match with Wall
	#DISTANCE_ABOVE_GROUND = 0.01;

	// _________________________________________________________________________

	constructor(scene) {
		// Store
		this.#SCENE = scene;

		// Create Wall Surface Material
		this.#ROOF_MATERIAL = new MeshPhysicalMaterial({
			color: 0xffffff,
			metalness: 0.0,
			roughness: 1.0,
			side: 2,
		});
	}

	// ___________________________________________________________________ Build

	buildRoof(positions, height) {
		// Clear Existing Roof
		this.clear();

		// Required Positions ?
		if (positions.length < 3) {
			console.warn(
				'ContentRoof. buildRoof - Not enough positions to build roof',
			);
			return;
		}

		// Create Roof Shape
		const SHAPE = new Shape();

		SHAPE.moveTo(positions[0].x, positions[0].z);

		for (let i = 1; i < positions.length; i++) {
			SHAPE.lineTo(positions[i].x, positions[i].z);
		}
		SHAPE.lineTo(positions[0].x, positions[0].z);

		// Create Geometry
		const GEOMETRY = new ShapeGeometry(SHAPE);

		// Create Mesh
		this.#ROOF = new Mesh(GEOMETRY, this.#ROOF_MATERIAL);

		// Rotate Roof to Horizontal
		this.#ROOF.rotation.x = Math.PI / 2;

		// Position Roof at Height
		this.#ROOF.position.y = height + this.#DISTANCE_ABOVE_GROUND;

		// Add to scene
		this.#SCENE.add(this.#ROOF);
	}

	// ___________________________________________________________________ Clear

	clear() {
		// Remove Roof from Scene
		if (this.#ROOF) {
			this.#SCENE.remove(this.#ROOF);
			this.#ROOF.geometry.dispose();
			this.#ROOF.material.dispose();
			this.#ROOF = null;
		}
	}
}
