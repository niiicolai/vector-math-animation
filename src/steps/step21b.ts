import type { SceneState } from "../types/scene_state";

export const step21b = {
  title: "Dot Product and Projection",
  description: `If we calculate the dot product of the purple and the orange line, we get a positive number: $(-60)(-80) + (150)(160) = dot = 28800$. Because it is positive, it tells us they are pointing the same direction. On the other hand, the dot product for the orange line and yellow line is a negative number: $(-60) \\cdot (80) + (150) \\cdot (-160) = dot = -28800$, because they are pointing in the opposite direction.`,
  reduceState: (sceneState: SceneState): SceneState => {
    return sceneState;
  },
  updateState: (sceneState: SceneState): SceneState => {
    return sceneState;
  },
};
