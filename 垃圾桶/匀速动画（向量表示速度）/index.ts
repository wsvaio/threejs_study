import { BoxGeometry, Mesh, MeshLambertMaterial, MeshPhongMaterial, PlaneGeometry, Vector3 } from "three";
import { scene } from "../scene";
import { clock } from "../renderer";
import { camera } from "../camera";

const plane = new Mesh(new PlaneGeometry(100, 100), new MeshLambertMaterial());
scene.add(plane);
plane.rotateX(-Math.PI / 2);
plane.receiveShadow = true;

const mesh = new Mesh(new BoxGeometry(1, 1, 1), new MeshPhongMaterial());
scene.add(mesh);
mesh.castShadow = true;
mesh.translateY(0.5);

// const v = new Vector3(1, 0, 1);

// useAnimation(() => {
// 	const spt = clock.getDelta();

// 	const dis = v.clone().multiplyScalar(spt);

// 	mesh.position.add(dis);
// });

mesh.position.set(0, 2, 0);
const v = new Vector3(0, 100, 0);
const g = new Vector3(0, -9.8, 0);
// x = vt + 1/2gt^2

useAnimation(() => {
	if (mesh.position.y > 0.5) {
		const spt = clock.getDelta();
		const spV = g.clone().multiplyScalar(spt);
		v.add(spV);
		const dis = v.clone().multiplyScalar(spt);
		mesh.position.add(dis);
	}
});

camera.position.set(40, 40, 40);
