import { BufferAttribute, BufferGeometry, DoubleSide, Mesh, MeshBasicMaterial } from "three";
import { scene } from "@/models/scene";

use(async () => {
  // 顶点坐标
  // const vertices = new Float32Array([
  //   0, 0, 0, // 顶点1坐标
  //   80, 0, 0, // 顶点2坐标
  //   80, 80, 0, // 顶点3坐标
  //   0, 80, 0, // 顶点4坐标
  // ]);

  const vertices = new Float32Array([
    0, 0, 0, // 顶点1坐标
    80, 0, 0, // 顶点2坐标
    80, 80, 0, // 顶点3坐标
    0, 0, 0, // 顶点4坐标   和顶点1位置相同
    80, 80, 0, // 顶点5坐标  和顶点3位置相同
    0, 80, 0, // 顶点6坐标

    100, 100, 100,
    200, 200, 200,
    100, 500, 100,
  ]);

  // Uint16Array类型数组创建顶点索引数据
  const indexes = new Uint16Array([
  // 下面索引值对应顶点位置数据中的顶点坐标
    0, 1, 2, 0, 2, 3,
  ]);

  const geometry = new BufferGeometry();
  geometry.attributes.position = new BufferAttribute(vertices, 3);
  // geometry.index = new BufferAttribute(indexes, 1);

  const mesh = new Mesh(geometry, new MeshBasicMaterial({ side: DoubleSide }));
  scene.add(mesh);
});
