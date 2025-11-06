import type { ObjectUserData } from "../types/object_user_data";
import type { SceneState } from "../types/scene_state";

export const step10 = {
  title: "Vector Magnitude",
  description: `Next, carefully cut the purple square into four pieces.`,
  dialogPosition: "bottom-3 right-3 w-full h-screen flex justify-end items-end",
  reduceState: (sceneState: SceneState): SceneState => {
    const { objects } = sceneState;
    const {
      squareX,
      squareXPiece1,
      squareXPiece2,
      squareXPiece3,
      squareXPiece4,
    } = objects;

    // Display squareX
    squareX.setVisible(true);

    // Hide pieces
    squareXPiece1.setVisible(false);
    squareXPiece2.setVisible(false);
    squareXPiece3.setVisible(false);
    squareXPiece4.setVisible(false);

    return sceneState;
  },
  updateState: (sceneState: SceneState): SceneState => {
    const {
      squareAB,
      squareX,
      squareY,
      squareXPiece1,
      squareXPiece2,
      squareXPiece3,
      squareXPiece4,
    } = sceneState.objects;

    // Hide squareX
    squareX.setVisible(false);

    // Display pieces
    squareXPiece1.setVisible(true);
    squareXPiece2.setVisible(true);
    squareXPiece3.setVisible(true);
    squareXPiece4.setVisible(true);

    // Configure pieces position
    squareXPiece1.setUserData({
      reposition: () => {
        squareXPiece1.transform.position.set(
          squareX.transform.position.x + 40,
          squareX.transform.position.y
        );
      },
    });
    squareXPiece2.setUserData({
      reposition: () => {
        squareXPiece2.transform.position.set(
          squareX.transform.position.x + 120,
          squareX.transform.position.y + 160
        );
      },
    });
    squareXPiece3.setUserData({
      reposition: () => {
        squareXPiece3.transform.position.set(
          squareX.transform.position.x + 200,
          squareX.transform.position.y - 80
        );
      },
    });
    squareXPiece4.setUserData({
      reposition: () => {
        squareXPiece4.transform.position.set(
          squareX.transform.position.x + 280,
          squareX.transform.position.y + 80
        );
      },
    });
    (squareXPiece1.userData as ObjectUserData).reposition();
    (squareXPiece2.userData as ObjectUserData).reposition();
    (squareXPiece3.userData as ObjectUserData).reposition();
    (squareXPiece4.userData as ObjectUserData).reposition();

    // Configure pieces rotation
    squareXPiece1.transform.rotation = Math.PI / 2;
    squareXPiece2.transform.rotation = Math.PI / 2;
    squareXPiece3.transform.rotation = Math.PI / 2;
    squareXPiece4.transform.rotation = Math.PI / 2;

    // Configure squareY position
    squareY.setUserData({
      reposition: () => {
        squareY.transform.position.set(
          squareAB.transform.position.x + 50,
          squareAB.transform.position.y + 50
        );
      },
    });
    (squareY.userData as ObjectUserData).reposition();

    // stop animation
    sceneState.beforeRender = () => {};

    return sceneState;
  },
};
