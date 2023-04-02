use(async ({ scene }) => {
  // BoxGeometry：长方体
  const boxGeometry = new THREE.BoxGeometry(100, 100, 100);
  // SphereGeometry：球体
  const sphereGeometry = new THREE.SphereGeometry(50);
  // CylinderGeometry：圆柱
  const cylinderGeometry = new THREE.CylinderGeometry(50, 50, 100);
  // PlaneGeometry：矩形平面
  const planeGeometry = new THREE.PlaneGeometry(100, 50);
  // CircleGeometry：圆形平面
  const circleGeometry = new THREE.CircleGeometry(50);
  const material = new THREE.MeshLambertMaterial({
    color: 0x00FFFF, // 设置材质颜色
    transparent: true, // 开启透明
    opacity: 0.5, // 设置透明度
  });
  const box = new THREE.Mesh(boxGeometry, material);
  box.position.set(0, 0, 0);
  const sphere = new THREE.Mesh(sphereGeometry, material);
  sphere.position.set(200, 0, 0);
  const cylinder = new THREE.Mesh(cylinderGeometry, material);
  cylinder.position.set(400, 0, 0);
  const plane = new THREE.Mesh(planeGeometry, material);
  plane.position.set(600, 0, 0);
  const circle = new THREE.Mesh(circleGeometry, material);
  circle.position.set(800, 0, 0);
  scene.add(box, sphere, cylinder, plane, circle);
});
