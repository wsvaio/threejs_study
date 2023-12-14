import { AxesHelper, BoxGeometry, DoubleSide, Group, Mesh, MeshLambertMaterial, TorusGeometry, Vector3 } from "three";
import { scene } from "@/models/scene";

use(async () => {
  const geometry = new TorusGeometry(100, 10, undefined, undefined, Math.PI / 2);
  const material = new MeshLambertMaterial({
    side: DoubleSide,
    wireframe: true,
  });
  const mesh = new Mesh(geometry, material);
  const meshClone = mesh.clone();
  const meshClone1 = mesh.clone();
  const meshClone2 = mesh.clone();
  scene.add(mesh);
  scene.add(meshClone);
  useAnimation(() => {
    // geometry.rotateZ(Math.PI / 45);
    // geometry.scale(1.001, 0.999, 1.001);
    mesh.rotateZ(Math.PI / 180);
    mesh.rotateY(Math.PI / 180);
    meshClone.rotateZ(Math.PI / 180);
    meshClone.rotateY(Math.PI / 180);
    meshClone1.rotateZ(Math.PI / 180);
    meshClone1.rotateY(Math.PI / 180);
    meshClone2.rotateZ(Math.PI / 180);
    meshClone2.rotateY(Math.PI / 180);
  });

  mesh.add(meshClone);
  meshClone.add(meshClone1);
  meshClone1.add(meshClone2);
  meshClone1.name = "666";
  console.log(mesh.children);

  // 批量创建多个长方体表示高层楼
  const group1 = new Group(); // 所有高层楼的父对象
  group1.name = "高层";
  for (let i = 0; i < 5; i++) {
    const geometry = new BoxGeometry(20, 60, 10);
    const material = new MeshLambertMaterial({
      color: 0x00FFFF,
    });
    const mesh = new Mesh(geometry, material);
    mesh.position.x = i * 30; // 网格模型mesh沿着x轴方向阵列
    group1.add(mesh); // 添加到组对象group1
    mesh.name = `${i + 1}号楼`;
    // console.log('mesh.name',mesh.name);
  }
  group1.position.y = 30;

  const group2 = new Group();
  group2.name = "洋房";
  // 批量创建多个长方体表示洋房
  for (let i = 0; i < 5; i++) {
    const geometry = new BoxGeometry(20, 30, 10);
    const material = new MeshLambertMaterial({
      color: 0x00FFFF,
      visible: false,
    });
    const mesh = new Mesh(geometry, material);
    mesh.position.x = i * 30;
    group2.add(mesh); // 添加到组对象group2
    mesh.name = `${i + 6}号楼`;
  }
  group2.position.z = 50;
  group2.position.y = 15;

  const model = new Group();
  model.name = "小区房子";
  model.add(group1, group2);
  model.position.set(-50, 0, -25);

  scene.add(model);

  // 递归遍历model包含所有的模型节点
  model.traverse((obj) => {
    console.log("所有模型节点的名称", obj.name);
    // obj.isMesh：if判断模型对象obj是不是网格模型'Mesh'
    // if (obj.isMesh) { // 判断条件也可以是obj.type === 'Mesh'
    //   obj.material.color.set(0xFFFF00);
    //   obj.add(new AxesHelper(50));
    // }
  });

  const geted = model.getObjectByName("洋房");
  console.log(geted);

  console.log(geted.getWorldPosition(new Vector3()));
  geted.add(new AxesHelper(50));
  // geted.visible = false;
  useAnimation(() => {
    geted.rotateY(Math.PI / 180);
  });
});
