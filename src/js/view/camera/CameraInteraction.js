import Hammer from 'hammerjs';

import ApplicationDispatcher from '../../application/ApplicationDispatcher';

export default class CameraInteraction {
	#CAMERA_CONTROLLER;
	#HOLDER;

	#PAN_SCALAR = Math.PI / 600.0;
	#PINCH_SCALE_TRIGGER = 0.05;

	#panDeltaX = 0;
	#panDeltaY = 0;

	#pinchScale = 0;

	// _________________________________________________________________________

	constructor(container, cameraController) {
		// Store
		this.#CAMERA_CONTROLLER = cameraController;

		// Create Holder
		this.#HOLDER = document.createElement('div');
		this.#HOLDER.className = 'view-camera-interaction';
		container.appendChild(this.#HOLDER);

		// Hammer
		const HAMMER = new Hammer(this.#HOLDER);

		// Pan
		HAMMER.get('pan').set({ direction: Hammer.DIRECTION_ALL });
		HAMMER.on('panstart', this.onPanStart.bind(this));
		HAMMER.on('pan', this.onPan.bind(this));

		// Pinch
		HAMMER.get('pinch').set({ enable: true });
		HAMMER.on('pinchstart', this.onPinchStart.bind(this));
		HAMMER.on('pinchmove', this.onPinchMove.bind(this));

		// Tap
		HAMMER.get('tap').set({ taps: 2, interval: 500 });
		HAMMER.on('tap', this.onTapDouble.bind(this));

		// Wheel
		this.#HOLDER.addEventListener('wheel', this.#onWheel.bind(this), {
			passive: true,
		});

		// Application Dispatcher Events
		ApplicationDispatcher.on(
			'camera-interaction-enable',
			this.#onCameraInteractionEnable.bind(this),
		);

		ApplicationDispatcher.on(
			'camera-interaction-disable',
			this.#onCameraInteractionDisable.bind(this),
		);
	}

	// _____________________________________________________________________ Pan

	onPanStart() {
		// Reset
		this.#panDeltaX = 0;
		this.#panDeltaY = 0;
	}

	onPan(event) {
		// Calc
		const DELTA_X = event.deltaX - this.#panDeltaX;
		const DELTA_Y = event.deltaY - this.#panDeltaY;

		// Rotate Camera
		this.#CAMERA_CONTROLLER.moveThetaTarget(-DELTA_X * this.#PAN_SCALAR);
		this.#CAMERA_CONTROLLER.movePhiTarget(-DELTA_Y * this.#PAN_SCALAR);

		// Store
		this.#panDeltaX = event.deltaX;
		this.#panDeltaY = event.deltaY;
	}

	// ___________________________________________________________________ Pinch

	onPinchStart() {
		// Reset
		this.#pinchScale = 1.0;
	}

	onPinchMove(event) {
		// Zoom
		if (event.scale > this.#pinchScale + this.#PINCH_SCALE_TRIGGER) {
			this.#CAMERA_CONTROLLER.zoomIn();

			this.#pinchScale = event.scale;
		} else if (event.scale < this.#pinchScale - this.#PINCH_SCALE_TRIGGER) {
			this.#CAMERA_CONTROLLER.zoomOut();

			this.#pinchScale = event.scale;
		}
	}

	// _____________________________________________________________________ Tap

	onTapDouble() {
		this.#CAMERA_CONTROLLER.resetViewingAngle();
	}

	// ___________________________________________________________________ Wheel

	#onWheel(event) {
		// Zoom
		if (event.deltaY < 0.0) {
			this.#CAMERA_CONTROLLER.zoomOut();
		} else if (event.deltaY > 0.0) {
			this.#CAMERA_CONTROLLER.zoomIn();
		}
	}

	// __________________________________________________________ Enable Disable

	#onCameraInteractionEnable() {
		this.#HOLDER.classList.remove('hidden');
	}

	#onCameraInteractionDisable() {
		this.#HOLDER.classList.add('hidden');
	}
}
