import type { SceneState } from "../types/scene_state";
import type { ObjectUserData } from "../types/object_user_data";

export const step2 = {
  title: "Introduction",
  description:
    "A line can be drawn between them that represents the direction in which they must move to meet each other.",
  dialogPosition: "bottom-3 right-3 w-full h-screen flex justify-end items-end",
  reduceState: (sceneState: SceneState): SceneState => {
    const { lineAB } = sceneState.objects;

    // Hide lineAB
    lineAB.setVisible(false);

    return sceneState;
  },
  updateState: (sceneState: SceneState): SceneState => {
    const { clock, renderer } = sceneState;
    const { pointA, pointB, lineAB } = sceneState.objects;

    // Display lineAB
    lineAB.setVisible(true);

    // Configure lineAB position
    lineAB.setUserData({
      reposition: () => {
        const lenX = pointB.transform.position.x - pointA.transform.position.x;

        lineAB.transform.position.set(
          renderer.getCenterX() - lenX / 2,
          renderer.getCenterY()
        );
      },
    });
    (lineAB.userData as ObjectUserData).reposition();

    // Reset point a and b scale
    pointA.transform.scale.set(1, 1);
    pointB.transform.scale.set(1, 1);

    // Set animation scaling options
    lineAB.transform.scale.set(0, 0);
    const speed = 0.2;

    // Animate lineAB scaling
    sceneState.beforeRender = () => {
      if (lineAB.transform.scale.x === 1) return;
      const add = clock.getDeltaTime() * speed;

      lineAB.transform.scale.translate(add, add);

      if (lineAB.transform.scale.x >= 1) {
        lineAB.transform.scale.set(1, 1);
      }
    };

    return sceneState;
  },
};
