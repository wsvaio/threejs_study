import { BoxGeometry, Mesh, MeshLambertMaterial, TextureLoader, Vector2 } from "three";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import img from "./2312.png";
import { scene } from "@/models/scene";
import { composer } from "@/models/renderer";

use(async () => {
	const texture = await new TextureLoader().loadAsync(img);
	const mesh = new Mesh(new BoxGeometry(100, 100, 100), new MeshLambertMaterial({ color: "white", map: texture }));
	scene.add(mesh);

	// const outlinePass = new OutlinePass(new Vector2(1, 1), scene, camera);
	// composer.addPass(outlinePass);

	// outlinePass.selectedObjects.push(mesh);

	// outlinePass.visibleEdgeColor.set(0xFFFF00);
	// outlinePass.edgeThickness = 40;
	// outlinePass.edgeStrength = 60;
	// outlinePass.pulsePeriod = 0.1;

	const bloomPass = new UnrealBloomPass(new Vector2(1, 1), 100, 0.1, 0.5);

	composer.addPass(bloomPass);

	// bloomPass.
});
