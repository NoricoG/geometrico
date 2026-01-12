import p5 from "p5";

import { SquareSizeAnimation, CircleSizeAnimation } from "./animations/nestedSize";
import { RotatingNestedSquaresAnimation, RotatingNestedTrianglesAnimation, RotatingNestedHalvedSquaresAnimation } from "./animations/nestedAngle";
import { Animation } from "./animations/animation";


function sketch(p: p5) {
  var animation: Animation;

  p.setup = function setup(): void {
    const canvasSize = Math.min(p.windowWidth, p.windowHeight);
    p.createCanvas(canvasSize, canvasSize);

    p.frameRate(60)

    const animations = [
      new SquareSizeAnimation(p, canvasSize),
      new CircleSizeAnimation(p, canvasSize),
      new RotatingNestedSquaresAnimation(p, canvasSize),
      new RotatingNestedTrianglesAnimation(p, canvasSize),
      new RotatingNestedHalvedSquaresAnimation(p, canvasSize)
    ];
    const randomIndex = Math.floor(Math.random() * animations.length);
    animation = animations[randomIndex];
  };

  p.draw = function draw(): void {
    animation.draw(p, p.deltaTime);
  };
}

new p5(sketch);
