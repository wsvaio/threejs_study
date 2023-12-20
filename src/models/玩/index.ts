import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { BackSide, BoxGeometry, Mesh, MeshBasicMaterial, MeshLambertMaterial, PlaneGeometry, Raycaster, TextureLoader, Vector2, Vector3 } from "three";

import { Tween } from "@tweenjs/tween.js";
import { scene } from "../scene";
import { gui } from "../gui";
import { camera } from "../camera";
import { renderer } from "../renderer";
import RoadUrl from "./马路.glb?url";
import CarUrl from "./car.glb?url";

import skyUrl2 from "./sky/negx.jpg";
import skyUrl4 from "./sky/negy.jpg";
import skyUrl6 from "./sky/negz.jpg";
import skyUrl1 from "./sky/posx.jpg";
import skyUrl3 from "./sky/posy.jpg";
import skyUrl5 from "./sky/posz.jpg";

const textureLoader = new TextureLoader();
const materialArray = [] as any[];
for (const item of [skyUrl1, skyUrl2, skyUrl3, skyUrl4, skyUrl5, skyUrl6]) {
	materialArray.push(new MeshBasicMaterial({
		map: await textureLoader.loadAsync(item),
		side: BackSide
	}));
}

const skyBox = new Mesh(new BoxGeometry(5000, 5000, 5000), materialArray);

scene.add(skyBox);

const loader = new GLTFLoader();

const Road = await loader.loadAsync(RoadUrl);

Road.scene.traverse(obj => {
	if ((obj as any)?.isMesh) {
		obj.castShadow = true;
		obj.receiveShadow = true;
		// (obj as Mesh).material.shadowSide = BackSide;
	}
});
scene.add(Road.scene);

const rayMeshs = [] as any[];
for (let i = 1; i < 4; i++) {
	const parkSpace = await createParkSpace(new Vector3(2.5 * (i - 2), 0.1, 5.5));
	gui
		.add({ charge: false }, "charge", [false, true])
		.name(`充电${i}`)
		.onChange(val => {
			if (val)
				parkSpace.parking();

			else
				parkSpace.driving();
		});
	rayMeshs.push(parkSpace.car.scene);
}

async function createParkSpace(pos: Vector3) {
	const parkSpace = new Mesh(
		new PlaneGeometry(2.5, 5),
		new MeshLambertMaterial({
			color: "#50E1AC",
			opacity: 0.5,
			transparent: true,
		})
	);
	parkSpace.position.copy(pos);
	parkSpace.rotateX(-Math.PI / 2);

	const car = await loader.loadAsync(CarUrl);
	car.scene.position.copy(pos);
	car.scene.rotateY(Math.PI);
	car.scene.traverse((obj: Mesh) => {
		if (obj.isMesh) {
			obj.castShadow = true;
			obj.receiveShadow = true;
			(Array.isArray(obj.material) ? obj.material : [obj.material]).forEach(
				item => (item.transparent = true)
			);
		}
	});

	car.scene.visible = false;

	scene.add(car.scene, parkSpace);

	return {
		car,
		parkSpace,
		parking: () => {
			car.scene.visible = true;
			new Tween({ opacity: 0 })
				.to({ opacity: 1 }, 1000)
				.onUpdate(item => {
					car.scene.position.copy(pos.clone().add(new Vector3(0, 0, (item.opacity - 1) * 2)));
					car.scene.traverse((obj: Mesh) => {
						if (!obj.isMesh) return;
						(Array.isArray(obj.material) ? obj.material : [obj.material]).forEach(
							sub => (sub.opacity = item.opacity)
						);
					});
				})
				.start();
		},
		driving: () => {
			new Tween({ opacity: 1 })
				.to({ opacity: 0 }, 1000)
				.onUpdate(item => {
					car.scene.position.copy(pos.clone().add(new Vector3(0, 0, (item.opacity - 1) * 2)));
					car.scene.traverse((obj: Mesh) => {
						if (!obj.isMesh) return;
						(Array.isArray(obj.material) ? obj.material : [obj.material]).forEach(
							sub => (sub.opacity = item.opacity)
						);
					});
				})
				.start()
				.onComplete(() => {
					car.scene.visible = false;
				});
		}
	};
};

renderer.domElement.addEventListener("mousedown", event => {
	const px = event.offsetX;
	const py = event.offsetY;

	const x = (px / innerWidth) * 2 - 1;
	const y = (py / innerHeight) * 2 - 1;
	const ray = new Raycaster();
	ray.setFromCamera(new Vector2(x, y), camera);
	const intersects = ray.intersectObjects(rayMeshs);
	console.log(intersects);
});
