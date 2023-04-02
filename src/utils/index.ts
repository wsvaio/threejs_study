import * as THREE from "three";
import { compose } from "@wsvaio/utils";
import { GUI } from "three/examples/jsm/libs/lil-gui.module.min";
export const { use, run } = compose<{
  scene: THREE.Scene;
  renderer: THREE.WebGLRenderer;
  camera: THREE.PerspectiveCamera;
}>();

export function initial() {
  return run({
    scene: new THREE.Scene(),
    camera: new THREE.PerspectiveCamera(),
    renderer: new THREE.WebGLRenderer(),
  });
}
export const gui = new GUI();
export { THREE };
