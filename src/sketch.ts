import p5 from "p5";

abstract class Animation {
  abstract draw(p: p5, deltaTime: number): void;
}

class SizeChangingNestedSquaresAnimation extends Animation {
  private colors: any[] = [];
  private colorIndex = 0;
  private canvasSize: number;

  private minThickness = 8;
  private maxThickness = 50;
  private currentThickness = this.maxThickness;
  private thicknessIncreasing = false;
  private thicknessDelta = 0.01;

  private minSquareSize = 1;
  private iterationLimit = 500;

  constructor(p: p5, canvasSize: number) {
    super();

    this.colors = [p.color(0, 0, 0), p.color(255, 255, 255)];
    this.canvasSize = canvasSize;
  }

  draw(p: p5, deltaTime: number): void {
    if (this.currentThickness <= this.minThickness) {
      this.thicknessIncreasing = true
    } else if (this.currentThickness >= this.maxThickness) {
      this.thicknessIncreasing = false
    }

    if (this.thicknessIncreasing) {
      this.currentThickness += deltaTime * this.thicknessDelta;
    } else {
      this.currentThickness -= deltaTime * this.thicknessDelta;
    }

    const middle = this.canvasSize / 2;
    var size = middle;

    var iterations = 0;
    this.colorIndex = 0;
    while (size > this.minSquareSize && iterations < this.iterationLimit) {
      iterations += 1;


      p.fill(this.colors[this.colorIndex])
      p.quad(middle - size, middle - size, middle + size, middle - size, middle + size, middle + size, middle - size, middle + size)

      size -= this.currentThickness

      if (this.colorIndex == this.colors.length - 1) {
        this.colorIndex = 0;
      } else {
        this.colorIndex += 1;
      }
    }
  }
}

class SizeChangingNestedCirclesAnimation extends Animation {
  private colors: any[] = [];
  private colorIndex = 0;
  private canvasSize: number;

  private minThickness = 8;
  private maxThickness = 50;
  private currentThickness = this.maxThickness;
  private thicknessIncreasing = false;
  private thicknessDelta = 0.001;

  private minSquareSize = 1;
  private iterationLimit = 500;

  constructor(p: p5, canvasSize: number) {
    super();

    this.colors = [p.color(0, 0, 0), p.color(255, 255, 255)];
    this.canvasSize = canvasSize;
  }

  draw(p: p5, deltaTime: number): void {
    if (this.currentThickness <= this.minThickness) {
      this.thicknessIncreasing = true
    } else if (this.currentThickness >= this.maxThickness) {
      this.thicknessIncreasing = false
    }

    if (this.thicknessIncreasing) {
      this.currentThickness += deltaTime * this.thicknessDelta;
    } else {
      this.currentThickness -= deltaTime * this.thicknessDelta;
    }

    const middle = this.canvasSize / 2;
    var size = middle * 2.8;

    var iterations = 0;
    this.colorIndex = 0;
    while (size > this.minSquareSize && iterations < this.iterationLimit) {
      iterations += 1;


      p.fill(this.colors[this.colorIndex])
      p.circle(middle, middle, size)

      size -= this.currentThickness

      if (this.colorIndex == this.colors.length - 1) {
        this.colorIndex = 0;
      } else {
        this.colorIndex += 1;
      }
    }
  }
}

class RotatingNestedSquaresAnimation extends Animation {
  private colors: any[] = [];
  private colorIndex = 0;
  private canvasSize: number;
  private middle: number;

  private minOffset = 0.01;
  private maxOffset = 0.99;
  private currentOffset = this.minOffset
  private offsetIncreasing = true;
  private offsetDelta = 0.0001;

  private minSquareSize = 1;
  private iterationLimit = 200;

  constructor(p: p5, canvasSize: number) {
    super();

    this.colors = [p.color(0, 0, 0), p.color(255, 255, 255)];
    this.canvasSize = canvasSize;
    this.middle = this.canvasSize / 2;
  }

  draw(p: p5, deltaTime: number): void {
    this.colorIndex = 1;

    if (this.currentOffset <= this.minOffset) {
      this.offsetIncreasing = true
    } else if (this.currentOffset >= this.maxOffset) {
      this.offsetIncreasing = false
    }

    if (this.offsetIncreasing) {
      this.currentOffset += deltaTime * this.offsetDelta;
    } else {
      this.currentOffset -= deltaTime * this.offsetDelta;
    }

    var x1 = this.middle - this.middle;
    var y1 = this.middle - this.middle;
    var x2 = this.middle + this.middle;
    var y2 = this.middle - this.middle;
    var x3 = this.middle + this.middle;
    var y3 = this.middle + this.middle;
    var x4 = this.middle - this.middle;
    var y4 = this.middle + this.middle;

    var iterations = 0;
    while (this.colorIndex == 1 || ((Math.abs(x1 - this.middle) > this.minSquareSize || Math.abs(y1 - this.middle) > this.minSquareSize) && iterations < this.iterationLimit)) {
      iterations += 1;

      if (this.colorIndex == this.colors.length - 1) {
        this.colorIndex = 0;
      } else {
        this.colorIndex += 1;
      }

      p.fill(this.colors[this.colorIndex])
      p.quad(x1, y1, x2, y2, x3, y3, x4, y4)

      var newX1 = this.currentOffset * x1 + (1 - this.currentOffset) * x2;
      var newY1 = this.currentOffset * y1 + (1 - this.currentOffset) * y2;
      var newX2 = this.currentOffset * x2 + (1 - this.currentOffset) * x3;
      var newY2 = this.currentOffset * y2 + (1 - this.currentOffset) * y3;
      var newX3 = this.currentOffset * x3 + (1 - this.currentOffset) * x4;
      var newY3 = this.currentOffset * y3 + (1 - this.currentOffset) * y4;
      var newX4 = this.currentOffset * x4 + (1 - this.currentOffset) * x1;
      var newY4 = this.currentOffset * y4 + (1 - this.currentOffset) * y1;

      x1 = newX1;
      y1 = newY1;
      x2 = newX2;
      y2 = newY2;
      x3 = newX3;
      y3 = newY3;
      x4 = newX4;
      y4 = newY4;
    }
  }
}


function sketch(p: p5) {
  var animation: Animation;

  p.setup = function setup(): void {
    const canvasSize = Math.min(p.windowWidth, p.windowHeight);
    p.createCanvas(canvasSize, canvasSize);

    p.frameRate(60)

    const animations = [
      new SizeChangingNestedSquaresAnimation(p, canvasSize),
      new SizeChangingNestedCirclesAnimation(p, canvasSize),
      new RotatingNestedSquaresAnimation(p, canvasSize)
    ];
    const randomIndex = Math.floor(Math.random() * animations.length);
    animation = animations[randomIndex];
  };

  p.draw = function draw(): void {
    animation.draw(p, p.deltaTime);
  };
}

new p5(sketch);
