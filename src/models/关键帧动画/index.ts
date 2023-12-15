// import { AnimationClip, BoxGeometry, KeyframeTrack, LoopPingPong, Mesh, MeshLambertMaterial } from "three";
// import { gui } from "../gui";
// import { scene } from "@/models/scene";
// import { mixer } from "@/models/mixer";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Mesh, MeshLambertMaterial, PlaneGeometry } from "three";
import { scene } from "../scene";
import { mixer } from "../mixer";
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
	console.log(ev);
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
	// const backAction = mixer.clipAction(walk);
	// backAction.timeScale = -1;
	const walkRight = gltf.animations.find(item => item.name == "walk-right");
	walkRight.tracks = walkRight.tracks.filter(
		item => !item.name.endsWith("position")
	);
	const rightAction = mixer.clipAction(walkRight);
	// const leftAction = mixer.clipAction(walkRight);
	// leftAction.timeScale = -1;
	rightAction.play();
	walkAction.play();

	// walkAction.timeScale = -1;
	// backAction.play();
	// leftAction.play();

	rightAction.weight = 0;
	walkAction.weight = 0;
	// leftAction.weight = 0;
	// backAction.weight = 0;

	gltf.scene.traverse(item => {
		if (item.isMesh) item.castShadow = true;
	});

	useAnimation(() => {
		// walkAction.play();
		if (keys.has("w")) {
			walkAction.weight += 0.1;
			walkAction.timeScale += 0.1;
		}
		else {
			walkAction.weight -= 0.1;
			walkAction.timeScale -= 0.1;
		}

		if (keys.has("s")) {
			walkAction.weight -= 0.1;
			walkAction.timeScale -= 0.1;
		}
		else {
			walkAction.weight += 0.1;
			walkAction.timeScale += 0.1;
		}

		if (walkAction.weight > 1) walkAction.weight = 1;
		if (walkAction.weight < 0) walkAction.weight = 0;

		if (walkAction.timeScale > 1) walkAction.timeScale = 1;
		if (walkAction.timeScale < -1) walkAction.timeScale = -1;

		if (keys.has("a")) rightAction.weight += 0.1;
		else rightAction.weight -= 0.1;

		if (rightAction.weight > 1) rightAction.weight = 1;
		if (rightAction.weight < 0) rightAction.weight = 0;

		// if (keys.has("d"))
		// 	leftAction.weight += 0.1;

		// else
		// 	leftAction.weight -= 0.1;

		// if (leftAction.weight > 1) leftAction.weight = 1;
		// if (leftAction.weight < 0) leftAction.weight = 0;

		// if (keys.has("s"))
		// 	backAction.weight += 0.1;

		// else
		// 	backAction.weight -= 0.1;

		// if (backAction.weight > 1) backAction.weight = 1;
		// if (backAction.weight < 0) backAction.weight = 0;
	});

	// const skeketonHelper = new SkeletonHelper(gltf.scene);
	// scene.add(skeketonHelper);
});

// const boxGeometry = new BoxGeometry(50, 50, 50);

// const target1 = new BoxGeometry(50, 200, 50).attributes.position;
// const target2 = new BoxGeometry(10, 50, 10).attributes.position;

// boxGeometry.morphAttributes.position = [target1, target2];

// const mesh = new Mesh(boxGeometry, new MeshLambertMaterial());
// mesh.name = "Box";
// scene.add(mesh);

// // mesh.morphTargetInfluences[0] = 0.0;
// // mesh.morphTargetInfluences[0] = 1.0;
// // mesh.morphTargetInfluences[0] = 0.5;

// console.log(mesh.morphTargetInfluences, target1);

// const KF1 = new KeyframeTrack("Box.morphTargetInfluences[0]", [0, 5], [0, 1]);
// const KF2 = new KeyframeTrack("Box.morphTargetInfluences[1]", [5, 10], [0, 1]);

// const clip = new AnimationClip("t", 10, [KF1, KF2]);

// const clipAction = mixer.clipAction(clip);

// clipAction.play();
