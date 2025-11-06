import { AxesHelper } from 'three';

import ApplicationLogger from '../../application/ApplicationLogger.js';
import ApplicationDispatcher from '../../dispatcher/ApplicationDispatcher.js';

import ContentIntersection from './intersection/ContentIntersection.js';
import ContentMap from './map/ContentMap.js';
import ContentPath from './path/ContentPath.js';
import ContentWall from './wall/ContentWall.js';
import ContentRoof from './roof/ContentRoof.js';
// import ContentCursor from './cursor/ContentCursor.js';

export default class ContentController {
	#CONTENT_INTERSECTION;
	#CONTENT_MAP;
	#CONTENT_PATH;
	#CONTENT_WALL;
	#CONTENT_ROOF;
	// #CONTENT_CURSOR;

	#LOG_LEVEL = 3;

	// _________________________________________________________________________

	constructor(scene, canvas, cameraController) {
		ApplicationLogger.log(`ContentController`, this.#LOG_LEVEL);

		// Create Axes Helper at Scene Origin
		// scene.add(new AxesHelper(1));

		// Create Intersection
		this.#CONTENT_INTERSECTION = new ContentIntersection(
			scene,
			canvas,
			cameraController,
		);

		// Create Content
		this.#CONTENT_MAP = new ContentMap(scene);
		this.#CONTENT_PATH = new ContentPath(scene);
		this.#CONTENT_WALL = new ContentWall(scene);
		this.#CONTENT_ROOF = new ContentRoof(scene);
		// this.#CONTENT_CURSOR = new ContentCursor(scene);

		// Application Dispatcher Events Interaction
		ApplicationDispatcher.on(
			'interaction-controller-click',
			this.#onInteractionControllerClick.bind(this),
		);

		// Application Dispatcher Events UI
		ApplicationDispatcher.on(
			'content-path-clear',
			this.#onContentPathClear.bind(this),
		);

		ApplicationDispatcher.on(
			'content-wall-build',
			this.#onContentWallBuild.bind(this),
		);

		ApplicationDispatcher.on(
			'content-wall-clear',
			this.#onContentWallClear.bind(this),
		);
	}

	// ____________________________________________________________________ Tick

	// Per Frame Intersection Update required only for Cursor Positioning

	// tick() {
	// 	// Order Important - Tick Intersection First
	// 	this.#CONTENT_INTERSECTION.tick();
	// }

	// __________________________________________________________________ Events

	#onContentPathClear() {
		this.#CONTENT_PATH.clear();
	}

	#onContentWallBuild(eventData) {
		// Get Points from Path
		const POSITIONS = this.#CONTENT_PATH.getPositions();
		const IS_CLOSED = this.#CONTENT_PATH.getIsClosed();

		// Build Walls
		this.#CONTENT_WALL.buildWalls(POSITIONS, eventData.height, IS_CLOSED);

		if (IS_CLOSED) {
			// Build Roof
			this.#CONTENT_ROOF.buildRoof(POSITIONS, eventData.height);
		}
	}

	#onContentWallClear() {
		// Walls
		this.#CONTENT_WALL.clear();

		// Roof
		this.#CONTENT_ROOF.clear();
	}

	#onInteractionControllerClick() {
		// Order Important - Tick Intersection First for Mobile
		this.#CONTENT_INTERSECTION.tick();

		const IS_OVER_MAP = this.#CONTENT_INTERSECTION.getIsOverMap();

		const MAP_INTERSECTION_POINT =
			this.#CONTENT_INTERSECTION.getMapIntersectionPoint();

		// Path
		if (IS_OVER_MAP) {
			this.#CONTENT_PATH.addPoint(MAP_INTERSECTION_POINT);
		}
	}
}
