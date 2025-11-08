import type { SceneState } from "../types/scene_state";

export const step8 = {
  title: "Vector Magnitude",
  description: `Let's recap what we know. The area of a square is one of its sides multiplied by itself. We know the length of the purple square's sides is $160$ because the purple line was $x = 160$, and the length of the yellow square's sides is $80$ because the yellow line was $y = 80$.`,
  reduceState: (sceneState: SceneState): SceneState => {
    return sceneState;
  },
  updateState: (sceneState: SceneState): SceneState => {

    // stop animation
    sceneState.beforeRender = () => {}
    
    return sceneState;
  },
};
