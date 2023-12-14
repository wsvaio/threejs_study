import { scene } from "./models/scene";
import { camera } from "./models/camera";
import { composer, renderer } from "./models/renderer";

import.meta.glob("./models/**/index.ts", { eager: true });

window.addEventListener("resize", () => {
	renderer.setSize(window.innerWidth, window.innerHeight);
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	composer.setSize(window.innerWidth, window.innerHeight);
});
window.dispatchEvent(new Event("resize"));

document.body.appendChild(renderer.domElement);

useAnimation(() => composer.render());
run({ scene, camera, renderer });
