import { BoxGeometry, Mesh, MeshLambertMaterial, Vector2 } from "three";
import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass";
import { scene } from "@/models/scene";
import { composer } from "@/models/renderer";
import { camera } from "@/models/camera";

use(async () => {
	// const texture = await new TextureLoader().loadAsync(img);
	const mesh = new Mesh(new BoxGeometry(100, 100, 100), new MeshLambertMaterial({ color: "white" }));
	scene.add(mesh);

	// const outlinePass = new OutlinePass(new Vector2(1, 1), scene, camera);
	// composer.addPass(outlinePass);

	// outlinePass.selectedObjects.push(mesh);

	// outlinePass.visibleEdgeColor.set(0xFFFF00);
	// outlinePass.edgeThickness = 40;
	// outlinePass.edgeStrength = 60;
	// outlinePass.pulsePeriod = 0.1;

	// const bloomPass = new UnrealBloomPass(new Vector2(1, 1), 100, 0.1, 0.5);

	// composer.addPass(bloomPass);

	// bloomPass.

	const outlinePass = new OutlinePass(new Vector2(window.innerWidth, window.innerHeight), scene, camera);
	outlinePass.selectedObjects = [mesh];
	outlinePass.edgeThickness = 4;
	outlinePass.edgeStrength = 6;
	outlinePass.pulsePeriod = 2;
	outlinePass.visibleEdgeColor.set(0xFFFF00);
	composer.addPass(outlinePass);

	// const glitchPass = new GlitchPass();
	// composer.addPass(glitchPass);

	// const filmPass = new FilmPass();
	// composer.addPass(filmPass);

	// const dotScreenPass = new DotScreenPass(new Vector2(0, 0), 0, 16);
	// composer.addPass(dotScreenPass);
});
