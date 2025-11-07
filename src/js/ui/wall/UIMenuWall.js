import ApplicationDispatcher from '../../dispatcher/ApplicationDispatcher.js';

export default class UIMenuWall {
	#HOLDER;

	// TODO Default Wall Height
	#height = 0.7;

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
		title.innerText = 'Wall / Height';
		this.#HOLDER.appendChild(title);

		// TODO Hard-Coded Walls Height Limits

		// Add Input for Height
		const heightInput = document.createElement('input');
		heightInput.className = 'ui-input';
		heightInput.type = 'number';
		heightInput.value = this.#height;
		heightInput.step = '0.1';
		heightInput.min = '0.1';
		heightInput.max = '2';
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

		// Nan Check
		if (isNaN(value)) {
			return;
		}

		// Store Height
		this.#height = value;
	}

	#onWallBuildClick() {
		// Valid Height ?
		if (this.#height < 0.1 || this.#height > 3) {
			console.warn('Invalid wall height:', this.#height);
			return;
		}

		ApplicationDispatcher.dispatch('content-wall-build', {
			height: this.#height,
		});
	}

	#onWallClearClick() {
		ApplicationDispatcher.dispatch('content-wall-clear');
	}
}
