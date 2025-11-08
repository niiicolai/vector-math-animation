import * as Two from "two-easy-engine";
import type { SceneState } from "../types/scene_state";
import type { ObjectUserData } from "../types/object_user_data";

export const step7 = {
  title: "Vector Magnitude",
  description: `Now, to continue, it's important to know that the area of a square is the length of one of its sides multiplied by itself, or in other words $side \\cdot side$, which is the same as the side squared: $side^2$. Let's rename the squares to represent their areas.`,
  reduceState: (sceneState: SceneState): SceneState => {
    const { squareABText, squareXText, squareYText } = sceneState.objects;

    // Reset text value
    (squareABText.geometry as Two.TextGeometry).text = "a";
    (squareXText.geometry as Two.TextGeometry).text = "b";
    (squareYText.geometry as Two.TextGeometry).text = "c";

    return sceneState;
  },
  updateState: (sceneState: SceneState): SceneState => {
    const { renderer } = sceneState;
    const {
      squareAB,
      squareX,
      squareY,
      squareABText,
      squareXText,
      squareYText,
    } = sceneState.objects;

    // update text value
    (squareABText.geometry as Two.TextGeometry).text = "c^2";
    (squareXText.geometry as Two.TextGeometry).text = "a^2";
    (squareYText.geometry as Two.TextGeometry).text = "b^2";

    // update text position
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
          renderer.getCenterX() - 15,
          renderer.getCenterY() + 80
        );
      },
    });
    squareYText.setUserData({
      reposition: () => {
        squareYText.transform.position.set(
          renderer.getCenterX() + 105,
          renderer.getCenterY() - 40
        );
      },
    });
    (squareABText.userData as ObjectUserData).reposition();
    (squareXText.userData as ObjectUserData).reposition();
    (squareYText.userData as ObjectUserData).reposition();

    // reset square scale
    squareAB.transform.scale.set(1, 1);
    squareX.transform.scale.set(1, 1);
    squareY.transform.scale.set(1, 1);

    // Stop animation
    sceneState.beforeRender = () => {};

    return sceneState;
  },
};
