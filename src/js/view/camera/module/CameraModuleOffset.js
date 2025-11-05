import { Vector2 } from 'three';

export default class CameraModuleOffset {
	#LERP;
	#MOVEMENT_MINIMUM;

	#offset = new Vector2(0.0, 0.0);
	#offsetTarget = new Vector2(0.0, 0.0);

	#hasMoved = false;

	// _________________________________________________________________________

	constructor(lerp, movementMinimum) {
		// Store
		this.#LERP = lerp;
		this.#MOVEMENT_MINIMUM = movementMinimum;
	}

	// ____________________________________________________________________ Tick

	tick() {
		// Store
		const OFFSET_BEFORE = this.#offset.clone();

		// Lerp
		this.#offset.x += (this.#offsetTarget.x - this.#offset.x) * this.#LERP;
		this.#offset.y += (this.#offsetTarget.y - this.#offset.y) * this.#LERP;

		// Moved ?
		if (OFFSET_BEFORE.distanceTo(this.#offset) > this.#MOVEMENT_MINIMUM) {
			return true;
		}

		// Has Moved ?
		if (this.#hasMoved === true) {
			this.#hasMoved = false;
			return true;
		}

		// Not Moved
		return false;
	}

	// _____________________________________________________________________ Set

	// TODO Tidy

	// #setOffset(offsetX, offsetY) {
	// 	this.#offset.x = offsetX;
	// 	this.#offset.y = offsetY;
	// }

	// #setTarget(offsetX, offsetY) {
	// 	this.#offsetTarget.x = offsetX;
	// 	this.#offsetTarget.y = offsetY;
	// }

	// __________________________________________________________________ Access

	getOffset() {
		return this.#offset;
	}
}
