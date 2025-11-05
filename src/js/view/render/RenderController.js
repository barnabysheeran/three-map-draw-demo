import { WebGLRenderer, PCFSoftShadowMap, LinearToneMapping } from 'three';

import ApplicationConfiguration from '../../application/ApplicationConfiguration.js';

export default class RenderController {
	constructor(canvas) {
		// Create Renderer
		this.RENDERER = new WebGLRenderer({
			canvas,
			antialias: true,
		});

		// Pixel Ratio
		this.RENDERER.setPixelRatio(window.devicePixelRatio || 1);

		// Tone
		this.RENDERER.toneMapping = LinearToneMapping;
		this.RENDERER.toneMappingExposure = 1.0;

		// Shadows
		this.RENDERER.shadowMap.enabled = true;
		this.RENDERER.shadowMap.type = PCFSoftShadowMap;

		this.RENDERER.capabilities.maxSamples = 32;

		// Clear
		this.RENDERER.setClearColor(0x666666, 1.0);

		// Store Anisotrophy Max
		ApplicationConfiguration.setAnisotropyMax(
			this.RENDERER.capabilities.getMaxAnisotropy(),
		);
	}

	// __________________________________________________________________ Render

	render(scene, camera) {
		this.RENDERER.render(scene, camera);
	}

	// ____________________________________________________________________ Size

	setSize(width, height) {
		this.RENDERER.setSize(width, height, false);
	}

	// __________________________________________________________________ Access

	getDomElement() {
		return this.RENDERER.domElement;
	}
}
