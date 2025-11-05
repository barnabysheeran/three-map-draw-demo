// TODO Privatise

export default class CameraModuleTheta {
	#thetaBoundsEnabled = false;

	// _________________________________________________________________________

	constructor(lerp, movementMinimum) {
		// Store
		this.LERP = lerp;
		this.MOVEMENT_MINIMUM = movementMinimum;

		// Const
		this.PI = Math.PI;
		this.TAU = Math.PI * 2.0;

		// Init
		this.THETA_DEFAULT = 0.0;

		this.thetaMinimum = -1.0;
		this.thetaMaximum = 1.0;

		this.theta = 0.0;
		this.thetaTarget = this.theta;

		this.#boundThetaTarget();
		this.#normaliseTheta();
	}

	// ____________________________________________________________________ Tick

	tick() {
		const { LERP, MOVEMENT_MINIMUM } = this;

		// Store
		const THETA_BEFORE = this.theta;

		// Lerp
		this.theta += (this.thetaTarget - this.theta) * LERP;

		// Moved ?
		if (Math.abs(this.theta - THETA_BEFORE) > MOVEMENT_MINIMUM) {
			return true;
		}

		return false;
	}

	// ____________________________________________________________ Theta Target

	setThetaTarget(thetaTarget) {
		this.thetaTarget = thetaTarget;

		this.#boundThetaTarget();
		this.#normaliseTheta();
	}

	resetThetaTarget(immediate) {
		// Set Target
		this.thetaTarget = this.THETA_DEFAULT;

		// Immediate ?
		if (immediate) {
			this.theta = this.THETA_DEFAULT;
		}

		this.#boundThetaTarget();
		this.#normaliseTheta();
	}

	moveThetaTarget(thetaDelta) {
		this.thetaTarget += thetaDelta;

		this.#boundThetaTarget();
		this.#normaliseTheta();
	}

	#boundThetaTarget() {
		// Bounds Enabled ?
		if (this.#thetaBoundsEnabled === false) {
			return;
		}

		if (this.thetaTarget < this.thetaMinimum) {
			this.thetaTarget = this.thetaMinimum;
		}

		if (this.thetaTarget > this.thetaMaximum) {
			this.thetaTarget = this.thetaMaximum;
		}
	}

	// ___________________________________________________________________ Theta

	setTheta(theta) {
		this.theta = theta;

		this.#normaliseTheta();
	}

	setThetaMinimum(thetaMinimum) {
		this.thetaMinimum = thetaMinimum;

		this.#boundThetaTarget();
	}

	setThetaMaximum(thetaMaximum) {
		this.thetaMaximum = thetaMaximum;

		this.#boundThetaTarget();
	}

	#normaliseTheta() {
		const { TAU } = this;

		// Keep Theta in range 0 - Tau
		if (this.theta > TAU) {
			this.theta -= TAU;
			this.thetaTarget -= TAU;
		}

		if (this.theta < -TAU) {
			this.theta += TAU;
			this.thetaTarget += TAU;
		}
	}

	// __________________________________________________________________ Bounds

	setThetaBoundsEnabled(thetaBoundsEnabled) {
		this.#thetaBoundsEnabled = thetaBoundsEnabled;
	}

	// __________________________________________________________________ Access

	getTheta() {
		return this.theta;
	}
}
