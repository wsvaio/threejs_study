import { PerspectiveCamera } from "three";

export const camera = new PerspectiveCamera();
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);
camera.far = 100000;
camera.near = 0.001;
camera.updateProjectionMatrix();
