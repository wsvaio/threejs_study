import { AxesHelper } from "three";

use(async ({ scene }) => {
  const axesHelper = new AxesHelper(10000);
  scene.add(axesHelper);
});
