import type { ObjectUserData } from "../types/object_user_data";
import type { SceneState } from "../types/scene_state";
import * as Two from "two-easy-engine";

export const step16 = {
  title: "Circle-Circle Collision",
  description: `If we just keep adding the normalized vector to the green circle's point until it reaches point $b$, the two circles will overlap, as you can see. But if we know the radii of the two circles, we can use the distance between their centers to determine if the circles are colliding.`,
  reduceState: (sceneState: SceneState): SceneState => {
    const { renderer, objects } = sceneState;
    const { pointA, pointAText, lineAB } = objects;

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

    // Reset point a text
    (pointAText.geometry as Two.TextGeometry).text = "a(0, 0)";

    return sceneState;
  },
  updateState: (sceneState: SceneState): SceneState => {
    const { objects } = sceneState;
    const { pointA, pointB, lineAB, pointAText, pointBText } = objects;    

    // Ensure point a is at point b
    pointA.setUserData({
      reposition: () => {
        pointA.transform.position.set(
          pointB.transform.position.x,
          pointB.transform.position.y
        );
      },
    });
    lineAB.setUserData({
      reposition: () => {
        lineAB.transform.position.set(
          pointB.transform.position.x,
          pointB.transform.position.y
        );
      },
    });
    pointAText.setUserData({
      reposition: () => {
        pointAText.transform.position.set(
          pointBText.transform.position.x,
          pointBText.transform.position.y
        );
      },
    });
    (pointA.userData as ObjectUserData).reposition();
    (lineAB.userData as ObjectUserData).reposition();
    (pointAText.userData as ObjectUserData).reposition();

    // Ensure point a text is equal to b
    (pointAText.geometry as Two.TextGeometry).text = "a(160, 80)";

    // Stop animation
    sceneState.beforeRender = () => {};

    return sceneState;
  },
};
