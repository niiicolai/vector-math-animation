import type { ObjectUserData } from "../types/object_user_data";
import type { SceneState } from "../types/scene_state";
import * as Two from "two-easy-engine";

export const step17 = {
  title: "Circle-Circle Collision",
  description: `Let's move the green circle back to its original position and then move it toward the red circle until the squared sum of the radii is greater than or equal to the squared distance of the blue line: $(r_1 + r_2)^2 >= (p2_x - p1_x)^2 + (p2_y - p1_y)^2$; Notice we don't use the actual distance: $\\sqrt{a^2+b^2}$; because it's quicker to compare squared distance.`,
  reduceState: (sceneState: SceneState): SceneState => {
    const { objects, renderer } = sceneState;
    const { squareABText, lineAB, radLineA, radLineB, pointAText, pointBText } = objects;

    // Reset SquareAXText position
    squareABText.setUserData({
      reposition: () => {
        squareABText.transform.position.set(
          renderer.getCenterX() - 100,
          renderer.getCenterY() - 120
        );
      },
    });
    (squareABText.userData as ObjectUserData).reposition();

    // Reset lineAB scale
    lineAB.transform.scale.set(.1, .1);

    // Reset text
    (squareABText.geometry as Two.TextGeometry).text = "Length: 1; Direction: (0.89, 0.45)";
    (pointAText.geometry as Two.TextGeometry).text = "a(0, 0)";
    (pointBText.geometry as Two.TextGeometry).text = "b(160, 80)";

    // Hide radius lines
    radLineA.setVisible(false);
    radLineB.setVisible(false);

    return sceneState;
  },
  updateState: (sceneState: SceneState): SceneState => {
    const { renderer, objects } = sceneState;
    const { pointA, pointB, pointAText, pointBText, lineAB, squareABText, radLineA, radLineB } = objects;

    // Reset position
    pointA.setUserData({
      reposition: () => {
        pointA.transform.position.set(
          renderer.getCenterX() - 80,
          renderer.getCenterY()
        );
      },
    });
    lineAB.setUserData({
      reposition: () => {
        lineAB.transform.position.set(
          renderer.getCenterX() - 80,
          renderer.getCenterY()
        );
      },
    });
    pointAText.setUserData({
      reposition: () => {
        pointAText.transform.position.set(
          renderer.getCenterX() - 98,
          renderer.getCenterY() + 30
        );
      },
    });
    (pointA.userData as ObjectUserData).reposition();
    (lineAB.userData as ObjectUserData).reposition();
    (pointAText.userData as ObjectUserData).reposition();

    // Configure SquareAXText position
    squareABText.setUserData({
      reposition: () => {
        squareABText.transform.position.set(
          renderer.getCenterX() - 120,
          renderer.getCenterY() - 120
        );
      },
    });
    (squareABText.userData as ObjectUserData).reposition();

    // Display radius lines
    radLineA.setVisible(true);
    radLineB.setVisible(true);

    // Position radius lines
    radLineA.setUserData({
      reposition: () => {
        radLineA.transform.position.set(
          pointA.transform.position.x,
          pointA.transform.position.y
        );
      },
    });
    radLineB.setUserData({
      reposition: () => {
        radLineB.transform.position.set(
          pointB.transform.position.x,
          pointB.transform.position.y
        );
      },
    });
    (radLineA.userData as ObjectUserData).reposition();
    (radLineB.userData as ObjectUserData).reposition();

    // Reset lineAB scale
    lineAB.transform.scale.set(1, 1);

    // update text
    (squareABText.geometry as Two.TextGeometry).text = "(r1 + r2)^2 >= (bx - ax)^2 + (by - ay)^2";
    (pointAText.geometry as Two.TextGeometry).text = "a(0, 0) radius=15";
    (pointBText.geometry as Two.TextGeometry).text = "b(160, 80) radius=15";

    // Stop animation
    sceneState.beforeRender = () => {};

    return sceneState;
  },
};
