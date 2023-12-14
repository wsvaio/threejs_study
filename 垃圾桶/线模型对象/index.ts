import { BufferAttribute, BufferGeometry, Line, LineBasicMaterial, LineLoop, LineSegments } from "three";
import { scene } from "@/models/scene";

use(async () => {
  // 创建一个空的几何体对象
  const geometry = new BufferGeometry();
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
  const attribute = new BufferAttribute(vertices, 3);
  geometry.attributes.position = attribute;
  // 线材质对象
  const material = new LineBasicMaterial({
    color: 0xFF0000,
  });
  // 创建线模型对象
  const line = new Line(geometry, material);
  // scene.add(line);

  // 闭合线条
  const lineLoop = new LineLoop(geometry, material);
  // scene.add(lineLoop);

  // 非连续的线条
  const lineSegements = new LineSegments(geometry, material);
  scene.add(lineSegements);
});
