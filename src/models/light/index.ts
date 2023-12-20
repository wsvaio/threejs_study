import { AmbientLight, DirectionalLight } from "three";
import { scene } from "../scene";
import { gui } from "@/models/gui";

export const ambientLight = new AmbientLight("white", 1);
export const directionalLight = new DirectionalLight(0xFFFFFF, 1);

// use(async ({ scene }) => {
scene.add(ambientLight);

directionalLight.position.set(-100, 100, -100);
scene.add(directionalLight);

// scene.add(new DirectionalLightHelper(directionalLight));
directionalLight.castShadow = true;
directionalLight.shadow.camera.left = -100;
directionalLight.shadow.camera.right = 100;
directionalLight.shadow.camera.top = -100;
directionalLight.shadow.camera.bottom = 100;
directionalLight.shadow.mapSize.set(4096, 4096);
directionalLight.shadow.bias = -0.0003;
const ambientLightFolder = gui.addFolder("环境光");
ambientLightFolder.add(ambientLight, "intensity", 0, 10).name("环境光强度");
ambientLightFolder
	.addColor({ color: 0xFFFFFF }, "color")
	.name("环境光颜色")
	.onChange(val => ambientLight.color.set(val));

const directionalLightFolder = gui.addFolder("平行光");
directionalLightFolder.add(directionalLight, "intensity", 0, 10).name("平行光强度");
directionalLightFolder
	.addColor({ color: 0xFFFFFF }, "color")
	.name("平行光颜色")
	.onChange(val => directionalLight.color.set(val));
// });
