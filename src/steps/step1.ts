import type { SceneState } from "../types/scene_state";
import type { ObjectUserData } from "../types/object_user_data";

export const step1 = {
  title: "Introduction",
  description: "Imagine two circles in 2D space.",
  dialogPosition: "bottom-3 right-3 w-full h-screen flex justify-end items-end",
  reduceState: (sceneState: SceneState): SceneState => {
    const { pointA, pointB } = sceneState.objects;

    // Hide point a and b
    pointA.setVisible(false);
    pointB.setVisible(false);

    return sceneState;
  },
  updateState: (sceneState: SceneState): SceneState => {
    const { clock, renderer, objects } = sceneState;
    const { pointA, pointB } = objects;

    // Display point a and b
    pointA.setVisible(true);
    pointB.setVisible(true);

    // Configure position
    pointA.setUserData({
      reposition: () => {
        pointA.transform.position.set(
          renderer.getCenterX() - 80,
          renderer.getCenterY()
        );
      },
    });
    pointB.setUserData({
      reposition: () => {
        pointB.transform.position.set(
          renderer.getCenterX() + 80,
          renderer.getCenterY() - 80
        );
      },
    });
    (pointA.userData as ObjectUserData).reposition();
    (pointB.userData as ObjectUserData).reposition();

    // Set animation scaling options
    const speed = 2;
    const baseScale = 1;
    const multiplier = 0.5;

    // Animate point a and b scaling
    sceneState.beforeRender = () => {
      const time = clock.getElapsedTime();
      const scale = baseScale + Math.sin(time * speed) * multiplier;

      pointA.transform.scale.set(scale, scale);
      pointB.transform.scale.set(scale, scale);
    };

    return sceneState;
  },
};
