import { AxesHelper } from 'three';

import ApplicationLogger from '../../application/ApplicationLogger.js';

import ContentIntersection from './intersection/ContentIntersection.js';
import ContentMap from './map/ContentMap.js';
import ContentPath from './path/ContentPath.js';
import ContentWall from './wall/ContentWall.js';
import ContentCursor from './cursor/ContentCursor.js';

export default class ContentController {
	#CONTENT_INTERSECTION;
	#CONTENT_MAP;
	#CONTENT_PATH;
	#CONTENT_WALLS;
	#CONTENT_CURSOR;

	// #DEMO_CUBE; // Removed, no longer used

	#LOG_LEVEL = 3;

	// _________________________________________________________________________

	constructor(scene, canvas, cameraController) {
		ApplicationLogger.log(`ContentController`, this.#LOG_LEVEL);

		// Create Axes Helper at Scene Origin
		// scene.add(new AxesHelper(1));

		// Create Content
		this.#CONTENT_INTERSECTION = new ContentIntersection(
			scene,
			canvas,
			cameraController,
		);

		this.#CONTENT_MAP = new ContentMap(scene);
		this.#CONTENT_PATH = new ContentPath(scene);
		this.#CONTENT_WALLS = new ContentWall(scene);
		this.#CONTENT_CURSOR = new ContentCursor(scene);
	}

	// ____________________________________________________________________ Tick

	tick() {
		// Order Important - Tick Intersection First
		this.#CONTENT_INTERSECTION.tick();

		const IS_OVER_MAP = this.#CONTENT_INTERSECTION.getIsOverMap();
		const MAP_INTERSECTION_POINT =
			this.#CONTENT_INTERSECTION.getMapIntersectionPoint();

		// Tick Content
		this.#CONTENT_CURSOR.tick(IS_OVER_MAP, MAP_INTERSECTION_POINT);
	}
}
