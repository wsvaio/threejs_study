import { WebGLRenderer } from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { scene } from "../scene";
import { camera } from "../camera";

export const renderer = new WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.setClearColor(0x444444, 1);
export const composer = new EffectComposer(renderer);
export const renderPass = new RenderPass(scene, camera);
// export const outlinePass = new OutlinePass(new Vector2(1000, 100000), scene, camera);
composer.addPass(renderPass);
// composer.addPass(outlinePass);
