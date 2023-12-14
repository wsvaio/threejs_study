import { AmbientLight, CameraHelper, DirectionalLight, DirectionalLightHelper, PointLight, PointLightHelper, SpotLight, SpotLightHelper } from "three";

export const ambientLight = new AmbientLight("white", 1);
export const pointLight = new PointLight(0xFFFFFF, 1.0);
export const directionalLight = new DirectionalLight(0xFFFFFF, 1);
export const spotLight = new SpotLight(0xFFFFFF, 1.0);

use(async ({ scene }) => {
	scene.add(ambientLight);

	pointLight.position.set(100, 100, 100);
	scene.add(pointLight);
	pointLight.decay = 0;

	scene.add(new PointLightHelper(pointLight));

	directionalLight.position.set(-100, 100, -100);
	scene.add(directionalLight);

	scene.add(new DirectionalLightHelper(directionalLight));
	directionalLight.castShadow = true;
	directionalLight.shadow.camera.left = -50;
	directionalLight.shadow.camera.right = 50;
	directionalLight.shadow.camera.top = 200;
	directionalLight.shadow.camera.bottom = -100;
	directionalLight.shadow.camera.near = 0.5;
	directionalLight.shadow.camera.far = 600;
	directionalLight.shadow.mapSize.set(1, 1);

	scene.add(new CameraHelper(directionalLight.shadow.camera));

	scene.add(spotLight);
	spotLight.decay = 0;

	spotLight.position.set(100, 100, -100);
	spotLight.target.position.set(0, 0, 0);

	spotLight.angle = Math.PI / 8;
	spotLight.penumbra = 0.05;
	spotLight.distance = 400;
	spotLight.castShadow = true;

	spotLight.shadow.camera.near = 0.5;
	spotLight.shadow.camera.far = 600;
	spotLight.shadow.mapSize.set(1024, 1024);
	directionalLight.shadow.radius = 300;
	scene.add(new CameraHelper(spotLight.shadow.camera));
	scene.add(spotLight.target);

	scene.add(new SpotLightHelper(spotLight));
});
