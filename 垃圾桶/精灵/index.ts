import { Clock, Group, Sprite, SpriteMaterial, TextureLoader } from "three";
import img from "./2312.png";

use(async ({ camera, scene }) => {
	const texture = await new TextureLoader().loadAsync(img);
	const spriteMaterial = new SpriteMaterial({ map: texture });

	const group = new Group();
	for (let i = 0; i < 12800; i++) {
		// 精灵模型共享材质
		const sprite = new Sprite(spriteMaterial);
		group.add(sprite);
		sprite.scale.set(1, 1, 1);
		// 设置精灵模型位置，在长方体空间上上随机分布
		const x = 1000 * (Math.random() - 0.5);
		const y = 600 * Math.random();
		const z = 1000 * (Math.random() - 0.5);
		sprite.position.set(x, y, z);
	}

	const clock = new Clock();
	useAnimation(() => {
		const t = clock.getDelta();
		group.children.forEach(sprite => {
			// 雨滴的y坐标每次减1
			sprite.position.y -= t * 60;
			if (sprite.position.y < 0) {
				// 如果雨滴落到地面，重置y，从新下落
				sprite.position.y = 600;
			}
		});
	});

	scene.add(group);
});
