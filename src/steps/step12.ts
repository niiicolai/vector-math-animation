import type { ObjectUserData } from "../types/object_user_data";
import type { SceneState } from "../types/scene_state";
import * as Two from "two-easy-engine";

export const step12 = {
  title: "Vector Magnitude",
  description: `At this point, we can add the areas of the purple and yellow squares to get the area of the blue square: $160^2 + 80^2 = 32000 = c^2$. This means the length of the blue square's side is a number $c$ that, when multiplied by itself, gives $32000$, or $c \\cdot c = 32000$.`,
  dialogPosition: "bottom-3 right-3 w-full h-screen flex justify-end items-end",
  reduceState: (sceneState: SceneState): SceneState => {
    const { renderer, objects } = sceneState;
    const {
      squareY,
      squareABText,
      squareXText,
      squareYText,
      squareXPiece1,
      squareXPiece2,
      squareXPiece3,
      squareXPiece4,
    } = objects;

    // Reset squareABText position
    squareABText.setUserData({
      reposition: () => {
        squareABText.transform.position.set(
          renderer.getCenterX() - 50,
          renderer.getCenterY() - 109
        );
      },
    });
    (squareABText.userData as ObjectUserData).reposition();

    // Reset squareABText text
    (squareABText.geometry as Two.TextGeometry).text = "c^2";
    (squareABText.geometry as Two.TextGeometry).options = {
          font: "18px Arial",
        };

    // Display squares and text
    squareY.setVisible(true);
    squareXText.setVisible(true);
    squareYText.setVisible(true);

    // Display pieces
    squareXPiece1.setVisible(true);
    squareXPiece2.setVisible(true);
    squareXPiece3.setVisible(true);
    squareXPiece4.setVisible(true);

    return sceneState;
  },
  updateState: (sceneState: SceneState): SceneState => {
    const { renderer } = sceneState;
    const {
      squareY,
      squareABText,
      squareXText,
      squareYText,
      squareXPiece1,
      squareXPiece2,
      squareXPiece3,
      squareXPiece4,
    } = sceneState.objects;

    // Hide pieces
    squareXPiece1.setVisible(false);
    squareXPiece2.setVisible(false);
    squareXPiece3.setVisible(false);
    squareXPiece4.setVisible(false);

    // Hide squares and text except squareAB
    squareY.setVisible(false);
    squareXText.setVisible(false);
    squareYText.setVisible(false);

    // Update squareABText text
    squareABText.setUserData({
      reposition: () => {
        squareABText.transform.position.set(
          renderer.getCenterX() - 125,
          renderer.getCenterY() - 109
        );
      },
    });
    (squareABText.userData as ObjectUserData).reposition();

    // Update squareABText text
    (squareABText.geometry as Two.TextGeometry).text = "area: 160^2 + 80^2 = 32000";
    (squareABText.geometry as Two.TextGeometry).options = { font: "14px Arial" };

    // Stop animation
    sceneState.beforeRender = () => {};

    return sceneState;
  },
};
