import type { SceneState } from "../types/scene_state";

export const step8 = {
  title: "Vector Magnitude",
  description: `Let's recap what we know. The area of a square is one of its sides multiplied by itself. We know the length of the purple square's sides is $160$ because the purple line was $x = 160$, and the length of the yellow square's sides is $80$ because the yellow line was $y = 80$. So, $a^2$ must be $160 \\cdot 160 = 160^2$ and $b^2$ must be $80 \\cdot 80 = 80^2$. We can also conclude from this that if we know the length of the blue square's sides, then that length must be equal to the length of the blue line, or in other words, the length/magnitude of the direction vector $||\\vec{AB}||$.`,
  dialogPosition: "bottom-3 right-3 w-full h-screen flex justify-end items-end",
  reduceState: (sceneState: SceneState): SceneState => {
    return sceneState;
  },
  updateState: (sceneState: SceneState): SceneState => {

    // stop animation
    sceneState.beforeRender = () => {}
    
    return sceneState;
  },
};
