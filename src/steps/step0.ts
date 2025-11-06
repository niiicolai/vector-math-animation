import type { SceneState } from "../types/scene_state";

export const step0 = {
  title: "Vector Fundamentals",
  description: "The animation is designed to introduce the foundational concepts of vector mathematics: Vector Subtraction, Magnitude, Normalized Vector, Normal Vector, Dot Product and Vector Projection. \n\n *It's recommended to view the animation in a browser window of at least 950x900 for the best experience.*",
  dialogPosition: "w-full h-screen flex justify-center items-center",
  reduceState: (sceneState: SceneState): SceneState => {
    return sceneState;
  },
  updateState: (sceneState: SceneState): SceneState => {
    return sceneState;
  },
};
