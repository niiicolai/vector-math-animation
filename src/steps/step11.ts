import type { ObjectUserData } from "../types/object_user_data";
import type { SceneState } from "../types/scene_state";
import * as Two from "two-easy-engine";

export const step11 = {
  title: "Vector Magnitude",
  description: `Then, move the pieces into the blue square. What you see is that the sum of the areas of the yellow and purple squares fits perfectly inside the blue square, or in other words, $a^2 + b^2 = c^2$`,
  dialogPosition: "bottom-3 right-3 w-full h-screen flex justify-end items-end",
  reduceState: (sceneState: SceneState): SceneState => {
    return sceneState;
  },
  updateState: (sceneState: SceneState): SceneState => {
    const { clock } = sceneState;
    const {
      squareAB,
      squareXPiece1,
      squareXPiece2,
      squareXPiece3,
      squareXPiece4,
    } = sceneState.objects;

    // Reset positions
    (squareXPiece1.userData as ObjectUserData).reposition();
    (squareXPiece2.userData as ObjectUserData).reposition();
    (squareXPiece3.userData as ObjectUserData).reposition();
    (squareXPiece4.userData as ObjectUserData).reposition();

    // Set animation options
    const speed = 85;
    const polygons = [
      squareXPiece1,
      squareXPiece2,
      squareXPiece3,
      squareXPiece4,
    ];

    // Animate polygon movement
    sceneState.beforeRender = () => {
      const tx = squareAB.transform.position.x + 170;
      const ty = squareAB.transform.position.y + 50;

      polygons.forEach((polygon: Two.Mesh) => {
        const { x, y } = polygon.transform.position;
        const dx = tx - x;
        const dy = ty - y;
        const magnitude = Math.sqrt(dx * dx + dy * dy);

        if (magnitude < 5) {
          polygon.transform.position.set(tx, ty);
        } else {
          const delta = clock.getDeltaTime();
          const ndx = (dx / magnitude) * delta * speed;
          const ndy = (dy / magnitude) * delta * speed;

          polygon.transform.position.translate(ndx, ndy);
        }
      });
    };

    return sceneState;
  },
};
