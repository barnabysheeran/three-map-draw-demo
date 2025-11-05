import { MeshStandardMaterial, BoxGeometry, Mesh, AxesHelper } from 'three';

import ApplicationLogger from '../../application/ApplicationLogger.js';

import ContentMap from './map/ContentMap.js';
import ContentPath from './path/ContentPath.js';
import ContentWall from './wall/ContentWall.js';

export default class ContentController {
	#SCENE;

	#CONTENT_MAP;
	#CONTENT_PATH;
	#CONTENT_WALLS;

	// #DEMO_CUBE; // Removed, no longer used

	#LOG_LEVEL = 3;

	// _________________________________________________________________________

	constructor(scene) {
		ApplicationLogger.log(`ContentController`, this.#LOG_LEVEL);

		// Store Scene
		this.#SCENE = scene;

		// Create Axes Helper at Scene Origin
		this.#SCENE.add(new AxesHelper(1));

		// Create Content
		this.#CONTENT_MAP = new ContentMap(this.#SCENE);
		this.#CONTENT_PATH = new ContentPath(this.#SCENE);
		this.#CONTENT_WALLS = new ContentWall(this.#SCENE);
	}
}
