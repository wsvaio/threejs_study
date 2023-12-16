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
import women from "./无标题1.glb?url";

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
	console.log(ev.key);
	keys.delete(ev.key.toLocaleLowerCase());
});

const plane = new Mesh(new PlaneGeometry(100, 100), new MeshLambertMaterial());
scene.add(plane);
plane.rotateX(Math.PI / -2);
plane.receiveShadow = true;

const loader = new GLTFLoader();

const { animations, scene: mesh } = await loader.loadAsync(women);
scene.add(mesh);
console.log(animations);

const runAnimation = animations.find(item => item.name == "run");
runAnimation.tracks = runAnimation.tracks.filter(
	item => !item.name.endsWith("position")
);

const runAction = mixer.clipAction(runAnimation);
runAction.timeScale = 1;
runAction.play();
runAction.weight = 0;

const idleAnimation = animations.find(item => item.name == "idle");
// idleAnimation.tracks = idleAnimation.tracks.filter(item => !item.name.endsWith("position"));
const idleAction = mixer.clipAction(idleAnimation);
idleAction.play();
idleAction.weight = 0;

const setProp = ({
	obj,
	key,
	val = 1,
	step = 0.1,
}: {
	obj: Record<any, any>;
	key: string;
	val?: number;
	step?: number;
}) => {
	if (Math.abs(obj[key] - val) <= step) obj[key] = val;
	else if (obj[key] < val) obj[key] += step;
	else if (obj[key] > val) obj[key] -= step;
};

const danceAnimation = animations.find(item => item.name == "dance");
const danceAction = mixer.clipAction(danceAnimation);
danceAction.play();
danceAction.weight = 0;

mesh.traverse(item => {
	// @ts-expect-error 666
	if (item.isMesh) item.castShadow = true;
});
const clock = new Clock();

controls.target = mesh.position;

let weights = {
	left: 0,
	right: 0,
};
let pos = { x: 0, y: 0, z: 0 };

useAnimation(() => {
	const delta = clock.getDelta();

	if (keys.has("w")) {
		setProp({
			obj: runAction,
			key: "weight",
			val: 1,
			step: delta,
		});
	}
	else {
		setProp({
			obj: runAction,
			key: "weight",
			val: 0,
			step: delta,
		});
	}

	if (keys.has("a")) {
		setProp({
			obj: weights,
			key: "left",
			val: 1,
			step: delta * 5,
		});
	}
	else {
		setProp({
			obj: weights,
			key: "left",
			val: 0,
			step: delta * 5,
		});
	}

	if (keys.has("d")) {
		setProp({
			obj: weights,
			key: "right",
			val: 1,
			step: delta * 5,
		});
	}
	else {
		setProp({
			obj: weights,
			key: "right",
			val: 0,
			step: delta,
		});
	}

	if (keys.has("shift")) {
		setProp({
			obj: runAction,
			key: "timeScale",
			val: 2,
			step: delta,
		});
	}
	else {
		setProp({
			obj: runAction,
			key: "timeScale",
			val: 1,
			step: delta,
		});
	}

	if (keys.has("1")) {
		setProp({
			obj: danceAction,
			key: "weight",
			val: 1,
			step: delta,
		});
	}
	else {
		setProp({
			obj: danceAction,
			key: "weight",
			val: 0,
			step: delta,
		});
	}

	if (keys.has("w") || keys.has("1")) {
		setProp({
			obj: idleAction,
			key: "weight",
			val: 0,
			step: delta,
		});
	}
	else {
		setProp({
			obj: idleAction,
			key: "weight",
			val: 1,
			step: delta,
		});
	}

	pos.x = mesh.position.x;
	pos.y = mesh.position.y;
	pos.z = mesh.position.z;
	mesh.translateZ(delta * 4 * runAction.weight * runAction.timeScale);
	camera.position.x += mesh.position.x - pos.x;
	camera.position.y += mesh.position.y - pos.y;
	camera.position.z += mesh.position.z - pos.z;
	mesh.rotateY(delta * Math.PI * weights.left * runAction.weight);
	mesh.rotateY(delta * -Math.PI * weights.right * runAction.weight);
});
