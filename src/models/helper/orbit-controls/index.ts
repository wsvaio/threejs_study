import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

use(async ({ camera, renderer, scene }) => {
  const controls = new OrbitControls(camera, renderer.domElement);
  // controls.addEventListener("change", () => renderer.render(scene, camera));
});
