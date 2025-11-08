import type { ObjectUserData } from "../types/object_user_data";
import type { SceneState } from "../types/scene_state";
import * as Two from "two-easy-engine";

export const step0 = {
  title: "Vector Fundamentals",
  description:
    "The animation is designed to introduce the foundational concepts of vector mathematics: Vector Subtraction, Magnitude, Normalized Vector, Normal Vector, Dot Product and Vector Projection.",
  reduceState: (sceneState: SceneState): SceneState => {
    return sceneState;
  },
  updateState: (sceneState: SceneState): SceneState => {
    const { objects, renderer, clock } = sceneState;
    const { introText } = objects;

    introText.setVisible(true);

    introText.setUserData({
      reposition: () => {
        introText.transform.position.set(
          renderer.getCenterX() - 115,
          renderer.getCenterY()
        );
      },
    });
    (introText.userData as ObjectUserData).reposition();

    // Set animation scaling options
    const material = introText.material as Two.BasicMaterial;
    const color = material.strokeStyle as Two.HslaColor;
    const speed = 50;

    // Animate text color
    sceneState.beforeRender = () => {
      const delta = clock.getDeltaTime();

      ((introText.material as Two.BasicMaterial).strokeStyle as Two.HslaColor)
      .setHue((color.h + delta * speed) % 360);
    };

    return sceneState;
  },
};
