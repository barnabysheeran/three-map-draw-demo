import { MeshPhysicalMaterial, LineBasicMaterial } from 'three';
import ApplicationDispatcher from '../../../dispatcher/ApplicationDispatcher.js';

import ContentPathPoint from './path/ContentPathPoint.js';
import ContentPathLine from './path/ContentPathLine.js';

export default class ContentPath {
	#SCENE;

	#MATERIAL_POINT;
	#MATERIAL_LINE;

	#PATH_POINTS = [];
	#PATH_LINES = [];

	// _________________________________________________________________________

	constructor(scene) {
		// Store
		this.#SCENE = scene;

		// Application Dispatcher Events
		ApplicationDispatcher.on(
			'content-path-clear',
			this.#onContentPathClear.bind(this),
		);

		// Create Materials
		this.#MATERIAL_POINT = new MeshPhysicalMaterial({
			color: 0x00ff00,
			metalness: 0.5,
			roughness: 0.5,
		});

		this.#MATERIAL_LINE = new LineBasicMaterial({
			color: 0x00ff00,
		});

		// Dev - Add Sample Path Points
		for (let i = 0; i < 10; i++) {
			this.addPathPoint({
				x: Math.random() * 5 - 2.5,
				y: Math.random() * 5 - 2.5,
				z: Math.random() * 5 - 2.5,
			});
		}
	}

	// __________________________________________________________________ Events

	#onContentPathClear() {
		this.clear();
	}

	// _____________________________________________________________________ Add

	addPathPoint(position) {
		// TODO Tidy
		console.log('ContentPath: addPathPoint', position);

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

		console.log('Total Path Points:', TOTAL_PATH_POINTS);

		// Add Line ?
		if (TOTAL_PATH_POINTS > 1) {
			// Get Position Start
			const POSITION_START =
				this.#PATH_POINTS[TOTAL_PATH_POINTS - 2].getPosition();

			// Get Position End
			const POSITION_END =
				this.#PATH_POINTS[TOTAL_PATH_POINTS - 1].getPosition();

			console.log('Position Start:', POSITION_START);
			console.log('Position End:', POSITION_END);

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

		// Join ?
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
	}
}
