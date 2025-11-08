import type { ObjectUserData } from "../types/object_user_data";
import type { SceneState } from "../types/scene_state";
import * as Two from "two-easy-engine";

export const step19 = {
  title: "Normal Vector",
  description: `Let's move the green circle back. Now, what if we wanted to rotate the direction vector ($\\vec{AB}$) $90$ degrees counter-clockwise? All we need to do is switch the $x$ and $y$ of our direction vector and put a minus in front of y: $\\vec{AB_{normal_{counter-clockwise}}} = (-y, x)$ (the purple line). We can also move it clockwise by putting the minus in front of $x$ instead: $ \\vec{AB_{normal_{clockwise}}} = (y, -x)$ (the yellow line). These are called normal vectors.`,
  reduceState: (sceneState: SceneState): SceneState => {
    const { objects } = sceneState;
    const {
      pointA,
      squareABText,
      lineAB,
      radLineA,
      radLineB,
      pointAText,
      pointBText,
      lineABNormClock,
      lineABNormCounter,
    } = objects;

    // Reset radLineA and SquareAXText position
    radLineA.setUserData({
      reposition: () => {
        radLineA.transform.position.set(
          pointA.transform.position.x,
          pointA.transform.position.y
        );
      },
    });
    (radLineA.userData as ObjectUserData).reposition();

    // Display squareABText and radius lines
    squareABText.setVisible(true);
    radLineA.setVisible(true);
    radLineB.setVisible(true);

    // Hide lineABNormClock and lineABNormCounter
    lineABNormClock.setVisible(false);
    lineABNormCounter.setVisible(false);

    // Reset lineAB scale
    lineAB.transform.scale.set(1, 1);

    // Reset text
    (squareABText.geometry as Two.TextGeometry).text =
      "r^2 + r^2 <= (bx - ax)^2 + (by - ay)^2";
    (pointAText.geometry as Two.TextGeometry).text = "a(0, 0) radius=15";
    (pointBText.geometry as Two.TextGeometry).text = "b(160, 80) radius=15";

    return sceneState;
  },
  updateState: (sceneState: SceneState): SceneState => {
    const { objects, renderer, clock } = sceneState;
    const {
      pointA,
      pointAText,
      pointBText,
      lineAB,
      squareABText,
      radLineA,
      radLineB,
      lineABNormClock,
      lineABNormCounter,
    } = objects;

    // Reset lineAB scale
    lineAB.transform.scale.set(1, 1);

    // Hide squareABText and radius lines
    squareABText.setVisible(false);
    radLineA.setVisible(false);
    radLineB.setVisible(false);

    // Display lineABNormClock and lineABNormCounter
    lineABNormClock.setVisible(true);
    lineABNormCounter.setVisible(true);

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
    lineABNormCounter.setUserData({
      reposition: () => {
        lineABNormCounter.transform.position.set(
          pointA.transform.position.x,
          pointA.transform.position.y
        );
      },
    });
    lineABNormClock.setUserData({
      reposition: () => {
        lineABNormClock.transform.position.set(
          pointA.transform.position.x,
          pointA.transform.position.y
        );
      },
    });
    (pointA.userData as ObjectUserData).reposition();
    (lineAB.userData as ObjectUserData).reposition();
    (pointAText.userData as ObjectUserData).reposition();
    (lineABNormCounter.userData as ObjectUserData).reposition();
    (lineABNormClock.userData as ObjectUserData).reposition();

    // reset text
    (pointAText.geometry as Two.TextGeometry).text = "a(0, 0)";
    (pointBText.geometry as Two.TextGeometry).text = "b(160, 80)";

    // Set animation options
    lineABNormCounter.transform.scale.set(0, 0);
    lineABNormClock.transform.scale.set(0, 0);
    const speed = 0.2;

    // Animate lineABNormCounter and lineABNormClock
    sceneState.beforeRender = () => {
      const add = clock.getDeltaTime() * speed;

      if (lineABNormCounter.transform.scale.x < 1) {
        lineABNormCounter.transform.scale.translate(add, add);

        if (lineABNormCounter.transform.scale.x >= 1) {
          lineABNormCounter.transform.scale.set(1, 1);
        }
      }

      if (lineABNormClock.transform.scale.x < 1) {
        lineABNormClock.transform.scale.translate(add, add);

        if (lineABNormClock.transform.scale.x >= 1) {
          lineABNormClock.transform.scale.set(1, 1);
        }
      }
    };

    return sceneState;
  },
};
