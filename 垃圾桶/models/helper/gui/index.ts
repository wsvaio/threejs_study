import { GUI } from "three/examples/jsm/libs/lil-gui.module.min";
import { ambientLight } from "@/models/light/ambient-light";
import { pointLight } from "@/models/light/point-light";
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
  pointLightFolder.add(pointLight, "intensity", 0, 100).name("点光源强度");
  pointLightFolder
    .addColor({ color: 0xFFFFFF }, "color")
    .name("点光源颜色")
    .onChange(val => pointLight.color.set(val));
});
