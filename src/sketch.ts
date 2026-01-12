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
  private offset = 0.5;
  private invOffset = 1 - this.offset;
  private offsetIncreasing: boolean;
  private offsetDelta = 0.0001;

  private minSquareSize = 1;
  private iterationLimit = 200;

  constructor(p: p5, canvasSize: number) {
    super();

    this.colors = [p.color(0, 0, 0), p.color(255, 255, 255)];
    this.canvasSize = canvasSize;
    this.middle = this.canvasSize / 2;

    this.offsetIncreasing = Math.random() < 0.5;
  }

  draw(p: p5, deltaTime: number): void {
    this.colorIndex = 1;

    if (this.offset <= this.minOffset) {
      this.offsetIncreasing = true
    } else if (this.offset >= this.maxOffset) {
      this.offsetIncreasing = false
    }

    if (this.offsetIncreasing) {
      this.offset += deltaTime * this.offsetDelta;
    } else {
      this.offset -= deltaTime * this.offsetDelta;
    }
    this.invOffset = 1 - this.offset;

    var x1 = 0;
    var y1 = 0;
    var x2 = this.canvasSize;
    var y2 = 0;
    var x3 = this.canvasSize;
    var y3 = this.canvasSize;
    var x4 = 0;
    var y4 = this.canvasSize;

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

      var newX1 = this.offset * x1 + this.invOffset * x2;
      var newY1 = this.offset * y1 + this.invOffset * y2;
      var newX2 = this.offset * x2 + this.invOffset * x3;
      var newY2 = this.offset * y2 + this.invOffset * y3;
      var newX3 = this.offset * x3 + this.invOffset * x4;
      var newY3 = this.offset * y3 + this.invOffset * y4;
      var newX4 = this.offset * x4 + this.invOffset * x1;
      var newY4 = this.offset * y4 + this.invOffset * y1;

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

class RotatingNestedTrianglesAnimation extends Animation {
  private colors: any[] = [];
  private colorIndex = 0;
  private canvasSize: number;
  private middle: number;

  private minOffset = 0.01;
  private maxOffset = 0.99;
  private offset = 0.5;
  private invOffset = 1 - this.offset;
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

    if (this.offset <= this.minOffset) {
      this.offsetIncreasing = true
    } else if (this.offset >= this.maxOffset) {
      this.offsetIncreasing = false
    }

    if (this.offsetIncreasing) {
      this.offset += deltaTime * this.offsetDelta;
    } else {
      this.offset -= deltaTime * this.offsetDelta;
    }
    this.invOffset = 1 - this.offset;

    var x1 = 0;
    var y1 = this.canvasSize;
    var x2 = this.middle;
    var y2 = 0;
    var x3 = this.canvasSize;
    var y3 = this.canvasSize;

    var iterations = 0;
    while (this.colorIndex == 1 || ((Math.abs(x1 - this.middle) > this.minSquareSize || Math.abs(y1 - this.middle) > this.minSquareSize) && iterations < this.iterationLimit)) {
      iterations += 1;

      if (this.colorIndex == this.colors.length - 1) {
        this.colorIndex = 0;
      } else {
        this.colorIndex += 1;
      }

      p.fill(this.colors[this.colorIndex])
      p.triangle(x1, y1, x2, y2, x3, y3)

      var newX1 = this.offset * x1 + this.invOffset * x2;
      var newY1 = this.offset * y1 + this.invOffset * y2;
      var newX2 = this.offset * x2 + this.invOffset * x3;
      var newY2 = this.offset * y2 + this.invOffset * y3;
      var newX3 = this.offset * x3 + this.invOffset * x1;
      var newY3 = this.offset * y3 + this.invOffset * y1;
      x1 = newX1;
      y1 = newY1;
      x2 = newX2;
      y2 = newY2;
      x3 = newX3;
      y3 = newY3;
    }
  }
}

class RotatingNestedHalvedSquaresAnimation extends Animation {
  private colors: any[] = [];
  private canvasSize: number;

  private minOffset = 0.01;
  private maxOffset = 0.99;

  private offset = 0.5;
  private invOffset = 1 - this.offset;
  private offsetIncreasing: boolean;
  private offsetDelta = 0.0002;

  private iterationLimit = 5;

