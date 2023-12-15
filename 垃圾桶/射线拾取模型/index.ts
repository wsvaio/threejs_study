import { BoxGeometry, Mesh, MeshLambertMaterial, Raycaster, Vector2 } from "three";
import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass";
import { scene } from "@/models/scene";
import { composer, renderer } from "@/models/renderer";
import { camera } from "@/models/camera";

use(async () => {
	// const texture = await new TextureLoader().loadAsync(img);
	const mesh = new Mesh(new BoxGeometry(100, 100, 100), new MeshLambertMaterial({ color: "white" }));
	scene.add(mesh);

	const outlinePass = new OutlinePass(new Vector2(1, 1), scene, camera);

	composer.addPass(outlinePass);

	renderer.domElement.addEventListener("mousemove", event => {
		const px = event.offsetX;
		const py = event.offsetY;

		const x = (px / innerWidth) * 2 - 1;
		const y = (py / innerHeight) * 2 - 1;

		console.log(x, y);
		const raycaster = new Raycaster();

		raycaster.setFromCamera(new Vector2(x, y), camera);

		const intersects = raycaster.intersectObject(mesh);

		console.log(intersects);

		if (intersects.length > 0) {
			// mesh.material.color.set("red");
			outlinePass.selectedObjects = [mesh];
		}

		else {
			// mesh.material.color.set("white");
			outlinePass.selectedObjects = [];
		}
	});
});
