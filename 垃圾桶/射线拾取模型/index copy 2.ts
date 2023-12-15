import { BoxGeometry, BufferGeometry, Line, LineBasicMaterial, Mesh, MeshLambertMaterial, Raycaster, Vector3 } from "three";
import { scene } from "@/models/scene";

use(async () => {
	// const texture = await new TextureLoader().loadAsync(img);
	const mesh = new Mesh(new BoxGeometry(100, 100, 100), new MeshLambertMaterial({ color: "white" }));
	scene.add(mesh);

	const raycaster = new Raycaster();
	raycaster.ray.origin = new Vector3(0, 0, 0).normalize();
	raycaster.ray.direction = new Vector3(1, 1, 1).normalize();

	const intersects = raycaster.intersectObjects([mesh]);

	const geometry = new BufferGeometry();
	geometry.setFromPoints([
		new Vector3(0, 0, 0).normalize(),
		new Vector3(1, 1, 1).normalize(),
	]);
	const line = new Line(geometry, new LineBasicMaterial({ color: "yellow" }));
	scene.add(line);
	console.log("射线器返回的对象", intersects);
});
