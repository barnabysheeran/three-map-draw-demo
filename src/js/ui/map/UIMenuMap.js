export default class UIMenuMap {
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
		title.innerText = 'Map';
		this.#HOLDER.appendChild(title);
	}
}
