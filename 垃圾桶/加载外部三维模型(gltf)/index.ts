import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import rustic from "@/textures/rustic_stone_wall_4k.glb?url";
import { scene } from "@/models/scene";
use(async () => {
  const loader = new GLTFLoader();
  const gltf = await loader.loadAsync(rustic);
  scene.add(gltf.scene);
});
