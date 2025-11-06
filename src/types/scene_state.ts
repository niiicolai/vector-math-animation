import * as Two from "two-easy-engine";

export interface SceneState {
  clock: Two.Clock;
  camera: Two.Camera2D;
  renderer: Two.Renderer2D;
  scene: Two.Scene;
  objects: { [key: string]: Two.Mesh };
  beforeRender: () => void;
}
