import type { ObjectUserData } from "../types/object_user_data";
import type { SceneState } from "../types/scene_state";

export const step21 = {
  title: "Dot Product and Projection",
  description: `Now, let's add a new vector (the orange line) and calculate the dot product for the orange and purple line, and the dot product for the orange and yellow line. Let's say the orange line is the vector $\\vec{v_{orange}} = (-60, 150)$. If we calculate the dot product of the purple and the orange line, we get a positive number: $(-60)(-80) + (150)(160) = dot = 28800$. Because it is positive, it tells us they are pointing the same direction. On the other hand, the dot product for the orange line and yellow line is a negative number: $(-60) \\cdot (80) + (150) \\cdot (-160) = dot = -28800$, because they are pointing in the opposite direction.`,
  reduceState: (sceneState: SceneState): SceneState => {
    const { objects } = sceneState;
    const { lineABProjEx } = objects;

    // Hide lineABProjEx
    lineABProjEx.setVisible(false);

    return sceneState;
  },
  updateState: (sceneState: SceneState): SceneState => {
    const { objects, clock } = sceneState;
    const { lineABProjEx, pointA, lineABNormClock, lineABNormCounter } =
      objects;

    // Display lineABProjEx
    lineABProjEx.setVisible(true);

    // Configure position
    lineABProjEx.setUserData({
      reposition: () => {
        lineABProjEx.transform.position.set(
          pointA.transform.position.x,
          pointA.transform.position.y
        );
      },
    });
    (lineABProjEx.userData as ObjectUserData).reposition();

    // Ensure they are full scale
    lineABNormCounter.transform.scale.set(1, 1);
    lineABNormClock.transform.scale.set(1, 1);

    // Set animation options
    lineABProjEx.transform.scale.set(0, 0);
    const speed = 0.2;

    // Animate lineABNormCounter and lineABNormClock
    sceneState.beforeRender = () => {
      if (lineABProjEx.transform.scale.x < 1) {
        const add = clock.getDeltaTime() * speed;
        lineABProjEx.transform.scale.translate(add, add);

        if (lineABProjEx.transform.scale.x >= 1) {
          lineABProjEx.transform.scale.set(1, 1);
        }
      }
    };

    return sceneState;
  },
};
