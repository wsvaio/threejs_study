import { Mesh, MeshLambertMaterial, PlaneGeometry } from "three";
import { scene } from "@/models/scene";

const floor = new Mesh(new PlaneGeometry(1000, 1000), new MeshLambertMaterial());

scene.add(floor);

floor.rotateX(-Math.PI / 2);
floor.receiveShadow = true;
