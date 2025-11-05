import { Line, BufferGeometry } from 'three';

export default class ContentPathLine {
	#SCENE;
	#LINE;

	#DISTANCE_CUTOUT_ENDS = 0.06;

	// _________________________________________________________________________

	constructor(scene, positionStart, positionEnd, material) {
		// Store
		this.#SCENE = scene;

		// Calculate Direction Vector
		const DIRECTION = positionEnd.clone().sub(positionStart).normalize();

		// Adjust Start and End Positions to Cut Out Ends
		const ADJUSTED_START = positionStart
			.clone()
			.add(DIRECTION.clone().multiplyScalar(this.#DISTANCE_CUTOUT_ENDS));

		const ADJUSTED_END = positionEnd
			.clone()
			.sub(DIRECTION.clone().multiplyScalar(this.#DISTANCE_CUTOUT_ENDS));

		// Calculate Length
		const LENGTH = ADJUSTED_START.distanceTo(ADJUSTED_END);
		console.log('ContentPathLine: Length:', LENGTH);

		if (LENGTH <= 0) {
			console.warn(
				'ContentPathLine: Length is zero or negative, skipping line creation.',
			);
			return;
		}

		// Create Geometry
		const GEOMETRY = new BufferGeometry().setFromPoints([
			ADJUSTED_START,
			ADJUSTED_END,
		]);

		// Create Line
		this.#LINE = new Line(GEOMETRY, material);

		// Add to Scene
		scene.add(this.#LINE);
	}

	// _________________________________________________________________ Dispose

	dispose() {
		console.log('ContentPathLine: dispose');

		// Dispose Line
		if (this.#LINE) {
			this.#SCENE.remove(this.#LINE);
			this.#LINE.geometry.dispose();
			this.#LINE.material.dispose();
			this.#LINE = null;
		}
	}
}
