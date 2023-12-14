import { PerspectiveCamera } from "three";

export const camera = new PerspectiveCamera();

use(async () => {
  camera.position.set(1000, 1000, 1000);
  camera.lookAt(0, 0, 0);
  camera.far = 10000;
});
