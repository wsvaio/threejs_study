import { Mesh, MeshPhongMaterial, PlaneGeometry, SphereGeometry } from "three";
import { Body, Plane, Sphere, Vec3 } from "cannon-es";
import { scene } from "../scene";
import { world } from "../cannon";

const ground = new Mesh(new PlaneGeometry(10, 10), new MeshPhongMaterial());
scene.add(ground);
ground.rotateX(-Math.PI / 2);

const groundBody = new Body({
	mass: 0,
	shape: new Plane(),
});
groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
world.addBody(groundBody);

const spheres: { mesh: Mesh; body: Body }[] = [];

const createSphere = () => {
	const shpere = new Mesh(new SphereGeometry(0.25), new MeshPhongMaterial());
	scene.add(shpere);

	const shpereBody = new Body({
		mass: 1,
		shape: new Sphere(0.25),
		position: new Vec3(0, 10, 0),
	});
	world.addBody(shpereBody);

	return {
		mesh: shpere,
		body: shpereBody
	};
};

useAnimation(() => {
	spheres.forEach(item => item.mesh.position.copy(item.body.position));
});

useKey(
	async () => {
		spheres.push(createSphere());
	},
	{
		key: "a",
		type: "requestAnimationFrame",
	}
);
