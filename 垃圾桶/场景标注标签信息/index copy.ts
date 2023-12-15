import { BoxGeometry, Mesh, MeshLambertMaterial, Raycaster, Vector2 } from "three";
import { CSS2DObject } from "three/examples/jsm/renderers/CSS2DRenderer.js";
import { scene } from "@/models/scene";
import { renderer } from "@/models/renderer";
import { camera } from "@/models/camera";

use(async () => {
	// const texture = await new TextureLoader().loadAsync(img);
	const mesh = new Mesh(
		new BoxGeometry(100, 100, 100),
		new MeshLambertMaterial({ color: "white" })
	);
	scene.add(mesh);

	const domParser = new DOMParser();
	const dom = domParser.parseFromString(
		`
	<div id="tag" style="display: none; width: max-content; background: pink; top: -100px; transition: all .3s;">
		<h1>那些年很冒险的梦</h1>
	</div>
	`,
		"text/html"
	);

	const tag = new CSS2DObject(dom.getElementById("tag"));
	// scene.add(tag);
	// tag.position.set(0, 0, 0);

	mesh.add(tag);

	renderer.domElement.addEventListener("mousemove", event => {
		const px = event.offsetX;
		const py = event.offsetY;

		const x = (px / innerWidth) * 2 - 1;
		const y = (py / innerHeight) * 2 - 1;

		console.log(x, y);
		const raycaster = new Raycaster();

		raycaster.setFromCamera(new Vector2(x, y), camera);

		const intersects = raycaster.intersectObject(mesh);

		console.log(intersects);

		if (intersects.length > 0) {
			// mesh.material.color.set("red");
			// mesh.add(tag);
			tag.element.style.opacity = "1";
		}

		else {
			// mesh.material.color.set("white");
			// mesh.remove(tag);
			tag.element.style.opacity = "0";
		}
	});
});
