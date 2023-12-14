import { AmbientLight } from "three";

export const ambientLight = new AmbientLight("white", 1);
use(async ({ scene }) => {
  scene.add(ambientLight);
});
