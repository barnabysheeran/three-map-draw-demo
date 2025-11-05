import { MeshPhysicalMaterial } from 'three';

import ContentWallSurface from './wall/ContentWallSurface.js';

export default class ContentWall {
	#SCENE;
	#WALL_SURFACE_MATERIAL;

	#WALL_SURFACES = [];

	// _________________________________________________________________________

	constructor(scene) {
		// Store
		this.#SCENE = scene;

		// Create Wall Surface Material
		this.#WALL_SURFACE_MATERIAL = new MeshPhysicalMaterial({
			color: 0xffffff,
			metalness: 0.0,
			roughness: 1.0,
			side: 2,
		});
	}

	// ___________________________________________________________________ Build

	buildWalls(positions, height) {
		// Clear Existing Walls
		this.clear();

		// Required Positions ?
		if (positions.length < 2) {
			console.warn(
				'ContentWall. buildWalls - Not enough positions to build walls',
			);
			return;
		}

		// Build Wall Surfaces
		for (let i = 0; i < positions.length - 1; i++) {
			// Get Current Position
			const CURRENT_POSITION = positions[i];

			// Get Next Position
			const NEXT_POSITION = positions[i + 1];

			// Create Wall Surface
			const WALL_SURFACE = new ContentWallSurface(
				this.#SCENE,
				CURRENT_POSITION,
				NEXT_POSITION,
				height,
				this.#WALL_SURFACE_MATERIAL,
			);

			// Store
			this.#WALL_SURFACES.push(WALL_SURFACE);
		}
	}

	// ___________________________________________________________________ Clear

	clear() {
		// Clear Wall Surfaces
		for (let i = 0; i < this.#WALL_SURFACES.length; i++) {
			this.#WALL_SURFACES[i].dispose();
		}

		this.#WALL_SURFACES = [];
	}
}
