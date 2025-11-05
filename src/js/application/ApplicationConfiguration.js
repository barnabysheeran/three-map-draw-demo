import ApplicationLogger from './ApplicationLogger.js';

export default class ApplicationConfiguration {
	static #applicationContainer;
	static #assetPath;

	static #anisotropyMax = 1; // Default

	static #LOG_LEVEL = 1;

	// _________________________________________________________________________

	static initialise(creationParameters) {
		ApplicationLogger.log('ApplicationConfiguration', this.#LOG_LEVEL);

		// Store
		this.#applicationContainer = creationParameters.applicationContainer;
		this.#assetPath = creationParameters.assetPath;
	}

	// ___________________________________________________ Application Container

	static getApplicationContainer() {
		return this.#applicationContainer;
	}

	// ______________________________________________________________ Asset Path

	static getAssetPath() {
		return this.#assetPath;
	}

	// __________________________________________________________ Anisotropy Max

	static setAnisotropyMax(anisotropyMax) {
		ApplicationLogger.log(
			'ApplicationConfiguration.setAnisotropyMax ' + anisotropyMax,
			this.#LOG_LEVEL,
		);

		this.#anisotropyMax = anisotropyMax;
	}

	static getAnisotropyMax() {
		return this.#anisotropyMax;
	}
}
