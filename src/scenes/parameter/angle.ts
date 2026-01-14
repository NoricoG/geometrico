import p5 from "p5";

import { ListColors, RandomListColors } from "../../colors";
import { Composition } from "../base";
import { AnimatedParameter } from "./parameter";


export class AnimatedAngleParameter extends AnimatedParameter {
    constructor() {
        const minValue = 0.005;
        const maxValue = 1 - minValue;
        const bouncing = Math.random() < 0.5;
        const speed = Math.random() * 0.0001 + 0.0001;
        super(minValue, maxValue, bouncing, speed);
    }
}

export class HalfAnimatedAngleParameter extends AnimatedParameter {
    constructor() {
        var minValue = 0.005;
        var maxValue = 1 - minValue;

        const bouncing = Math.random() < 0.7;
        const bounceHalfway = bouncing && Math.random() < 0.5;

        if (bounceHalfway) {
            if (Math.random() < 0.5) {
                maxValue = 0.5;
            } else {
                minValue = 0.5;
            }
        }

        const speed = Math.random() * 0.0001 + 0.0001;
        super(minValue, maxValue, bouncing, speed);
    }
}

abstract class AngleAnimation extends Composition {
    animated = true;
    animatedOffset: AnimatedParameter = new AnimatedAngleParameter();

    // only for compositions that don't branch
    iterationLimit = 200;
    branchingFactor = 1;

    colors: ListColors;

    minSquareSize = 1;

    offset: number = 0;
    invOffset: number = 0;

    constructor(p: p5) {
        super();

        this.colors = RandomListColors.getRandom(p);

        const square = Math.random() < 0.5;
        this.createCanvas(p, square);

        p.background(255);
    }

    changeAnimatedParameters(): void {
        this.animatedOffset = new AnimatedAngleParameter();
    }

    prepareDraw(deltaTime: number): void {
        this.offset = this.animatedOffset.increment(deltaTime);
        this.invOffset = 1 - this.offset;
    }
}

export class RotatingNestedSquaresAnimation extends AngleAnimation {
    constructor(p: p5) {
        super(p);
    }

    draw(p: p5, deltaTime: number): void {
        this.prepareDraw(deltaTime);

        this.colors = this.colors.initial();

        var x1 = 0;
        var y1 = 0;
        var x2 = this.canvasWidth;
        var y2 = 0;
        var x3 = this.canvasWidth;
        var y3 = this.canvasHeight;
        var x4 = 0;
        var y4 = this.canvasHeight;

        this.drawAndNest(p, this.iterationLimit, this.colors, x1, y1, x2, y2, x3, y3, x4, y4);
    }

    drawAndNest(p: p5, remainingIterations: number, colors: ListColors, x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, x4: number, y4: number): void {
        p.fill(colors.color())
        p.quad(x1, y1, x2, y2, x3, y3, x4, y4)

        // only end on the initial color
        if (colors.currentIndex == 0) {
            if (remainingIterations <= 0) {
                return;
            }
            if (Math.abs(x1 - this.middleX) <= this.minSquareSize && Math.abs(y1 - this.middleY) <= this.minSquareSize) {
                return;
            }
        }

        var newX1 = this.offset * x1 + this.invOffset * x2;
        var newY1 = this.offset * y1 + this.invOffset * y2;
        var newX2 = this.offset * x2 + this.invOffset * x3;
        var newY2 = this.offset * y2 + this.invOffset * y3;
        var newX3 = this.offset * x3 + this.invOffset * x4;
        var newY3 = this.offset * y3 + this.invOffset * y4;
        var newX4 = this.offset * x4 + this.invOffset * x1;
        var newY4 = this.offset * y4 + this.invOffset * y1;

        this.drawAndNest(p, remainingIterations - 1, colors.next(), newX1, newY1, newX2, newY2, newX3, newY3, newX4, newY4);
    }
}

export class RotatingNestedTrianglesAnimation extends AngleAnimation {
    constructor(p: p5) {
        super(p);
    }

    draw(p: p5, deltaTime: number): void {
        this.prepareDraw(deltaTime);

        var x1 = 0;
        var y1 = this.canvasHeight;
        var x2 = this.middleX;
        var y2 = 0;
        var x3 = this.canvasWidth;
        var y3 = this.canvasHeight;
        this.drawAndNest(p, this.iterationLimit, this.colors, x1, y1, x2, y2, x3, y3);
    }

    drawAndNest(p: p5, remainingIterations: number, colors: ListColors, x1: number, y1: number, x2: number, y2: number, x3: number, y3: number): void {
        p.fill(colors.color())
        p.triangle(x1, y1, x2, y2, x3, y3)

        // only end on the initial color
        if (colors.currentIndex == 0) {
            if (remainingIterations <= 0) {
                return;
            }
            if (Math.abs(x1 - this.middleX) <= this.minSquareSize && Math.abs(y1 - this.middleY) <= this.minSquareSize) {
                return;
            }
        }

        var newX1 = this.offset * x1 + this.invOffset * x2;
        var newY1 = this.offset * y1 + this.invOffset * y2;
        var newX2 = this.offset * x2 + this.invOffset * x3;
        var newY2 = this.offset * y2 + this.invOffset * y3;
        var newX3 = this.offset * x3 + this.invOffset * x1;
        var newY3 = this.offset * y3 + this.invOffset * y1;

        this.drawAndNest(p, remainingIterations - 1, colors.next(), newX1, newY1, newX2, newY2, newX3, newY3);
    }
}

