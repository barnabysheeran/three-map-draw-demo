import ApplicationDispatcher from '../../dispatcher/ApplicationDispatcher.js';

export default class UIMenuMap {
	#HOLDER;

	// TODO Default Map Location
	#lat = 38.8977;
	#lon = -77.0365;
	#zoom = 18;

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
		title.innerText = 'Map / Lat';
		this.#HOLDER.appendChild(title);

		// Add Input for Latitude
		const latInput = document.createElement('input');
		latInput.className = 'ui-input';
		latInput.type = 'number';
		latInput.value = this.#lat;
		latInput.step = '0.001';
		latInput.min = '-90';
		latInput.max = '90';
		this.#HOLDER.appendChild(latInput);

		latInput.addEventListener('input', (event) => {
			const value = parseFloat(event.target.value);
			if (!isNaN(value)) {
				this.#lat = value;
			}
		});

		// Add Title
		const titleLong = document.createElement('div');
		titleLong.className = 'ui-title';
		titleLong.innerText = 'Long';
		this.#HOLDER.appendChild(titleLong);

		// Add Input for Longitude
		const lonInput = document.createElement('input');
		lonInput.className = 'ui-input';
		lonInput.type = 'number';
		lonInput.value = this.#lon;
		lonInput.step = '0.001';
		lonInput.min = '-180';
		lonInput.max = '180';
		this.#HOLDER.appendChild(lonInput);

		lonInput.addEventListener('input', (event) => {
			const value = parseFloat(event.target.value);
			if (!isNaN(value)) {
				this.#lon = value;
			}
		});

		// Add Title
		const titleZoom = document.createElement('div');
		titleZoom.className = 'ui-title';
		titleZoom.innerText = 'Zoom (1-19)';
		this.#HOLDER.appendChild(titleZoom);

		// Add Input for Zoom
		const zoomInput = document.createElement('input');
		zoomInput.className = 'ui-input';
		zoomInput.type = 'number';
		zoomInput.value = this.#zoom;
		zoomInput.step = '1';
		zoomInput.min = '1';
		zoomInput.max = '19';
		this.#HOLDER.appendChild(zoomInput);

		zoomInput.addEventListener('input', (event) => {
			const value = parseInt(event.target.value, 10);
			if (!isNaN(value)) {
				this.#zoom = value;
			}
		});

		// Add Button Load Map
		const buttonLoadMap = document.createElement('div');
		buttonLoadMap.className = 'ui-button';
		buttonLoadMap.innerText = 'LOAD MAP';
		this.#HOLDER.appendChild(buttonLoadMap);

		buttonLoadMap.addEventListener(
			'click',
			this.#onButtonLoadMapClick.bind(this),
		);
	}

	// __________________________________________________________________ Events

	#onButtonLoadMapClick() {
		ApplicationDispatcher.dispatch('content-map-load-request', {
			lat: this.#lat,
			lon: this.#lon,
			zoom: this.#zoom,
		});
	}
}
