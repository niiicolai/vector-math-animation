import { useEffect, useRef, useState } from "react";
import type { SceneState } from "./types/scene_state";
import type { ObjectUserData } from "./types/object_user_data";
import type { Step } from "./types/step";
import * as Two from "two-easy-engine";
import { steps } from "./steps/steps";
import Markdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import "katex/dist/katex.min.css";

function App() {
  const canvasRef = useRef(null);
  const [stepIndex, setStepIndex] = useState(0);
  const sceneState = useRef({} as SceneState);
  const animationId = useRef(-1);
  const step = steps[stepIndex] as Step;

  function prevStep() {
    if (stepIndex === 0) return;
    const prev = stepIndex - 1;

    setStepIndex(prev);
    reduceNextStep(prev, sceneState.current);
  }

  function nextStep() {
    const next = stepIndex + 1;
    if (next >= steps.length) return;

    setStepIndex(next);
    initNextStep(next, sceneState.current);
  }

  function reduceNextStep(stepIndex: number, currentState: SceneState) {
    if (currentState.renderer) {
      sceneState.current = steps[stepIndex + 1].reduceState(currentState);
      sceneState.current = steps[stepIndex].updateState(currentState);
      resetEventsAndLoops();
    }
  }

  function initNextStep(stepIndex: number, currentState: SceneState) {
    if (currentState.renderer) {
      sceneState.current = steps[stepIndex].updateState(currentState);
      resetEventsAndLoops();
    }
  }

  function resetEventsAndLoops() {
    window.onresize = () => {
      sceneState.current.renderer.setSize(
        window.innerWidth,
        window.innerWidth < 400 ? window.innerHeight / 1.5 : window.innerHeight
      );
      sceneState.current.scene.children.forEach((o: Two.Object2D) => {
        const data = o.userData as ObjectUserData;
        if (data && data.reposition) data.reposition();
      });
    };

    if (animationId.current !== -1) {
      cancelAnimationFrame(animationId.current);
    }

    const loop = () => {
      sceneState.current.clock._updateTime();
      sceneState.current.beforeRender();
      sceneState.current.renderer.render();

      animationId.current = requestAnimationFrame(loop);
    };
    animationId.current = requestAnimationFrame(loop);
  }

  function initCanvas(canvas: HTMLCanvasElement) {
    const black = new Two.RgbaColor(0, 0, 0, 1);
    const red = new Two.RgbaColor(255, 0, 0, 1);
    const blue = new Two.RgbaColor(0, 0, 255, 1);
    const green = new Two.RgbaColor(0, 255, 0, 1);
    const yellow = new Two.RgbaColor(255, 255, 0, 1);
    const purple = new Two.RgbaColor(160, 32, 240, 1);
    const orange = new Two.RgbaColor(255, 165, 0, 1);

    const textSm = { font: "12px Arial" };
    const textMd = { font: "18px Arial" };
    const textLg = { font: "24px Arial" };

    const clock = new Two.Clock();
    const camera = new Two.Camera2D();
    const scene = new Two.Scene();
    const renderer = new Two.Renderer2D(canvas, scene, camera, {
      width: window.innerWidth,
      height:
        window.innerWidth < 400 ? window.innerHeight / 1.5 : window.innerHeight,
      devicePixelRatio: window.devicePixelRatio || 1,
      backgroundColor: black,
    });

    const objects = {} as { [key: string]: Two.Mesh };

    objects.introText = new Two.Mesh(
      new Two.TextGeometry("Vector Fundamentals", textLg),
      new Two.BasicMaterial({
        strokeStyle: new Two.HslaColor(50, 100, 60, 1),
        lineWidth: 1,
      })
    );

    // Create point a and b circle and text
    objects.pointA = new Two.Mesh(
      new Two.CircleGeometry(15),
      new Two.BasicMaterial({ strokeStyle: green })
    );
    objects.pointB = new Two.Mesh(
      new Two.CircleGeometry(15),
      new Two.BasicMaterial({ strokeStyle: red })
    );
    objects.pointAText = new Two.Mesh(
      new Two.TextGeometry("a(0, 0)", textSm),
      new Two.BasicMaterial({
        strokeStyle: green,
        lineWidth: 1,
      })
    );
    objects.pointBText = new Two.Mesh(
      new Two.TextGeometry("b(160, 80)", textSm),
      new Two.BasicMaterial({
        strokeStyle: red,
        lineWidth: 1,
      })
    );

    // Create line from a to b and text
    objects.lineAB = new Two.Mesh(
      new Two.LineGeometry([[0, 0, 160, -80]]),
      new Two.BasicMaterial({
        strokeStyle: blue,
        lineWidth: 2,
      })
    );
    objects.lineABText = new Two.Mesh(
      new Two.TextGeometry("units: (0, 0)", textSm),
      new Two.BasicMaterial({
        strokeStyle: blue,
        lineWidth: 1,
      })
    );

    // Create lineAB with x or y only
    objects.lineX = new Two.Mesh(
      new Two.LineGeometry([[0, 0, 160, 0]]),
      new Two.BasicMaterial({
        strokeStyle: purple,
        lineWidth: 2,
      })
    );
    objects.lineY = new Two.Mesh(
      new Two.LineGeometry([[0, 0, 0, 80]]),
      new Two.BasicMaterial({
        strokeStyle: yellow,
        lineWidth: 2,
      })
    );

    // Create squares and text for lineAB, lineX and lineY
    objects.squareAB = new Two.Mesh(
      new Two.RectGeometry(178.8, 178.8),
      new Two.BasicMaterial({
        strokeStyle: blue,
        lineWidth: 2,
      })
    );
    objects.squareX = new Two.Mesh(
      new Two.RectGeometry(160, 160),
      new Two.BasicMaterial({
        strokeStyle: purple,
        lineWidth: 2,
      })
    );
    objects.squareY = new Two.Mesh(
      new Two.RectGeometry(80, 80),
      new Two.BasicMaterial({
        strokeStyle: yellow,
        lineWidth: 2,
      })
    );
    objects.squareABText = new Two.Mesh(
      new Two.TextGeometry("c", textMd),
      new Two.BasicMaterial({
        strokeStyle: blue,
        lineWidth: 1,
      })
    );
    objects.squareXText = new Two.Mesh(
      new Two.TextGeometry("a", textMd),
      new Two.BasicMaterial({
        strokeStyle: purple,
        lineWidth: 1,
      })
    );
    objects.squareYText = new Two.Mesh(
      new Two.TextGeometry("b", textMd),
      new Two.BasicMaterial({
        strokeStyle: yellow,
        lineWidth: 1,
      })
    );

    // Create squareX pieces
    objects.squareXPiece1 = new Two.Mesh(
      new Two.LineGeometry([
        [0, 0, 0, 40],
        [0, 40, 120, 40],
        [80, -40, 120, 40],
        [0, 0, 80, -40],
      ]),
      new Two.BasicMaterial({
        strokeStyle: purple,
        lineWidth: 2,
      })
    );
    objects.squareXPiece2 = new Two.Mesh(
      new Two.LineGeometry([
        [-80, 40, 0, 0],
        [0, 0, 0, 120],
        [-80, 40, -40, 120],
        [0, 120, -40, 120],
      ]),
      new Two.BasicMaterial({
        strokeStyle: purple,
        lineWidth: 2,
      })
    );
    objects.squareXPiece3 = new Two.Mesh(
      new Two.LineGeometry([
        [80, 40, 120, 40],
        [80, 40, 80, 160],
        [80, 160, 160, 120],
        [120, 40, 160, 120],
      ]),
      new Two.BasicMaterial({
        strokeStyle: purple,
        lineWidth: 2,
      })
    );
    objects.squareXPiece4 = new Two.Mesh(
      new Two.LineGeometry([
        [80, 120, 80, 160],
        [-40, 120, 80, 120],
        [-40, 120, 0, 200],
        [0, 200, 80, 160],
      ]),
      new Two.BasicMaterial({
        strokeStyle: purple,
        lineWidth: 2,
      })
    );

    // Add point a and b radius lines
    objects.radLineA = new Two.Mesh(
      new Two.LineGeometry([[0, 0, 0, -15]]),
      new Two.BasicMaterial({
        strokeStyle: purple,
        lineWidth: 2,
      })
    );
    objects.radLineB = new Two.Mesh(
      new Two.LineGeometry([[0, 0, 0, -15]]),
      new Two.BasicMaterial({
        strokeStyle: yellow,
        lineWidth: 2,
      })
    );

    // Add lineAB normal
    objects.lineABNormCounter = new Two.Mesh(
      new Two.LineGeometry([[0, 0, -80, -160]]),
      new Two.BasicMaterial({
        strokeStyle: purple,
        lineWidth: 2,
      })
    );
    objects.lineABNormClock = new Two.Mesh(
      new Two.LineGeometry([[0, 0, 80, 160]]),
      new Two.BasicMaterial({
        strokeStyle: yellow,
        lineWidth: 2,
      })
    );
    objects.lineABProjEx = new Two.Mesh(
      new Two.LineGeometry([[0, 0, -60, -150]]),
      new Two.BasicMaterial({
        strokeStyle: orange,
        lineWidth: 2,
      })
    );
    objects.lineABProjLen = new Two.Mesh(
      new Two.LineGeometry([[0, 0, -80, -160]]),
      new Two.BasicMaterial({
        strokeStyle: green,
        lineWidth: 2,
      })
    );

    // Hide objects and add to scene
    Object.values(objects).forEach((obj: Two.Mesh) => {
      obj.setVisible(false);
      scene.add(obj);
    });

    // Set intial state
    const initialState = {
      clock,
      camera,
      scene,
      renderer,
      objects,
      beforeRender: () => {},
    };
    initNextStep(stepIndex, initialState);
  }

  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas) {
      initCanvas(canvas);
    }

    return () => {
      if (animationId.current !== -1) {
        cancelAnimationFrame(animationId.current);
      }
      window.onresize = null;
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed top-0 bottom-0 left-0 right-0 w-full h-screen/.6 md:h-screen z-1"
      />

      <div className="fixed top-3 left-3 right-3 flex items-center justify-between gap-3 mb-1 text-slate-400 z-10">
        {step.title && <h2 className="font-bold text-sm mb-1">{step.title}</h2>}
        <p className="text-sm text-center">
          Step {stepIndex + 1} of {steps.length}
        </p>
      </div>

      <div
        className="fixed w-full bottom-0 left-0 right-0 z-10"
      >
        <div className="flex-1 bg-slate-800/[.3] p-3 text-white flex flex-col justify-between gap-3 w-full">
          <div>
            <div className="text-sm">
              <Markdown
                remarkPlugins={[remarkMath]}
                rehypePlugins={[rehypeKatex]}
              >
                {step.description}
              </Markdown>
            </div>
          </div>

          <div className="border-t border-black mt-1 pt-3 flex items-center justify-between">
            <div className="text-xs">
              Created with{" "}
              <a
                href="https://niiicolai.github.io/two-easy-engine"
                target="_blank"
                className="underline text-blue-500 hover:text-blue-600"
              >
                TwoEasyEngine
              </a>
            </div>

            <div className="flex justify-end gap-1">
              {stepIndex > 0 && (
                <button
                  onClick={() => prevStep()}
                  className="max-w-48 border border-black rounded-md bg-slate-500 hover:bg-slate-600 cursor-pointer text-black text-sm py-1 px-3"
                >
                  Previous Step
                </button>
              )}
              {stepIndex < steps.length - 1 && (
                <button
                  onClick={() => nextStep()}
                  className="max-w-48 border border-black rounded-md bg-emerald-500 hover:bg-emerald-600 cursor-pointer text-black text-sm py-1 px-3"
                >
                  Next Step
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
