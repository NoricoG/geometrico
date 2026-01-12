import p5 from "p5";

import { Animation, Composition } from "./base";
import { ListColors, RandomListColors } from "../colors";

abstract class AngleComposition extends Composition {
    colors: ListColors;
    canvasSize: number;
    middle: number;

    minSquareSize = 1;

    // only for compositions that don't branch
    iterationLimit = 200;

    offset: number = 0;
    invOffset: number = 0;

    constructor(p: p5) {
        super();

        this.colors = new RandomListColors(p);

        const canvasSize = Math.min(p.windowWidth, p.windowHeight);
        p.createCanvas(canvasSize, canvasSize);
        this.canvasSize = canvasSize;
        this.middle = this.canvasSize / 2;
    }

    set(offset: number): void {
        this.offset = offset;
        this.invOffset = 1 - this.offset;
    }
}

class RotatingNestedSquaresComposition extends AngleComposition {
    constructor(p: p5) {
        super(p);
    }

    draw(p: p5): void {
        this.colors = this.colors.initial();

        var x1 = 0;
        var y1 = 0;
        var x2 = this.canvasSize;
        var y2 = 0;
        var x3 = this.canvasSize;
        var y3 = this.canvasSize;
        var x4 = 0;
        var y4 = this.canvasSize;

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
            if (Math.abs(x1 - this.middle) <= this.minSquareSize && Math.abs(y1 - this.middle) <= this.minSquareSize) {
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

export class RotatingNestedTrianglesComposition extends AngleComposition {
    constructor(p: p5) {
        super(p);
    }

    draw(p: p5): void {
        var x1 = 0;
        var y1 = this.canvasSize;
        var x2 = this.middle;
        var y2 = 0;
        var x3 = this.canvasSize;
        var y3 = this.canvasSize;

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
            if (Math.abs(x1 - this.middle) <= this.minSquareSize && Math.abs(y1 - this.middle) <= this.minSquareSize) {
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

export class Rotating2Triangle4Composition extends AngleComposition {

    constructor(p: p5) {
        super(p);

        this.iterationLimit = 8;
    }

    draw(p: p5): void {
        var x1 = 0;
        var y1 = this.canvasSize;
        var x2 = 0;
        var y2 = 0;
        var x3 = this.canvasSize;
        var y3 = this.canvasSize;
        this.drawAndNest(p, this.iterationLimit, this.colors.initial(), x1, x2, x3, y1, y2, y3);

        var x1 = this.canvasSize;
        var y1 = 0;
        var x2 = 0;
        var y2 = 0;
        var x3 = this.canvasSize;
        var y3 = this.canvasSize;
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



export class MarginSquaresAngleComposition extends AngleComposition {
    // to go bigger than 1.4 we need more iterations
    margin = 1 + Math.random() * 0.4;

    constructor(p: p5) {
        super(p);
    }

    draw(p: p5): void {
        var x1 = 0;
        var y1 = 0;
        var x2 = this.canvasSize;
        var y2 = 0;
        var x3 = this.canvasSize;
        var y3 = this.canvasSize;
        var x4 = 0;
        var y4 = this.canvasSize;
        this.drawAndNest(p, this.iterationLimit, this.colors, x1, y1, x2, y2, x3, y3, x4, y4);

    }

    drawAndNest(p: p5, remainingIterations: number, colors: ListColors, x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, x4: number, y4: number): void {
        p.fill(colors.color())
        p.quad(x1, y1, x2, y2, x3, y3, x4, y4)

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

abstract class AngleAnimation extends Animation {
    abstract composition: AngleComposition;;

    minOffset = 0.005;
    maxOffset = 1 - this.minOffset;
    offset = Math.random() * (this.maxOffset - this.minOffset) + this.minOffset;
    offsetIncreasing = Math.random() < 0.5;
    offsetDelta = Math.random() * 0.0001 + 0.0001;
    offsetBounce = Math.random() < 0.5;

    constructor() {
        super();
    }

    draw(p: p5, deltaTime: number): void {
        if (this.offset <= this.minOffset) {
            if (this.offsetBounce) {
                this.offsetIncreasing = true
            } else {
                this.offset = this.maxOffset;
            }
        } else if (this.offset >= this.maxOffset) {
            if (this.offsetBounce) {
                this.offsetIncreasing = false
            } else {
                this.offset = this.minOffset;
            }
        }

        if (this.offsetIncreasing) {
            this.offset += deltaTime * this.offsetDelta;
        } else {
            this.offset -= deltaTime * this.offsetDelta;
        }

        this.composition.set(this.offset);
        this.composition.draw(p);
    }

}

export class RotatingNestedSquaresAnimation extends AngleAnimation {
    composition: AngleComposition;

    constructor(p: p5) {
        super();
        this.composition = new RotatingNestedSquaresComposition(p);
    }
}

export class RotatingNestedTrianglesAnimation extends AngleAnimation {
    composition: AngleComposition;

    constructor(p: p5) {
        super();
        this.composition = new RotatingNestedSquaresComposition(p);
    }
}

export class Rotating2Triangle4Animation extends AngleAnimation {
    composition: AngleComposition;

    constructor(p: p5) {
        super();
        this.composition = new Rotating2Triangle4Composition(p);
    }
}

export class MarginSquaresAngleAnimation extends AngleAnimation {
    composition: AngleComposition;

    constructor(p: p5) {
        super();
        this.composition = new MarginSquaresAngleComposition(p);
    }
}
