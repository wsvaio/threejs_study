import { GridHelper } from "three";
import { scene } from "@/models/scene";

const grideHelper = new GridHelper(10000, 100);
scene.add(grideHelper);