export class Rotating2Triangle4Animation extends AngleAnimation {

    animatedOffset = new HalfAnimatedAngleParameter();

    constructor(p: p5) {
        super(p);

        // lower because of branching factor
        this.iterationLimit = 9;
        this.branchingFactor = 4;
    }

    changeAnimatedParameters(): void {
        this.animatedOffset = new HalfAnimatedAngleParameter();
    }

    draw(p: p5, deltaTime: number): void {
        this.prepareDraw(deltaTime);

        var x1 = 0;
        var y1 = this.canvasHeight;
        var x2 = 0;
        var y2 = 0;
        var x3 = this.canvasWidth;
        var y3 = this.canvasHeight;
        this.drawAndNest(p, this.iterationLimit, this.colors.initial(), x1, x2, x3, y1, y2, y3);

        var x1 = this.canvasWidth;
        var y1 = 0;
        var x2 = 0;
        var y2 = 0;
        var x3 = this.canvasWidth;
        var y3 = this.canvasHeight;
        this.drawAndNest(p, this.iterationLimit, this.colors.initial().next(), x1, x2, x3, y1, y2, y3);
    }

    drawAndNest(p: p5, remainingIterations: number, colors: ListColors, x1: number, x2: number, x3: number, y1: number, y2: number, y3: number): void {
        p.fill(colors.color())
        p.triangle(x1, y1, x2, y2, x3, y3)

        if (remainingIterations <= 0) {
            return;
        }

        // triangle in middle
        var middleX1 = this.invOffset * x1 + this.offset * x2;
        var middleY1 = this.invOffset * y1 + this.offset * y2;
        var middleX2 = this.invOffset * x2 + this.offset * x3;
        var middleY2 = this.invOffset * y2 + this.offset * y3;
        var middleX3 = this.invOffset * x3 + this.offset * x1;
        var middleY3 = this.invOffset * y3 + this.offset * y1;
        this.drawAndNest(p, remainingIterations - 1, colors.next(), middleX1, middleX2, middleX3, middleY1, middleY2, middleY3);

        // triangle at first corner (between 1, middle 1 and middle 3)
        var nextX1 = this.invOffset * x1 + this.offset * middleX1;
        var nextY1 = this.invOffset * y1 + this.offset * middleY1;
        var nextX2 = this.invOffset * middleX1 + this.offset * middleX3;
        var nextY2 = this.invOffset * middleY1 + this.offset * middleY3;
        var nextX3 = this.invOffset * middleX3 + this.offset * x1;
        var nextY3 = this.invOffset * middleY3 + this.offset * y1;
        this.drawAndNest(p, remainingIterations - 3, colors.next(), nextX1, nextX2, nextX3, nextY1, nextY2, nextY3);

        // triangle at second corner (between 2, middle 2 and middle 1)
        var nextX1 = this.invOffset * x2 + this.offset * middleX2;
        var nextY1 = this.invOffset * y2 + this.offset * middleY2;
        var nextX2 = this.invOffset * middleX2 + this.offset * middleX1;
        var nextY2 = this.invOffset * middleY2 + this.offset * middleY1;
        var nextX3 = this.invOffset * middleX1 + this.offset * x2;
        var nextY3 = this.invOffset * middleY1 + this.offset * y2;
        this.drawAndNest(p, remainingIterations - 3, colors.next(), nextX1, nextX2, nextX3, nextY1, nextY2, nextY3);

        // triangle at third corner (between 3, middle 3 and middle 2)
        var nextX1 = this.invOffset * x3 + this.offset * middleX3;
        var nextY1 = this.invOffset * y3 + this.offset * middleY3;
        var nextX2 = this.invOffset * middleX3 + this.offset * middleX2;
        var nextY2 = this.invOffset * middleY3 + this.offset * middleY2;
        var nextX3 = this.invOffset * middleX2 + this.offset * x3;
        var nextY3 = this.invOffset * middleY2 + this.offset * y3;
        this.drawAndNest(p, remainingIterations - 3, colors.next(), nextX1, nextX2, nextX3, nextY1, nextY2, nextY3);
    }
}

export class Rotating4Triangle4Animation extends Rotating2Triangle4Animation {
    constructor(p: p5) {
        super(p);

        // lower because of branching factor
        this.iterationLimit = 8;
        this.branchingFactor = 4;
    }

