import type { ObjectUserData } from "../types/object_user_data";
import type { SceneState } from "../types/scene_state";
import * as Two from "two-easy-engine";

export const step18 = {
  title: "Circle-Circle Collision",
  description: `We can see the green circle slightly moving toward $(160, 80)$ and stopping when the squared distance between them equals the squared radii of the two circles.`,
  dialogPosition: "bottom-3 right-3 w-full h-screen flex justify-end items-end",
  reduceState: (sceneState: SceneState): SceneState => {
    const { objects, renderer } = sceneState;
    const { squareABText, lineAB, radLineA, radLineB, pointAText, pointBText } =
      objects;

    // Reset SquareAXText position
    squareABText.setUserData({
      reposition: () => {
        squareABText.transform.position.set(
          renderer.getCenterX() - 170,
          renderer.getCenterY() - 50
        );
      },
    });
    (squareABText.userData as ObjectUserData).reposition();

    // Reset lineAB scale
    lineAB.transform.scale.set(0.1, 0.1);

    // Reset text
    (squareABText.geometry as Two.TextGeometry).text =
      "(r1 + r2)^2 >= (bx - ax)^2 + (by - ay)^2";
    (pointAText.geometry as Two.TextGeometry).text = "a(0, 0) radius=15";
    (pointBText.geometry as Two.TextGeometry).text = "b(160, 80) radius=15";

    // Hide radius lines
    radLineA.setVisible(false);
    radLineB.setVisible(false);

    return sceneState;
  },
  updateState: (sceneState: SceneState): SceneState => {
    const { clock, objects } = sceneState;
    const {
      pointA,
      pointB,
      pointAText,
      pointBText,
      lineAB,
      squareABText,
      radLineA,
    } = objects;

    // Get text geometry
    const pointATextGeometry = pointAText.geometry as Two.TextGeometry;
    const squareABTextGeometry = squareABText.geometry as Two.TextGeometry;

    // update text
    squareABTextGeometry.text = "30^2 >= (160 - 0)^2 + (80 - 0)^2";

    // Set animations options
    const speed = 30;
    const radSquared = 30 * 30;
    const totalLength = 178.8;
    const currentMag = new Two.Vector2(0, 0);

    // Animate
    sceneState.beforeRender = () => {
      const deltaTime = clock.getDeltaTime();
      const tx = pointB.transform.position.x;
      const ty = pointB.transform.position.y;
      const dx = tx - pointA.transform.position.x;
      const dy = ty - pointA.transform.position.y;
      const isColliding = radSquared >= (dx * dx + dy * dy)

      if (!isColliding) {
        const mag = Math.sqrt(dx * dx + dy * dy);
        const normX = dx / mag;
        const normY = dy / mag;
        const velX = normX * speed * deltaTime;
        const velY = normY * speed * deltaTime;

        // Move point a and lineAB toward point b
        radLineA.transform.position.translate(velX, velY);
        pointA.transform.position.translate(velX, velY);
        lineAB.transform.position.translate(velX, velY);
        currentMag.translate(velX, velY);

        // Update lineAB scale
        const nextScale = 1 - (currentMag.length() / totalLength);
        lineAB.transform.scale.set(nextScale, nextScale);

        // Move point a toward point b text
        const textdx =
          pointBText.transform.position.x - pointAText.transform.position.x;
        const textdy =
          pointBText.transform.position.y - pointAText.transform.position.y;
        const textMag = Math.sqrt(textdx * textdx + textdy * textdy);
        const textnx = (textdx / textMag) * speed * deltaTime;
        const textny = (textdy / textMag) * speed * deltaTime;
        pointAText.transform.position.translate(textnx, textny);

        // Display pointA position
        pointATextGeometry.text = `a(${currentMag.x.toFixed(2)}, ${Math.abs(
          currentMag.y
        ).toFixed(2)}) radius=15`;

        // update squareABText text
        squareABTextGeometry.text = `30^2 >= (160 - ${currentMag.x.toFixed(
          2
        )})^2 + (80 - ${Math.abs(currentMag.y).toFixed(2)})^2`;
      } else {
        // update squareABText text
        squareABTextGeometry.text = `${radSquared} >= ${radSquared}`;
      }
    };

    return sceneState;
  },
};
