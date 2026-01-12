import p5 from "p5";

import { SquareSizeAnimation, CircleSizeAnimation, TriangleSizeAnimation } from "./compositions/nestedSize";
import { RotatingNestedSquaresAnimation, RotatingNestedTrianglesAnimation, Rotating2Triangle4Animation, MarginSquaresAngleAnimation } from "./compositions/nestedAngle";
import { Animation, Composition } from "./compositions/base";


function sketch(p: p5) {
  var composition: Composition;
  var animate: boolean;
  var pause = false;
  var firstFrameAfterPause = false;

  p.setup = function setup(): void {

    const compositions = [
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

    animate = false;
    if (composition instanceof Animation) {
      if (Math.random() < 0.7) {
        animate = true;
      } else {
        composition.iterationLimit *= 2;
      }
    }

    p.noStroke();

    if (animate) {
      p.frameRate(60)
    } else {
      composition.drawComposition(p);
      p.noLoop();
    }
  };

  p.draw = function draw(): void {
    if (animate && composition instanceof Animation) {
      // prevent large deltaTime after pausing
      if (firstFrameAfterPause) {
        firstFrameAfterPause = false;
        return;
      }

      composition.drawFrame(p, p.deltaTime);
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
