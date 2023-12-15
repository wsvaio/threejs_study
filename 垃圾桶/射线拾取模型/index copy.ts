import { BoxGeometry, Mesh, MeshLambertMaterial, Ray, Vector3 } from "three";
import { scene } from "@/models/scene";

use(async () => {
	// const texture = await new TextureLoader().loadAsync(img);
	const mesh = new Mesh(new BoxGeometry(100, 100, 100), new MeshLambertMaterial({ color: "white" }));
	scene.add(mesh);

	// 创建射线对象Ray
	const ray = new Ray();

	// 射线起点.origin
	ray.origin = new Vector3(1, 0, 3);

	// 射线方向.direction
	ray.direction.set(1, 0, 0);

	const v3 = new Vector3(5, 0, 0);
	console.log(v3, v3.normalize());

	// 三角形三个点坐标
	const p1 = new Vector3(100, 25, 0);
	const p2 = new Vector3(100, -25, 25);
	const p3 = new Vector3(100, -25, -25);
	const point = new Vector3();// 用来记录射线和三角形的交叉点
	// `.intersectTriangle()`计算射线和三角形是否相交叉，相交返回交点，不相交返回null
	const result = ray.intersectTriangle(p1, p2, p3, true, point);
	console.log("交叉点坐标", point);
	console.log("查看是否相交", result);
});
