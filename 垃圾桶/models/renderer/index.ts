import { WebGLRenderer } from "three";

export const renderer = new WebGLRenderer();
use(async () => {
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setClearColor(0x444444, 1);
});
