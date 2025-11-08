import type { SceneState } from "./scene_state";

export interface Step {
    title?: string;
    description?: string;
    reduceState: (s: SceneState) => SceneState;
    updateState: (s: SceneState) => SceneState;
}
