import { compose } from "@wsvaio/utils";
import { Clock } from "three";

// export const { use, run } = compose<{
// 	scene: Scene;
// 	renderer: WebGLRenderer;
// 	camera: PerspectiveCamera;
// }>();

export const keys = new Set<string>();

window.addEventListener("keydown", ev => {
	keys.add(ev.key.toLocaleLowerCase());
});
window.addEventListener("keyup", ev => {
	keys.delete(ev.key.toLocaleLowerCase());
});

const clock = new Clock();
const animationFrameCompose = compose<{ delta: number }>();
const r = () => {
	const delta = clock.getDelta();
	animationFrameCompose({ delta });
	requestAnimationFrame(r);
};
requestAnimationFrame(r);
export const useAnimationFrame = animationFrameCompose.use;
