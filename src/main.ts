import p5 from "p5";

import { SquareSizeAnimation, CircleSizeAnimation, TriangleSizeAnimation } from "./scenes/nestedSize";
import { RotatingNestedSquaresAnimation, RotatingNestedTrianglesAnimation, Rotating2Triangle4Animation, MarginSquaresAngleAnimation } from "./scenes/nestedAngle";
// import { DummyComposition, HeavyComposition } from "./scenes/dummy";
import { Animation, Composition } from "./scenes/base";


function sketch(p: p5) {
  var scene: Composition | Animation;

  var pause = false;
  var firstFrameAfterPause = false;

  p.setup = function setup(): void {

    const scenes = [
      // DummyComposition,
      // HeavyComposition,
      SquareSizeAnimation,
      CircleSizeAnimation,
      TriangleSizeAnimation,
      RotatingNestedSquaresAnimation,
      RotatingNestedTrianglesAnimation,
      Rotating2Triangle4Animation,
      MarginSquaresAngleAnimation,
    ];
    const randomIndex = Math.floor(Math.random() * scenes.length);
    scene = new scenes[randomIndex](p);

    p.noStroke();

    p.frameRate(60)

    p.text("Loading...", 100, 100);

  };

  p.draw = function draw(): void {
    // prevent large deltaTime after pausing
    if (firstFrameAfterPause) {
      firstFrameAfterPause = false;
      return;
    }

    // only draw when the window is focused
    if (!p.focused) {
      return;
    }

    scene.draw(p, p.deltaTime);

    if (scene instanceof Composition) {
      p.noLoop();
    }
  };

  p.mousePressed = function mousePressed() {
    if (pause == false) {
      p.noLoop();
      pause = true;
    } else {
      p.loop();
      pause = false;
      firstFrameAfterPause = true;
    }
  }
}

new p5(sketch);
