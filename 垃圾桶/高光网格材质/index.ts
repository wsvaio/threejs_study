use(async (ctx) => {
  ctx.scene.add(
    new THREE.Mesh(
      new THREE.SphereGeometry(100),
      new THREE.MeshPhongMaterial({
        color: 0x0000FF,
        shininess: 10,
        opacity: 0.5,
        transparent: true,
        specular: "#0f0",
      }),
    ),
  );
});
