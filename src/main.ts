import p5 from "p5";


import { DotsComposition } from "./scenes/dots";
import { RotatingNestedSquaresAnimation, RotatingNestedTrianglesAnimation, Rotating2Triangle4Animation, MarginSquaresAngleAnimation } from "./scenes/nestedAngle";
import { SquareSizeAnimation, CircleSizeAnimation, TriangleSizeAnimation } from "./scenes/nestedSize";

import { Triangle4Composition } from "./scenes/triangle4";
import { Composition } from "./scenes/base";


function sketch(p: p5) {
  var composition: Composition;

  var pause = false;
  var firstFrameAfterPause = false;

  p.setup = function setup(): void {

    const compositions = [
      DotsComposition,
      Triangle4Composition,
      SquareSizeAnimation,
      CircleSizeAnimation,
      TriangleSizeAnimation,
      RotatingNestedSquaresAnimation,
      RotatingNestedTrianglesAnimation,
      Rotating2Triangle4Animation,
      MarginSquaresAngleAnimation,
    ];
    const randomIndex = Math.floor(Math.random() * compositions.length);
    composition = new compositions[randomIndex](p);

    p.noStroke();

    p.frameRate(60)
  };

  p.draw = function draw(): void {
    // prevent large deltaTime after pausing
    if (firstFrameAfterPause) {
      firstFrameAfterPause = false;
      return;
    }

    // only draw when the window is focused
    if (composition.animated && !p.focused) {
      return;
    }

    composition.draw(p, p.deltaTime);

    if (!composition.animated) {
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
