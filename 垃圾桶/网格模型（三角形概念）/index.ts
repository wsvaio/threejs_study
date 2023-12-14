import { BoxGeometry, ConeGeometry, DoubleSide, LineBasicMaterial, LineLoop, PlaneGeometry, RingGeometry, SphereGeometry } from "three";
import { scene } from "@/models/scene";

use(async () => {
  const lineMaterial = new LineBasicMaterial({
    color: 0xFF0000,
    side: DoubleSide,
  });

  // 圆体
  const sphere = new LineLoop(new SphereGeometry(100, 10, 10, 0, Math.PI * 2, 0, Math.PI), lineMaterial);
  scene.add(sphere);

  // 方体
  const box = new LineLoop(new BoxGeometry(100, 100, 100), lineMaterial);
  box.position.x = 200;
  scene.add(box);

  // 锥体
  const gone = new LineLoop(new ConeGeometry(100, 100), lineMaterial);
  gone.position.x = 400;
  scene.add(gone);

  // 环形
  const ring = new LineLoop(new RingGeometry(50, 100), lineMaterial);
  ring.position.x = 600;
  scene.add(ring);

  // 方形
  const plane = new LineLoop(new PlaneGeometry(100, 100), lineMaterial);
  plane.position.x = 800;
  scene.add(plane);
});
