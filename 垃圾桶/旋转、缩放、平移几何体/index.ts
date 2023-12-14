import { DoubleSide, Mesh, MeshLambertMaterial, TorusGeometry } from "three";
import { scene } from "@/models/scene";

use(async () => {
  const geometry = new TorusGeometry(100, 10, undefined, undefined, Math.PI);
  const material = new MeshLambertMaterial({
    side: DoubleSide,
    wireframe: true,
  });
  const mesh = new Mesh(geometry, material);
  scene.add(mesh);

  useAnimation(() => {
    // geometry.rotateZ(Math.PI / 45);
    geometry.scale(1.001, 0.999, 1.001);
  });
});
