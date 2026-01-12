import p5 from "p5";

abstract class AngleAnimation extends Animation {
    colors: any[] = [];
    colorIndex = 0;
    canvasSize: number;
    middle: number;

    minOffset = 0.01;
    maxOffset = 0.99;
    offset = 0.5;
    invOffset = 1 - this.offset;
    offsetIncreasing: boolean;
    offsetDelta: number;

    minSquareSize = 1;
    iterationLimit = 200;

    constructor(p: p5, canvasSize: number) {
        super();

        this.colors = [p.color(0, 0, 0), p.color(255, 255, 255)];
        this.canvasSize = canvasSize;
        this.middle = this.canvasSize / 2;

        this.offsetIncreasing = Math.random() < 0.5;
        this.offsetDelta = Math.random() * 0.0001 + 0.0001;
    }

    draw(p: p5, deltaTime: number): void {
        this.colorIndex = 0;

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

        this.rootShape(p);
    }

    abstract rootShape(p: p5): void;
}

export class RotatingNestedSquaresAnimation extends AngleAnimation {
    constructor(p: p5, canvasSize: number) {
        super(p, canvasSize);
    }

    rootShape(p: p5): void {
        var x1 = 0;
        var y1 = 0;
        var x2 = this.canvasSize;
        var y2 = 0;
        var x3 = this.canvasSize;
        var y3 = this.canvasSize;
        var x4 = 0;
        var y4 = this.canvasSize;

        this.drawAndNest(p, this.iterationLimit, this.colorIndex, x1, y1, x2, y2, x3, y3, x4, y4);
    }

    drawAndNest(p: p5, remainingIterations: number, colorIndex: number, x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, x4: number, y4: number): void {
        p.fill(this.colors[colorIndex])
        p.quad(x1, y1, x2, y2, x3, y3, x4, y4)

        // only end on the initial color
        if (colorIndex == 0) {
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

        this.drawAndNest(p, remainingIterations - 1, 1 - colorIndex, newX1, newY1, newX2, newY2, newX3, newY3, newX4, newY4);
    }
}

export class RotatingNestedTrianglesAnimation extends AngleAnimation {
    constructor(p: p5, canvasSize: number) {
        super(p, canvasSize);
    }

    rootShape(p: p5): void {
        var x1 = 0;
        var y1 = this.canvasSize;
        var x2 = this.middle;
        var y2 = 0;
        var x3 = this.canvasSize;
        var y3 = this.canvasSize;

        this.drawAndNest(p, this.iterationLimit, this.colorIndex, x1, y1, x2, y2, x3, y3);
    }

    drawAndNest(p: p5, remainingIterations: number, colorIndex: number, x1: number, y1: number, x2: number, y2: number, x3: number, y3: number): void {
        p.fill(this.colors[colorIndex])
        p.triangle(x1, y1, x2, y2, x3, y3)

        // only end on the initial color
        if (colorIndex == 0) {
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

        this.drawAndNest(p, remainingIterations - 1, 1 - colorIndex, newX1, newY1, newX2, newY2, newX3, newY3);
    }
}

export class RotatingNestedHalvedSquaresAnimation extends AngleAnimation {

    constructor(p: p5, canvasSize: number) {
        super(p, canvasSize);

        this.minOffset = 0.33;
        this.maxOffset = 0.67;

        this.iterationLimit = 8;
    }

    rootShape(p: p5): void {
        var x1 = 0;
        var y1 = this.canvasSize;
        var x2 = 0;
        var y2 = 0;
        var x3 = this.canvasSize;
        var y3 = this.canvasSize;
        this.drawAndNest(p, this.iterationLimit, 0, x1, x2, x3, y1, y2, y3);

        var x1 = this.canvasSize;
        var y1 = 0;
        var x2 = 0;
        var y2 = 0;
        var x3 = this.canvasSize;
        var y3 = this.canvasSize;
        this.drawAndNest(p, this.iterationLimit, 1, x1, x2, x3, y1, y2, y3);
    }

    drawAndNest(p: p5, remainingIterations: number, colorIndex: number, x1: number, x2: number, x3: number, y1: number, y2: number, y3: number): void {
        p.fill(this.colors[colorIndex])
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
        this.drawAndNest(p, remainingIterations - 1, 1 - colorIndex, middleX1, middleX2, middleX3, middleY1, middleY2, middleY3);

        // triangle at first corner (between 1, middle 1 and middle 3)
        var nextX1 = this.invOffset * x1 + this.offset * middleX1;
        var nextY1 = this.invOffset * y1 + this.offset * middleY1;
        var nextX2 = this.invOffset * middleX1 + this.offset * middleX3;
        var nextY2 = this.invOffset * middleY1 + this.offset * middleY3;
        var nextX3 = this.invOffset * middleX3 + this.offset * x1;
        var nextY3 = this.invOffset * middleY3 + this.offset * y1;
        this.drawAndNest(p, remainingIterations - 3, 1 - colorIndex, nextX1, nextX2, nextX3, nextY1, nextY2, nextY3);

        // triangle at second corner (between 2, middle 2 and middle 1)
        var nextX1 = this.invOffset * x2 + this.offset * middleX2;
        var nextY1 = this.invOffset * y2 + this.offset * middleY2;
        var nextX2 = this.invOffset * middleX2 + this.offset * middleX1;
        var nextY2 = this.invOffset * middleY2 + this.offset * middleY1;
        var nextX3 = this.invOffset * middleX1 + this.offset * x2;
        var nextY3 = this.invOffset * middleY1 + this.offset * y2;
        this.drawAndNest(p, remainingIterations - 3, 1 - colorIndex, nextX1, nextX2, nextX3, nextY1, nextY2, nextY3);

        // triangle at third corner (between 3, middle 3 and middle 2)
        var nextX1 = this.invOffset * x3 + this.offset * middleX3;
        var nextY1 = this.invOffset * y3 + this.offset * middleY3;
        var nextX2 = this.invOffset * middleX3 + this.offset * middleX2;
        var nextY2 = this.invOffset * middleY3 + this.offset * middleY2;
        var nextX3 = this.invOffset * middleX2 + this.offset * x3;
        var nextY3 = this.invOffset * middleY2 + this.offset * y3;
        this.drawAndNest(p, remainingIterations - 3, 1 - colorIndex, nextX1, nextX2, nextX3, nextY1, nextY2, nextY3);
    }
}
