import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import { type Mesh, Vector3 } from "three";
import CarUrl from "./car.glb?url";
import { scene } from "@/models/scene";

const loader = new GLTFLoader();

const car = await loader.loadAsync(CarUrl);

scene.add(car.scene);

car.scene.traverse((obj: Mesh) => {
	if (obj.isMesh)
		obj.castShadow = true;
});

const maxSpeed = 1;
const direction = new Vector3(0, 0, 0);

useAnimationFrame(() => {
	car.scene.position.add(direction.clone().multiplyScalar(maxSpeed));
});

// onKey(async ctx => {
// 	const delta = clock.getDelta();
// 	if (ctx.type == "requestAnimationFrame") {
// 		if (ctx.keys.has("w"))
// 			direction.z += 1 * delta;
// 	}

// 	console.log(direction);
// });

useAnimationFrame(({ delta }) => {
	// car.scene.position.add(direction.clone().multiplyScalar(maxSpeed));
	if (keys.has("w"))
		direction.z += 2 * delta;

	if (keys.has("s"))
		direction.z -= 1 * delta;

	direction.multiplyScalar(0.9);

	console.log(direction.z);
});
