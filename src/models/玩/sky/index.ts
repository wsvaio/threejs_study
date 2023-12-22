import { BackSide, BoxGeometry, Mesh, MeshBasicMaterial, TextureLoader } from "three";

import skyUrl2 from "./negx.jpg";
import skyUrl4 from "./negy.jpg";
import skyUrl6 from "./negz.jpg";
import skyUrl1 from "./posx.jpg";
import skyUrl3 from "./posy.jpg";
import skyUrl5 from "./posz.jpg";
import { scene } from "@/models/scene";

const textureLoader = new TextureLoader();
const materialArray = [] as any[];
for (const item of [skyUrl1, skyUrl2, skyUrl3, skyUrl4, skyUrl5, skyUrl6]) {
	materialArray.push(new MeshBasicMaterial({
		map: await textureLoader.loadAsync(item),
		side: BackSide
	}));
}
const skyBox = new Mesh(new BoxGeometry(5000, 5000, 5000), materialArray);

scene.add(skyBox);
