import type { SceneState } from "../types/scene_state";

export const step4b = {
  title: "Vector Subtraction",
  description: `This direction is called a vector, and we denote a vector with a small arrow above the variable, for example: $\\vec{AB}=(160, 80)$. Note: we subtracted the coordinates of point $a$ and $b$ to find the direction/displacement vector $\\vec{AB}$. In vector math, point $a$ and $b$ can be thought of as position vectors ($\\vec{A}$ and $\\vec{B}$) and the displacement vector is simply the result of vector subtraction.`,
  reduceState: (sceneState: SceneState): SceneState => {
    return sceneState;
  },
  updateState: (sceneState: SceneState): SceneState => {
    return sceneState;
  },
};
