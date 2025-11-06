import ApplicationConfiguration from '../application/ApplicationConfiguration.js';
import ApplicationLogger from '../application/ApplicationLogger.js';

import UIMenuMap from './map/UIMenuMap.js';
import UIMenuPath from './path/UIMenuPath.js';
import UIMenuWall from './wall/UIMenuWall.js';

export default class UIController {
	#UI_HOLDER;
	#MENU_HOLDER;

	#LOG_LEVEL = 2;

	// _________________________________________________________________________

	constructor() {
		ApplicationLogger.log(`View`, this.#LOG_LEVEL);

		// Get Application Container
		const APPLICATION_CONTAINER =
			ApplicationConfiguration.getApplicationContainer();

		// Create UI Holder
		this.#UI_HOLDER = document.createElement('div');
		this.#UI_HOLDER.id = 'ui-holder';
		this.#UI_HOLDER.className = 'ui-holder';
		APPLICATION_CONTAINER.appendChild(this.#UI_HOLDER);

		// Create Menu Holder
		this.#MENU_HOLDER = document.createElement('div');
		this.#MENU_HOLDER.id = 'ui-menu-holder';
		this.#MENU_HOLDER.className = 'ui-menu-holder';
		this.#UI_HOLDER.appendChild(this.#MENU_HOLDER);

		// Create Menus
		new UIMenuMap(this.#MENU_HOLDER);
		new UIMenuPath(this.#MENU_HOLDER);
		new UIMenuWall(this.#MENU_HOLDER);
	}
}
