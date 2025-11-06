import type { SceneState } from "../types/scene_state";

export const step20 = {
  title: "Dot Product and Projection",
  description: `If we look at the purple and yellow lines, it's clear that neither of them points in the same or opposite direction as the blue line, not even slightly. This means that if we calculated the dot product: $\\vec{AB} \\cdot \\vec{AB_{normal}}$; the result would be zero: $AB_x \\cdot AB_{normal_x} + AB_y \\cdot AB_{normal_y} = 0$, because they are oriented so that there is no movement in the same direction. For example: $\\vec{AB} \\cdot \\vec{AB_{normal_{counter-clockwise}}} = (160) \\cdot (-80) + (80) \\cdot (160) = 0$`,
  dialogPosition: "bottom-3 right-3 w-full h-screen flex justify-end items-end",
  reduceState: (sceneState: SceneState): SceneState => {
    return sceneState;
  },
  updateState: (sceneState: SceneState): SceneState => {
    return sceneState;
  },
};
