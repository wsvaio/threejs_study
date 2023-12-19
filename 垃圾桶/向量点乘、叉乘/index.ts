// const plane = new Mesh(new PlaneGeometry(100, 100), new MeshLambertMaterial());
// scene.add(plane);
// plane.rotateX(-Math.PI / 2);
// plane.receiveShadow = true;

import { ArrowHelper, Mesh, MeshPhongMaterial, Quaternion, SphereGeometry, Vector3 } from "three";
import { scene } from "../scene";

// const mesh = new Mesh(new BoxGeometry(1, 1, 1), new MeshPhongMaterial());
// scene.add(mesh);
// mesh.castShadow = true;
// mesh.translateY(0.5);

// // const v = new Vector3(1, 0, 1);

// // useAnimation(() => {
// // 	const spt = clock.getDelta();

// // 	const dis = v.clone().multiplyScalar(spt);

// // 	mesh.position.add(dis);
// // });

// mesh.position.set(0, 2, 0);
// const v = new Vector3(0, 100, 0);
// const g = new Vector3(0, -9.8, 0);
// // x = vt + 1/2gt^2

// useAnimation(() => {
// 	if (mesh.position.y > 0.5) {
// 		const spt = clock.getDelta();
// 		const spV = g.clone().multiplyScalar(spt);
// 		v.add(spV);
// 		const dis = v.clone().multiplyScalar(spt);
// 		mesh.position.add(dis);
// 	}
// });

// camera.position.set(40, 40, 40);

const material = new MeshPhongMaterial();

const geometry = new SphereGeometry(0.5);

const mesh1 = new Mesh(geometry, material);
const mesh2 = new Mesh(geometry, material);
const mesh3 = new Mesh(geometry, material);

scene.add(mesh1, mesh2, mesh3);

mesh1.position.set(0, 0, 0);

mesh2.position.set(0, 5, 0);

mesh3.position.set(4, 5, 5);

scene.add(new ArrowHelper(mesh2.position.clone().normalize(), mesh1.position, mesh2.position.length()));

scene.add(new ArrowHelper(mesh3.position.clone().normalize(), mesh1.position, mesh3.position.length()));

const c = new Vector3();

c.crossVectors(mesh3.position, mesh2.position);

console.log("叉乘结果", c);

scene.add(new ArrowHelper(c.clone().normalize(), mesh1.position, mesh3.position.length()));

console.log(c.length(), mesh2.position.clone().sub(mesh3.position.clone()).length());

const quaternion = new Quaternion();

quaternion.setFromAxisAngle(new Vector3(0, 0, 1), Math.PI / 2);
