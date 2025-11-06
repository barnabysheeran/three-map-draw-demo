import ApplicationDispatcher from '../../dispatcher/ApplicationDispatcher.js';

export default class InteractionController {
	#CAMERA_CONTROLLER;

	#PAN_SCALAR = Math.PI / 600.0;

	#isMouseDown = false;

	#mouseDownX = 0;
	#mouseDownY = 0;

	#previousMouseX = 0;
	#previousMouseY = 0;

	// TODO Hard-Coded Click Threshold
	#pixelsMovedThreshold = 10;
	#pixelsMovedThresholdSquared =
		this.#pixelsMovedThreshold * this.#pixelsMovedThreshold;

	// TODO Bind events so they can be removed later if needed

	// _________________________________________________________________________

	constructor(canvas, cameraController) {
		// Store
		this.#CAMERA_CONTROLLER = cameraController;

		// Mouse events
		canvas.addEventListener('mousedown', this.#onMouseDown.bind(this));
		canvas.addEventListener('mousemove', this.#onPanMove.bind(this));
		canvas.addEventListener('mouseup', this.#onPanEnd.bind(this));
		canvas.addEventListener('mouseleave', this.#onPanEnd.bind(this));

		// Touch events
		canvas.addEventListener('touchstart', this.#onTouchStart.bind(this), {
			passive: false,
		});
		canvas.addEventListener('touchmove', this.#onTouchMove.bind(this), {
			passive: false,
		});
		canvas.addEventListener('touchend', this.#onPanEnd.bind(this));

		// Wheel
		canvas.addEventListener('wheel', this.#onWheel.bind(this), {
			passive: true,
		});
	}

	// _____________________________________________________________________ Pan

	#onMouseDown(event) {
		// Store Last Mouse Position
		this.#previousMouseX = event.clientX;
		this.#previousMouseY = event.clientY;

		// Store Mouse Down Position
		this.#mouseDownX = event.clientX;
		this.#mouseDownY = event.clientY;

		// Down
		this.#isMouseDown = true;
	}

	#onPanMove(event) {
		// Mouse is Down ?
		if (!this.#isMouseDown) {
			return;
		}

		// Mouse is Down
		const deltaX = event.clientX - this.#previousMouseX;
		const deltaY = event.clientY - this.#previousMouseY;

		this.#CAMERA_CONTROLLER.moveThetaTarget(-deltaX * this.#PAN_SCALAR);
		this.#CAMERA_CONTROLLER.movePhiTarget(-deltaY * this.#PAN_SCALAR);

		this.#previousMouseX = event.clientX;
		this.#previousMouseY = event.clientY;
	}

	#onPanEnd() {
		// Calculate Distance from Mouse Down to Mouse Up
		const deltaX = this.#previousMouseX - this.#mouseDownX;
		const deltaY = this.#previousMouseY - this.#mouseDownY;
		const distanceSquared = deltaX * deltaX + deltaY * deltaY;

		// If Distance Squared is Less than Threshold Squared, it's a Click
		if (distanceSquared < this.#pixelsMovedThresholdSquared) {
			ApplicationDispatcher.dispatch('interaction-controller-click', {
				mouseX: this.#previousMouseX,
				mouseY: this.#previousMouseY,
			});
		}

		// Not Down
		this.#isMouseDown = false;
	}

	#onTouchStart(event) {
		if (event.touches.length === 1) {
			this.#isMouseDown = true;
			this.#previousMouseX = event.touches[0].clientX;
			this.#previousMouseY = event.touches[0].clientY;
		}
	}

	#onTouchMove(event) {
		if (!this.#isMouseDown || event.touches.length !== 1) return;
		event.preventDefault(); // Prevent scrolling

		const touch = event.touches[0];
		const deltaX = touch.clientX - this.#previousMouseX;
		const deltaY = touch.clientY - this.#previousMouseY;

		this.#CAMERA_CONTROLLER.moveThetaTarget(-deltaX * this.#PAN_SCALAR);
		this.#CAMERA_CONTROLLER.movePhiTarget(-deltaY * this.#PAN_SCALAR);

		this.#previousMouseX = touch.clientX;
		this.#previousMouseY = touch.clientY;
	}

	// ___________________________________________________________________ Wheel

	#onWheel(event) {
		if (event.deltaY < 0.0) {
			this.#CAMERA_CONTROLLER.zoomOut();
		} else if (event.deltaY > 0.0) {
			this.#CAMERA_CONTROLLER.zoomIn();
		}
	}
}
