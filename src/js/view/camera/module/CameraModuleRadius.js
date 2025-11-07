export default class CameraModuleRadius {
	#LERP;
	#MOVEMENT_MINIMUM;

	#RADIUS_ZOOM_DELTA = 2.0;

	#radiusMinimum = 2.0;
	#radiusDefault = 6.0;
	#radiusMaximum = 10.0;

	#radius = this.#radiusDefault;
	#radiusTarget = this.#radius;

	// _________________________________________________________________________

	constructor(lerp, movementMinimum) {
		// Store
		this.#LERP = lerp;
		this.#MOVEMENT_MINIMUM = movementMinimum;
	}

	// ____________________________________________________________________ Tick

	tick() {
		// Store
		const RADIUS_BEFORE = this.#radius;

		// Lerp
		this.#radius += (this.#radiusTarget - this.#radius) * this.#LERP;

		// Moved ?
		if (Math.abs(this.#radius - RADIUS_BEFORE) > this.#MOVEMENT_MINIMUM) {
			return true;
		}

		return false;
	}

	// ____________________________________________________________________ Zoom

	zoomIn() {
		this.#radiusTarget -= this.#RADIUS_ZOOM_DELTA;

		this.boundRadius();
	}

	zoomOut() {
		this.#radiusTarget += this.#RADIUS_ZOOM_DELTA;

		this.boundRadius();
	}

	zoomReset(immediate) {
		// Target
		this.#radiusTarget = this.#radiusDefault;

		// Immediate ?
		if (immediate === true) {
			this.#radius = this.#radiusDefault;
		}

		this.boundRadius();
	}

	// __________________________________________________________________ Radius

	setRadiusMinimum(radiusMinimum) {
		this.#radiusMinimum = radiusMinimum;

		this.boundRadius();
	}

	setRadiusMaximum(radiusMaximum) {
		this.#radiusMaximum = radiusMaximum;

		this.boundRadius();
	}

	setRadiusTarget(radiusTarget) {
		this.#radiusTarget = radiusTarget;

		this.boundRadius();
	}

	setRadiusDefault(radiusDefault) {
		this.#radiusDefault = radiusDefault;

		this.boundRadius();
	}

	setRadius(radius) {
		this.#radius = radius;

		this.boundRadius();
	}

	// ___________________________________________________________________ Bound

	boundRadius() {
		if (this.#radiusTarget < this.#radiusMinimum) {
			this.#radiusTarget = this.#radiusMinimum;
		}

		if (this.#radiusTarget > this.#radiusMaximum) {
			this.#radiusTarget = this.#radiusMaximum;
		}
	}

	// __________________________________________________________________ Access

	getRadius() {
		return this.#radius;
	}
}