  constructor(p: p5, canvasSize: number) {
    super();

    this.colors = [p.color(0, 0, 0), p.color(255, 255, 255)];
    this.canvasSize = canvasSize;

    this.offsetIncreasing = Math.random() < 0.5;
  }

  draw(p: p5, deltaTime: number): void {
    if (this.offset <= this.minOffset) {
      this.offsetIncreasing = true
    } else if (this.offset >= this.maxOffset) {
      this.offsetIncreasing = false
    }

    if (this.offsetIncreasing) {
      this.offset += deltaTime * this.offsetDelta;
    } else {
      this.offset -= deltaTime * this.offsetDelta;
    }
    this.invOffset = 1 - this.offset;

    var x1 = 0;
    var y1 = this.canvasSize;
    var x2 = 0;
    var y2 = 0;
    var x3 = this.canvasSize;
    var y3 = this.canvasSize;
    this.drawNext(p, this.iterationLimit, 0, x1, x2, x3, y1, y2, y3);

    var x1 = this.canvasSize;
    var y1 = 0;
    var x2 = 0;
    var y2 = 0;
    var x3 = this.canvasSize;
    var y3 = this.canvasSize;
    this.drawNext(p, this.iterationLimit, 1, x1, x2, x3, y1, y2, y3);
  }

  drawNext(p: p5, remainingIterations: number, colorIndex: number, x1: number, x2: number, x3: number, y1: number, y2: number, y3: number): void {
    if (remainingIterations <= 0) {
      return;
    }

    p.fill(this.colors[colorIndex])
    p.triangle(x1, y1, x2, y2, x3, y3)

    // triangle in middle
    var middleX1 = this.invOffset * x1 + this.offset * x2;
    var middleY1 = this.invOffset * y1 + this.offset * y2;
    var middleX2 = this.invOffset * x2 + this.offset * x3;
    var middleY2 = this.invOffset * y2 + this.offset * y3;
    var middleX3 = this.invOffset * x3 + this.offset * x1;
    var middleY3 = this.invOffset * y3 + this.offset * y1;
    this.drawNext(p, remainingIterations - 1, 1 - colorIndex, middleX1, middleX2, middleX3, middleY1, middleY2, middleY3);

    // triangle at first corner (between 1, middle 1 and middle 3)
    var nextX1 = this.invOffset * x1 + this.offset * middleX1;
    var nextY1 = this.invOffset * y1 + this.offset * middleY1;
    var nextX2 = this.invOffset * middleX1 + this.offset * middleX3;
    var nextY2 = this.invOffset * middleY1 + this.offset * middleY3;
    var nextX3 = this.invOffset * middleX3 + this.offset * x1;
    var nextY3 = this.invOffset * middleY3 + this.offset * y1;
    this.drawNext(p, remainingIterations - 1, 1 - colorIndex, nextX1, nextX2, nextX3, nextY1, nextY2, nextY3);

    // triangle at second corner (between 2, middle 2 and middle 1)
    var nextX1 = this.invOffset * x2 + this.offset * middleX2;
    var nextY1 = this.invOffset * y2 + this.offset * middleY2;
    var nextX2 = this.invOffset * middleX2 + this.offset * middleX1;
    var nextY2 = this.invOffset * middleY2 + this.offset * middleY1;
    var nextX3 = this.invOffset * middleX1 + this.offset * x2;
    var nextY3 = this.invOffset * middleY1 + this.offset * y2;
    this.drawNext(p, remainingIterations - 1, 1 - colorIndex, nextX1, nextX2, nextX3, nextY1, nextY2, nextY3);

    // triangle at third corner (between 3, middle 3 and middle 2)
    var nextX1 = this.invOffset * x3 + this.offset * middleX3;
    var nextY1 = this.invOffset * y3 + this.offset * middleY3;
    var nextX2 = this.invOffset * middleX3 + this.offset * middleX2;
    var nextY2 = this.invOffset * middleY3 + this.offset * middleY2;
    var nextX3 = this.invOffset * middleX2 + this.offset * x3;
    var nextY3 = this.invOffset * middleY2 + this.offset * y3;
    this.drawNext(p, remainingIterations - 1, 1 - colorIndex, nextX1, nextX2, nextX3, nextY1, nextY2, nextY3);
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
