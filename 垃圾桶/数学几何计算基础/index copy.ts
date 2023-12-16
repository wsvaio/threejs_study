import { BoxGeometry, Mesh, MeshLambertMaterial, PlaneGeometry, Raycaster, Vector2 } from "three";
import { Tween, update } from "@tweenjs/tween.js";
import { scene } from "../scene";
import { camera } from "../camera";
import { controls } from "../orbit-controls";

const plane = new Mesh(new PlaneGeometry(100, 100), new MeshLambertMaterial());
scene.add(plane);
plane.rotateX(-Math.PI / 2);
plane.receiveShadow = true;

const mesh = new Mesh(new BoxGeometry(1, 1, 1), new MeshLambertMaterial({
	color: "white"
}));
mesh.castShadow = true;
scene.add(mesh);
mesh.translateY(5);

// const tween = new Tween(camera.position);
// tween.to({ x: 100, y: 50 }, 10000).onUpdate(() => {
// 	camera.lookAt(mesh.position);
// });
// tween.start();

window.addEventListener("click", ev => {
	const x = (ev.offsetX / innerWidth) * 2 - 1;
	const y = 1 - (ev.offsetY / innerHeight) * 2;

	console.log(x, y);
	const r = new Raycaster();
	r.setFromCamera(new Vector2(x, y), camera);
	const intersects = r.intersectObject(mesh);
	console.log(intersects);
	if (intersects.length)
		createCameraTween(mesh.position, mesh.position);
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
			y: endPos.y + 1,
			z: endPos.z + 2,
			// 动画结束相机指向的目标观察点
			tx: endTarget.x,
			ty: endTarget.y,
			tz: endTarget.z,
		}, 2000)
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

useAnimation(() => {
	update();
});
