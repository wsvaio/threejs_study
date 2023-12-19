import { Body, ContactMaterial, Material, Plane, Sphere, Vec3, World } from "cannon-es";
import { Mesh, MeshLambertMaterial, SphereGeometry } from "three";
import { scene } from "../scene";
import { clock } from "../renderer";

const world = new World();

world.gravity.set(0, -9.8, 0);


// 网格小球
const geometry = new SphereGeometry(1);
const material = new MeshLambertMaterial({
	color: 0x00FFFF,
});
const mesh = new Mesh(geometry, material);
mesh.position.y = 100;

scene.add(mesh);

const sphereMaterial = new Material();
const sphereBody = new Body({
	mass: 30,
	position: new Vec3(0, 10, 0),
	shape: new Sphere(1),
	material: sphereMaterial,
});
world.addBody(sphereBody);

const groundMaterial = new Material();
const groundBody = new Body({
	mass: 0,
	shape: new Plane(),
	material: groundMaterial,
});
groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
world.addBody(groundBody);

const contactMaterial = new ContactMaterial(groundMaterial, sphereMaterial, {
	restitution: 1,
});

world.addContactMaterial(contactMaterial);

useAnimation(() => {
	world.step(clock.getDelta());
	console.log("球位置", sphereBody.position);
	console.log("球速度", sphereBody.velocity);
	console.log("y方向球位置", sphereBody.position.y);
	mesh.position.copy(sphereBody.position);
});
