import { PointLight } from "three";

export const pointLight = new PointLight(0xFFFFFF, 1.0);
use(async ({ scene }) => {
  pointLight.position.set(1000, 1000, 1000);
  scene.add(pointLight);
});
