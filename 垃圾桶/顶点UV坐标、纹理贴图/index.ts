import {
  BufferAttribute,
  CircleGeometry,
  DoubleSide,
  Mesh,
  MeshPhongMaterial,
  PlaneGeometry,
  RepeatWrapping,
  TextureLoader,
} from "three";
import rustic from "@/textures/rustic/rustic_stone_wall_diff_4k.jpg";
import { scene } from "@/models/scene";
use(async () => {
  // # 创建纹理贴图
  // 通过纹理贴图加载器TextureLoadr的load（）方法加载一张图片可以返回一个纹理对象Texture，纹理对象Texture可以作为模型材质颜色贴图.map属性的值
  const geometry = new PlaneGeometry(200, 200);
  const texLoader = new TextureLoader();
  const texture = await texLoader.loadAsync(rustic);
  const material = new MeshPhongMaterial({
    map: texture,
    side: DoubleSide,
    shininess: 100,
  });

  const mesh = new Mesh(geometry, material);
  scene.add(mesh);

  // 自定义顶点UV坐标
  // 顶点UV坐标的作用是从纹理贴图上提取像素映射到网格模型Mesh的几何体表面上
  console.log("uv", geometry.attributes.uv);
  const uvs = new Float32Array([
    0.25, 0.75, 0.75, 0.75, 0.25, 0.25, 0.75, 0.25,
  ]);
  geometry.attributes.uv = new BufferAttribute(uvs, 2);

  const geometry1 = geometry.clone();
  const mesh1 = new Mesh(geometry1, material);
  mesh1.translateX(300);
  scene.add(mesh1);
  geometry1.attributes.uv = new BufferAttribute(
    new Float32Array([0, 2, 2, 2, 0, 0, 2, 0]),
    2,
  );

  // 圆形平面设置纹理贴图
  const circleGeometry = new CircleGeometry(60, 100);
  const circle = new Mesh(circleGeometry, material);
  circle.translateX(-300);
  scene.add(circle);

  //  纹理对象Texture阵列
  const planeGeometry = new PlaneGeometry(2000, 2000);
  const plane = new Mesh(planeGeometry, material);
  plane.translateY(-500);
  plane.rotateX(Math.PI / 2);
  scene.add(plane);

  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  // texture.repeat.set(4, 4);

  // uv 动画
  useAnimation(() => {
    texture.offset.x += 0.01;
  });
});
