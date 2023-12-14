import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { BoxGeometry, Mesh, MeshPhongMaterial, PlaneGeometry } from "three";
import pline16 from "./pline16.gltf?url";
import { scene } from "@/models/scene";

const keys = new Set();

window.addEventListener("keydown", ev => {
	console.log(ev);
	keys.add(ev.key.toLocaleLowerCase());
});
window.addEventListener("keyup", ev => {
	keys.delete(ev.key.toLocaleLowerCase());
});

use(async ({ camera }) => {
	const loader = new GLTFLoader();
	const gltf = await loader.loadAsync(pline16);

	gltf.scene.traverse(obj => {
		if ((obj as any)?.isMesh) {
			obj.castShadow = true;
			obj.receiveShadow = true;
		}
	});
	scene.add(gltf.scene);

	const a = new Mesh(new BoxGeometry(50, 50, 50), new MeshPhongMaterial({ color: 0xFFFFFF, flatShading: true }));
	a.position.set(0, 25, 0);
	a.castShadow = true;
	// scene.add(a);

	useAnimation(() => {
		if (keys.has("w")) gltf.scene.translateZ(1);

		if (keys.has("s")) gltf.scene.translateZ(-1);

		if (keys.has("a")) gltf.scene.rotateY(Math.PI / 180);

		if (keys.has("d")) gltf.scene.rotateY(Math.PI / -180);

		if (keys.has("arrowup")) gltf.scene.rotateX(Math.PI / -180);

		if (keys.has("arrowdown")) gltf.scene.rotateX(Math.PI / 180);

		if (keys.has("arrowleft")) gltf.scene.rotateZ(Math.PI / -180);

		if (keys.has("arrowright")) gltf.scene.rotateZ(Math.PI / 180);

		// if (keys.has(" ")) gltf.scene.rot
	});

	const plane = new Mesh(new PlaneGeometry(1000, 1000), new MeshPhongMaterial({ color: 0xFFFFFF }));
	plane.rotateX(Math.PI / -2);
	plane.receiveShadow = true;
	scene.add(plane);
});
