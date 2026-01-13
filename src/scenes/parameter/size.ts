import p5 from "p5";

import { ListColors, RandomListColors } from "../../colors";
import { Composition } from "../base";
import { AnimatedParameter } from "./parameter";


export class AnimatedSizeParameter extends AnimatedParameter {
    constructor() {
        const minValue = 15;
        const maxValue = 50;
        const bouncing = false;
        const speed = Math.random() * 0.001 + 0.001;
        super(minValue, maxValue, bouncing, speed);
    }
}

abstract class SizeAnimation extends Composition {
    animated = true;
    animatedSize: AnimatedParameter;

    iterationLimit = 500;
    branchingFactor = 1;

    colors: ListColors;

    abstract initialSize: number;

    currentThickness = 0;

    minShapeSize = 1;

    constructor(p: p5) {
        super();

        this.colors = RandomListColors.getRandom(p);

        this.createCanvas(p, true);

        p.background(255);

        this.animatedSize = new AnimatedSizeParameter();
    }

    draw(p: p5, deltaTime: number): void {
        this.currentThickness = this.animatedSize.increment(deltaTime);

        var size = this.initialSize;

        var iterations = 0;
        this.colors = this.colors.initial();
        while (size > this.minShapeSize && iterations < this.iterationLimit) {
            iterations += 1;

            p.fill(this.colors.color())
            this.drawShape(p, size)

            size -= this.currentThickness

            this.colors = this.colors.next();
        }
    }

    abstract drawShape(p: p5, size: number): void;
}

export class SquareSizeAnimation extends SizeAnimation {
    initialSize: number;

    constructor(p: p5) {
        super(p);

        this.initialSize = Math.max(this.canvasWidth, this.canvasHeight);
    }

    drawShape(p: p5, size: number): void {
        p.quad(
            this.middleX - size, this.middleY - size,
            this.middleX + size, this.middleY - size,
            this.middleX + size, this.middleY + size,
            this.middleX - size, this.middleY + size
        )
    }
}

export class CircleSizeAnimation extends SizeAnimation {
    initialSize: number;

    constructor(p: p5) {
        super(p);

        this.initialSize = Math.max(this.canvasWidth, this.canvasHeight) * 1.4;
    }

    drawShape(p: p5, size: number): void {
        p.circle(this.middleX, this.middleY, size)
    }
}

export class TriangleSizeAnimation extends SizeAnimation {
    initialSize: number;

    constructor(p: p5) {
        super(p);

        this.initialSize = Math.max(this.canvasWidth, this.canvasHeight) * 2.5;
    }

    drawShape(p: p5, size: number): void {
        const height = size * Math.sqrt(3) / 2;
        p.triangle(
            this.middleX, this.middleY - (2 / 3) * height,
            this.middleX - size / 2, this.middleY + (1 / 3) * height,
            this.middleX + size / 2, this.middleY + (1 / 3) * height
        )
    }
}
