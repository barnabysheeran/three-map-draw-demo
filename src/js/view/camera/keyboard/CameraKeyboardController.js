export default class CameraKeyboardController {
	#CAMERA_CONTROLLER;

	#ROTATION_THETA_RADIAN = 0.05;

	// _________________________________________________________________________

	constructor(cameraController) {
		// Store
		this.#CAMERA_CONTROLLER = cameraController;

		// Start Keyboard Event Listener
		this.#startKeyboardListeners();
	}

	// ___________________________________________________________________ Start

	#startKeyboardListeners() {
		// Start Keyboard Event Listener
		window.addEventListener('keydown', this.#onKeyDown.bind(this));
	}

	// ________________________________________________________________ Key Down

	#onKeyDown(event) {
		this.#processKeyCode(event.keyCode);
	}

	// ________________________________________________________ Process Key Code

	#processKeyCode(keyCode) {
		// console.log('CameraKeyboardController #onKeyUp event', event);

		// Cursor Up - Zoom In
		if (keyCode === 38) {
			this.#CAMERA_CONTROLLER.zoomIn();
		}

		// Cursor Down - Zoom Out
		if (keyCode === 40) {
			this.#CAMERA_CONTROLLER.zoomOut();
		}

		// Cursor Left - Rotate Left
		if (keyCode === 37) {
			this.#CAMERA_CONTROLLER.moveThetaTarget(-this.#ROTATION_THETA_RADIAN);
		}

		// Cursor Right - Rotate Right
		if (keyCode === 39) {
			this.#CAMERA_CONTROLLER.moveThetaTarget(this.#ROTATION_THETA_RADIAN);
		}
	}
}
