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
