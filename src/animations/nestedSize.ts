import p5 from "p5";

abstract class SizeAnimation extends Animation {
    colors: any[] = [];
    colorIndex = 0;
    canvasSize: number;
    middle: number;

    minThickness = 8;
    maxThickness = 50;
    currentThickness = Math.random() * (this.maxThickness - this.minThickness) + this.minThickness;
    thicknessIncreasing = Math.random() < 0.5;
    thicknessDelta = Math.random() * 0.001 + 0.001;

    abstract initialSize: number;

    minShapeSize = 1;
    iterationLimit = 500;

    constructor(p: p5, canvasSize: number) {
        super();

        this.colors = [p.color(0, 0, 0), p.color(255, 255, 255)];
        this.canvasSize = canvasSize;
        this.middle = this.canvasSize / 2;
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

        var size = this.initialSize;

        var iterations = 0;
        this.colorIndex = 0;
        while (size > this.minShapeSize && iterations < this.iterationLimit) {
            iterations += 1;

            p.fill(this.colors[this.colorIndex])
            this.drawShape(p, size)

            size -= this.currentThickness

            if (this.colorIndex == this.colors.length - 1) {
                this.colorIndex = 0;
            } else {
                this.colorIndex += 1;
            }
        }
    }

    abstract drawShape(p: p5, size: number): void;
}

export class SquareSizeAnimation extends SizeAnimation {
    initialSize: number;

    constructor(p: p5, canvasSize: number) {
        super(p, canvasSize);

        this.initialSize = this.middle;
    }

    drawShape(p: p5, size: number): void {
        p.quad(
            this.middle - size, this.middle - size,
            this.middle + size, this.middle - size,
            this.middle + size, this.middle + size,
            this.middle - size, this.middle + size
        )
    }
}

export class CircleSizeAnimation extends SizeAnimation {
    initialSize: number;

    constructor(p: p5, canvasSize: number) {
        super(p, canvasSize);

        this.initialSize = this.middle * 2.8;
    }

    drawShape(p: p5, size: number): void {
        p.circle(this.middle, this.middle, size)
    }
}
