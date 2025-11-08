import type { ObjectUserData } from "../types/object_user_data";
import type { SceneState } from "../types/scene_state";

export const step22 = {
  title: "Dot Product and Projection",
  description: `Finally, we can calculate the length of the projection of the orange line onto the purple line. The projection tells us how far they are pointing in the same direction (see the green line). The projection length is the result of the dot product divided by the length of the purple line: $\\frac{\\vec{v_{orange}} \\cdot \\vec{v_{purple}}}{||\\vec{v_{purple}}||}$. The result is: $\\frac{(-60)(-80) + (150)(160)}{\\sqrt{(-80)^2 + 160^2}} = \\frac{28800}{\\sqrt{32000}} = 160.99$. So, the length of the green line is ~ $161$ Understanding how to find this projection is the crucial first step in more complex calculations, like determining if two convex polygons overlap. For example, take a look at the Separating Axis Theorem, you should now know the essentials.`,
  reduceState: (sceneState: SceneState): SceneState => {
    const { objects } = sceneState;
    const { lineABProjLen } = objects;

    // Hide lineABProjLen
    lineABProjLen.setVisible(false);

    return sceneState;
  },
  updateState: (sceneState: SceneState): SceneState => {
    const { objects, clock } = sceneState;
    const { lineABProjLen, pointA, lineABProjEx } = objects;

    // Display lineABProjLen and
    lineABProjLen.setVisible(true);

    // Configure position
    lineABProjLen.setUserData({
      reposition: () => {
        lineABProjLen.transform.position.set(
          pointA.transform.position.x,
          pointA.transform.position.y
        );
      },
    });
    (lineABProjLen.userData as ObjectUserData).reposition();

    // Ensure they are full scale
    lineABProjEx.transform.scale.set(1, 1);

    // Set animation options
    lineABProjLen.transform.scale.set(0, 0);
    const speed = 0.2;

    // Animate lineABNormCounter and lineABNormClock
    sceneState.beforeRender = () => {
      if (lineABProjLen.transform.scale.x < 1) {
        const add = clock.getDeltaTime() * speed;
        lineABProjLen.transform.scale.translate(add, add);

        if (lineABProjLen.transform.scale.x >= 0.9) {
          lineABProjLen.transform.scale.set(0.9, 0.9);
        }
      }
    };

    return sceneState;
  },
};
