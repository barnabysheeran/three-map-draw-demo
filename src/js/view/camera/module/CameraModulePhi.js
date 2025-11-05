// TODO Privatise

export default class CameraModulePhi {
	// _________________________________________________________________________

	constructor(lerp, movementMinimum) {
		// Store
		this.LERP = lerp;
		this.MOVEMENT_MINIMUM = movementMinimum;

		// Init
		this.phiMinimum = Math.PI * 0.2;
		this.phiMaximum = Math.PI * 0.49;

		this.PHI_DEFAULT = Math.PI * 0.425;

		this.phi = this.PHI_DEFAULT;
		this.phiTarget = this.PHI_DEFAULT;
	}

	// ____________________________________________________________________ Tick

	tick() {
		const { LERP, MOVEMENT_MINIMUM } = this;

		// Store
		const PHI_BEFORE = this.phi;

		// Lerp
		this.phi += (this.phiTarget - this.phi) * LERP;

		// Moved ?
		if (Math.abs(this.phi - PHI_BEFORE) > MOVEMENT_MINIMUM) {
			return true;
		}

		return false;
	}

	// _____________________________________________________________________ Phi

	setPhiTarget(phiTarget) {
		this.phiTarget = phiTarget;

		this.boundPhiTarget();
	}

	resetPhiTarget(immediate) {
		// Set Target
		this.phiTarget = this.PHI_DEFAULT;

		// Immediate ?
		if (immediate) {
			this.phi = this.PHI_DEFAULT;
		}

		this.boundPhiTarget();
	}

	movePhiTarget(phiDelta) {
		this.phiTarget += phiDelta;

		this.boundPhiTarget();
	}

	setPhiMinimum(phiMinimum) {
		this.phiMinimum = phiMinimum;

		this.boundPhiTarget();
	}

	setPhiMaximum(phiMaximum) {
		this.phiMaximum = phiMaximum;

		this.boundPhiTarget();
	}

	boundPhiTarget() {
		const { phiMinimum, phiMaximum } = this;

		// Min
		if (this.phiTarget < phiMinimum) {
			this.phiTarget = phiMinimum;
		}

		// Max
		if (this.phiTarget > phiMaximum) {
			this.phiTarget = phiMaximum;
		}
	}

	// __________________________________________________________________ Access

	getPhi() {
		return this.phi;
	}
}
