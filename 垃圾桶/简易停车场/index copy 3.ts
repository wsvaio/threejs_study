import {
	DoubleSide,
	Mesh,
	MeshPhongMaterial,
	PlaneGeometry,
	SphereGeometry,
	TextureLoader,
	Vector3,
} from "three";
import {
	Body,
	ContactMaterial,
	Material,
	Plane,
	Sphere,
	Vec3,
} from "cannon-es";
import { scene } from "../scene";
import { world } from "../cannon";
import { camera } from "../camera";
import { controls } from "../orbit-controls";
import img from "./2312.png";
import { onKey } from "@/utils";

const texture = await new TextureLoader().loadAsync(img);
const concreteMaterial = new Material("concrete");
const plasticMaterial = new Material("plastic");

const concretePlastic = new ContactMaterial(concreteMaterial, plasticMaterial, {
	friction: 0.1,
	restitution: 0.7,
});

world.addContactMaterial(concretePlastic);

const ground = new Mesh(
	new PlaneGeometry(100, 100),
	new MeshPhongMaterial({
		// map: texture,
	})
);
scene.add(ground);
ground.rotateX(-Math.PI / 2);
ground.receiveShadow = true;
const groundBody = new Body({
	mass: 0,
	shape: new Plane(),
	material: concreteMaterial,
});
groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
world.addBody(groundBody);

const spheres: { mesh: Mesh; body: Body }[] = [];

const createSphere = (size?: number, pos?: Vec3) => {
	size ||= Math.random() * 100;
	pos ||= new Vec3(Math.random(), 100 + Math.random(), Math.random());
	const mesh = new Mesh(
		new SphereGeometry(size),
		new MeshPhongMaterial({
			map: texture,
			side: DoubleSide,
		})
	);
	scene.add(mesh);
	mesh.castShadow = true;

	const shpereBody = new Body({
		mass: (size / 0.02) * 0.027,
		shape: new Sphere(size),
		position: pos,
		material: plasticMaterial,
	});
	world.addBody(shpereBody);

	return {
		mesh,
		body: shpereBody,
	};
};

// for (let i = 1; i <= 10; i++)
// 	spheres.push(createSphere(1, new Vec3(0, i * 2, 0)));

const sphere = createSphere(1, new Vec3(0, 1, 10));
// spheres.push(sphere);
// sphere.mesh.visible = false;
const shoot = () => {
	const mesh = new Mesh(
		new SphereGeometry(0.25),
		new MeshPhongMaterial({
			map: texture,
			side: DoubleSide,
		})
	);
	scene.add(mesh);

	const pos = camera.position
		.clone()
		.sub(sphere.mesh.position)
		.normalize()
		.multiplyScalar(-1.5)
		.add(sphere.mesh.position.clone());

	const body = new Body({
		mass: 1,
		shape: new Sphere(0.25),
		position: new Vec3(pos.x, pos.y, pos.z),
		material: plasticMaterial,
	});
	world.addBody(body);

	body.applyImpulse(
		camera.position
			.clone()
			.sub(sphere.mesh.position)
			.normalize()
			.multiplyScalar(-sphere.body.mass * 100),
		new Vec3(0, 0, 0)
	);

	return {
		mesh,
		body,
	};
};

controls.target = sphere.mesh.position;

let pos = { x: 0, y: 0, z: 0 };
useAnimation(() => {
	spheres.forEach(item => {
		item.mesh.position.copy(item.body.position);
		item.mesh.quaternion.copy(item.body.quaternion);
	});

	pos.x = sphere.mesh.position.x;
	pos.y = sphere.mesh.position.y;
	pos.z = sphere.mesh.position.z;
	sphere.mesh.position.set(
		sphere.body.position.x,
		sphere.body.position.y,
		sphere.body.position.z
	);

	sphere.mesh.quaternion.copy(sphere.body.quaternion);

	camera.position.x += sphere.mesh.position.x - pos.x;
	camera.position.y += sphere.mesh.position.y - pos.y;
	camera.position.z += sphere.mesh.position.z - pos.z;
});

onKey(async ({ keys, type }) => {
	if (type == "requestAnimationFrame") {
		if (keys.has("w")) {
			sphere.body.applyForce(
				camera.position
					.clone().setY(0)
					.sub(sphere.mesh.position.clone().setY(0))
					.normalize()
					.multiplyScalar(-sphere.body.mass * 10),
				new Vec3(0, 0, 0)
			);
		}

		if (keys.has("s")) {
			sphere.body.applyForce(
				camera.position
					.clone().setY(0)
					.sub(sphere.mesh.position.clone().setY(0))
					.normalize()
					.multiplyScalar(sphere.body.mass * 10),
				new Vec3(0, 0, 0)
			);
		}

		if (keys.has("a")) {
			sphere.body.applyForce(
				camera.position
					.clone().setY(0)
					.sub(sphere.mesh.position.clone().setY(0))
					.normalize()
					.multiplyScalar(sphere.body.mass * 10)
					.applyAxisAngle(new Vector3(0, 1, 0), Math.PI / -2),
				new Vec3(0, 0, 0)
			);
		}

		if (keys.has("d")) {
			sphere.body.applyForce(
				camera.position
					.clone().setY(0)
					.sub(sphere.mesh.position.clone().setY(0))
					.normalize()
					.multiplyScalar(sphere.body.mass * 10)
					.applyAxisAngle(new Vector3(0, 1, 0), Math.PI / 2),
				new Vec3(0, 0, 0)
			);
		}
	}

	if (type == "keydown") {
		if (keys.has("arrowup"))
			spheres.push(createSphere());

		if (keys.has(" ")) {
			// sphere.body.applyImpulse(
			// 	camera.position
			// 		.clone().setY(0)
			// 		.sub(sphere.mesh.position)
			// 		.normalize()
			// 		.multiplyScalar(-sphere.body.mass * 2),
			// 	new Vec3(0, 0, 0)
			// );

			spheres.push(shoot());
		}
	}
});
