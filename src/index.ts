import.meta.glob("./models/**/index.ts", { eager: true });

use(async ({ scene, camera, renderer }) => {
  camera.position.set(200, 200, 200);
  camera.lookAt(0, 0, 0);

  renderer.render(scene, camera);
  document.body.appendChild(renderer.domElement);
});

initial();
