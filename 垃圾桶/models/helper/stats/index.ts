import Stats from "three/examples/jsm/libs/stats.module";

const stats = new Stats();
useAnimation(() => stats.update());
document.body.appendChild(stats.dom);
