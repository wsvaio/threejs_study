import { GUI } from "three/examples/jsm/libs/lil-gui.module.min";
import { ambientLight, directionalLight, pointLight, spotLight } from "@/models/light";

export const gui = new GUI();
use(async () => {
	gui.title("控制");

	const ambientLightFolder = gui.addFolder("环境光");
	ambientLightFolder.add(ambientLight, "intensity", 0, 10).name("环境光强度");
	ambientLightFolder
		.addColor({ color: 0xFFFFFF }, "color")
		.name("环境光颜色")
		.onChange(val => ambientLight.color.set(val));

	const pointLightFolder = gui.addFolder("点光源");
	pointLightFolder.add(pointLight, "intensity", 0, 1000000000).name("点光源强度");
	pointLightFolder
		.addColor({ color: 0xFFFFFF }, "color")
		.name("点光源颜色")
		.onChange(val => pointLight.color.set(val));

	const directionalLightFolder = gui.addFolder("平行光");
	directionalLightFolder.add(directionalLight, "intensity", 0, 10).name("平行光强度");
	directionalLightFolder
		.addColor({ color: 0xFFFFFF }, "color")
		.name("平行光颜色")
		.onChange(val => directionalLight.color.set(val));

	const spotLightFolder = gui.addFolder("聚光灯");
	spotLightFolder.add(spotLight, "intensity", 0, 10).name("聚光灯强度");
	spotLightFolder
		.addColor({ color: 0xFFFFFF }, "color")
		.name("聚光灯颜色")
		.onChange(val => spotLight.color.set(val));

	// spotLightFolder.add({ x: 0 }, "x", 0, 10000).name("阴影质量").onChange(val => {
	// 	spotLight.shadow.mapSize.set(val, val);
	// 	console.log("wef");
	// });
});
