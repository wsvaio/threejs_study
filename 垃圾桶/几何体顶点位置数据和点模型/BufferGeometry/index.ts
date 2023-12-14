import { scene } from "@/models/scene";

use(async () => {
  // 创建一个空的几何体对象
  const geometry = new THREE.BufferGeometry();
  // 类型化数组创建顶点数据
  const vertices = new Float32Array([
    0, 0, 0, // 顶点1坐标
    50, 0, 0, // 顶点2坐标
    0, 100, 0, // 顶点3坐标
    0, 0, 10, // 顶点4坐标
    0, 0, 100, // 顶点5坐标
    50, 0, 10, // 顶点6坐标
  ]);
  // 创建属性缓冲区对象
  // 3个为一组，表示一个顶点的xyz坐标
  const attribute = new THREE.BufferAttribute(vertices, 3);
  geometry.attributes.position = attribute;
  // 点渲染模式;
  const material = new THREE.PointsMaterial({
    color: 0xFFFF00,
    size: 10.0,
  });
  const points = new THREE.Points(geometry, material);
  scene.add(points);
});
