import p5 from "p5";

import { Composition } from "./base";
import { AnimatedParameter } from "./parameter";
import { ListColors, RandomListColors } from "../colors";

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

    colors: ListColors;
    canvasWidth: number;
    canvasHeight: number;
    middleX: number;
    middleY: number;

    abstract initialSize: number;

    currentThickness = 0;

    minShapeSize = 1;
    iterationLimit = 500;

    constructor(p: p5) {
        super();

        this.colors = new RandomListColors(p);

        this.canvasWidth = p.windowWidth;
        this.canvasHeight = p.windowHeight;
        p.createCanvas(this.canvasWidth, this.canvasHeight);
        p.background(255);

        this.middleX = p.windowWidth / 2;
        this.middleY = p.windowHeight / 2;

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
