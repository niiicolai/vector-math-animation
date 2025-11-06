import type { SceneState } from "../types/scene_state";
import type { ObjectUserData } from "../types/object_user_data";

export const step6 = {
  title: "Vector Magnitude",
  description: `We can draw three squares (a rectangle where all sides have the same length) using the triangle's three sides. Let's call the purple square $a$, the yellow square $b$, and the blue square $c$.`,
  dialogPosition: "bottom-3 right-3 w-full h-screen flex justify-end items-end",
  reduceState: (sceneState: SceneState): SceneState => {
    const {
      lineX,
      lineY,
      squareAB,
      squareX,
      squareY,
      squareABText,
      squareXText,
      squareYText,
    } = sceneState.objects;

    lineX.setVisible(false);
    lineY.setVisible(false);

    squareAB.setVisible(false);
    squareX.setVisible(false);
    squareY.setVisible(false);

    squareABText.setVisible(false);
    squareXText.setVisible(false);
    squareYText.setVisible(false);

    return sceneState;
  },
  updateState: (sceneState: SceneState): SceneState => {
    const { renderer, clock, objects } = sceneState;
    const {
      lineX,
      lineY,
      squareAB,
      squareX,
      squareY,
      squareABText,
      squareXText,
      squareYText,
    } = objects;

    // Display squares
    squareAB.setVisible(true);
    squareX.setVisible(true);
    squareY.setVisible(true);

    // Display text
    squareABText.setVisible(true);
    squareXText.setVisible(true);
    squareYText.setVisible(true);

    // Configure positions
    squareAB.setUserData({
      reposition: () => {
        squareAB.transform.position.set(
          renderer.getCenterX() - 130,
          renderer.getCenterY() - 209
        );
      },
    });
    squareX.setUserData({
      reposition: () => {
        squareX.transform.position.set(
          renderer.getCenterX() - 80,
          renderer.getCenterY()
        );
      },
    });
    squareY.setUserData({
      reposition: () => {
        squareY.transform.position.set(
          renderer.getCenterX() + 80,
          renderer.getCenterY() - 80
        );
      },
    });
    squareABText.setUserData({
      reposition: () => {
        squareABText.transform.position.set(
          renderer.getCenterX() - 50,
          renderer.getCenterY() - 109
        );
      },
    });
    squareXText.setUserData({
      reposition: () => {
        squareXText.transform.position.set(
          renderer.getCenterX() - 5,
          renderer.getCenterY() + 80
        );
      },
    });
    squareYText.setUserData({
      reposition: () => {
        squareYText.transform.position.set(
          renderer.getCenterX() + 115,
          renderer.getCenterY() - 40
        );
      },
    });
    (squareAB.userData as ObjectUserData).reposition();
    (squareX.userData as ObjectUserData).reposition();
    (squareY.userData as ObjectUserData).reposition();
    (squareABText.userData as ObjectUserData).reposition();
    (squareXText.userData as ObjectUserData).reposition();
    (squareYText.userData as ObjectUserData).reposition();

    // Rotate squareAB
    squareAB.transform.rotation = (63.5 * Math.PI) / 180;

    // Reset lineX and lineY scale
    lineX.transform.scale.set(1, 1);
    lineY.transform.scale.set(1, 1);

    // Set animation options
    squareAB.transform.scale.set(0, 0);
    squareX.transform.scale.set(0, 0);
    squareY.transform.scale.set(0, 0);
    squareABText.transform.scale.set(0, 0);
    squareXText.transform.scale.set(0, 0);
    squareYText.transform.scale.set(0, 0);
    const speed = 0.6;

    // Animate scale
    sceneState.beforeRender = () => {
      if (squareAB.transform.scale.x === 1) return;

      const add = clock.getDeltaTime() * speed;

      squareAB.transform.scale.translate(add, add);
      squareX.transform.scale.translate(add, add);
      squareY.transform.scale.translate(add, add);
      squareABText.transform.scale.translate(add, add);
      squareXText.transform.scale.translate(add, add);
      squareYText.transform.scale.translate(add, add);

      if (squareAB.transform.scale.x >= 1) {
        squareAB.transform.scale.set(1, 1);
        squareX.transform.scale.set(1, 1);
        squareY.transform.scale.set(1, 1);
        squareABText.transform.scale.set(1, 1);
        squareXText.transform.scale.set(1, 1);
        squareYText.transform.scale.set(1, 1);
      }
    };

    return sceneState;
  },
};
