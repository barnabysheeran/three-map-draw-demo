import { PerspectiveCamera } from 'three';

import CameraModuleLookat from './module/CameraModuleLookat.js';
import CameraModuleTheta from './module/CameraModuleTheta.js';
import CameraModulePhi from './module/CameraModulePhi.js';
import CameraModuleRadius from './module/CameraModuleRadius.js';
import CameraModuleOffset from './module/CameraModuleOffset.js';

import CameraKeyboardController from './keyboard/CameraKeyboardController.js';

export default class CameraController {
	#PERSPECTIVE_CAMERA;

	#CAMERA_MODULE_LOOKAT;
	#CAMERA_MODULE_THETA;
	#CAMERA_MODULE_PHI;
	#CAMERA_MODULE_RADIUS;
	#CAMERA_MODULE_OFFSET;

	#CAMERA_MODULES = [];

	#CAMERA_KEYBOARD_CONTROLLER;

	#LERP_DEFAULT = 0.05;
	#MOVEMENT_MINIMUM = 0.0001;

	#width = 0;
	#height = 0;

	#isInitialised = false;

	// _________________________________________________________________________

	constructor() {
		// Create Perspective Camera
		this.#PERSPECTIVE_CAMERA = new PerspectiveCamera(
			45,
			window.innerWidth / window.innerHeight,
			0.01,
			20.0,
		);

