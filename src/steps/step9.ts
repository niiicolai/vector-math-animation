import type { ObjectUserData } from "../types/object_user_data";
import type { SceneState } from "../types/scene_state";

export const step9 = {
  title: "Vector Magnitude",
  description: `Now, let's move the yellow square so that it fits inside the blue square.`,
  reduceState: (sceneState: SceneState): SceneState => {
    const { renderer, objects } = sceneState;
    const { squareY } = objects;

    // Reset squareY position
    squareY.setUserData({
      reposition: () => {
        squareY.transform.position.set(
          renderer.getCenterX() + 80,
          renderer.getCenterY() - 80
        );
      },
    });
    (squareY.userData as ObjectUserData).reposition();

    return sceneState;
  },
  updateState: (sceneState: SceneState): SceneState => {
    const { clock, renderer, objects } = sceneState;
    const { squareAB, squareY } = objects;

    // Reset squareY position
    squareY.setUserData({
      reposition: () => {
        squareY.transform.position.set(
          renderer.getCenterX() + 80,
          renderer.getCenterY() - 80
        );
      },
    });
    (squareY.userData as ObjectUserData).reposition();

    // Set animation settings
    const speed = 80;

    // Animate squareY movement
    sceneState.beforeRender = () => {
      const tx = squareAB.transform.position.x + 50;
      const ty = squareAB.transform.position.y + 50;

      if (
        squareY.transform.position.x === tx &&
        squareY.transform.position.y === ty
      )
        return;

      const dx = tx - squareY.transform.position.x;
      const dy = ty - squareY.transform.position.y;
      const magnitude = Math.sqrt(dx * dx + dy * dy);

      if (magnitude > 5) {
        const delta = clock.getDeltaTime();
        const ndx = (dx / magnitude) * delta * speed;
        const ndy = (dy / magnitude) * delta * speed;

        squareY.transform.position.translate(ndx, ndy);
      } else {
        squareY.transform.position.set(tx, ty);
      }
    };

    return sceneState;
  },
};