    draw(p: p5, deltaTime: number): void {
        this.prepareDraw(deltaTime);

        var middleX = this.canvasWidth / 2;
        var middleY = this.canvasHeight / 2;

        // top
        var x1 = middleX;
        var y1 = middleY;
        var x2 = 0
        var y2 = 0;
        var x3 = this.canvasWidth;
        var y3 = 0
        this.drawAndNest(p, this.iterationLimit, this.colors.initial(), x1, x2, x3, y1, y2, y3);

        // right
        var x1 = middleX;
        var y1 = middleY;
        var x2 = this.canvasWidth;
        var y2 = 0;
        var x3 = this.canvasWidth;
        var y3 = this.canvasHeight;
        this.drawAndNest(p, this.iterationLimit, this.colors.initial().next(), x1, x2, x3, y1, y2, y3);

        // bottom
        var x1 = middleX;
        var y1 = middleY;
        var x2 = this.canvasWidth;
        var y2 = this.canvasHeight;
        var x3 = 0;
        var y3 = this.canvasHeight;
        this.drawAndNest(p, this.iterationLimit, this.colors.initial(), x1, x2, x3, y1, y2, y3);

        // left
        var x1 = middleX;
        var y1 = middleY;
        var x2 = 0;
        var y2 = this.canvasHeight;
        var x3 = 0;
        var y3 = 0;
        this.drawAndNest(p, this.iterationLimit, this.colors.initial().next(), x1, x2, x3, y1, y2, y3);
    }
}

class MarginSquaresParameter extends AnimatedParameter {
    constructor(margin: number) {
        // minValue based on observed offsets with iterationLimit 300
        const minValue = Math.max(0.0001, 0.75 * margin - 1);
        const maxValue = 1 - minValue;

        // prevent visible jump
        const bouncing = minValue > 0.02 || Math.random() < 0.2;
        const speed = Math.random() * 0.0001 + 0.0001;

        super(minValue, maxValue, bouncing, speed);
    }
}

export class MarginSquaresAngleAnimation extends AngleAnimation {
    iterationLimit = 300;

    margin = 1 + Math.random() * 0.9;

    animatedOffset = new MarginSquaresParameter(this.margin);

    setAnimatedParameters(): void {
        this.animatedOffset = new MarginSquaresParameter(this.margin);
    }

    draw(p: p5, deltaTime: number): void {
        this.prepareDraw(deltaTime);

        var x1 = 0;
        var y1 = 0;
        var x2 = this.canvasWidth;
        var y2 = 0;
        var x3 = this.canvasWidth;
        var y3 = this.canvasHeight;
        var x4 = 0;
        var y4 = this.canvasHeight;
        this.drawAndNest(p, this.iterationLimit, this.colors, x1, y1, x2, y2, x3, y3, x4, y4);

    }

    drawAndNest(p: p5, remainingIterations: number, colors: ListColors, x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, x4: number, y4: number): void {
        p.fill(colors.color())
        p.quad(x1, y1, x2, y2, x3, y3, x4, y4)

        const maxSize = Math.max(x1, x2, x3, x4, y1, y2, y3, y4);
        const minSize = Math.min(x1, x2, x3, x4, y1, y2, y3, y4);
        if (maxSize - minSize < this.minSquareSize) {
            return;
        }

        if (remainingIterations <= 0) {
            return;
        }

        // big rectangle, don't draw
        const bigX1 = this.offset * x1 + this.invOffset * x2;
        const bigY1 = this.offset * y1 + this.invOffset * y2;
        const bigX2 = this.offset * x2 + this.invOffset * x3;
        const bigY2 = this.offset * y2 + this.invOffset * y3;
        const bigX3 = this.offset * x3 + this.invOffset * x4;
        const bigY3 = this.offset * y3 + this.invOffset * y4;
        const bigX4 = this.offset * x4 + this.invOffset * x1;
        const bigY4 = this.offset * y4 + this.invOffset * y1;

        // smaller rectangle, do draw
        var x1 = (bigX1 + bigX2) / 2;
        var y1 = (bigY1 + bigY2) / 2;
        var x2 = (bigX2 + bigX3) / 2;
        var y2 = (bigY2 + bigY3) / 2;
        var x3 = (bigX3 + bigX4) / 2;
        var y3 = (bigY3 + bigY4) / 2;
        var x4 = (bigX4 + bigX1) / 2;
        var y4 = (bigY4 + bigY1) / 2;

        // change margin
        const centerX = (x1 + x3) / 2;
        const centerY = (y1 + y3) / 2;
        x1 = centerX + this.margin * (x1 - centerX);
        y1 = centerY + this.margin * (y1 - centerY);
        x2 = centerX + this.margin * (x2 - centerX);
        y2 = centerY + this.margin * (y2 - centerY);
        x3 = centerX + this.margin * (x3 - centerX);
        y3 = centerY + this.margin * (y3 - centerY);
        x4 = centerX + this.margin * (x4 - centerX);
        y4 = centerY + this.margin * (y4 - centerY);

        this.drawAndNest(p, remainingIterations - 1, colors.next(), x1, y1, x2, y2, x3, y3, x4, y4);
    }
}
