import { DoubleSide, Mesh, MeshPhongMaterial, SphereGeometry } from "three";
import { scene } from "@/models/scene";
import { gui } from "@/models/helper/gui";

use(async () => {
  const geometry = new SphereGeometry(100, 1000, 1000);
  console.log("几何体", geometry);
  console.log("顶点位置数据", geometry.attributes.position);
  console.log("顶点索引数据", geometry.index);

  const material = new MeshPhongMaterial({
    side: DoubleSide,

    color: 0x0000FF,
    shininess: 100,
    opacity: 0.5,
    transparent: true,
    // specular: "#0ff",

    // wireframe: true,
  });

  const sphereFolder = gui.addFolder("球体");
  sphereFolder.add(material, "shininess", 0, 1000);
  const mesh = new Mesh(geometry, material);
  scene.add(mesh);
});
