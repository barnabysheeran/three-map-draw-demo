import { Raycaster, Vector2 } from 'three';

export default class ContentIntersection {
	#SCENE;
	#CANVAS;
	#CAMERA_CONTROLLER;

	#RAYCASTER;
	#POSITION_MOUSE;

	#isOverMap = false;
	#mapIntersectionPoint = null;

	// _________________________________________________________________________

	constructor(scene, canvas, cameraController) {
		this.#SCENE = scene;
		this.#CANVAS = canvas;
		this.#CAMERA_CONTROLLER = cameraController;

		// Create Raycaster
		this.#RAYCASTER = new Raycaster();
		this.#POSITION_MOUSE = new Vector2();

		// Track Mouse position
		this.#CANVAS.addEventListener('mousemove', this.#onMouseMove.bind(this));
	}

	// __________________________________________________________________ Events

	#onMouseMove(event) {
		const rect = this.#CANVAS.getBoundingClientRect();
		this.#POSITION_MOUSE.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
		this.#POSITION_MOUSE.y = -(
			((event.clientY - rect.top) / rect.height) * 2 -
			1
		);
	}

	// ____________________________________________________________________ Tick

	tick() {
		// Set Raycaster
		this.#RAYCASTER.setFromCamera(
			this.#POSITION_MOUSE,
			this.#CAMERA_CONTROLLER.getPerspectiveCamera(),
		);

		// Intersect objects in the scene
		const INTERSECTS = this.#RAYCASTER.intersectObjects(
			this.#SCENE.children,
			true,
		);

		// Map Intersection

		// Log all intersected objects
		// console.log(
		// 	'Intersected objects:',
		// 	intersects.map((i) => i.object),
		// );
	}
}
