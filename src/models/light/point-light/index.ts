export const pointLight = new THREE.PointLight(0xFFFFFF, 1.0);
use(async ({ scene }) => {
  pointLight.position.set(1000, 1000, 1000);
  gui.add(pointLight, "intensity", 0, 100).name("点光源强度");
  scene.add(pointLight);
});