		// Create Module Lookat
		this.#CAMERA_MODULE_LOOKAT = new CameraModuleLookat(
			this.#LERP_DEFAULT,
			this.#MOVEMENT_MINIMUM,
		);

		this.#CAMERA_MODULES.push(this.#CAMERA_MODULE_LOOKAT);

		// Create Module Theta
		this.#CAMERA_MODULE_THETA = new CameraModuleTheta(
			this.#LERP_DEFAULT,
			this.#MOVEMENT_MINIMUM,
		);

		this.#CAMERA_MODULES.push(this.#CAMERA_MODULE_THETA);

		// Create Module Phi
		this.#CAMERA_MODULE_PHI = new CameraModulePhi(
			this.#LERP_DEFAULT,
			this.#MOVEMENT_MINIMUM,
		);

		this.#CAMERA_MODULES.push(this.#CAMERA_MODULE_PHI);

		// Create Module Radius
		this.#CAMERA_MODULE_RADIUS = new CameraModuleRadius(
			this.#LERP_DEFAULT,
			this.#MOVEMENT_MINIMUM,
		);

		this.#CAMERA_MODULES.push(this.#CAMERA_MODULE_RADIUS);

		// Create Module Offset
		this.#CAMERA_MODULE_OFFSET = new CameraModuleOffset(
			this.#LERP_DEFAULT,
			this.#MOVEMENT_MINIMUM,
		);

		this.#CAMERA_MODULES.push(this.#CAMERA_MODULE_OFFSET);

		// Create Keyboard Controller
		this.#CAMERA_KEYBOARD_CONTROLLER = new CameraKeyboardController(this);

		// TODO Tidy

		// ApplicationDispatcher Events - Camera
		// ApplicationDispatcher.on(
		// 	'camera-rotation-reset',
		// 	this.#onCameraRotationReset.bind(this),
		// );

		// Init
		this.tick(true);
	}

	// ____________________________________________________________________ Tick

	tick(update = false) {
		// Tick Modules
		let hasMoved = false;

		for (let i = 0; i < this.#CAMERA_MODULES.length; i += 1) {
			if (this.#CAMERA_MODULES[i].tick() === true) {
				hasMoved = true;
			}
		}

		// Update Camera ?
		if (hasMoved === true || update === true) {
			this.#updatePerspectiveCamera();

			return true;
		}

		// Initialised ?
		if (this.#isInitialised === false) {
			this.#updatePerspectiveCamera();

			this.#isInitialised = true;
		}

		return hasMoved;
	}

	// __________________________________________________________________ Update

	#updatePerspectiveCamera() {
		const LOOKAT_POSITION = this.#CAMERA_MODULE_LOOKAT.getPosition();
		const THETA = this.#CAMERA_MODULE_THETA.getTheta();
		const PHI = this.#CAMERA_MODULE_PHI.getPhi();
		const RADIUS = this.#CAMERA_MODULE_RADIUS.getRadius();
		const OFFSET = this.#CAMERA_MODULE_OFFSET.getOffset();

		const SIN_THETA = Math.sin(THETA);
		const COS_THETA = Math.cos(THETA);
		const SIN_PHI = Math.sin(PHI);
		const COS_PHI = Math.cos(PHI);

		// Set Camera Position
		this.#PERSPECTIVE_CAMERA.position.x =
			LOOKAT_POSITION.x + SIN_PHI * SIN_THETA * RADIUS;

		this.#PERSPECTIVE_CAMERA.position.y = LOOKAT_POSITION.y + COS_PHI * RADIUS;

		this.#PERSPECTIVE_CAMERA.position.z =
			LOOKAT_POSITION.z + SIN_PHI * COS_THETA * RADIUS;

		// Look At
		this.#PERSPECTIVE_CAMERA.lookAt(LOOKAT_POSITION);

		// Offset
		this.#PERSPECTIVE_CAMERA.setViewOffset(
			this.#width,
			this.#height,
			OFFSET.x,
			OFFSET.y,
			this.#width,
			this.#height,
		);
	}

	// ______________________________________________________________ Reset View

	resetViewingAngle(immediate = false) {
		this.#CAMERA_MODULE_RADIUS.zoomReset(immediate);
		this.#CAMERA_MODULE_THETA.resetThetaTarget(immediate);
		this.#CAMERA_MODULE_PHI.resetPhiTarget(immediate);

		// Immediate ?
		if (immediate === true) {
			this.tick(true);
		}
	}

	// ___________________________________________________________________ Theta

	setThetaTarget(thetaTarget) {
		this.#CAMERA_MODULE_THETA.setThetaTarget(thetaTarget);
	}

	moveThetaTarget(thetaDelta) {
		this.#CAMERA_MODULE_THETA.moveThetaTarget(thetaDelta);
	}

	setTheta(theta) {
		this.#CAMERA_MODULE_THETA.setTheta(theta);
	}

	setThetaBoundsEnabled(thetaBoundsEnabled) {
		this.#CAMERA_MODULE_THETA.setThetaBoundsEnabled(thetaBoundsEnabled);
	}

	// _____________________________________________________________________ Phi

	setPhiTarget(phiTarget) {
		this.#CAMERA_MODULE_PHI.setPhiTarget(phiTarget);
	}

	movePhiTarget(phiDelta) {
		this.#CAMERA_MODULE_PHI.movePhiTarget(phiDelta);
	}

	// __________________________________________________________________ Radius

	zoomIn() {
		this.#CAMERA_MODULE_RADIUS.zoomIn();
	}

	zoomOut() {
		this.#CAMERA_MODULE_RADIUS.zoomOut();
	}

	zoomReset() {
		this.#CAMERA_MODULE_RADIUS.zoomReset();
	}

	// ____________________________________________________________________ Size

	setSize(width, height) {
		// Set Perspective Camera Aspect
		this.#PERSPECTIVE_CAMERA.aspect = width / height;
		this.#PERSPECTIVE_CAMERA.updateProjectionMatrix();

		// TODO Tidy

		// Set Offset Size
		// this.#CAMERA_MODULE_OFFSET.setSize(height);

		// Store
		this.#width = width;
		this.#height = height;
	}

	// __________________________________________________________________ Access

	getPerspectiveCamera() {
		return this.#PERSPECTIVE_CAMERA;
	}

	getCameraFOVRadian() {
		return this.#PERSPECTIVE_CAMERA.fov * (Math.PI / 180);
	}

	getCameraPosition() {
		return this.#PERSPECTIVE_CAMERA.position;
	}
}
