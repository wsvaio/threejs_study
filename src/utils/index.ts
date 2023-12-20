import { compose } from "@wsvaio/utils";

// export const { use, run } = compose<{
// 	scene: Scene;
// 	renderer: WebGLRenderer;
// 	camera: PerspectiveCamera;
// }>();

export function useAnimation(callback: () => void) {
	const r = () => {
		callback();
		requestAnimationFrame(r);
	};
	requestAnimationFrame(r);
}

const keys = new Set<string>();

type KeyType = "keydown" | "keyup" | "requestAnimationFrame";

const keyCompose = compose<{
	type: KeyType;
	ev?: KeyboardEvent;
	keys: Set<string>;
}>();

window.addEventListener("keydown", ev => {
	console.log(ev);
	if (keys.has(ev.key.toLocaleLowerCase())) return;
	keys.add(ev.key.toLocaleLowerCase());
	keyCompose({ type: "keydown", ev, keys });
});
window.addEventListener("keyup", ev => {
	keyCompose({ type: "keyup", ev, keys });
	keys.delete(ev.key.toLocaleLowerCase());
});
useAnimation(() => {
	keyCompose({ type: "requestAnimationFrame", keys });
});

export const onKey = keyCompose.use;
