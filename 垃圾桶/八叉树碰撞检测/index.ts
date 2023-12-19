import { CylinderGeometry, Group, Mesh, MeshLambertMaterial, MeshPhongMaterial, SphereGeometry, Vector3 } from "three";
import { Octree } from "three/examples/jsm/math/Octree";
import { OctreeHelper } from "three/examples/jsm/helpers/OctreeHelper";
import { Capsule } from "three/examples/jsm/math/Capsule";
import { scene } from "../scene";

const worldOctree = new Octree();

const mesh = new Mesh(new SphereGeometry(1), new MeshPhongMaterial());
scene.add(mesh);

worldOctree.fromGraphNode(mesh);

console.log(worldOctree);

const helper = new OctreeHelper(worldOctree);

scene.add(helper);

const R = 0.4;
const H = 1.7;

const start = new Vector3(0, R, 0);
const end = new Vector3(0, H - R, 0);
const capsule = new Capsule(start, end, R);

console.log("capsule", capsule);

function CapsuleHelper(R, H) {
	const group = new Group();
	const material = new MeshLambertMaterial({
		color: 0x00FFFF,
		transparent: true,
		opacity: 0.5,
	});
	// 底部半球
	const geometry = new SphereGeometry(R, 25, 25, 0, 2 * Math.PI, 0, Math.PI / 2);
	geometry.rotateX(Math.PI);
	const mesh = new Mesh(geometry, material);
	mesh.position.y = R;
	group.add(mesh);
	// 顶部半球
	const geometry2 = new SphereGeometry(R, 25, 25, 0, 2 * Math.PI, 0, Math.PI / 2);
	const mesh2 = new Mesh(geometry2, material);
	mesh2.position.set(0, H - R, 0);
	group.add(mesh2);
	// 中间圆柱
	const h = H - 2 * R;
	const geometry3 = new CylinderGeometry(R, R, h, 32, 1, true);
	geometry3.translate(0, h / 2 + R, 0);
	const mesh3 = new Mesh(geometry3, material);
	group.add(mesh3);
	return group;
}

const capsuleHelper = CapsuleHelper(R, H);
scene.add(capsuleHelper);

capsule.translate(new Vector3(0, -2, 0));
// capsuleHelper.position.y += -R;
// capsuleHelper.position.copy(capsule.start);
capsuleHelper.position.y -= 2;

const result = worldOctree.capsuleIntersect(capsule);

console.log("碰撞监测结果", result);
