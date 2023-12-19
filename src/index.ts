import { update } from "@tweenjs/tween.js";
import { scene } from "./models/scene";
import { camera } from "./models/camera";
import { clock, composer, css2DRenderer, css3DRenderer, renderer } from "./models/renderer";
import { mixer } from "./models/mixer";
import { world } from "./models/cannon";

import.meta.glob("./models/**/index.ts", { eager: true });

window.addEventListener("resize", () => {
	renderer.setSize(window.innerWidth, window.innerHeight);
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	composer.setSize(window.innerWidth, window.innerHeight);
	css2DRenderer.setSize(window.innerWidth, window.innerHeight);
	css3DRenderer.setSize(window.innerWidth, window.innerHeight);
});
window.dispatchEvent(new Event("resize"));

document.body.appendChild(renderer.domElement);
document.body.appendChild(css2DRenderer.domElement);
document.body.appendChild(css3DRenderer.domElement);
css2DRenderer.domElement.style.cssText = `
	position: absolute;
	left: 0;
	top: 0;
	z-index: 200;
	pointer-events: none;
`;
css3DRenderer.domElement.style.cssText = `
	position: absolute;
	left: 0;
	top: 0;
	z-index: 400;
	pointer-events: none;
	overflow: hidden;
`;

useAnimation(() => {
	update();
	world.fixedStep();
	composer.render();
	css2DRenderer.render(scene, camera);
	css3DRenderer.render(scene, camera);
	mixer.update(clock.getDelta());
});
// run({ scene, camera, renderer });
