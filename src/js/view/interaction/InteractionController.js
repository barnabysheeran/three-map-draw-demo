export default class InteractionController {
	#CAMERA_CONTROLLER;

	#PAN_SCALAR = Math.PI / 600.0;

	#panActive = false;
	#lastPanX = 0;
	#lastPanY = 0;

	// _________________________________________________________________________

	constructor(canvas, cameraController) {
		this.canvas = canvas;
		this.#CAMERA_CONTROLLER = cameraController;

		// Mouse events
		canvas.addEventListener('mousedown', this.#onPanStart.bind(this));
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

	#onPanStart(event) {
		this.#panActive = true;
		this.#lastPanX = event.clientX;
		this.#lastPanY = event.clientY;
	}

	#onPanMove(event) {
		if (!this.#panActive) return;
		const deltaX = event.clientX - this.#lastPanX;
		const deltaY = event.clientY - this.#lastPanY;

		this.#CAMERA_CONTROLLER.moveThetaTarget(-deltaX * this.#PAN_SCALAR);
		this.#CAMERA_CONTROLLER.movePhiTarget(-deltaY * this.#PAN_SCALAR);

		this.#lastPanX = event.clientX;
		this.#lastPanY = event.clientY;
	}

	#onPanEnd() {
		this.#panActive = false;
	}

	#onTouchStart(event) {
		if (event.touches.length === 1) {
			this.#panActive = true;
			this.#lastPanX = event.touches[0].clientX;
			this.#lastPanY = event.touches[0].clientY;
		}
	}

	#onTouchMove(event) {
		if (!this.#panActive || event.touches.length !== 1) return;
		event.preventDefault(); // Prevent scrolling

		const touch = event.touches[0];
		const deltaX = touch.clientX - this.#lastPanX;
		const deltaY = touch.clientY - this.#lastPanY;

		this.#CAMERA_CONTROLLER.moveThetaTarget(-deltaX * this.#PAN_SCALAR);
		this.#CAMERA_CONTROLLER.movePhiTarget(-deltaY * this.#PAN_SCALAR);

		this.#lastPanX = touch.clientX;
		this.#lastPanY = touch.clientY;
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
