import { BufferAttribute, BufferGeometry, DoubleSide, Mesh, MeshPhongMaterial } from "three";
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

  // 矩形平面，无索引，两个三角形，6个顶点
  // 每个顶点的法线数据和顶点位置数据一一对应
  const normals = new Float32Array([
    0, 0, 1, // 顶点1法线( 法向量 )
    0, 0, 0.5, // 顶点2法线
    0, 2, 1, // 顶点3法线
    0, 0, 0.5, // 顶点4法线
    0, 0, 1, // 顶点5法线
    0, 0, 1, // 顶点6法线
  ]);

  const geometry = new BufferGeometry();
  geometry.attributes.position = new BufferAttribute(vertices, 3);
  // geometry.index = new BufferAttribute(indexes, 1);
  // 设置几何体的顶点法线属性.attributes.normal
  geometry.attributes.normal = new BufferAttribute(normals, 3);

  const material = new MeshPhongMaterial({
    color: 0xF0F000,
    side: DoubleSide,
  });
  const mesh = new Mesh(geometry, material);
  scene.add(mesh);
});
