import ApplicationDispatcher from '../../dispatcher/ApplicationDispatcher.js';

export default class UIMenuWall {
	#HOLDER;

	#height = 1;

	// _________________________________________________________________________

	constructor(container) {
		// Create Holder
		this.#HOLDER = document.createElement('div');
		this.#HOLDER.id = 'ui-menu';
		this.#HOLDER.className = 'ui-menu';
		container.appendChild(this.#HOLDER);

		// Add Title
		const title = document.createElement('div');
		title.className = 'ui-title';
		title.innerText = 'Wall';
		this.#HOLDER.appendChild(title);

		// Add Input for Height
		const heightInput = document.createElement('input');
		heightInput.className = 'ui-input';
		heightInput.type = 'text';
		heightInput.value = this.#height;
		this.#HOLDER.appendChild(heightInput);

		heightInput.addEventListener('input', this.#onHeightInputChange.bind(this));

		// Add Button Wall Build
		const buttonWallBuild = document.createElement('div');
		buttonWallBuild.className = 'ui-button';
		buttonWallBuild.innerText = 'BUILD';
		this.#HOLDER.appendChild(buttonWallBuild);

		buttonWallBuild.addEventListener(
			'click',
			this.#onWallBuildClick.bind(this),
		);

		// Add Button Wall Clear
		const buttonWallClear = document.createElement('div');
		buttonWallClear.className = 'ui-button';
		buttonWallClear.innerText = 'CLEAR';
		this.#HOLDER.appendChild(buttonWallClear);

		buttonWallClear.addEventListener(
			'click',
			this.#onWallClearClick.bind(this),
		);
	}

	// __________________________________________________________________ Events

	#onHeightInputChange(event) {
		console.log('Height Input Changed:', event.target.value);

		// Get Value
		let value = parseFloat(event.target.value);

		if (isNaN(value)) {
			console.warn('Invalid height input:', event.target.value);

			// Reset
			value = 1;
		}

		// Validate and Update Height
		if (isNaN(value) || value <= 0) {
			event.target.value = this.#height;
		}

		// Store Height
		this.#height = value;
	}

	#onWallBuildClick() {
		ApplicationDispatcher.dispatch('content-wall-build', {
			height: this.#height,
		});
	}

	#onWallClearClick() {
		ApplicationDispatcher.dispatch('content-wall-clear');
	}
}
