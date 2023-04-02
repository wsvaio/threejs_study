import Stats from "three/examples/jsm/libs/stats.module";
import.meta.glob("./models/**/index.ts", { eager: true });
use(async ({ scene, camera, renderer }) => {
  camera.position.set(200, 200, 200);
  camera.lookAt(0, 0, 0);
  camera.far = 10000;
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setClearColor(0x444444, 1);
  const handleResize = () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  };
  handleResize();
  window.addEventListener("resize", handleResize);

  const stats = new Stats();
  const render = () => {
    stats.update();
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  };
  requestAnimationFrame(render);

  document.body.appendChild(renderer.domElement);
  document.body.appendChild(stats.dom);
});

initial();
