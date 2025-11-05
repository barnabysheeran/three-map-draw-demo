import { MeshPhysicalMaterial, LineBasicMaterial } from 'three';

import ContentPathPoint from './path/ContentPathPoint.js';
import ContentPathLine from './path/ContentPathLine.js';

export default class ContentPath {
	#SCENE;

	#MATERIAL_POINT;
	#MATERIAL_LINE;

	#PATH_POINTS = [];
	#PATH_LINES = [];

	#DISTANCE_CLOSE_LOOP = 0.1;

	#isClosed = false;

	// _________________________________________________________________________

	constructor(scene) {
		// Store
		this.#SCENE = scene;

		// Create Materials
		this.#MATERIAL_POINT = new MeshPhysicalMaterial({
			color: 0x00ff00,
			metalness: 0.5,
			roughness: 0.5,
		});

		this.#MATERIAL_LINE = new LineBasicMaterial({
			color: 0x00ff00,
		});
	}

	// _____________________________________________________________________ Add

	addPoint(position) {
		// Complete ?
		if (this.#isClosed) {
			return;
		}

		// Check Close Loop ?
		if (this.#PATH_POINTS.length > 2) {
			// Get First Point Position
			const FIRST_POINT_POSITION = this.#PATH_POINTS[0].getPosition();

			// Calculate Distance
			const DISTANCE = position.distanceTo(FIRST_POINT_POSITION);

			if (DISTANCE < this.#DISTANCE_CLOSE_LOOP) {
				// Close Loop
				this.#addPointCloseLoop(FIRST_POINT_POSITION);

				return;
			}
		}

		// Add Path Point
		this.#addPathPoint(position);
	}

	#addPathPoint(position) {
		// Create Path Point
		const PATH_POINT = new ContentPathPoint(
			this.#SCENE,
			position,
			this.#MATERIAL_POINT,
		);

		// Store
		this.#PATH_POINTS.push(PATH_POINT);

		// Get Total Path Points
		const TOTAL_PATH_POINTS = this.#PATH_POINTS.length;

		// Add Line ?
		if (TOTAL_PATH_POINTS > 1) {
			// Get Position Start
			const POSITION_START =
				this.#PATH_POINTS[TOTAL_PATH_POINTS - 2].getPosition();

			// Get Position End
			const POSITION_END =
				this.#PATH_POINTS[TOTAL_PATH_POINTS - 1].getPosition();

			// Create Path Line
			const PATH_LINE = new ContentPathLine(
				this.#SCENE,
				POSITION_START,
				POSITION_END,
				this.#MATERIAL_LINE,
			);

			// Store
			this.#PATH_LINES.push(PATH_LINE);
		}
	}

	#addPointCloseLoop(positionFirstPoint) {
		// Add Line to Close Loop
		const POSITION_START =
			this.#PATH_POINTS[this.#PATH_POINTS.length - 1].getPosition();

		const POSITION_END = positionFirstPoint;

		// Create Path Line
		const PATH_LINE = new ContentPathLine(
			this.#SCENE,
			POSITION_START,
			POSITION_END,
			this.#MATERIAL_LINE,
		);

		// Store
		this.#PATH_LINES.push(PATH_LINE);

		// Complete
		this.#isClosed = true;
	}

	// ___________________________________________________________________ Clear

	clear() {
		// Clear Path Points
		this.#PATH_POINTS.forEach((pathPoint) => {
			pathPoint.dispose();
		});

		this.#PATH_POINTS = [];

		// Clear Path Lines
		this.#PATH_LINES.forEach((pathLine) => {
			pathLine.dispose();
		});

		this.#PATH_LINES = [];

		// Not Complete
		this.#isClosed = false;
	}

	// __________________________________________________________________ Access

	getIsClosed() {
		return this.#isClosed;
	}

	getPositions() {
		const POSITIONS = [];

		for (let i = 0; i < this.#PATH_POINTS.length; i++) {
			POSITIONS.push(this.#PATH_POINTS[i].getPosition().clone());
		}

		return POSITIONS;
	}
}
