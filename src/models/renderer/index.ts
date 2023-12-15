import { WebGLRenderer } from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { CSS2DRenderer } from "three/examples/jsm/renderers/CSS2DRenderer.js";
import { CSS3DRenderer } from "three/examples/jsm/renderers/CSS3DRenderer";
import { scene } from "../scene";
import { camera } from "../camera";

export const renderer = new WebGLRenderer({
	antialias: true,
	alpha: true
});
renderer.shadowMap.enabled = true;
renderer.setClearColor(0x444444, 1);
export const composer = new EffectComposer(renderer);
export const renderPass = new RenderPass(scene, camera);
// export const outlinePass = new OutlinePass(new Vector2(1000, 100000), scene, camera);
composer.addPass(renderPass);
// composer.addPass(outlinePass);

export const css2DRenderer = new CSS2DRenderer();

export const css3DRenderer = new CSS3DRenderer();
