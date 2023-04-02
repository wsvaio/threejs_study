use(async (ctx) => {
  ctx.scene.add(
    new THREE.Mesh(
      new THREE.SphereGeometry(100),
      new THREE.MeshPhongMaterial({
        color: 0xFF0000,
        shininess: 10,
        specular: "#00f",
      }),
    ),
  );
});
