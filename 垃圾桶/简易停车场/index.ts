import type { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import type { Object3DEventMap } from "three";
import { BackSide, BoxGeometry, CanvasTexture, Group, Mesh, MeshBasicMaterial, MeshLambertMaterial, PlaneGeometry, Raycaster, TextureLoader, Vector2, Vector3 } from "three";

import { Tween } from "@tweenjs/tween.js";
import { scene } from "../scene";
import { gui } from "../gui";
import { camera } from "../camera";
import { renderer } from "../renderer";
import { controls } from "../orbit-controls";
import RoadUrl from "./马路.glb?url";
import CarUrl from "./car.glb?url";

import skyUrl2 from "./sky/negx.jpg";
import skyUrl4 from "./sky/negy.jpg";
import skyUrl6 from "./sky/negz.jpg";
import skyUrl1 from "./sky/posx.jpg";
import skyUrl3 from "./sky/posy.jpg";
import skyUrl5 from "./sky/posz.jpg";

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 250;
canvas.height = 500;

ctx.fillStyle = "#fff";
ctx.fillRect(0, 0, 15, 500);
ctx.fillRect(250, 0, -15, 500);
ctx.fillRect(0, 0, 250, 15);
ctx.fillRect(0, 500, 250, -15);
const texture = new CanvasTexture(canvas);

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

const parks = [] as ({
	car: GLTF;
	parkSpace: Mesh<PlaneGeometry, MeshBasicMaterial, Object3DEventMap>;
	parking: () => void;
	driving: () => void;
	showTip: () => void;
	hideTip: () => void;
})[];
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
	// rayMeshs.push(parkSpace.car.scene);
	rayMeshs.push(parkSpace.parkSpace);
	parks.push(parkSpace);
}

// let i = 0;

// useAnimation(() => {
// 	i++;

// 	ctx.fillRect(0, 0, 15 + i, 500);

// 	for (const item of parks)
// 		item.parkSpace.material.map = new CanvasTexture(canvas);
// });

async function createParkSpace(pos: Vector3) {
	const parkSpace = new Mesh(
		new PlaneGeometry(2.5, 5),
		new MeshBasicMaterial({
			// color: "#50E1AC",
			// opacity: 0.5,
			map: texture,
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

	const stationItem = new Mesh(new BoxGeometry(1, 2, 1), new MeshLambertMaterial());
	stationItem.position.copy(pos);
	stationItem.position.y += 1;
	stationItem.position.z += 3;

	const stationBase = new Mesh(new BoxGeometry(2.5, 0.25, 1), new MeshLambertMaterial());
	stationBase.position.copy(pos);
	// stationBase.position.y -= 0;
	stationBase.position.z += 3;

	const station = new Group();
	station.add(stationItem, stationBase);

	const tip = new Mesh(new PlaneGeometry(2, 1), new MeshBasicMaterial({
		transparent: true,
	}));
	tip.position.copy(pos);
	tip.position.y += 3;
	tip.position.z += 3;

	tip.rotateY(Math.PI);

	scene.add(parkSpace, station);

	let i = 0;
	useAnimation(() => {
		const canvas = document.createElement("canvas");
		const ctx = canvas.getContext("2d");

		canvas.width = 100;
		canvas.height = 50;

		ctx.fillStyle = "#aaa";
		ctx.fillRect(0, 0, 100, 50);

		const y = -(++i % (100) - 25);

		const gradient = ctx.createLinearGradient(0, y, 0, y + 50);
		gradient.addColorStop(0, "white");

		gradient.addColorStop(0.25, "transparent");
		ctx.fillStyle = gradient;
		ctx.fillRect(0, y, 100, 25);
		// ctx.fillRect(0, 20, 100, 25);

		ctx.fillStyle = "#fff";
		ctx.textAlign = "center";
		ctx.font = "16px serif";
		ctx.fillText("无敌风火轮", 50, 25);

		tip.material.map = new CanvasTexture(canvas);
	});

	return {
		car,
		parkSpace,
		parking: () => {
			scene.add(car.scene);
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
					scene.remove(car.scene);
				});
		},
		showTip: () => {
			scene.add(tip);
		},
		hideTip: () => {
			scene.remove(tip);
		}
	};
};

renderer.domElement.addEventListener("click", event => {
	const px = event.offsetX;
	const py = event.offsetY;

	const x = (px / innerWidth) * 2 - 1;
	const y = (py / innerHeight) * 2 - 1;
	const ray = new Raycaster();
	ray.setFromCamera(new Vector2(x, -y), camera);
	const intersects = ray.intersectObjects(rayMeshs);
	console.log(rayMeshs, intersects);

	const active = intersects.find(item => rayMeshs.includes(item.object));

	if (active) {
		console.log(active);
		parks.forEach(item => item.hideTip());
		const endPos = active.object.position.clone();
		endPos.y += 4;
		endPos.z -= 8;
		endPos.x -= 1;
		const endTarget = active.object.position.clone();

		createCameraTween(endPos, endTarget);

		const find = parks.find(item => item.parkSpace == active.object);
		if (find)
			find.showTip();
	}
});

function createCameraTween(endPos, endTarget) {
	new Tween({
		// 不管相机此刻处于什么状态，直接读取当前的位置和目标观察点
		x: camera.position.x,
		y: camera.position.y,
		z: camera.position.z,
		tx: controls.target.x,
		ty: controls.target.y,
		tz: controls.target.z,
	})
		.to({
			// 动画结束相机位置坐标
			x: endPos.x,
			y: endPos.y,
			z: endPos.z,
			// 动画结束相机指向的目标观察点
			tx: endTarget.x,
			ty: endTarget.y,
			tz: endTarget.z,
		}, 1000)
		.onUpdate(obj => {
			// 动态改变相机位置
			camera.position.set(obj.x, obj.y, obj.z);
			// 动态计算相机视线
			// camera.lookAt(obj.tx, obj.ty, obj.tz);
			controls.target.set(obj.tx, obj.ty, obj.tz);
			controls.update();// 内部会执行.lookAt()
		})
		.start();
}
