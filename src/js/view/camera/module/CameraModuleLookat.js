import { Vector3 } from 'three';

// TODO Privatise

export default class CameraModuleLookat {
	// _________________________________________________________________________

	constructor(lerp, movementMinimum) {
		// Store
		this.LERP = lerp;
		this.MOVEMENT_MINIMUM = movementMinimum;

		// Init
		this.POSITION = new Vector3(0.0, 0.0, 0.0);
		this.TARGET = this.POSITION.clone();
	}

	// ____________________________________________________________________ Tick

	tick() {
		const { POSITION, TARGET, LERP, MOVEMENT_MINIMUM } = this;

		// Store
		const POSITION_BEFORE = POSITION.clone();

		// Lerp
		POSITION.x += (TARGET.x - POSITION.x) * LERP;
		POSITION.y += (TARGET.y - POSITION.y) * LERP;
		POSITION.z += (TARGET.z - POSITION.z) * LERP;

		// Moved ?
		if (POSITION_BEFORE.distanceTo(POSITION) > MOVEMENT_MINIMUM) {
			return true;
		}

		return false;
	}

	// _____________________________________________________________________ Set

	setPosition(x, y, z) {
		const { POSITION } = this;

		POSITION.x = x;
		POSITION.y = y;
		POSITION.z = z;
	}

	setTarget(x, y, z) {
		const { TARGET } = this;

		TARGET.x = x;
		TARGET.y = y;
		TARGET.z = z;
	}

	// __________________________________________________________________ Access

	getPosition() {
		return this.POSITION;
	}
}
