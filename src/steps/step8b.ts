import type { SceneState } from "../types/scene_state";

export const step8b = {
  title: "Vector Magnitude",
  description: `So, $a^2$ must be $160 \\cdot 160 = 160^2$ and $b^2$ must be $80 \\cdot 80 = 80^2$. We can also conclude from this that if we know the length of the blue square's sides, then that length must be equal to the length of the blue line, or in other words, the length/magnitude of the direction vector $||\\vec{AB}||$.`,
  reduceState: (sceneState: SceneState): SceneState => {
    return sceneState;
  },
  updateState: (sceneState: SceneState): SceneState => {
    return sceneState;
  },
};
