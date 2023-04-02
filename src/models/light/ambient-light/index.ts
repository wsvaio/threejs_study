export const ambientLight = new THREE.AmbientLight("white", 1);
use(async ({ scene }) => {
  scene.add(ambientLight);
  gui.add(ambientLight, "intensity", 0, 10).name("环境光强度");
});
