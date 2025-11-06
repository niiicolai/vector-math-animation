import type { SceneState } from "../types/scene_state";
import * as Two from "two-easy-engine";

export const step14 = {
  title: "Normalized Vector",
  description: `The direction vector $\\vec{AB} = (160, 80)$ can be added to the green circle's position to move it to the red circle, but instead of moving slowly toward the red circle, it would be teleported. However, since we know the length/magnitude, $||\\vec{AB}||$, we can scale the vector down to get a new vector with a length of $1$ and move the green circle slowly $1$ unit toward the red circle. The new vector is called a normalized vector.`,
  dialogPosition: "bottom-3 right-3 w-full h-screen flex justify-end items-end",
  reduceState: (sceneState: SceneState): SceneState => {
    const { lineAB } = sceneState.objects;

    // Reset scale
    lineAB.transform.scale.set(1, 1);

    return sceneState;
  },
  updateState: (sceneState: SceneState): SceneState => {
    const { clock } = sceneState;
    const { lineAB, squareABText } = sceneState.objects;

    // Reset scale
    lineAB.transform.scale.set(1, 1);

    // Set animation settings
    const textGeometry = squareABText.geometry as Two.TextGeometry;
    const totalLength = 178.8;
    const speed = 2;
    const targetScale = 0.1;

    // Animate
    sceneState.beforeRender = () => {
      const { x, y } = lineAB.transform.scale;

      if (x === targetScale && y === targetScale) {
        return;
      }

      const add = - clock.getDeltaTime() * speed;
      lineAB.transform.scale.translate(add, add);

      const scale = lineAB.transform.scale.x;
      textGeometry.text = `Length: ${(totalLength * scale).toFixed(0)};`;

      if (scale <= targetScale && scale <= targetScale) {
        lineAB.transform.scale.set(targetScale, targetScale);
        textGeometry.text = "Length: 1;";
      };
    };

    return sceneState;
  },
};
