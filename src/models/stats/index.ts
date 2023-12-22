import Stats from "three/examples/jsm/libs/stats.module";

const stats = new Stats();
document.body.appendChild(stats.dom);

useAnimationFrame(() => stats.update());
