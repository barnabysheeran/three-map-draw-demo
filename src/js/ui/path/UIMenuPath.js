import ApplicationDispatcher from '../../dispatcher/ApplicationDispatcher.js';

export default class UIMenuPath {
	#HOLDER;

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
		title.innerText = 'Path';
		this.#HOLDER.appendChild(title);

		// Add Button Path Clear
		const buttonPathClear = document.createElement('div');
		buttonPathClear.className = 'ui-button';
		buttonPathClear.innerText = 'CLEAR';
		this.#HOLDER.appendChild(buttonPathClear);

		buttonPathClear.addEventListener(
			'click',
			this.#onButtonPathClear.bind(this),
		);
	}

	// __________________________________________________________________ Events

	#onButtonPathClear() {
		// Dispatch Event
		ApplicationDispatcher.dispatch('content-path-clear');
	}
}
