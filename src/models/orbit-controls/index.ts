import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { camera } from "@/models/camera";
import { renderer } from "@/models/renderer";

export const controls = new OrbitControls(camera, renderer.domElement);
