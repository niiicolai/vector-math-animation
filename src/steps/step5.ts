import type { SceneState } from "../types/scene_state";
import type { ObjectUserData } from "../types/object_user_data";

export const step5 = {
  title: "Vector Magnitude",
  description: `Let's try to draw the direction $x = 160$ (purple line) and $y = 80$ (yellow line). This forms a triangle.`,
  dialogPosition: "bottom-3 right-3 w-full h-screen flex justify-end items-end",
  reduceState: (sceneState: SceneState): SceneState => {
    const { lineABText, lineX, lineY } = sceneState.objects;

    // Display lineABText
    lineABText.setVisible(true);

    // Hide lineX and lineY
    lineX.setVisible(false);
    lineY.setVisible(false);

    return sceneState;
  },
  updateState: (sceneState: SceneState): SceneState => {
    const { clock, renderer, objects } = sceneState;
    const { lineAB, lineABText, lineX, lineY } = objects;

    // Hide lineABText
    lineABText.setVisible(false);

    // Display lineX and lineY
    lineX.setVisible(true);
    lineY.setVisible(true);

    // Configure lineX and lineY position
    lineX.setUserData({
      reposition: () => {
        lineX.transform.position.set(
          renderer.getCenterX() - 80,
          renderer.getCenterY()
        );
      },
    });
    lineY.setUserData({
      reposition: () => {
        lineY.transform.position.set(
          renderer.getCenterX() + 80,
          renderer.getCenterY() - 80
        );
      },
    });
    (lineX.userData as ObjectUserData).reposition();
    (lineY.userData as ObjectUserData).reposition();

    // Reset lineAB scale
    lineAB.transform.scale.set(1, 1);

    // Set animation options
    lineX.transform.scale.set(0, 1);
    lineY.transform.scale.set(1, 0);
    const speed = 0.2;

    // Animate lineX and lineY
    sceneState.beforeRender = () => {
      if (lineX.transform.scale.x === 1 && lineY.transform.scale.y === 1)
        return;

      const add = clock.getDeltaTime() * speed;

      if (lineX.transform.scale.x < 1) {
        lineX.transform.scale.translate(add, 1);

        if (lineX.transform.scale.x >= 1) {
          lineX.transform.scale.set(1, 1);
        }
      }

      if (lineY.transform.scale.y < 1) {
        lineY.transform.scale.translate(1, add);

        if (lineY.transform.scale.y >= 1) {
          lineY.transform.scale.set(1, 1);
        }
      }
    };

    return sceneState;
  },
};
