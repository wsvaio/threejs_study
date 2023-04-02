// use(async ({ scene }) => {
//   // 创建一个长方体几何对象Geometry
//   const geometry = new THREE.BoxGeometry(100, 100, 100);
//   // 材质对象Material
//   const material = new THREE.MeshLambertMaterial({
//     color: 0x00FFFF, // 设置材质颜色
//     transparent: true, // 开启透明
//     opacity: 0.5, // 设置透明度
//   });
//   for (let x = 0; x < 20; x++) {
//     for (let y = 0; y < 20; y++) {
//       for (let z = 0; z < 20; z++) {
//         const mesh = new THREE.Mesh(geometry, material); // 网格模型对象Mesh
//         // 在XOZ平面上分布
//         mesh.position.set((Math.random() * 10000 - 5000), (Math.random() * 10000 - 5000), (Math.random() * 10000 - 5000));
//         scene.add(mesh); // 网格模型添加到场景中
//       }
//     }
//   }
// });
