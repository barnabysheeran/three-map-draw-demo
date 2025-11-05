import { Scene } from 'three';

import ApplicationConfiguration from '../application/ApplicationConfiguration.js';
import ApplicationLogger from '../application/ApplicationLogger.js';

import CameraController from './camera/CameraController.js';
import LightController from './light/LightController.js';
import ContentController from './content/ContentController.js';
import RenderController from './render/RenderController.js';

import InteractionController from './interaction/InteractionController.js';

export default class View {
	#CANVAS;
	#SCENE;

	#CAMERA_CONTROLLER;
	#LIGHT_CONTROLLER;
	#CONTENT_CONTROLLER;
	#RENDER_CONTROLLER;
	#INTERACTION_CONTROLLER;

	#canvasWidth = 0;
	#canvasHeight = 0;

	#LOG_LEVEL = 2;

	// _________________________________________________________________________

	constructor() {
		ApplicationLogger.log(`View`, this.#LOG_LEVEL);

		// Get Application Container
		const APPLICATION_CONTAINER =
			ApplicationConfiguration.getApplicationContainer();

		// Create Canvas
		this.#CANVAS = document.createElement('canvas');
		this.#CANVAS.id = 'canvas-view';
		this.#CANVAS.className = 'canvas-view';
		APPLICATION_CONTAINER.appendChild(this.#CANVAS);

		// Create Scene
		this.#SCENE = new Scene();

		// Order Important - Create Renderer First to Get Anisotropy Max
		this.#RENDER_CONTROLLER = new RenderController(this.#CANVAS);

		// Create Controllers
		this.#CAMERA_CONTROLLER = new CameraController();

		this.#LIGHT_CONTROLLER = new LightController(this.#SCENE);

		this.#CONTENT_CONTROLLER = new ContentController(
			this.#SCENE,
			this.#CANVAS,
			this.#CAMERA_CONTROLLER,
		);

		this.#INTERACTION_CONTROLLER = new InteractionController(
			this.#CANVAS,
			this.#CAMERA_CONTROLLER,
		);
	}

	// ____________________________________________________________________ Tick

	tick() {
		// Order Important

		// Resized ?
		const CANVAS_RECT = this.#CANVAS.getBoundingClientRect();

		if (
			CANVAS_RECT.width !== this.#canvasWidth ||
			CANVAS_RECT.height !== this.#canvasHeight
		) {
			this.#setSize(CANVAS_RECT.width, CANVAS_RECT.height);
		}

		// Update Camera
		this.#CAMERA_CONTROLLER.tick();

		// Update Content
		this.#CONTENT_CONTROLLER.tick();

		// Render
		this.#RENDER_CONTROLLER.render(
			this.#SCENE,
			this.#CAMERA_CONTROLLER.getPerspectiveCamera(),
		);
	}

	// ____________________________________________________________________ Size

	#setSize(width, height) {
		ApplicationLogger.log(
			`View. setSize to ${width} x ${height}`,
			this.#LOG_LEVEL,
		);

		// Controllers
		this.#CAMERA_CONTROLLER.setSize(width, height);
		this.#RENDER_CONTROLLER.setSize(width, height);

		// Store
		this.#canvasWidth = width;
		this.#canvasHeight = height;
	}
}
