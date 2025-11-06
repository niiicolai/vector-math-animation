import type { ObjectUserData } from "../types/object_user_data";
import type { SceneState } from "../types/scene_state";
import * as Two from "two-easy-engine";

export const step13 = {
  title: "Vector Magnitude",
  description: `Asking for what number multiplied itself gives the length of a square's side is the same as asking for the square root: $\\sqrt{side^2}$ = side. So at this point we can conclude $c$ must be $\\sqrt{a^2 + b^2}$ or in other words $\\sqrt{32000}$. That also means the length/magnitude of the blue line is $||\\vec{AB}|| = \\sqrt{32000}$ ~ $178.88$ units.`,
  dialogPosition: "bottom-3 right-3 w-full h-screen flex justify-end items-end",
  reduceState: (sceneState: SceneState): SceneState => {
    const { squareAB, squareABText, lineX, lineY } = sceneState.objects;

    // display lines and squares
    squareAB.setVisible(true);
    lineX.setVisible(true);
    lineY.setVisible(true);

    // reset text
    (squareABText.geometry as Two.TextGeometry).text = "areal: 160^2 + 80^2 = 32000";

    return sceneState;
  },
  updateState: (sceneState: SceneState): SceneState => {
    const { renderer, objects } = sceneState;
    const { squareAB, squareABText, lineX, lineY } = objects;

    // Hide lines and squares
    squareAB.setVisible(false);
    lineX.setVisible(false);
    lineY.setVisible(false);

    // Update squareABText position
    squareABText.setUserData({
      reposition: () => {
        squareABText.transform.position.set(
          renderer.getCenterX() - 170,
          renderer.getCenterY() - 50
        );
      },
    });
    (squareABText.userData as ObjectUserData).reposition();

    // Update squareABText text
    (squareABText.geometry as Two.TextGeometry).text = "Length: √(32000) ~ 178.8;";
    (squareABText.geometry as Two.TextGeometry).options.font = "14px Arial";

    // Stop animation
    sceneState.beforeRender = () => {};

    return sceneState;
  },
};
