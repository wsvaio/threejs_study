import { ArrowHelper, Group, Mesh, MeshLambertMaterial, PlaneGeometry, SphereGeometry, Vector3 } from "three";
import { scene } from "../scene";

const plane = new Mesh(new PlaneGeometry(100, 100), new MeshLambertMaterial());
scene.add(plane);
plane.rotateX(-Math.PI / 2);
plane.receiveShadow = true;

// const R = 10; // 圆弧半径
// const N = 10; // 分段数量
// const sp = (Math.PI * 2) / N; // 两个相邻点间隔弧度
// const group = new Group();

// const geometry = new SphereGeometry(1);
// const material = new MeshPhongMaterial();

// for (let i = 0; i < N + 1; i++) {
// 	const angle = sp * i;
// 	// 以坐标原点为中心，在XOY平面上生成圆弧上的顶点数据
// 	const x = R * Math.cos(angle);
// 	const y = R * Math.sin(angle);
// 	const mesh = new Mesh(geometry, material);
// 	mesh.position.set(x, y, 0);
// 	group.add(mesh);
// }

// scene.add(group);

// const dir = new Vector3();
// camera.getWorldDirection(dir);
// console.log(dir, "dir");
// const dis = dir.clone().multiplyScalar(200);
// console.log(dis, "dis");

// new Tween(camera.position).to(camera.position.clone().add(dis), 20000).start();

const A = new Vector3(0, 3, 0);// A点
const B = new Vector3(8, 0, 0);// B点

// 绿色小球可视化A点位置
const AMesh = createSphereMesh(0x00FF00, 0.5);
AMesh.position.copy(A);
// 红色小球可视化B点位置
const BMesh = createSphereMesh(0xFF0000, 0.5);
BMesh.position.copy(B);

const group = new Group();
group.add(AMesh, BMesh);

function createSphereMesh(color, R) {
	const geometry = new SphereGeometry(R);
	const material = new MeshLambertMaterial({
		color,
	});
	const mesh = new Mesh(geometry, material);
	return mesh;
}

scene.add(group);

// 绘制一个从A指向B的箭头
const AB = B.clone().sub(A);
const L = AB.length() * 2;// AB长度
const dir = AB.clone().normalize();// 单位向量表示AB方向

// 生成箭头从A指向B
const arrowHelper = new ArrowHelper(dir, A, L);
group.add(arrowHelper);
