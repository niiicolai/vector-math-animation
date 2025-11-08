import type { ObjectUserData } from "../types/object_user_data";
import type { SceneState } from "../types/scene_state";
import * as Two from "two-easy-engine";

export const step15 = {
  title: "Normalized Vector",
  description: `All we need to do to get the normalized vector is dividing the direction $\\vec{AB} = (160, 80)$ by its magnitude $178.88$, giving $(160/178.88, 80/178.88) = (0.89, 0.45) = \\vec{AB_{normalized}}$. Tip: If we multiply the normalized vector with a number (scalar), it is possible to increase the speed: $\\vec{AB_{normalized}} \\cdot n = (AB_{normalized_x} \\cdot n, AB_{normalized_y} \\cdot n)$.`,
  reduceState: (sceneState: SceneState): SceneState => {
    const { pointA, lineAB, squareABText, pointAText } = sceneState.objects;

    // Reset positions
    (pointA.userData as ObjectUserData).reposition();
    (lineAB.userData as ObjectUserData).reposition();
    (pointAText.userData as ObjectUserData).reposition();

    // Reset scale
    lineAB.transform.scale.set(1, 1);

    // Reset text
    (squareABText.geometry as Two.TextGeometry).text = `Length: 1;`;
    (pointAText.geometry as Two.TextGeometry).text = `a(0, 0)`;

    return sceneState;
  },
  updateState: (sceneState: SceneState): SceneState => {
    const { clock } = sceneState;
    const { pointA, pointB, lineAB, squareABText, pointAText, pointBText } =
      sceneState.objects;

    // Ensure lineAB is targetScale
    lineAB.transform.scale.set(0.1, 0.1);

    // Get normalized vector
    const dx = pointB.transform.position.x - pointA.transform.position.x;
    const dy = pointB.transform.position.y - pointA.transform.position.y;
    const mag = Math.sqrt(dx * dx + dy * dy);
    const normX = dx / mag;
    const normY = dy / mag;

    // Get and intialize text
    const pointATextGeometry = pointAText.geometry as Two.TextGeometry;
    const squareABTextGeometry = squareABText.geometry as Two.TextGeometry;
    squareABTextGeometry.text = `Length: 1; Direction: (${normX.toFixed(
      2
    )}, ${Math.abs(normY).toFixed(2)})`;

    // Set animations options
    const speed = 30;
    const currentMag = new Two.Vector2(0, 0);

    // Animate
    sceneState.beforeRender = () => {
      const deltaTime = clock.getDeltaTime();
      const tx = pointB.transform.position.x;
      const ty = pointB.transform.position.y;
      const dx = tx - pointA.transform.position.x;
      const dy = ty - pointA.transform.position.y;
      const mag = Math.sqrt(dx * dx + dy * dy);

      if (mag > 10) {
        const normX = dx / mag;
        const normY = dy / mag;
        const velX = normX * speed * deltaTime;
        const velY = normY * speed * deltaTime;

        // Move point a and lineAB toward point b
        pointA.transform.position.translate(velX, velY);
        lineAB.transform.position.translate(velX, velY);
        currentMag.translate(velX, velY);

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
        ).toFixed(2)})`;
      } else {
        // Stay at point b
        pointA.transform.position.set(tx, ty);
        lineAB.transform.position.set(tx, ty);

        // Stay at point b text
        const textX = pointBText.transform.position.x;
        const textY = pointBText.transform.position.y;
        pointAText.transform.position.set(textX, textY);

        // Display point a's new value
        pointATextGeometry.text = `a(160, 80)`;
      }
    };

    return sceneState;
  },
};
