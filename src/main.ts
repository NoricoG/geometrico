import p5 from "p5";

import { RotatingNestedSquaresAnimation, RotatingNestedTrianglesAnimation, Rotating2Triangle4Animation, Rotating4Triangle4Animation, MarginSquaresAngleAnimation } from "./scenes/parameter/angle";
import { SquareSizeAnimation, CircleSizeAnimation, TriangleSizeAnimation } from "./scenes/parameter/size";

import { Circle4Composition } from "./scenes/shape/circle4";
import { PolyflakeComposition } from "./scenes/shape/polyflake";
import { Rectangle4Composition } from "./scenes/shape/reactangle4";
import { Triangle2Composition } from "./scenes/shape/triangle2";
import { Triangle3Composition } from "./scenes/shape/triangle3";
import { Triangle4Composition } from "./scenes/shape/triangle4";

import { Composition } from "./scenes/base";

function titleIndicator(indicator: string): void {
  document.title = "Geometrico " + indicator;
}

function sketch(p: p5) {
  var composition: Composition;

  var pause = false;
  var firstFrameAfterPause = false;
  var gainedFocus = false;

  p.setup = function setup(): void {

    const compositions = [
      Circle4Composition,
      PolyflakeComposition, // twice because of variability
      PolyflakeComposition, // twice because of variability
      Rectangle4Composition,
      Triangle2Composition,
      Triangle3Composition,
      Triangle4Composition,

      SquareSizeAnimation,
      CircleSizeAnimation,
      TriangleSizeAnimation,
      RotatingNestedSquaresAnimation,
      RotatingNestedTrianglesAnimation,
      Rotating2Triangle4Animation,
      Rotating4Triangle4Animation,
      MarginSquaresAngleAnimation,
    ];
    const randomIndex = Math.floor(Math.random() * compositions.length);
    composition = new compositions[randomIndex](p);
    console.log(composition.constructor.name);

    if (composition.animated) {
      titleIndicator("▶");
    } else {
      titleIndicator("◌");
      composition.showLoadingText(p);
    }

    p.noStroke();

    p.frameRate(60);
  };

  p.draw = function draw(): void {
    // prevent large deltaTime after pausing
    if (firstFrameAfterPause) {
      firstFrameAfterPause = false;
      return;
    }

    if (p.focused && !gainedFocus) {
      gainedFocus = true;
    }

    // only draw when the window is focused, unless never focused before
    if (composition.animated && gainedFocus && !p.focused) {
      return;
    }

    composition.draw(p, p.deltaTime);

    if (!composition.animated) {
      p.noLoop();
      titleIndicator("✔");
    }
  };

  p.mousePressed = function mousePressed() {
    if (!p.mouseButton.left) {
      return;
    }

    // if (p.mouseY > p.windowHeight / 2) {
    if (p.mouseY > 0) {
      if (pause == false) {
        p.noLoop();
        pause = true;
      } else {
        p.loop();
        pause = false;
        firstFrameAfterPause = true;
      }
    } else {
      alert("Click the bottom half of the screen to pause/resume the animation.\nClick the top half to open the menu (not implemented yet).\nRefresh the page to see a different composition.");
    }
  }
}

new p5(sketch);
