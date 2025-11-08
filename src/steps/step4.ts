import * as Two from "two-easy-engine";
import type { SceneState } from "../types/scene_state";
import type { ObjectUserData } from "../types/object_user_data";

export const step4 = {
  title: "Vector Subtraction",
  description: `The direction of the blue line depends on whether you are going from $a$ to $b$ or from $b$ to $a$. If we are going from $a$ to $b$, we want to add the difference from $a_x = 0$ to $b_x = 160$ and from $a_y = 0$ to $b_y = 80$, or in other words $(b_x - a_x, b_y - a_y)$, which is $(160, 80)$ because point $a$'s values are zero. From this, we can conclude that the direction from $a$ to $b$ is $(160, 80)$.`,
  reduceState: (sceneState: SceneState): SceneState => {
    const { lineABText } = sceneState.objects;

    // Hide lineABText
    lineABText.setVisible(false);

    return sceneState;
  },
  updateState: (sceneState: SceneState): SceneState => {
    const { clock, renderer } = sceneState;
    const { pointA, pointB, lineAB, lineABText } = sceneState.objects;

    // Display lineABText
    lineABText.setVisible(true);

    // Configure lineABText position
    lineABText.setUserData({
      reposition: () => {
        lineABText.transform.position.set(
          renderer.getCenterX() - 80,
          renderer.getCenterY() - 60
        );
      },
    });
    (lineABText.userData as ObjectUserData).reposition();

    // Set animation options
    const lineABTextGeometry = (lineABText.geometry as Two.TextGeometry);
    const lenX = pointB.transform.position.x - pointA.transform.position.x;
    const lenY = pointB.transform.position.y - pointA.transform.position.y;
    const speed = 0.2;
    lineAB.transform.scale.set(0, 0);

    // Animate lineAB and lineABText
    sceneState.beforeRender = () => {
      if (lineAB.transform.scale.x === 1) return;
      const add = clock.getDeltaTime() * speed;

      lineAB.transform.scale.translate(add, add);
      if (lineAB.transform.scale.x >= 1) {
        lineAB.transform.scale.set(1, 1);
      }

      const scale = lineAB.transform.scale.x;
      const unitsX = (lenX * scale).toFixed(0);
      const unitsY = (Math.abs(lenY) * scale).toFixed(0);

      lineABTextGeometry.text = `units: (${unitsX}, ${unitsY})`;
    };

    return sceneState;
  },
};
