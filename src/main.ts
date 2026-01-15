import p5 from "p5";

import {
  Rotated2Triangle4Composition,
  Rotated4Triangle4Composition,
  RotatingNestedSquaresAnimation,
  RotatingNestedTrianglesAnimation,
  Rotating2Triangle4Animation,
  Rotating4Triangle4Animation,
  MarginSquaresAngleAnimation,
} from "./scenes/parameter/angle";
import {
  SquareSizeAnimation,
  CircleSizeAnimation,
  TriangleSizeAnimation
} from "./scenes/parameter/size";

import { AppolonianGasketComposition } from "./scenes/shape/appolonianGasket";
import { Circle4Composition } from "./scenes/shape/circle4";
import { PolyflakeComposition } from "./scenes/shape/polyflake";
import { PythagorasTreeComposition } from "./scenes/shape/pythagorasTree";
import { Rectangle4Composition } from "./scenes/shape/reactangle4";
import { Triangle2Composition } from "./scenes/shape/triangle2";
import { Triangle3Composition } from "./scenes/shape/triangle3";
import { Triangle4Composition } from "./scenes/shape/triangle4";

import { Composition } from "./scenes/base";
import { UI } from "./ui";

function sketch(p: p5) {
  var composition: Composition;

  var paused = false;
  var firstFrameAfterPause = false;
  var gainedFocus = false;

  p.setup = function setup(): void {

    const compositions = [
      AppolonianGasketComposition,
      Circle4Composition,
      PolyflakeComposition, // twice because of variability
      PolyflakeComposition, // twice because of variability
      PythagorasTreeComposition,
      Rectangle4Composition,
      Rotated2Triangle4Composition,
      Rotated4Triangle4Composition,
      Triangle2Composition,
      Triangle3Composition,
      Triangle4Composition,
    ]
    const animations = [
      SquareSizeAnimation,
      CircleSizeAnimation,
      TriangleSizeAnimation,
      RotatingNestedSquaresAnimation,
      RotatingNestedTrianglesAnimation,
      Rotating2Triangle4Animation,
      Rotating4Triangle4Animation,
      MarginSquaresAngleAnimation,
    ];
    if ((Math.random() < 0.6 || animations.length == 0) && compositions.length > 0) {
      const randomIndex = Math.floor(Math.random() * compositions.length);
      composition = new compositions[randomIndex](p);
    } else {
      const randomIndex = Math.floor(Math.random() * animations.length);
      composition = new animations[randomIndex](p);
    }
    console.log(composition.constructor.name);

    if (!composition.animated) {
      composition.showLoadingText(p);
    }

    p.noStroke();

    p.frameRate(60);

    UI.setupMenu(p, composition, playPause);
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
    }
  };

  function playPause(playOnly: boolean): void {
    if (!composition.animated) {
      UI.showPauseIndicator("❌");
      return;
    }

    if (paused || playOnly) {
      p.loop();
      paused = false;
      firstFrameAfterPause = true;
    } else {
      p.noLoop();
      paused = true;
    }
  }

  p.mousePressed = function mousePressed() {
    if (!p.mouseButton.left) {
      return;
    }

    UI.showMenu(composition, paused);
  }
}

new p5(sketch);
