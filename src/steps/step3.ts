import type { SceneState } from "../types/scene_state";
import type { ObjectUserData } from "../types/object_user_data";

export const step3 = {
  title: "Introduction",
  description: `Let's assign them the arbitrary coordinates $a$ and $b$.`,
  reduceState: (sceneState: SceneState): SceneState => {
    const { pointAText, pointBText } = sceneState.objects;

    // Hide pointAText and pointBText
    pointAText.setVisible(false);
    pointBText.setVisible(false);

    return sceneState;
  },
  updateState: (sceneState: SceneState): SceneState => {
    const { renderer, objects } = sceneState;
    const { lineAB, pointAText, pointBText } = objects;

    // Display pointAText and pointBText
    pointAText.setVisible(true);
    pointBText.setVisible(true);

    // Configure pointAText and pointBText position
    pointAText.setUserData({
      reposition: () => {
        pointAText.transform.position.set(
          renderer.getCenterX() - 98,
          renderer.getCenterY() + 30
        );
      },
    });
    pointBText.setUserData({
      reposition: () => {
        pointBText.transform.position.set(
          renderer.getCenterX() + 55,
          renderer.getCenterY() - 50
        );
      },
    });
    (pointAText.userData as ObjectUserData).reposition();
    (pointBText.userData as ObjectUserData).reposition();

    // Reset lineAB scale
    lineAB.transform.scale.set(1, 1);

    // Stop animation
    sceneState.beforeRender = () => {};

    return sceneState;
  },
};
