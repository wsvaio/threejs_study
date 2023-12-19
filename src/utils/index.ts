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

const keys = new Set();

type KeyType = "keydown" | "keyup" | "requestAnimationFrame";

const keyCompose = compose<{
	type: KeyType;
	ev?: KeyboardEvent;
}>();

export const useKey = (
	middleware: any,
	{
		key,
		type,
	}: {
		key?: string | string[];
		type?: KeyType | KeyType[];
	} = {}
) => {
	keyCompose(async event => {
		if (type && event.type != type && !type?.includes(event.type))
			return;
		if (
			event.type == "requestAnimationFrame"
      && key
      && !(Array.isArray(key) ? key : [key]).some(item => keys.has(item))
		)
			return;
		if (
			event.type != "requestAnimationFrame"
      && key
      && event.ev.key.toLocaleLowerCase() != key
      && !key?.includes(event.ev.key.toLocaleLowerCase())
		)
			return;

		return await middleware(event.ev);
	});
};

window.addEventListener("keydown", ev => {
	if (keys.has(ev.key.toLocaleLowerCase())) return;
	keys.add(ev.key.toLocaleLowerCase());
	keyCompose({ type: "keydown", ev });
});
window.addEventListener("keyup", ev => {
	keys.delete(ev.key.toLocaleLowerCase());
	keyCompose({ type: "keyup", ev });
});
useAnimation(() => {
	keyCompose({ type: "requestAnimationFrame" });
});
