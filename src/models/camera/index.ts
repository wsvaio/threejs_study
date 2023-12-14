import { PerspectiveCamera } from "three";

export const camera = new PerspectiveCamera();
camera.position.set(250, 250, 250);
camera.lookAt(0, 0, 0);
camera.far = 100000;
camera.updateProjectionMatrix();
