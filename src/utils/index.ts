import * as THREE from "three";
import { compose } from "@wsvaio/utils";
export const { use, run } = compose<{
  scene: THREE.Scene;
  renderer: THREE.WebGLRenderer;
  camera: THREE.PerspectiveCamera;
}>();

export function initial() {
  return run({
    scene: new THREE.Scene(),
    camera: new THREE.PerspectiveCamera(75, 16 / 9, 1, 1000),
    renderer: new THREE.WebGLRenderer(),
  });
}

export { THREE };
