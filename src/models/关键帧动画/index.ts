// import { AnimationClip, BoxGeometry, KeyframeTrack, LoopPingPong, Mesh, MeshLambertMaterial } from "three";
// import { gui } from "../gui";
// import { scene } from "@/models/scene";
// import { mixer } from "@/models/mixer";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Clock, Mesh, MeshLambertMaterial, PlaneGeometry } from "three";
import { scene } from "../scene";
import { mixer } from "../mixer";
import { camera } from "../camera";
import { controls } from "../orbit-controls";
import women from "./能文能武.glb?url";

// use(async () => {
// const mesh = new Mesh(
// 	new BoxGeometry(100, 100, 100),
// 	new MeshLambertMaterial({ color: "white" })
// );

// scene.add(mesh);

// mesh.name = "Box";

// const times = [0, 3, 6];
// const values = [0, 0, 0, 100, 0, 0, 0, 0, 100];
// const posKF = new KeyframeTrack("Box.position", times, values);
// const colorKF = new KeyframeTrack("Box.material.color", [2, 5], [1, 0, 0, 0, 0, 1]);
// const clip = new AnimationClip("test", 6, [posKF, colorKF]);

// const clipAction = mixer.clipAction(clip);
// clipAction.loop = LoopPingPong;
// clipAction.play();

// gui.add(clipAction, "timeScale", 0, 999999);
// gui.add(clipAction, "time", 0, 6);
// });

const keys = new Set();

window.addEventListener("keydown", ev => {
	// console.log(ev);
	keys.add(ev.key.toLocaleLowerCase());
});
window.addEventListener("keyup", ev => {
	keys.delete(ev.key.toLocaleLowerCase());
});

const plane = new Mesh(new PlaneGeometry(100, 100), new MeshLambertMaterial());
scene.add(plane);
plane.rotateX(Math.PI / -2);
plane.receiveShadow = true;

const loader = new GLTFLoader();

loader.load(women, gltf => {
	scene.add(gltf.scene);
	const walk = gltf.animations.find(item => item.name == "walk");
	console.log(walk);
	walk.tracks = walk.tracks.filter(item => !item.name.endsWith("position"));
	const walkAction = mixer.clipAction(walk);
	walkAction.play();

	gltf.scene.traverse(item => {
		if (item.isMesh) item.castShadow = true;
	});
	const clock = new Clock();

	controls.target = gltf.scene.position;
	let pos = { x: 0, y: 0, z: 0 };
	useAnimation(() => {
		const delta = clock.getDelta();
		// console.log(delta);
		pos.x = gltf.scene.position.x;
		pos.y = gltf.scene.position.y;
		pos.z = gltf.scene.position.z;
		if (keys.has("w")) {
			walkAction.paused = false;
			gltf.scene.translateZ(delta * 2);
			// camera.translateZ(delta * 2);
		}
		else { walkAction.paused = true; }

		// gltf.scene.rotation.y = camera.rotation.y + camera.rotation.z;
		// gltf.scene.rotation.x = camera.rotation.x;
		if (keys.has("a"))
			gltf.scene.rotateY(Math.PI * delta);

		if (keys.has("d"))
			gltf.scene.rotateY(Math.PI * -delta);

		// if (walkAction.paused) {
		camera.lookAt(gltf.scene.position);
		// }
		// else {
		// 	gltf.scene.translateZ(delta * 2);
		// }
		camera.position.x += gltf.scene.position.x - pos.x;
		camera.position.y += gltf.scene.position.y - pos.y;
		camera.position.z += gltf.scene.position.z - pos.z;

		// console.log(gltf.scene.position.x - pos.x);
		//
		// controls.target = gltf.scene.position;
		// camera.rotateOnAxis(gltf.scene.position, 0);

		const isBack = Math.abs(camera.rotation.x) < (Math.PI / 2);

		gltf.scene.rotation.y = isBack ? -camera.rotation.y + Math.PI : -camera.rotation.y;

		console.log(isBack);
	});
});
