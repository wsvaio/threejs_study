export const ambientLight = new THREE.AmbientLight("white", 1);
use(async ({ scene }) => {
  scene.add(ambientLight);
});
