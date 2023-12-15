import { AxesHelper } from "three";
import { scene } from "@/models/scene";

const axesHelper = new AxesHelper(10000);
scene.add(axesHelper);
